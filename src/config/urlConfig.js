import { config } from './config'
import { Environment } from '../enum/common.enum'

 const baseUrlDev = 'https://ki6f28zlli.execute-api.eu-west-2.amazonaws.com/dev'
const baseUrlProd = 'https://uat-api-collect-payment.benepay.io';

// const baseUrlProd = 'https://y1izdj44ki.execute-api.ap-south-1.amazonaws.com/test-prod';
// const baseUrlProd = 'https://collect-v2.api.benepay.io';

export const baseUrl = config.env === Environment.dev ? baseUrlDev : baseUrlProd;

// export const baseUrl = 'http://localhost:8080'

export const urls = {
// to be added later
    getPaymentSearchList:'/v1/transactionSearchRequest',
    getRejectedPaymentSearchList:'/v1/unprocessedSearchRequest',
    getCurrencies:'/v1/supportedCurrency',
    initiateRefund:'/v1/transaction/',
    export: '/v1/export',
    downlaodSettlement: '/v1/settlement',
    uploadFile: '/v2/uploadpaymentfile',
    UploadedFilesList: '/v2/fileSummaryList',
    userInfo: '/v2/userOrgInfo',
    refundFile: '/v2/refundFile/upload',
    errorList: '/v2/errorSummaryList',
    paymentFileResponse: '/v2/download/paymentfileresponse',
    cancelPayment: '/v2/canclePayment',
    searchFailedPayments: '/v2/searchRequest/failedAttempts',
    downloadFailedTransactionsReport: '/v2/export/failed',
    getSettlementReportResult: '/v2/settlement/merchant/getReports',
    downloadSettlementReport: 'v2/settlement/merchant/download/file',
    sendPaymentReminder: 'v2/sendPaymentReminder',
};

export const adminUrls = {
    uploadSettlementFile: 'v2/settlement/uploadAndProcessFile',
    getFromProvidedResult: 'v2/settlement/getUploadedFilesSummary',
    getGeneratedByBenepayResult: 'v2/settlement/getReports',
    downloadFromSettlementFile: 'v2/settlement/download/file',
    downloadGeneratedByBenepayFile: 'v2/settlement/download/file',
    getAllMerchants: '/v2/settlement/getMerchants',
    getAllProviders: '/v2/settlement/getProvidersList',
    getMerchants:'/v2/merchantSummaryList'
}