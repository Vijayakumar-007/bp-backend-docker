import React, { Component } from 'react';
import { html } from "./home.html";
import { DashboardService } from "../../service/api/dashboard.service";
import { Auth } from '@aws-amplify/auth';
import { StorageKeys, StorageService, TempStorage } from "../../service/core/storage.service";
import { addDays, endOfDay, startOfDay } from 'date-fns'
import moment from "moment";
import { toast } from 'react-toastify';
import { NaturePeopleOutlined } from '@material-ui/icons';
import { Pagination } from '../../config/constants';


class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checkedStatuses: new Map(),
            selectedStatuses: [],
            teststatuscheck: [],
            // status: ["ALL", "AWAITING_PAYMENT", "PROCESSSING", "REJECTED_BY_PROVIDER", "PAID", "REFUNDED"],
            status: [],
            apply1Click: false,
            apply2Click: false,
            list1Style: '',
            section1show: false,
            currencyList: [],
            serachedPaymentResultList: [],
            serachedRejectedPaymentResultList: [],
            validationFailed: false,
            amountValidationError: false,
            totalPaymentsFound: 0,
            noResultFound: false,
            noRejectedResultFound: false,
            rejectedTableShow: false,
            showProcessedTable: false,
            showValidationMsg: false,
            showModal: false,
            showConfirmationModal: false,
            refundAmount: '',
            refundCcy: '',
            selectedOption: 'Partial Refund',
            fullRefundAmt: '',
            fullRefundCcy: '',
            paymentSettlementModel: false,
            settlementDate: '',
            loading: false,
            refundLoading: false,
            parentTransactions: [],
            selectedItem: {},
            lastSelectedItem: {},
            currentIndex: 0,
            isRowVisible: false,
            showCancellationModal: false,
            showCancellationReason: false,
            cancellationReason: '',
            selectedTransactionId: '',
            isCancellationProcessing: false,
            failedAttemptStartDate: '',
            failedAttemptEndDate: '',
            benepayPaymentRef: '',
            collectionReference: '',
            fromAmount: '',
            toAmount: '',
            failedTransactions: undefined,
            isFailedTransactionsRequested: false,
            payerEmail: '',
            refundCount: 0,
            locale: 'ru',
            receiptEndDate: null,
            paymentStartDate: null,
            paymentEndDate: null,
            receiptStartDate: null,
            rejectedReceiptEndDate: null,
            rejectedReceiptStartDate: null,
            requestorTransactionId: '',
            payerName: null,
            collectionRef: '',
            coltype: '',
            order: 'desc',
            colvalue: '',
            apiUpdation: '',
            showCopiedMsg: false,
            copiedId: "",
            refundIndex: "",
            pageNo: Pagination.pageNo,
            pageSize: Pagination.pageSize,
            totalPages: Pagination.totalPages,
            totalFailedPages: Pagination.totalPages,
            initalPage: 0,
            rejectedFilePagination: false,
            initalPageFailed: 0,
            recentSortColumn: "",
            remainingAmt: 0,
            searchedBenePayTransactionId: null,
            searchedRequestorTransactionId: null,
            searchedPayerEmail: null,
            cancellationFromDate: null,
            cancellationToDate: null,
            requestedCcy: null,
            requestedMinAmount: null,
            requestedMaxAmount: null,
            paidCcy: null,
            paidMinAmount: null,
            paidMaxAmount: null,
            showAllRecords: true,
            totalFailedCount: null,
            copyText: 'Copy Payment Link',
            showReminderModal: false,
            transactionIdForReminder: null,
            errorDesc: "",
            paymentAttempts: 0,
            isDeviceMobile: false
        }
    }

    downloadFailedTransactionsCSV = async () => {
        this.setState({
            loading: true
        })
        const request = {}
        if (this.state.failedAttemptStartDate) {
            request.attemptStartDate = moment(this.state.failedAttemptStartDate).format('YYYY-MM-DD')
        }
        if (this.state.failedAttemptEndDate) {
            request.attemptEndDate = moment(this.state.failedAttemptEndDate).format('YYYY-MM-DD')
        }
        if (this.state.requestedCcy) {
            request.requestedCcy = this.state.requestedCcy
        }
        if (this.state.requestedMinAmount) {
            request.requestedMinAmount = +this.state.requestedMinAmount
        }
        if (this.state.requestedMaxAmount) {
            request.requestedMaxAmount = +this.state.requestedMaxAmount
        }
        if (this.state.payerEmail) {
            request.payerEmail = this.state.payerEmail
        }
        if (this.state.collectionReference) {
            request.collectionRef = this.state.collectionReference
        }
        if (this.state.benepayPaymentRef) {
            request.transactionId = this.state.benepayPaymentRef
        }

        const response = await DashboardService.downloadFailedTransactionsReport(request)
        if (!response) {
            return
        }
        this.setState({
            loading: false
        })
        var blob = this.base64toBlob(response.content, 'text/csv')
        if (window.navigator.msSaveBlob) {
            window.navigator.msSaveOrOpenBlob(blob, response.fileName + '.csv');
        }
        else {
            var a = window.document.createElement("a");
            a.href = window.URL.createObjectURL(blob, { type: "text/plain" });
            a.download = response.fileName + '.csv';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }

    sendReminder = async () => {
        this.setState({ loading: true });

        if (!this.state.transactionIdForReminder) {
            toast.error('Something went wrong, please try again later!');
            this.setState({ loading: false });
            return;
        }

        const response = await DashboardService.sendPaymentReminder(this.state.transactionIdForReminder);

        this.setState({ loading: false });
        toast.success('Reminder email sent successfully');

    }


    sortingData = (coltype, apiUpdation) => {
        this.setState({
            coltype: coltype,
            recentSortColumn: coltype
        })


        console.log("this is event : ", coltype, "and the updation will be in ", apiUpdation)
        let data = []
        if (apiUpdation === "Payment") {
            data = this.state.serachedPaymentResultList
            console.log("data is set to payment")
        } else if (apiUpdation === "Failed") {
            data = this.state.failedTransactions
            console.log("data is set to failed")
        } else {
            data = this.state.serachedRejectedPaymentResultList
            console.log("data is set to rejected")
        }

        const sortedData = data.sort((a, b) => {
            let i = a[coltype]
            let j = b[coltype]

            if (i !== null && j !== null) {
                let c = i.toLowerCase()
                let d = j.toLowerCase()
                return c > d ? -1 : 1;
            }
            if (i === null) {
                return 1
            }
            if (j === null) {
                return -1
            }
        })

        if (this.state.order === 'ascn' && this.state.colvalue === coltype) {
            sortedData.reverse()
            this.setState({ order: 'desc' })
            console.log("the data is in desc order")
        } else {
            this.setState({ order: 'ascn', colvalue: coltype })
            console.log("the data is in ascn order")
        }

        console.log("this is sorteed data : ", sortedData)

        if (this.state.apiUpdation === "Payment") {
            this.setState({
                serachedPaymentResultList: sortedData
            })
        } if (this.state.apiUpdation === "Failed") {
            this.setState({
                failedTransactions: sortedData
            })
        } else {
            this.setState({
                serachedRejectedPaymentResultList: sortedData
            })

        }

    }

    pageWiseSorting = (value) => {
        if (this.state.recentSortColumn !== null && this.state.recentSortColumn.trim() !== '') {
            if (this.state.order === 'ascn') {
                this.setState({ order: 'desc' })
            } else {
                this.setState({ order: "ascn" })
            }
            this.sortingData(this.state.recentSortColumn, value)

        }
    }


    setRowVisibility = async (item, index) => {
        if (this.state.selectedItem.transactionId === item.transactionId) {
            item.isRowVisible = !item.isRowVisible;
        } else {
            item.isRowVisible = true;
        }
        this.setState({ selectedItem: item, currentIndex: index });
    }

    onDateChange = (item) => {
        console.log('item ', item);
        item[0] = moment(item[0]).format('DD-MMM-YYYY')
        item[1] = moment(item[1]).format('DD-MMM-YYYY')
        this.setState({ selectedDates: item })
    };

    copyRequestedId = (id, index) => {
        navigator.clipboard.writeText(id);
        console.log("this is the copied item:", id);
        this.setState({ showCopiedMsg: true, refundIndex: index, copiedId: id }, () => {
            setTimeout(() => {
                this.setState({ showCopiedMsg: false });
            }, 500);
        });
    }


    //  outFunc =()=> {
    //     var tooltip = document.getElementById("myTooltip");
    //     tooltip.innerHTML = "Copy to clipboard";
    //   }


    handleChange = (value) => {
        this.setState({ dateRange: value });
    };

    handleApplyClickPaymentSettlement = async () => {

        this.setState({ initalPage: 0 });
        this.processedApply(1);

    }

    // this function assigns null to the variable if it has a empty string value
    nullValueIfEmpty = (value) => {
        return value === '' ? null : value;
    }

    processedApply = async (paramPageNo) => {
        this.setState({
            noResultFound: false,
            showProcessedTable: false,
            loading: true
        });

        var searchObj = {
            status: this.state.selectedStatuses,
            receiptStartDate: this.state.receiptStartDate,
            receiptEndDate: this.state.receiptEndDate,
            paymentStartDate: this.state.paymentStartDate,
            paymentEndDate: this.state.paymentEndDate,
            requestedCcy: this.state.requestedCcy || this.nullValueIfEmpty(this.state.requestedCcy),
            requestedMinAmount: this.state.requestedMinAmount || this.nullValueIfEmpty(this.state.requestedMinAmount),
            requestedMaxAmount: this.state.requestedMaxAmount || this.nullValueIfEmpty(this.state.requestedMaxAmount),
            paymentMode: this.state.paymentMode || this.nullValueIfEmpty(this.state.paymentMode),
            payerName: this.state.payerName || this.nullValueIfEmpty(this.state.payerName),
            collectionRef: this.state.collectionRef,
            pageNo: paramPageNo,
            pageSize: this.state.pageSize,
            defaultSearch: false,
            transactionId: this.state.searchedBenePayTransactionId || this.nullValueIfEmpty(this.state.searchedBenePayTransactionId),
            requestorTransactionId: this.state.searchedRequestorTransactionId || this.nullValueIfEmpty(this.state.searchedRequestorTransactionId),
            payerEmail: this.state.payerEmail || this.nullValueIfEmpty(this.state.payerEmail),
            cancellationFromDate: this.state.cancellationFromDate,
            cancellationToDate: this.state.cancellationToDate,
            paidCcy: this.state.paidCcy || this.nullValueIfEmpty(this.state.paidCcy),
            paidMinAmount: this.state.paidMinAmount || this.nullValueIfEmpty(this.state.paidMinAmount),
            paidMaxAmount: this.state.paidMaxAmount || this.nullValueIfEmpty(this.state.paidMaxAmount),
        }

        // console.log("PRINTING SUSH :",this.state.pageNo)
        if (this.state.receiptStartDate) {
            searchObj.receiptStartDate = moment(this.state.receiptStartDate).format('YYYY-MM-DD')
        }
        if (this.state.receiptEndDate) {
            searchObj.receiptEndDate = moment(this.state.receiptEndDate).format('YYYY-MM-DD')
        }
        if (this.state.paymentStartDate) {
            searchObj.paymentStartDate = moment(this.state.paymentStartDate).format('YYYY-MM-DD')
        }
        if (this.state.paymentEndDate) {
            searchObj.paymentEndDate = moment(this.state.paymentEndDate).format('YYYY-MM-DD')
        }
        if (this.state.cancellationFromDate) {
            searchObj.cancellationFromDate = moment(this.state.cancellationFromDate).format('YYYY-MM-DD')
        }
        if (this.state.cancellationToDate) {
            searchObj.cancellationToDate = moment(this.state.cancellationToDate).format('YYYY-MM-DD')
        }

        if (this.state.requestedMinAmount) {
            searchObj.requestedMinAmount = parseInt(this.state.requestedMinAmount)
        }
        if (this.state.requestedMaxAmount) {
            searchObj.requestedMaxAmount = parseInt(this.state.requestedMaxAmount)
        }
        if (this.state.paidMinAmount) {
            searchObj.paidMinAmount = parseInt(this.state.paidMinAmount)
        }
        if (this.state.paidMaxAmount) {
            searchObj.paidMaxAmount = parseInt(this.state.paidMaxAmount)
        }

        if (this.state.paidMinAmount) {
            searchObj.paidMinAmount = parseInt(this.state.paidMinAmount)
        }
        if (this.state.paidMaxAmount) {
            searchObj.paidMaxAmount = parseInt(this.state.paidMaxAmount)
        }
        if (!searchObj.status.length) {
            searchObj.status = null
        }

        var objFields = Object.keys(searchObj);
        var allFieldsBoolean = false;

        if (!searchObj.status && !searchObj.receiptStartDate && !searchObj.receiptEndDate && !searchObj.paymentStartDate && !searchObj.paymentEndDate && !searchObj.requestedCcy && !searchObj.requestedMinAmount &&
            !searchObj.requestedMaxAmount && !searchObj.paidCcy && !searchObj.paidMinAmount && !searchObj.paidMaxAmount && !searchObj.paymentMode && !searchObj.payerName && !searchObj.collectionRef &&
            !searchObj.requestorTransactionId && !searchObj.transactionId && !searchObj.payerEmail && !searchObj.cancellationFromDate && !searchObj.cancellationToDate) {
            allFieldsBoolean = true;

        }

        if (allFieldsBoolean) {
            searchObj = {
                pageNo: paramPageNo,
                pageSize: this.state.pageSize,
                // defaultSearch: true
            }
        }
        // else{
        //     searchObj.defaultSearch = false
        // }

        const response = await DashboardService.getPaymentSearchResult(searchObj)
        if ((response && response["Error Code"]) || !response.paymentDetails) {
            toast.error('Something went wrong, please try again later!');
            this.setState({
                loading: false
            });
            return;
        }
        if (response && response.errorMessage === null && response.paymentDetail && response.paymentDetail.length === 0) {
            this.setState({
                noResultFound: true,
                loading: false
            });

            return
        }

        let totalPages = (response.totalCount / this.state.pageSize);
        this.setState({
            totalPages: Math.ceil(totalPages)
        });
        // 
        response.paymentDetails.map(pd => {
            pd.isRowVisible = false;
        })

        console.log("Payment details result", response)
        if(this.state.initalPage == 0){
            this.setState({
                serachedPaymentResultList: response.paymentDetails,
                totalPaymentsFound:response.totalCount,
                refundCount:response.refundCount,
                // totalPaymentsFound: response.paymentDetails.filter((pd) => pd.transactionType.toUpperCase() === 'PAYMENT' && pd.transactionStatus !== 'SUCCESS').length,
                // refundCount: response.paymentDetails.filter((pd) => pd.transactionType.toUpperCase() === 'REFUND').length,
                loading: false
            })
        }else{
            this.setState({
                serachedPaymentResultList: response.paymentDetails,
                loading: false
            })
        }

        // var paymentDetails = [{
        //     requestorTransactionId: '12345',
        //     paymentCurrency: 'INR',
        //     paymentAmount: 2000
        // }]

        const _response = response.paymentDetails
        for (let i = 0; i < _response.length; i++) {
            for (let j = 1; j < _response.length; j++) {
                if (_response[i].transactionType === 'PAYMENT' && _response[i].status !== 'AWAITING_PAYMENT' && _response[i].status !== 'PAID' && _response[i].status !== 'PARTIALLY_REFUNDED' && _response[i].status !== 'FULLY_REFUNDED' && _response[i].status !== 'REFUNDED' && _response[i].transactionId === _response[j].transactionId) {
                    _response[i].parentTransactionId = _response[i].transactionId
                }
            }
        }


        this.setState({
            serachedPaymentResultList: _response
        })

        await this.setState({ parentTransactions: [...this.state.serachedPaymentResultList?.filter(sp => sp.transactionType.toUpperCase() === "PAYMENT")] })

        this.pageWiseSorting("Payment")


        this.setState({
            apply1Click: true,
            apply2Click: false,
            showProcessedTable: true
        })
    }
    rejectedClear = async () => {
        this.setState({
            rejectedReceiptStartDate: '',
            rejectedReceiptEndDate: ''
        });
    }

    clearFailedTransactionForm = () => {
        this.setState({ failedAttemptStartDate: '', failedAttemptEndDate: '', requestedCcy: '', fromAmount: '', toAmount: '', payerEmail: '', collectionReference: '', benepayPaymentRef: '', failedTransactions: null })
    }

    failedPaymentNavigationHandler = async () => {
        this.setState({ showProcessedTable: false, rejectedTableShow: false, apply1Click: false, apply2Click: false, rejectedFilePagination: false });
        this.clearFailedTransactionForm()
        this.clearProcessedDetails();
        this.rejectedClear()
    }

    applyFailedTransactionHandleClick = async () => {

        this.setState({ initalPageFailed: 0 });
        this.applyFailedTransactionHandler(1);

    }

    applyFailedTransactionHandler = async (paramPageNo) => {
        this.setState({ loading: true })
        const request = {}
        if (this.state.failedAttemptStartDate) {
            request.attemptStartDate = moment(this.state.failedAttemptStartDate).format('YYYY-MM-DD')
        }
        if (this.state.failedAttemptEndDate) {
            request.attemptEndDate = moment(this.state.failedAttemptEndDate).format('YYYY-MM-DD')
        }
        if (this.state.requestedCcy) {
            request.requestedCcy = this.state.requestedCcy
        }
        if (this.state.fromAmount) {
            request.requestedMinAmount = +this.state.fromAmount
        }
        if (this.state.toAmount) {
            request.requestedMaxAmount = +this.state.toAmount
        }
        if (this.state.payerEmail) {
            request.payerEmail = this.state.payerEmail
        }
        if (this.state.collectionReference) {
            request.collectionRef = this.state.collectionReference
        }
        if (this.state.benepayPaymentRef) {
            request.transactionId = this.state.benepayPaymentRef
        }
        if (this.state.pageNo) {
            request.pageNo = paramPageNo
        }
        if (this.state.pageSize) {
            request.pageSize = this.state.pageSize
        }
        this.getFailedTransactions(request)
    }

    submitCancellationRequest = async () => {
        this.setState({ loading: true })
        const request = {
            transactionId: this.state.selectedTransactionId,
            reason: this.state.cancellationReason
        }
        console.log('request ', request);
        const response = await DashboardService.cancelPayment(request);
        this.setState({ loading: false, showCancellationReason: false, showCancellationReason: false, cancellationReason: '' });
        if (!response) {
            return
        }
        toast.success('Payment cancelled successfully!');
        this.processedApply(this.state.pageNo);
    }

    handleOnChange = e => {
        this.setState({ selectedOption: e.target.value });
        if (e.target.value === "Full Refund") {
            this.setState({
                refundAmount: this.state.fullRefundAmt,
                refundCcy: this.state.fullRefundCcy
            })
        } else {
            this.setState({
                refundAmount: '',
                refundCcy: this.state.fullRefundCcy
            })
        }
    }

    refundAmountCal = async (item) => {

        let data = this.state.serachedPaymentResultList;
        let initialAmount = item.finalDueAmount;
        let amount = 0;
        data.forEach(value => {
            if ((value.transactionId).includes(item.transactionId) && value.transactionType === "REFUND") {
                amount += parseFloat(value.finalDueAmount);
            }
        });
        amount = Math.round(amount * 100) / 100;
        let formattedAmount = amount.toFixed(2);

        this.setState({
            remainingAmt: initialAmount - formattedAmount
        })
    }

    handleRefundAmountChange = (e) => {
        this.setState({ refundAmount: e.target.value });
    };

    handleRefundReason = (e) => {
        this.setState({ refundReason: e.target.value });
    };

    handleRefundCcyChange = (e) => {
        this.setState({ refundCcy: e.target.value });
    };

    refundClick = async (event, item) => {
        this.refundAmountCal(item)
        console.log('item ', item);
        event.stopPropagation()
        if ((item.status === 'PAID' || item.status === 'PARTIALLY_REFUNDED' || item.status === 'REFUNDED') && (item.paymentMode === 'CREDIT CARD' || item.paymentMode === 'DEBIT CARD')) {
            this.setState({
                showModal: true,
                // refundAmount: item.paymentAmount,
                refundCcy: item.collectionCurrency,
                fullRefundAmt: item.paymentAmount,
                fullRefundCcy: item.collectionCurrency,
                refundTransactionId: item.transactionId,
                paymentAttempts: item.paymentAttempts
            })
            return;
        }
        if (item.status.toUpperCase() === 'AWAITING_PAYMENT') {
            this.setState({ showCancellationModal: true, selectedTransactionId: item.transactionId });
        }
    }

    cancelRefund = async () => {
        this.setState({ refundReason: "", selectedOption: 'Partial Refund', refundAmount: '' })
        this.setState({
            showConfirmationModal: false,
            showModal: false

        })
    }

    cancelSettlement = async () => {
        this.setState({
            paymentSettlementModel: false,
            settlementDate: ''
        })
        this.props.history.push('/home');
    }


    confirmBack = async () => {

        this.setState({
            showConfirmationModal: false,
            showModal: false,
            showFailureModal: false,

        })

    }

    confirmRefund = async () => {
        this.setState({ loading: true });
        var refundObj = {
            "transactionId": this.state.refundTransactionId,
            "refundType": this.state.selectedOption === 'Full Refund' ? 'F' : 'P',
            "refundCcy": this.state.refundCcy,
            "refundAmt": this.state.refundAmount,
            "refundReason": this.state.refundReason

        }

        if (this.state.selectedOption !== 'Full Refund' && this.state.refundAmount > this.state.remainingAmt) {
            toast.error('The entered amount should not exceed the remaining amount');
            this.setState({ loading: false });
            return;
        }


        const response = await DashboardService.initiateRefund(refundObj, this.state.refundTransactionId)
        console.log('response ', response);
        this.setState({ refundReason: "", loading: false });
        if (!response) {
            toast.error('Something went wrong, Please try again later');
            return;
        }
        if (response.errors || (response.status && response.status === 'FAILURE')) {
            const firstElement = response.errors[0];
            console.log("this is error  ", firstElement);
            if (firstElement) {
                const errorDesc = firstElement.errorDescription;
                console.log("this is error desc ", errorDesc);
                this.setState({

                    errorDesc: errorDesc,
                })

            }
            this.setState({
                showFailureModal: true,
                showModal: false
            })
            return;
        }
        if (response.status && response.status.toString().toLowerCase() === 'success') {
            this.setState({
                showConfirmationModal: true,
                showModal: false
            })
            this.processedApply(this.state.pageNo);
        }
    }
    paymentSettlement = async () => {
        this.setState({
            paymentSettlementModel: true
        });
    }

    downloadSettlementFile = async () => {

        var searchObj = {
            settlementDate: this.state.settlementDate,
        }
        this.setState({
            paymentSettlementModel: false,
            loading: true
        })
        const response = await DashboardService.downloadTransactionsReport(searchObj, 'settlement')
        this.setState({
            loading: false,
        })
        if (!response) {
            return
        }
        this.props.history.push('/home');
        if (!response.fileName) {
            toast.info('Requested File not found');
            return
        }
        var blob = this.base64toBlob(response.content, 'text/csv')
        if (window.navigator.msSaveBlob) {
            window.navigator.msSaveOrOpenBlob(blob, response.fileName + '.csv');
        }
        else {
            var a = window.document.createElement("a");
            a.href = window.URL.createObjectURL(blob, { type: "text/plain" });
            a.download = response.fileName + '.csv';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }

    rejectedApply = async () => {
        this.setState({
            noRejectedResultFound: false,
            showValidationMsg: false,
        });

        var searchObj = {
            receiptStartDate: this.state.rejectedReceiptStartDate,
            receiptEndDate: this.state.rejectedReceiptEndDate
        }

        if (this.state.rejectedReceiptStartDate) {
            searchObj.receiptStartDate = moment(this.state.rejectedReceiptStartDate).format('YYYY-MM-DD')
        }
        if (this.state.rejectedReceiptEndDate) {
            searchObj.receiptEndDate = moment(this.state.rejectedReceiptEndDate).format('YYYY-MM-DD')
        }

        if (!this.state.rejectedReceiptStartDate || !this.state.rejectedReceiptEndDate) {
            this.setState({
                showValidationMsg: true,
                rejectedTableShow: false
            });
        }
        else {
            this.setState({
                loading: true
            });
            const response = await DashboardService.getRejectedPaymentSearchResult(searchObj)
            this.setState({
                loading: false
            });
            if (!response || response.beneRejectedPayments.length == 0) {
                this.setState({
                    noRejectedResultFound: true,

                });

                return
            }
            this.setState({ serachedRejectedPaymentResultList: response.beneRejectedPayments })

            this.setState({
                apply1Click: true,
                apply2Click: true,
                rejectedTableShow: true,
                showValidationMsg: false

            })

        }
    }




    processedClick = async () => {

        this.setState({
            apply1Click: false,
            apply2Click: false,
            rejectedTableShow: false,
            failedTransactions: undefined,
            rejectedTableShow: false,
            rejectedFilePagination: false
        })
        this.clearProcessedDetails()
        this.clearFailedTransactionForm()
        this.rejectedClear()
    }

    clearProcessedDetails = async () => {
        this.setState({
            receiptStartDate: null,
            receiptEndDate: null,
            paymentStartDate: null,
            paymentEndDate: null,
            cancellationFromDate: null,
            cancellationToDate: null,
            requestedCcy: null,
            requestedMinAmount: '',
            requestedMaxAmount: '',
            paidCcy: null,
            paidMinAmount: '',
            paidMaxAmount: '',
            paymentMode: '',
            payerName: '',
            collectionRef: '',
            searchedBenePayTransactionId: '',
            searchedRequestorTransactionId: '',
            payerEmail: '',
            apply1Click: false,
            apply2Click: false,
            showProcessedTable: false
        });

        // Clear the checkboxes
        const updatedStatus = this.state.status.map((statusItem) => ({
            ...statusItem,
            isChecked: false
        }));

        document.getElementById("requestedCcySelect").selectedIndex = 0;
        document.getElementById("paidCcySelect").selectedIndex = 0;

        this.setState({ status: updatedStatus })
        this.setState({ selectedStatuses: [] });
    };

    rejectedClick = async () => {

        this.setState({
            apply1Click: false,
            apply2Click: true,
            section1show: true,
            noRejectedResultFound: false,
            showProcessedTable: false,
            noResultFound: false,
            rejectedTableShow: false,
            rejectedFilePagination: true,
            failedTransactions: undefined
        })
    }

    handleStatusChange = e => {
        e.persist()
        this.state.selectedStatuses = []
        this.state.teststatuscheck = [];

        const item = e.target.name;

        console.log('item ', item);

        let index = -1;
        const isChecked = e.target.checked;
        for (var j = 0; j < this.state.status.length; j++) {
            if (this.state.status[j].value === item) {
                this.state.status[j].isChecked = isChecked
            }
            // if (this.state.status[j].name === "ALL" && !isChecked) {
            //     this.state.status[j].isChecked = false;
            // }
        }

        this.setState({ status: this.state.status });

        for (var j = 0; j < this.state.status.length; j++) {
            if (this.state.status[j].isChecked === true) {
                if (this.state.status[j].value !== 'ALL') {
                    this.state.teststatuscheck.push(this.state.status[j].value)
                }
            }

        }
        this.state.selectedCurrencies = []

        for (var j = 0; j < this.state.status.length; j++) {
            for (var k = 0; k < this.state.teststatuscheck.length; k++) {
                if (this.state.status[j].value === this.state.teststatuscheck[k]) {
                    if (this.state.status[j].value !== 'ALL') {

                        this.state.selectedStatuses.push(this.state.status[j].value);
                    }
                }
            }

        }

        let fruites = this.state.status;

        fruites.forEach(fruite => {
            if (fruite.value == item && isChecked) {
                fruite.isChecked = true
            }
        });

        this.setState({ status: fruites });

        for (var j = 0; j < this.state.status.length; j++) {
            for (var k = 0; k < this.state.teststatuscheck.length; k++) {
                if (this.state.status[j].value === this.state.teststatuscheck[k].value) {
                    if (this.state.status[j].value !== 'ALL') {

                        this.state.selectedStatuses.push(this.state.status[j].value);
                    }
                }
            }
        }

        if (item == "ALL" && isChecked) {
            this.state.selectedStatuses = [];
            for (var j = 0; j < this.state.status.length; j++) {
                if (this.state.status[j].value !== 'ALL') {

                    this.state.selectedStatuses.push(this.state.status[j].value);
                }
                let fruites = this.state.status;

                fruites.forEach(fruite => (fruite.isChecked = true));
                this.setState({ status: fruites });
            }

        }
        if (item == "ALL" && !isChecked) {
            this.state.selectedStatuses = [];
            for (var j = 0; j < this.state.status.length; j++) {
                let fruites = this.state.status;

                fruites.forEach(fruite => (fruite.isChecked = false));
                this.setState({ status: fruites });
            }
        }




    }

    getSupportedCurrency = async () => {
        const response = await DashboardService.getCurrencies()
        if (!response) {
            return
        }
        this.setState({ currencyList: response.supportedCcyList })
    }



    downloadTransactions = async () => {
        this.setState({
            loading: true
        })
        var searchObj = {
            status: this.state.selectedStatuses,
            receiptStartDate: this.state.receiptStartDate,
            receiptEndDate: this.state.receiptEndDate,
            paymentStartDate: this.state.paymentStartDate,
            paymentEndDate: this.state.paymentEndDate,
            requestedCcy: this.state.requestedCcy || this.nullValueIfEmpty(this.state.requestedCcy),
            requestedMinAmount: this.state.requestedMinAmount || this.nullValueIfEmpty(this.state.requestedMinAmount),
            requestedMaxAmount: this.state.requestedMaxAmount || this.nullValueIfEmpty(this.state.requestedMaxAmount),
            paymentMode: this.state.paymentMode || this.nullValueIfEmpty(this.state.paymentMode),
            payerName: this.state.payerName || this.nullValueIfEmpty(this.state.payerName),
            collectionRef: this.state.collectionRef,
            pageSize: this.state.pageSize,
            defaultSearch: false,
            transactionId: this.state.searchedBenePayTransactionId || this.nullValueIfEmpty(this.state.searchedBenePayTransactionId),
            requestorTransactionId: this.state.searchedRequestorTransactionId || this.nullValueIfEmpty(this.state.searchedRequestorTransactionId),
            payerEmail: this.state.payerEmail || this.nullValueIfEmpty(this.state.payerEmail),
            cancellationFromDate: this.state.cancellationFromDate,
            cancellationToDate: this.state.cancellationToDate,
            paidCcy: this.state.paidCcy || this.nullValueIfEmpty(this.state.paidCcy),
            paidMinAmount: this.state.paidMinAmount || this.nullValueIfEmpty(this.state.paidMinAmount),
            paidMaxAmount: this.state.paidMaxAmount || this.nullValueIfEmpty(this.state.paidMaxAmount),
            showAllRecords: false,
        }
        // @todo following date formats need to integrate from generic method
        if (this.state.receiptStartDate) {
            searchObj.receiptStartDate = moment(this.state.receiptStartDate).format('YYYY-MM-DD')
        }
        if (this.state.receiptEndDate) {
            searchObj.receiptEndDate = moment(this.state.receiptEndDate).format('YYYY-MM-DD')
        }
        if (this.state.paymentStartDate) {
            searchObj.paymentStartDate = moment(this.state.paymentStartDate).format('YYYY-MM-DD')
        }
        if (this.state.paymentEndDate) {
            searchObj.paymentEndDate = moment(this.state.paymentEndDate).format('YYYY-MM-DD')
        }
        if (this.state.cancellationFromDate) {
            searchObj.cancellationFromDate = moment(this.state.cancellationFromDate).format('YYYY-MM-DD')
        }
        if (this.state.cancellationToDate) {
            searchObj.cancellationToDate = moment(this.state.cancellationToDate).format('YYYY-MM-DD')
        }

        if (this.state.requestedMinAmount) {
            searchObj.requestedMinAmount = parseInt(this.state.requestedMinAmount)
        }
        if (this.state.requestedMaxAmount) {
            searchObj.requestedMaxAmount = parseInt(this.state.requestedMaxAmount)
        }
        if (this.state.paidMinAmount) {
            searchObj.paidMinAmount = parseInt(this.state.paidMinAmount)
        }
        if (this.state.paidMaxAmount) {
            searchObj.paidMaxAmount = parseInt(this.state.paidMaxAmount)
        }
        if (!searchObj.status.length) {
            searchObj.status = null
        }

        var objFields = Object.keys(searchObj);
        var allFieldsBoolean = false;

        if (!searchObj.status && !searchObj.receiptStartDate && !searchObj.receiptEndDate && !searchObj.paymentStartDate && !searchObj.paymentEndDate && !searchObj.requestedCcy && !searchObj.requestedMinAmount &&
            !searchObj.requestedMaxAmount && !searchObj.paidCcy && !searchObj.paidMinAmount && !searchObj.paidMaxAmount && !searchObj.paymentMode && !searchObj.payerName && !searchObj.collectionRef &&
            !searchObj.requestorTransactionId && !searchObj.transactionId && !searchObj.payerEmail && !searchObj.cancellationFromDate && !searchObj.cancellationToDate) {
            allFieldsBoolean = true;

        }

        if (allFieldsBoolean) {
            searchObj = {}
        }

        const response = await DashboardService.downloadTransactionsReport(searchObj, 'report')
        if (!response) {
            return
        }
        this.setState({
            loading: false
        })
        var blob = this.base64toBlob(response.content, 'text/csv')
        if (window.navigator.msSaveBlob) {
            window.navigator.msSaveOrOpenBlob(blob, response.fileName + '.csv');
        }
        else {
            var a = window.document.createElement("a");
            a.href = window.URL.createObjectURL(blob, { type: "text/plain" });
            a.download = response.fileName + '.csv';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }

    }

    base64toBlob = function (base64Data, contentType) {
        contentType = contentType || '';
        var sliceSize = 1024;
        var byteCharacters = atob(base64Data);
        //var byteCharacters = decodeURIComponent(escape(window.atob(base64Data)))
        var bytesLength = byteCharacters.length;
        var slicesCount = Math.ceil(bytesLength / sliceSize);
        var byteArrays = new Array(slicesCount);

        for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
            var begin = sliceIndex * sliceSize;
            var end = Math.min(begin + sliceSize, bytesLength);

            var bytes = new Array(end - begin);
            for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
                bytes[i] = byteCharacters[offset].charCodeAt(0);
            }
            byteArrays[sliceIndex] = new Uint8Array(bytes);
        }
        return new Blob(byteArrays, { type: contentType });
    }

    getFailedTransactions = async (request) => {
        const response = await DashboardService.getAllFailedTransactions(request);
        this.setState({ loading: false })
        if (!response) {
            return;
        }
        // 
        let totalFailedPages = (response.totalCount / this.state.pageSize);
        this.setState({
            totalFailedPages: Math.ceil(totalFailedPages)
        });
        // 
        // console.log("SUSHMIT PRINTING :", response);
        await this.setState({ failedTransactions: response.list, totalFailedCount: response.totalCount });
        this.pageWiseSorting("Failed")
        // this.clearFailedTransactionForm()
        console.log('failedTransactions ', this.state.failedTransactions);
    }

    componentDidMount = async () => {
        this.setState({ isDeviceMobile: false });
        console.log("this props ", this.props.location.state)
        if (this.props.location.state && this.props.location.state.isSettlementRequested) {
            this.paymentSettlement()
        }
        await Auth.currentSession().then(res => {
            let jwt = res["idToken"]["jwtToken"]
            StorageService.set(StorageKeys.clientJwt, jwt);
        })
        this.getSupportedCurrency()
        this.setState({
            status: [
                { text: 'All', value: "ALL", isChecked: false },
                { text: 'Awaiting Payment', value: "AWAITING_PAYMENT", isChecked: false },
                { text: 'Paid', value: "PAID", isChecked: false },
                { text: 'Refunded', value: "REFUNDED", isChecked: false },
                // { text: 'Partially Refunded', value: "PARTIALLY_REFUNDED", isChecked: false },
                // { text: 'Fully Refunded', value: "FULLY_REFUNDED", isChecked: false },
                { text: 'Expired', value: "EXPIRED", isChecked: false },
                { text: 'Cancelled', value: "CANCELLED", isChecked: false },
                { text: 'Settled', value: "SETTLED", isChecked: false }
            ]
        });

        window.addEventListener('touchstart', (e) => {
            let statusMenu = document.getElementById('statusMenu');
            let creationDateMenu = document.getElementById('creationDateMenu');

            let elementId = e.target.id;
            if (!(elementId === `statusDropDown` || elementId === 'creationDateDropDown')) {
                if (!(e.target.classList.contains('avoidToggle') || Array.from(e.target.classList).some(k => k.startsWith('react-datepicker')))) {
                    try {
                        statusMenu.classList.remove('d-block');
                        creationDateMenu.classList.remove('d-block');
                    } catch {
                        console.log("Classlist is null");
                    }
                }
            }
        })

        if (window.innerWidth < 600) {
            this.setState({ initalPage: 0, isDeviceMobile: true });
            this.processedApply(1);
        }

        // window.addEventListener('resize', () => {
        //     if(window.innerWidth < 600){
        //         this.setState({ initalPage: 0 , isDeviceMobile: true});
        //         this.processedApply(1);
        //     }
        // })

    }

    handlePageChange = (data) => {
        this.setState({ initalPage: data.selected });
        this.setState({ pageNo: data.selected + 1 });
        this.processedApply(data.selected + 1);
    }

    handlePageChangeFailedTransaction = (data) => {
        this.setState({ initalPageFailed: data.selected });
        this.setState({ pageNo: data.selected + 1 });
        this.applyFailedTransactionHandler(data.selected + 1);
    }

    /**
     * @author Ragavan
    * To handle event for the date field when change
    * @param {*} event
    */
    changeDateFormat = (event) => {
        let value = null;

        if (event != null) {
            value = moment(event.toDate()).format("YYYY-MM-DD");
        }

        return value;
    }


    render = () => html.apply(this);
}

export default Home;
