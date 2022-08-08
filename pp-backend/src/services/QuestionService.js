import { DynamoConnecter } from "../utilities/DynamoConnecter";
import { env } from '../configuration/env';
import { DYNAMO_TABLES_LIST } from "../utilities/DynamoTableList";
import { API_RESPONSE_MESSAGES, PAYMENT_METHODS, PROFILE_EXPIRE_PROMOCODE_DAYS } from "../utilities/AppConstants";
import moment from 'moment';
import { User } from "../models/User";
import { S3Helper } from "../utilities/S3Helper";
import { Utils } from "../utilities/Utils";
import { PromoCode } from "../models/PromoCode";
import { UserService } from "./UserService";

export class PromoCodeService {


    constructor() {
        this.dynamoConnecter = new DynamoConnecter().getClient();
        this.promoCodeTable = DYNAMO_TABLES_LIST.PROMOCODE.replace('{env}', env);
        this.userService = new UserService();
        this.utils = new Utils();
    }

    async insertPromoCode(body) {
        body.code = body.code.toUpperCase();
        console.log(body.code);
        let records = await this.getPromoCode(body.code);
        if (records.length === 0) {

            let expiry = moment(new Date()).add(body.expireDays, 'days').valueOf();
            body.expiry = expiry;
            let promocode = new PromoCode().getSchema(body);
            const params = {
                TableName: this.promoCodeTable,
                Item: {
                    ...promocode
                }
            };
            console.log(`Params: ${JSON.stringify(params)}`);
            let creation = await this.dynamoConnecter.put(params).promise();
            return {
                success: true,
                message: API_RESPONSE_MESSAGES.RESOURCE_CREATED,
                data: creation
            };
        }
        else {
            throw new Error(API_RESPONSE_MESSAGES.ALREADY_EXIST);
        }

    }


    async getPromoCode(code) {
        const query = {
            TableName: this.promoCodeTable,
            FilterExpression: 'Code = :Code',
            ExpressionAttributeValues: {
                ":Code": code
            }
        };

        let queryResponse = await this.dynamoConnecter.scan(query).promise();
        return queryResponse.Items;
    }

    async validatePromoCode(body) {
        let { userId, contact } = body;
        let promoCodeRecord = await this.getPromoCode(body.code);
        let userRecord = await this.userService.getUserViaContact(contact);
        if (promoCodeRecord.length === 0) {
            throw new Error(API_RESPONSE_MESSAGES.INVALID_PROMOCODE);
        }
        else if(userRecord.length !== 0 && userRecord[0].IsPaymentVerified === true){
            throw new Error(API_RESPONSE_MESSAGES.PAYMENT_VERIFIED);
        }
        else {

            let promoCodeDetails = promoCodeRecord[0];
            console.log(promoCodeDetails);
            const isExpired = moment().diff(promoCodeDetails.Expiry) >= 0;

            console.log('Promo code Expired', isExpired);
            console.log('Limit Consumed', promoCodeDetails.ConsumedCount)
            console.log('Usage Limit', promoCodeDetails.UsageLimit);

            if (!isExpired && promoCodeDetails.ConsumedCount < parseInt(promoCodeDetails.UsageLimit)) {
                let profileExpire = moment(new Date()).add(PROFILE_EXPIRE_PROMOCODE_DAYS, 'days').valueOf();

                let userUpdateParams = {
                    IsPaymentVerified: true,
                    ProfileExpire: profileExpire,
                    PaymentVia : PAYMENT_METHODS.PROMOCODE
                };

                let userUpdation = await this.userService.updateUser(userId, userUpdateParams);
                let promocodeUpdation = await this.incrementPromoCodeConsumption(promoCodeDetails.Code, promoCodeDetails.ConsumedCount);
                return {
                    success: true,
                    message: API_RESPONSE_MESSAGES.REQUEST_SUCCESS,
                    data: {userUpdation, promocodeUpdation}
                };

            }
            else {
                throw new Error(API_RESPONSE_MESSAGES.INVALID_PROMOCODE);
            }



        }
    }

    async incrementPromoCodeConsumption(code, consumedCount) {

        let params = {
            TableName: this.promoCodeTable,
            Key: {
                "Code": code
            },
            UpdateExpression: "set ConsumedCount = :ConsumedCount",
            ExpressionAttributeValues: {
                ":ConsumedCount": consumedCount + 1
            },
            ReturnValues: "UPDATED_NEW",
        };
        let updation = await this.dynamoConnecter.update(params).promise();
        return updation

    }
}