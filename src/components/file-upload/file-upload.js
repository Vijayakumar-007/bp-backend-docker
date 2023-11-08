import React, { Component, useState } from 'react'
import { html } from './file-upload.html'
import "./file-upload.scss"
import { CustomerService } from '../../service/api/customer.service'
import { toast } from 'react-toastify'
import { StorageKeys, StorageService } from '../../service/core/storage.service'
import { Auth } from '@aws-amplify/auth';
import color from '@material-ui/core/colors/amber'
import { Pagination } from '../../config/constants'

class fileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentFile: null,
      fileName: '',
      uploadedFiles: [],
      isApiCalled: false,
      validationError: [],
      fileType: [],
      uploadType: 'payment',
      refundErrors: [],
      fileErrorCSVHeaders: [
        {
          label: "File Id",
          key: "refId"
        },
        {
          label: "Input Request",
          key: "inputRequest"
        },
        {
          label: "Error Code",
          key: "errorCode"
        },
        {
          label: "Received Date",
          key: "receivedDate"
        },
        {
          label: "Error Description",
          key: "errorDesc"
        }
      ],
      csvData: {},
      pageNo: Pagination.pageNo,
      pageSize: Pagination.pageSize,
      totalPages: Pagination.totalPages,
      fileRefType: "payment",
      initalPage: 0
    }
  }

  handleChange = (ev) => {
    this.getUploadedFiles(ev.target.value);
    this.setState({ uploadType: ev.target.value })
    console.log(ev.target.value);
  }



  handleClose = () => {
    this.setState({ isFileUploaded: true });
  }

  handleFileChange = async (e) => {
    const files = e.target.files || e.dataTransfer.files
    if (!files.length) {
      return
    }
    console.log(e.target.files)
    await this.setState({ paymentFile: files[0] })
    this.validateFile()
  }

  validateFile = () => {
    const file = this.state.paymentFile;
    const allowedExtensions = ['csv', 'xls', 'xlsx']
    const extension = file.name
      .substr(file.name.lastIndexOf('.') + 1)
      .toLowerCase()
    if ((file.size / 1024 / 1024) > 0.2) {
      toast.info('Please upload file less then 200 KB.')
      return
    }
    if (allowedExtensions.indexOf(extension) === -1) {
      toast.info('Invalid file Format. Only ' + allowedExtensions.join(', ') + ' is allowed.');
      return;
    }

    this.setState({
      fileName: file.name,
    })
    this.uploadFile()
  }

  uploadFile = async () => {
    this.setState({ validationError: [] });
    this.setState({ isApiCalled: true })
    const userEmail = StorageService.get(StorageKeys.userEmail)
    // let file = await this.getBase64FromFile(this.state.paymentFile);
    // file = file.split(',')[1];
    let formData = new FormData();
    formData.append('file', this.state.paymentFile)

    let file = await this.getBase64FromFile(this.state.paymentFile);

    file = file.split(',')[1];
    const req = {
      file,
      userEmail,
      fileName: this.state.fileName
    }

    let result = ''
    console.log(this.state.uploadType + "filetype")
    if (this.state.uploadType.toString().toLowerCase() === 'payment') {
      result = await CustomerService.uploadFile(req)
    }
    else {
      result = await CustomerService.refundFile(req)
      result.data.message = "File has been Successfully Uploaded"
    }

    this.setState({ paymentFile: null })
    this.setState({ isApiCalled: false })
    if (result.data.status === 'FAILED' || result.data.errorCode) {
      toast.error(result.data.message || result.data.errorDescription)
      return;
    }
    if (result.data.validationError) {
      toast.error("File Upload Failed!");
      await this.setState({ validationError: result.data.validationError })
      console.log("this.state.validation error ", this.state.validationError);
    }
    
    if(result.data && result.data.message){
      toast.success("File upload successful")
    }
    
    this.getUploadedFiles(this.state.uploadType, this.state.pageNo)
  }

  downloadErrorListInCsv = async (fileId) => {
    console.log("file Id ", fileId)
    const csvData = {
      filename: `refund-errors-${fileId}`,
      headers: this.state.fileErrorCSVHeaders,
      data: this.state.refundErrors
    }
    await this.setState({ csvData })
    console.log("csv data ", this.state.csvData);
  }

  getErrorList = async (fileId) => {
    this.setState({ isApiCalled: true })
    console.log("file id ", fileId)
    const response = await CustomerService.fetchErrorSummaryList(fileId)
    this.setState({ isApiCalled: false })
    console.log("response ", response.data.rejectedTransactionList)
    if (response && response.data && response.data.rejectedTransactionList) {
      this.setState({ refundErrors: response.data.rejectedTransactionList })
      this.downloadErrorListInCsv(fileId)
    }
  }

  clearError = () => {
    this.setState({ validationError: [] });
  }

  getBase64FromFile = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  getUploadedFiles = async (fileType, paramPageNo) => {

    if(fileType != this.state.fileRefType){
      this.setState({initalPage: 0});
      paramPageNo = 1;
    }
  
    this.setState({ isApiCalled: true , fileRefType: fileType })
    console.log("file Type ", fileType)
    const result = await CustomerService.getUploadedFilesList(fileType, paramPageNo , this.state.pageSize)
    this.setState({ isApiCalled: false })
    if (result.data.status === 'FAILED') {
      toast.error(result.data.message)
      return;
    }
    if (result.data.files && result.data.files.length > 0) {
      result.data.files.map(res => {
        let tempDate = res.creationDate
        res.creationDate = `${tempDate.dayOfMonth.toString().padStart(2, "0")}-${tempDate.month.toString()}-${tempDate.year} ${tempDate.hour}:${tempDate.minute}:${tempDate.second.toString().padStart(2, "0")}`
      })
      result.data.files.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate))
    }
    // console.log("SUSHMIT PRINTITNG :", result.data);
    let totalPages = (result.data.totalCount / this.state.pageSize);
    this.setState({
        totalPages: Math.ceil(totalPages)
    });
    await this.setState({ uploadedFiles: result.data.files })
  }

  handlePageChangePayment = async (data) => {
    this.setState({initalPage: data.selected});
    this.setState({ pageNo: data.selected + 1 });
    // console.log("Trying to print: ",this.state.fileRefType);
    this.getUploadedFiles(this.state.fileRefType , data.selected + 1 );
  }

  downloadPaymentFileResponse = async (fileId) => {
    this.setState({ isApiCalled: true })
    const response = await CustomerService.fetchPaymentFileResponse(fileId);
    this.setState({ isApiCalled: false })
    if (!response) {
      return;
    }
    if (response.data && response.data['Error Code'] && response.data['Error Code'].includes('500')) {
      toast.error('File does not exist!');
      return;
    }
    const blob = this.base64toBlob(response.data.content, 'text/csv');
    if (window.navigator.msSaveBlob) {
      window.navigator.msSaveOrOpenBlob(blob, response.data.fileName + '.csv');
    } else {
      var a = window.document.createElement("a");
      a.href = window.URL.createObjectURL(blob, { type: "text/plain" });
      a.download = response.data.fileName
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
    console.log("payment response ", response);
  }

  base64toBlob = function (base64Data, contentType) {
    contentType = contentType || '';
    var sliceSize = 1024;
    var byteCharacters = atob(base64Data);
    // var byteCharacters = decodeURIComponent(escape(window.atob(base64Data)))
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

  //   async downloadPaymentFileResponse(fileId) {
  //     const download = await CustomerService.fetchPaymentFileResponse(fileId);
  //     const url = window.URL.createObjectURL(new Blob([download]));
  //     console.log("url ", url)
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.setAttribute('download', fileId.split('/')[3]); //or any other extension
  //     console.log(fileId)
  //     document.body.appendChild(link);
  //     link.click();
  // }

  componentDidMount = async () => {
    await Auth.currentSession().then(res => {
      console.log("Res ", res);
      let jwt = res["idToken"]["jwtToken"]
      StorageService.set(StorageKeys.clientJwt, jwt);
    })
    this.getUploadedFiles(this.state.uploadType, 1)
  }

  render = () => html.apply(this)

}
export default fileUpload