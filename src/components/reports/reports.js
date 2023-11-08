import React, { Component } from 'react';
import { html } from "./reports-html";
import moment from "moment";
import { toast } from 'react-toastify';
import { DashboardService } from '../../service/api/dashboard.service';
import { Pagination } from '../../config/constants';

class Reports extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            isApiCalled : false,
            titleName: 'Reports',
            reportsMenu: true,
            setttlementReports: false,
            settlementReportsStartDate: null,
            settlementReportsEndDate: null,
            allProviders: [],
            allMerchants: [],
            searchedSettlementReportsResult: null,
            validationError: [],
            pageNo: Pagination.pageNo,
            pageSize: Pagination.pageSize,
            numPageShow: Pagination.numPageShow,
            totalPages: Pagination.totalPages,
            initalPage: 0,
            toastTitle: '',
            toastBody: '',
            toastShow: false
        }
    }

    // From Provider

    fromProviderClick = async() => {
        this.clearGeneratedByBenepay();
        this.clearUploadFilePage();
        this.setState({'titleName': 'Settlement Files', initalPage: 0 , pageNo: 1});

        this.handleApplyFromProvider(1);
    }

    clearSettlementReports = () => {
        this.setState(
            {
                settlementReportsStartDate: null,
                settlementReportsEndDate: null,
                settlementReportsMerchantId: null,
                searchedSettlementReportsResult: null
            })
    }

    handleApplySettlementReports = async(paramPageNo) => {
        let defaultSearch = true;

        if(this.state.settlementReportsStartDate || this.state.settlementReportsEndDate){
            defaultSearch = false;
        }

        let searchObj = {
            // startDate: this.state.settlementReportsStartDate,
            startDate: this.state.settlementReportsStartDate,
            endDate: this.state.settlementReportsEndDate,
            pageNo: paramPageNo,
            pageSize: this.state.pageSize,
            defaultSearch: defaultSearch
        }

        if (this.state.settlementReportsStartDate) {
            searchObj.startDate = moment(this.state.settlementReportsStartDate).format('YYYY-MM-DD')
        }
        if (this.state.settlementReportsEndDate) {
            searchObj.endDate = moment(this.state.settlementReportsEndDate).format('YYYY-MM-DD')
        }

        // console.log("searchedSettlementReportsResult:", searchObj);

        this.setState({ isApiCalled: true , loading: true})
        let result = await DashboardService.getSettlementReportResult(searchObj);
        this.setState({ isApiCalled: false , loading: false})
        if (result.data.status === 'FAILED') {
          toast.error(result.data.message)
          return;
        }
        if(result.data.errors.length != 0){
            result.data.errors.forEach(error => {
                toast.error(error.errorMsg)
            });
            return;
        }
        let totalPages = (result.data.totalCount / this.state.pageSize);
        this.setState({
            totalPages: Math.ceil(totalPages)
        });
        await this.setState({ searchedSettlementReportsResult: result.data.reports });

    }

    handlePaginateSettlementReports = async(data) => {
        this.setState({initalPage: data.selected});
        this.setState({ pageNo: data.selected + 1 });
        this.handleApplySettlementReports(data.selected + 1 );
    }

    setToastAndDisplay = async(title, body, show) => {
        await this.setState({
            toastTitle: title,
            toastBody: body,
            toastShow: show
        })
    }

    downloadFromSettlementFile = async (e) => {

        let fileId = e.currentTarget.attributes['fileid'].value;
        this.setState({ isApiCalled: true , loading: true})
        let result = await DashboardService.downloadSettlementReport(fileId);
        this.setState({ isApiCalled: false , loading: false})
        if (result.data.status === 'FAILED') {
          toast.error(result.data.message)
        }else{
          window.open(result.data.preSignedS3Url);
        }
        
    }

    // Default

    async componentDidMount(){

        // this.handleApplySettlementReports(1);

    }

    render = () => html.apply(this);

}

export default Reports;
