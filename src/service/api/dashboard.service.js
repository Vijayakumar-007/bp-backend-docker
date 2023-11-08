import { urls } from "../../config/urlConfig";
import { HTTP } from "../core/http.service";

export class DashboardService {

    static getPaymentSearchResult = async (req) => {
        const result = await HTTP.post(urls.getPaymentSearchList, req);

        if (result.data) {
            return result.data;
        }
        return undefined;
    };


    static initiateRefund = async (req,transactionId) => {
        console.log("transactionId",transactionId)
        const result = await HTTP.post(urls.initiateRefund+`${transactionId}`+`/refund`, req);

        if (result.data) {
            return result.data;
        }
        return undefined;
    };


    static getRejectedPaymentSearchResult = async (req) => {
        const result = await HTTP.post(urls.getRejectedPaymentSearchList, req);

        if (result.data) {
            return result.data;
        }
        return undefined;
    };

    static getCurrencies = async () => {

        const result = await HTTP.get(urls.getCurrencies);

        if (result.data) {
            return result.data;
        }
        return undefined;
    };

    static downloadTransactionsReport = async (searchObj, requestType) => {
        const result = await HTTP.post(requestType ==='report'? urls.export : urls.downlaodSettlement, searchObj);
        if (result.data) {
            return result.data;
        }
        return undefined;
    }

    static getAllFailedTransactions = async (request) => {
        const result = await HTTP.post(urls.searchFailedPayments, request);
        console.log("result ", result.data);
        if (result.data) {
            return result.data;
        }
        return undefined;
    }

    static getUserInfo = async () => {
        const result = await HTTP.get(urls.userInfo);
        if (result.data) {
            return result.data;
        }
        return undefined;
    }

    static cancelPayment = async (request) => {
        const result = await HTTP.post(urls.cancelPayment, request);
        if (result.data) {
            return result.data;
        }
        return undefined;

    }

    static downloadFailedTransactionsReport = async (searchObj) => {
        const result = await HTTP.post(urls.downloadFailedTransactionsReport, searchObj);
        if (result.data) {
            return result.data;
        }
        return undefined;
    }
    
    static getSettlementReportResult = async (req) => {
        const result = await HTTP.post(urls.getSettlementReportResult, req )  
        if (result.status == 200) {
          return result;
        }
        return undefined;
    }

    static sendPaymentReminder = async (transactionId) => {
        let url = `${urls.sendPaymentReminder}/${transactionId}`;
        const result = await HTTP.get(url)  
        if (result.status == 200) {
          return result;
        }
        return undefined;
    }

    static downloadSettlementReport = async (fileId) => {
        const url = `${urls.downloadSettlementReport}/${fileId}`
        const result = await HTTP.get(url)
        if (result.status == 200) {
          return result;
        }
        return undefined;
      }
}
