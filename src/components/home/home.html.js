import React from "react";
import "./home.scss";
import ReactPaginate from 'react-paginate';
import TitleBar from "../title-bar/title-bar";
import { toast } from 'react-toastify';
import {
  ButtonPrimary,
  ButtonSecondary,
} from "../$widgets/buttons/form-button";
import { red } from "@material-ui/core/colors";
import { CircularProgress } from "@material-ui/core";
import {
  Card,
  CardContent,
  Box,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Grid,
  TextField,
  NativeSelect,
  MenuItem,
  InputBase,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableContainer,
  Paper,
} from "@mui/material";
// import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { styled } from "@mui/material/styles";
import ConfirmDialog from "../$widgets/dialog";
import Backdrop from "@mui/material/Backdrop";
import HelpIcon from "@material-ui/icons/Help";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import UndoIcon from '@material-ui/icons/Replay';
import CancelIcon from '@material-ui/icons/Cancel';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { config } from '../../config/config';
import moment from "moment";
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import { borderRadius } from "@material-ui/system";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { nodeName } from "jquery";
import { position } from "dom-helpers/query";
import MuiDatePicker from "../$widgets/form-inputs/DatePicker";
import dayjs from "dayjs";


export function html() {


  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    "label + &": {
      marginTop: theme.spacing(3),
    },
    "& .MuiInputBase-input": {
      borderRadius: 4,
      position: "relative",
      border: "1px solid #ced4da",
      fontSize: 14,
      minWidth: "100%",
      padding: "10px 26px 10px 5px",
    },
  }));
  const {
    showValidationMsg,
    selectedOption,
    showFailureModal,
    paymentDetails,
    showProcessedTable,
    showModal,
    showCancellationModal,
    showConfirmationModal,
    showCancellationReason,
    paymentId,
    isError,
    status,
    apply1Click,
    apply2Click,
    list1Style,
    value,
    rejectedTableShow,
    totalPaymentsFound,
    paymentSettlementModel,
    loading,
    refundLoading,
    isRowVisible,
    selectedItem,
    currentIndex,
    cancellationReason,
    isCancellationProcessing,
    failedAttemptStartDate,
    failedAttemptEndDate,
    benepayPaymentRef,
    collectionReference,
    toAmount,
    fromAmount,
    failedTransactions,
    payerEmail,
    requestorTransactionId,
    settlementDate,
    refundCount,
    receiptStartDate,
    receiptEndDate,
    paymentStartDate,
    paymentEndDate,
    rejectedReceiptStartDate,
    rejectedReceiptEndDate,
    totalPages,
    totalFailedPages,
    searchedBenePayTransactionId,
    searchedRequestorTransactionId,
    searchedPayerEmail,
    payerName,
    collectionRef,
    cancellationFromDate,
    cancellationToDate,
    paidAmountCcy,
    paidMinAmount,
    paidMaxAmount,
    totalFailedCount,
    copyText,
    showReminderModal,
    transactionIdForReminder,
    isDeviceMobile
  } = this.state;
  const { } = this.props;
  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };
  return (
    <div className={"home-main position-relative"}>
      <div id="desktopScreen">
        {loading && (
          <div id="semiTransparenDiv"></div>)}
        {/* <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
          onClick={this.handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop> */}
        {true && (
          <Box mt={4}>
            <TitleBar
              className={"mt-3"}
              color="blue"
              ruleColor="blue"
              title={"Transaction Summary"}
            />

            <Box mt={1}>
              <Card className="pb-5 pt-2 px-3">
                <CardContent>
                  <ul
                    style={{
                      borderBottom: "1px solid #ddd",
                      padding: "5px",
                      width: "100%",
                      marginTop: "-11px",
                      paddingBottom: '20px',
                      display: 'flex',
                      justifyContent: 'flex-start'
                    }}
                    className="nav nav-pills mb-3"
                    id="pills-tab"
                    role="tablist"
                  >
                    <li className="nav-item" role="presentation">
                      <a
                        style={{ padding: '8px 20px' }}
                        className="nav-link active"
                        onClick={this.processedClick}
                        id="pills-processed-by-benepay-tab"
                        data-toggle="pill"
                        href="#pills-processed-by-benepay"
                        role="tab"
                        aria-controls="pills-home"
                        aria-selected="true"
                      >
                        Transactions & Refunds
                      </a>
                    </li>
                    <li className="nav-item" role="presentation">
                      <a
                        style={{ padding: '8px 20px' }}
                        className="nav-link"
                        onClick={this.failedPaymentNavigationHandler}
                        id="pills-processed-by-benepay-tab"
                        data-toggle="pill"
                        href="#pills-failed-payment-attempts"
                        role="tab"
                        aria-controls="pills-failed-payments"
                        aria-selected="true"
                      >
                        Failed Payment Attempts
                      </a>
                    </li>
                    {/* <li className="nav-item" role="presentation">
                    <a
                      style={{
                        padding: '8px 20px',
                        marginLeft: "2px",
                      }}
                      className="nav-link"
                      onClick={this.rejectedClick}
                      id="pills-profile-tab"
                      data-toggle="pill"
                      href="#pills-profile"
                      role="tab"
                      aria-controls="pills-profile"
                      aria-selected="false"
                    >
                      Rejected Files
                    </a>
                  </li> */}
                  </ul>

                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="pills-processed-by-benepay"
                      role="tabpanel"
                      aria-labelledby="pills-processed-by-benepay-tab"
                    >
                      {/* <Grid container style={{ marginTop: "-20px" }}> */}
                      <div className="">
                        <span className="mb-2" style={{ marginTop: "10px", position: "relative", bottom: "8px" }}>
                          {/* <p>Status</p> */}
                        </span>
                        {false && <div className="status-">
                          <ul
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              listStyleType: "none",
                              marginLeft: "80px",
                            }}
                          >
                            {/* {
                                                        status.map((item, index) => {
                                                            return (
                                                                <li key={index}>
                                                                    <FormGroup>
                                                                        <FormControlLabel control={<Checkbox name={item} checked={this.state.checkedStatuses.get(item)} onChange={this.handleStatusChange} key={index} />} label={item} />
                                                                    </FormGroup>
                                                                </li>
                                                            )
                                                        })} */}

                            {status.map((item) => (
                              <li className="pr-2" key={item.text}>
                                <label
                                  key={item.text}
                                  className="d-flex align-items-center cursor-pointer"
                                >
                                  <input
                                    checked={item.isChecked}
                                    style={{
                                      margin: "2px",
                                      borderRadius: "4px",
                                      height: "15px",
                                      width: "15px",
                                      cursor: "pointer",
                                      marginRight: '5px'
                                    }}
                                    type="checkbox"
                                    name={item.value}
                                    value={item}
                                    onChange={this.handleStatusChange}
                                  />
                                  {item.text}
                                </label>
                              </li>
                            ))}
                          </ul>
                        </div>
                        }
                      </div>
                      {/* </Grid> */}
                      {false && <Grid container style={{ marginTop: "-30px" }}>
                        <Grid item xs={3} md={7}>
                          <Grid container>
                            <Grid item xs={3}>
                              <p className="mb-0 h-100 d-flex align-items-center">
                                Create Date
                              </p>
                            </Grid>
                            <Grid item xs={3} md={8}>
                              <Grid container>
                                <Grid item xs={12} md={5}>
                                  {/* <LocalizationProvider
                                  dateAdapter={AdapterDateFns}
                                  adapterLocale="en"
                                >
                                  <input
                                    style={{
                                      marginLeft: "2px",
                                      height: "40px",
                                      width: '100%',
                                      padding: "5px",
                                      border: '1px solid #c4c4c4',
                                      borderRadius: '5px'
                                    }}
                                    type="date"
                                    onChange={(e) =>
                                      this.setState({
                                        receiptStartDate: e.target.value,
                                      })
                                    }
                                    value={this.state.receiptStartDate}
                                  />
                                </LocalizationProvider> */}
                                  <DatePicker style={{ width: '100%' }} selected={receiptStartDate} placeholderText="dd-MMM-yyyy" dateFormat="dd-MMM-yyyy" onChange={(date) =>
                                    this.setState({
                                      receiptStartDate: date,
                                    })
                                  } />
                                </Grid>

                                <Grid
                                  item
                                  xs={12}
                                  md={5}
                                  className="mt-3 mt-md-0 ml-md-2"
                                >
                                  {/* <LocalizationProvider
                                  dateAdapter={AdapterDateFns}
                                >
                                  <input
                                    style={{
                                      marginLeft: "2px",
                                      height: "40px",
                                      width: '100%',
                                      padding: "5px",
                                      border: '1px solid #c4c4c4',
                                      borderRadius: '5px'
                                    }}
                                    type="date"
                                    onChange={(e) =>
                                      this.setState({
                                        receiptEndDate: e.target.value,
                                      })
                                    }
                                    value={this.state.receiptEndDate}
                                  />
                                </LocalizationProvider> */}
                                  <DatePicker style={{ width: '100%' }} selected={receiptEndDate} placeholderText="dd-MMM-yyyy" dateFormat="dd-MMM-yyyy" onChange={(date) =>
                                    this.setState({
                                      receiptEndDate: date,
                                    })
                                  } />
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>

                          <Grid container className="mt-4">
                            <Grid item xs={3}>
                              <p className="mb-0 h-100 d-flex align-items-center">
                                Payment Date
                              </p>
                            </Grid>
                            <Grid item xs={7} md={8}>
                              <Grid container>
                                <Grid item xs={12} md={5}>
                                  {/* <LocalizationProvider
                                  dateAdapter={AdapterDateFns}
                                >
                                  <input
                                    style={{
                                      marginLeft: "2px",
                                      height: "40px",
                                      width: '100%',
                                      padding: "5px",
                                      border: '1px solid #c4c4c4',
                                      borderRadius: '5px'
                                    }}
                                    type="date"
                                    onChange={(e) =>
                                      this.setState({
                                        paymentStartDate: e.target.value,
                                      })
                                    }
                                    value={this.state.paymentStartDate}
                                  />
                                </LocalizationProvider> */}
                                  <DatePicker style={{ width: '100%' }} selected={paymentStartDate} placeholderText="dd-MMM-yyyy" dateFormat="dd-MMM-yyyy" onChange={(date) =>
                                    this.setState({
                                      paymentStartDate: date,
                                    })
                                  } />
                                </Grid>

                                <Grid
                                  item
                                  xs={12}
                                  md={5}
                                  className="mt-3 mt-md-0 ml-md-2"
                                >
                                  {/* <LocalizationProvider
                                  dateAdapter={AdapterDateFns}
                                >
                                  <input
                                    style={{
                                      marginLeft: "2px",
                                      height: "40px",
                                      width: '100%',
                                      padding: "5px",
                                      border: '1px solid #c4c4c4',
                                      borderRadius: '5px'
                                    }}
                                    type="date"
                                    onChange={(e) =>
                                      this.setState({
                                        paymentEndDate: e.target.value,
                                      })
                                    }
                                    value={this.state.paymentEndDate}
                                  />
                                </LocalizationProvider> */}
                                  <DatePicker style={{ width: '100%' }} selected={paymentEndDate} placeholderText="dd-MMM-yyyy" dateFormat="dd-MMM-yyyy" onChange={(date) =>
                                    this.setState({
                                      paymentEndDate: date,
                                    })
                                  } />
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>

                          <Grid container className="mt-4">
                            <Grid item xs={3}>
                              <p className="mb-0 h-100 d-flex align-items-center">
                                Instructed Amount
                              </p>
                            </Grid>
                            <Grid item xs={7} md={8}>
                              <Grid container className="ml-2 ml-md-0">
                                <Grid item xs={12} md={2}>
                                  <NativeSelect
                                    outlined={"true"}
                                    onChange={(e) =>
                                      this.setState({
                                        requestedCcy: e.target.value,
                                      })
                                    }
                                    value={this.state.requestedCcy}
                                    input={<BootstrapInput />}
                                  >
                                    <option>-Ccy-</option>
                                    {this.state.currencyList &&
                                      this.state.currencyList.map((team) => (
                                        <option key={team} value={team}>
                                          {team}
                                        </option>
                                      ))}
                                  </NativeSelect>
                                </Grid>

                                <Grid
                                  item
                                  xs={12}
                                  md={4}
                                  className="mt-3 mt-md-0 ml-md-2"
                                >
                                  <input type="number" placeholder="Min" className="form-control" value={this.state.instructedAmountMin} onChange={(e) =>
                                    this.setState({
                                      instructedAmountMin: e.target.value,
                                    })
                                  } />
                                  {/* <TextField
                                  type={"number"}
                                  label="Min"
                                  size="small"
                                  onChange={(e) =>
                                    this.setState({
                                      instructedAmountMin: e.target.value,
                                    })
                                  }
                                  style={{ width: "100%" }}
                                  value={this.state.instructedAmountMin}
                                /> */}
                                </Grid>
                                <Grid
                                  item
                                  xs={12}
                                  md={4}
                                  className="mt-3 mt-md-0 ml-md-2"
                                >
                                  <input type="number" placeholder="Max" className="form-control" value={this.state.instructedAmountMax} onChange={(e) =>
                                    this.setState({
                                      instructedAmountMax: e.target.value,
                                    })
                                  } />
                                  {/* <TextField
                                  type={"number"}
                                  label="Max"
                                  size="small"
                                  onChange={(e) =>
                                    this.setState({
                                      instructedAmountMax: e.target.value,
                                    })
                                  }
                                  style={{ width: "100%" }}
                                  value={this.state.instructedAmountMax}
                                /> */}
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>

                          <Grid container className="mt-4">
                            <Grid item xs={3}>
                              <p className="mb-0 h-100 d-flex align-items-center">
                                Payment Amount
                              </p>
                            </Grid>
                            <Grid item xs={7} md={8}>
                              <Grid container className="ml-2 ml-md-0">
                                <Grid item xs={12} md={2}>
                                  <NativeSelect
                                    outlined={"true"}
                                    onChange={(e) =>
                                      this.setState({
                                        paymentAmountCcy: e.target.value,
                                      })
                                    }
                                    value={this.state.paymentAmountCcy}
                                    input={<BootstrapInput />}
                                  >
                                    <option>-Ccy-</option>
                                    {this.state.currencyList &&
                                      this.state.currencyList.map((team) => (
                                        <option key={team} value={team}>
                                          {team}
                                        </option>
                                      ))}
                                  </NativeSelect>
                                </Grid>
                                <Grid
                                  item
                                  xs={12}
                                  md={4}
                                  className="mt-3 mt-md-0 ml-md-2"
                                >
                                  {/* <TextField
                                  type={"number"}
                                  label="Min"
                                  size="small"
                                  style={{ width: "100%" }}
                                  onChange={(e) =>
                                    this.setState({
                                      paymentAmountMin: e.target.value,
                                    })
                                  }
                                  value={this.state.paymentAmountMin}
                                /> */}
                                  <input type="number" placeholder="Min" className="form-control" value={this.state.paymentAmountMin} onChange={(e) =>
                                    this.setState({
                                      paymentAmountMin: e.target.value,
                                    })
                                  } />
                                </Grid>
                                <Grid
                                  item
                                  xs={12}
                                  md={4}
                                  className="mt-3 mt-md-0 ml-md-2"
                                >
                                  <input type="number" placeholder="Max" className="form-control" value={this.state.paymentAmountMax} onChange={(e) =>
                                    this.setState({
                                      paymentAmountMax: e.target.value,
                                    })
                                  } />
                                  {/* <TextField
                                  type={"number"}
                                  label="Max"
                                  size="small"
                                  style={{ width: "100%" }}
                                  onChange={(e) =>
                                    this.setState({
                                      paymentAmountMax: e.target.value,
                                    })
                                  }
                                  value={this.state.paymentAmountMax}
                                /> */}

                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} md={4} className="mt-3 mt-md-0">
                          {/* <Grid container>
                          <Grid item xs={4}>
                            <p className="mb-0 h-100 d-flex align-items-center">
                              Payment Mode
                            </p>
                          </Grid>
                          <Grid item xs={7} className="ml-2 ml-md-0">
                            <NativeSelect
                              className="payment-mode"
                              outlined={"true"}
                              onChange={(e) =>
                                this.setState({ paymentMode: e.target.value })
                              }
                              value={this.state.paymentMode}
                              input={<BootstrapInput />}
                            >
                              <option>-Select one-</option>
                              <option>Card</option>
                              <option>Bank</option>
                            </NativeSelect>
                          </Grid>
                        </Grid> */}

                          <Grid container>
                            <Grid item xs={4}>
                              <p className="mb-0 h-100 d-flex align-items-center">
                                Payer Name
                              </p>
                            </Grid>
                            <Grid item xs={7} className="ml-2 ml-md-0">
                              <input type="text" className="form-control" value={this.state.payerName} onChange={(e) =>
                                this.setState({ payerName: e.target.value })
                              } />
                              {/* <TextField
                              type={"text"}
                              label=""
                              size="small"
                              style={{ width: "100%" }}
                            /> */}
                            </Grid>
                          </Grid>

                          <Grid container className="mt-4">
                            <Grid item xs={4}>
                              <p className="mb-0 h-100 d-flex align-items-center">
                                Collection Ref
                              </p>
                            </Grid>
                            <Grid item xs={7} className="ml-2 ml-md-0">
                              <input type="text" className="form-control" value={this.state.collectionRef} onChange={(e) =>
                                this.setState({ collectionRef: e.target.value })
                              } />
                              {/* <TextField
                              type={"text"}
                              label=""
                              size="small"
                              style={{ width: "100%" }}
                              onChange={(e) =>
                                this.setState({ collectionRef: e.target.value })
                              }
                              value={this.state.collectionRef}
                            /> */}

                            </Grid>
                          </Grid>

                          <Grid container className="mt-4">
                            <Grid item xs={4}>
                              <p className="mb-0 h-100 d-flex align-items-center">
                                Requestor Transaction Id
                              </p>
                            </Grid>
                            <Grid item xs={7} className="ml-2 ml-md-0">
                              <input type="text" className="form-control" value={this.state.requestorTransactionId} onChange={(e) =>
                                this.setState({ requestorTransactionId: e.target.value })
                              } />
                              {/* <TextField
                              type={"text"}
                              label=""
                              size="small"
                              style={{ width: "100%" }}
                              onChange={(e) =>
                                this.setState({ requestorTransactionId: e.target.value })
                              }
                              value={this.state.requestorTransactionId}
                            /> */}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>}

                      {/*Start of author Ragavan */}
                      {/* modified the transaction search screen */}
                      <div className="transaction-status">
                        <div className="mb-2">
                          <label htmlFor="status" style={{ fontSize: '16px', fontWeight: '600' }}>Transaction Status</label>
                        </div>
                        <ul
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            listStyleType: "none",
                            paddingLeft: 0
                          }}
                        >
                          {/* {
                                                        status.map((item, index) => {
                                                            return (
                                                                <li key={index}>
                                                                    <FormGroup>
                                                                        <FormControlLabel control={<Checkbox name={item} checked={this.state.checkedStatuses.get(item)} onChange={this.handleStatusChange} key={index} />} label={item} />
                                                                    </FormGroup>
                                                                </li>
                                                            )
                                                        })} */}

                        {status.map((item) => (
                          <li className="pr-2" key={item.text}>
                            <label
                              key={item.text}
                              className="d-flex align-items-center cursor-pointer"
                            >
                              <input
                                checked={item.isChecked}
                                style={{
                                  margin: "2px",
                                  borderRadius: "4px",
                                  height: "15px",
                                  width: "15px",
                                  cursor: "pointer",
                                  marginRight: '5px'
                                }}
                                type="checkbox"
                                name={item.value}
                                value={item}
                                onChange={this.handleStatusChange}
                              />
                              {item.text}
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Grid container mt={1} spacing={2}>
                      <Grid item xs={12} md={4} xl={2}>
                        <label
                          htmlFor="PayerEmail"
                          className="py-1"
                          style={{ fontWeight: '500',whiteSpace: 'nowrap' }}
                        >
                          BenePay Transaction Id
                        </label>
                        <input type="text" className="form-control" value={searchedBenePayTransactionId} onChange={(e) =>
                          this.setState({ searchedBenePayTransactionId: e.target.value })
                        } />
                      </Grid>
                      <Grid item xs={12} md={4} xl={2}>
                        <label
                          htmlFor="PayerEmail"
                          className="py-1"
                          style={{ fontWeight: '500', whiteSpace: 'nowrap' }}
                        >
                          Requestor Transaction Id
                        </label>
                        <input type="text" className="form-control" value={searchedRequestorTransactionId} onChange={(e) =>
                          this.setState({ searchedRequestorTransactionId: e.target.value })
                        } />
                      </Grid>
                      <Grid item xs={12} md={4} xl={2}>
                        <label
                          htmlFor="PayerEmail"
                          className="py-1"
                          style={{ fontWeight: '500' }}
                        >
                          Payer Email
                        </label>
                        <input type="text" className="form-control" value={payerEmail} onChange={(e) =>
                          this.setState({ payerEmail: e.target.value })
                        } />
                      </Grid>
                      <Grid item xs={12} md={4} xl={2}>
                        <label
                          htmlFor="PayerEmail"
                          className="py-1"
                          style={{ fontWeight: '500' }}
                        >
                          Payer Name
                        </label>
                        <input type="text" className="form-control" value={payerName} onChange={(e) =>
                          this.setState({ payerName: e.target.value })
                        } />
                      </Grid>
                      <Grid item xs={12} md={4} xl={2}>
                        <label
                          htmlFor="PayerEmail"
                          className="py-1"
                          style={{ fontWeight: '500' }}
                        >
                          Collection Reference
                        </label>
                        <input type="text" className="form-control" value={collectionRef} onChange={(e) =>
                          this.setState({ collectionRef: e.target.value })
                        } />
                      </Grid>
                    </Grid>

                    <Grid container className="mt-4" columnGap={3} columns={{ xs: 4, md: 12 }}>
                      <Grid item xs={3.2}>
                        <label
                          className="py-1"
                          style={{ fontWeight: '500' }}
                        >
                          Create Date
                        </label>
                        <Grid container spacing={2}>
                          <Grid item xs={6} >
                            <MuiDatePicker
                              name="CreatedStartDate"
                              placeholder="From"
                              value={receiptStartDate ? dayjs(receiptStartDate) : null}
                              format='DD/MM/YYYY'
                              onChange={(e) => {
                                let value = this.changeDateFormat(e);
                                this.setState({ receiptStartDate: value })
                              }}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <MuiDatePicker
                              name="CreatedEndDate"
                              placeholder="To"
                              value={receiptEndDate ? dayjs(receiptEndDate) : null}
                              format='DD/MM/YYYY'
                              onChange={(e) => {
                                let value = this.changeDateFormat(e);
                                this.setState({ receiptEndDate: value })
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item xs={3.2}>
                        <label
                          className="py-1"
                          style={{ fontWeight: '500' }}
                        >
                          Payment Date
                        </label>
                        <Grid container spacing={2}>
                          <Grid item xs={6} >
                            <MuiDatePicker
                              name="PaymentStartDate"
                              placeholder="From"
                              value={paymentStartDate}
                              format='DD/MM/YYYY'
                              onChange={(e) => {
                                if (e === null) {
                                  this.setState({ paymentStartDate: null });
                                } else {
                                  const formattedPaymentStartDate = e.toString();
                                  this.setState({ paymentStartDate: formattedPaymentStartDate })
                                }
                              }}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <MuiDatePicker
                              name="PaymentEndDate"
                              placeholder="To"
                              value={paymentEndDate}
                              format='DD/MM/YYYY'
                              onChange={(e) => {
                                if (e === null) {
                                  this.setState({ paymentEndDate: null });
                                } else {
                                  const formattedPaymentEndDate = e.toString();
                                  this.setState({ paymentEndDate: formattedPaymentEndDate })
                                }
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item xs={3.2}>
                        <label
                          className="py-1"
                          style={{ fontWeight: '500' }}
                        >
                          Cancellation Date
                        </label>
                        <Grid container spacing={2}>
                          <Grid item xs={6} >
                            <MuiDatePicker
                              name="CancellationStartDate"
                              placeholder="From"
                              value={cancellationFromDate}
                              format='DD/MM/YYYY'
                              onChange={(e) => {
                                if (e === null) {
                                  this.setState({ cancellationFromDate: null });
                                } else {
                                  const formattedCancellationStartDate = e.toString();
                                  this.setState({ cancellationFromDate: formattedCancellationStartDate })
                                }
                              }}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <MuiDatePicker
                              name="CancellationEndDate"
                              placeholder="To"
                              value={cancellationToDate}
                              format='DD/MM/YYYY'
                              onChange={(e) => {
                                if (e === null) {
                                  this.setState({ cancellationToDate: null });
                                } else {
                                  const formattedCancellationEndDate = e.toString();
                                  this.setState({ cancellationToDate: formattedCancellationEndDate })
                                }
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid container className="mt-1" spacing={3} columns={{ xs: 4, md: 12 }}>
                      <Grid item xs={4}>
                        <label
                          htmlFor="PayerEmail"
                          className="py-1"
                          style={{ fontWeight: '500' }}
                        >
                          Requested Amount
                        </label>
                        <Grid container spacing={1} rowGap={2}>
                          <Grid item xs={4} >
                            <select
                              id="requestedCcySelect"
                              className="form-control"
                              onChange={(e) =>
                                this.setState({
                                  requestedCcy: e.target.value != "Currency" ? e.target.value : null,
                                })
                              }
                            >
                              <option>Currency</option>
                              {this.state.currencyList &&
                                this.state.currencyList.map((currency) => (
                                  <option key={currency} value={currency}>
                                    {currency}
                                  </option>
                                ))}
                            </select>
                          </Grid>
                          <Grid item xs={4}>
                            <input type="number" placeholder="From" className="form-control" value={this.state.requestedMinAmount} onChange={(e) =>
                              this.setState({
                                requestedMinAmount: e.target.value,
                              })
                            } />
                          </Grid>
                          <Grid item xs={4}>
                            <input type="number" placeholder="To" className="form-control" value={this.state.requestedMaxAmount} onChange={(e) =>
                              this.setState({
                                requestedMaxAmount: e.target.value,
                              })
                            } />
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item xs={4}>
                        <label
                          htmlFor="PayerEmail"
                          className="py-1"
                          style={{ fontWeight: '500' }}
                        >
                          Paid Amount
                        </label>
                        <Grid container spacing={1} rowGap={2}>
                          <Grid item xs={4}>
                            <select
                              id="paidCcySelect"
                              className="form-control"
                              onChange={(e) =>
                                this.setState({
                                  paidCcy: e.target.value != "Currency" ? e.target.value : null,
                                })
                              }
                            >
                              <option>Currency</option>
                              {this.state.currencyList &&
                                this.state.currencyList.map((currency) => (
                                  <option key={currency} value={currency}>
                                    {currency}
                                  </option>
                                ))}
                            </select>
                          </Grid>
                          <Grid item xs={4}>
                            <input type="number" placeholder="From" className="form-control" value={paidMinAmount} onChange={(e) =>
                                this.setState({
                                  paidMinAmount: e.target.value,
                                })
                              } />
                            </Grid>
                            <Grid item xs={4}>
                              <input type="number" placeholder="To" className="form-control" value={paidMaxAmount} onChange={(e) =>
                                this.setState({
                                  paidMaxAmount: e.target.value,
                                })
                              } />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      {/* End of author ragavan */}

                      <div className="search-transaction-form d-flex mt-4">
                        {/* <div className="create-date d-flex flex-column w-33">
                        <label htmlFor="createDate">Create Date</label>
                        <div className="d-flex">
                          <DatePicker className="form-control" selected={receiptStartDate} placeholderText="From" dateFormat="dd-MMM-yyyy" onChange={(date) =>
                            this.setState({
                              receiptStartDate: date,
                            })
                          } />
                          <DatePicker className="form-control" selected={receiptEndDate} placeholderText="To" dateFormat="dd-MMM-yyyy" onChange={(date) =>
                            this.setState({
                              receiptEndDate: date,
                            })
                          } />
                        </div>
                      </div>
                      <div className="create-date d-flex flex-column w-33">
                        <label htmlFor="createDate">Payment Date</label>
                        <div className="d-flex">
                          <DatePicker className="form-control" selected={paymentStartDate} placeholderText="From" dateFormat="dd-MMM-yyyy" onChange={(date) =>
                            this.setState({
                              paymentStartDate: date,
                            })
                          } />
                          <DatePicker className="form-control" selected={paymentEndDate} placeholderText="To" dateFormat="dd-MMM-yyyy" onChange={(date) =>
                            this.setState({
                              paymentEndDate: date,
                            })
                          } />
                        </div>
                      </div>
                      <div className="create-date d-flex flex-column w-33">
                        <label htmlFor="createDate">Payer Name</label>
                        <div className="d-flex">
                          <input type="text" className="form-control" value={this.state.payerName} onChange={(e) =>
                            this.setState({ payerName: e.target.value })
                          } />
                        </div>
                      </div>
                      <div className="create-date d-flex flex-column">
                        <label htmlFor="createDate">Create Date</label>
                      </div> */}
                      </div>
                      <div className="d-flex mt-4">
                        {/* <div className="instructedAmount d-flex flex-column w-33">
                        <label htmlFor="instructedAmount">Requested Amount</label>
                        <div className="d-flex">
                          <select
                            className="form-control ccy-input w-33"
                            onChange={(e) =>
                              this.setState({
                                instructedAmountCcy: e.target.value,
                              })
                            }
                          >
                            <option>Currency</option>
                            {this.state.currencyList &&
                              this.state.currencyList.map((currency) => (
                                <option key={currency} value={currency}>
                                  {currency}
                                </option>
                              ))}
                          </select>
                          <input type="text" placeholder="From" className="form-control search-input" value={this.state.instructedAmountMin} onChange={(e) =>
                            this.setState({
                              instructedAmountMin: e.target.value,
                            })
                          } />
                          <input type="text" placeholder="To" className="form-control search-input" value={this.state.instructedAmountMax} onChange={(e) =>
                            this.setState({
                              instructedAmountMax: e.target.value,
                            })
                          } />
                        </div>
                      </div> */}

                        {/* <div className="paymentAmountInput d-flex flex-column w-33">
                        <label htmlFor="paymentAmount">Payment Amount</label>
                        <div className="d-flex">
                        <select
                                  className="form-control ccy-input w-33"
                                  onChange={(e) =>
                                    this.setState({
                                      paymentAmountCcy: e.target.value,
                                    })
                                  }
                                  value={this.state.paymentAmountCcy}
                                >
                                  <option>-Ccy-</option>
                                  {this.state.currencyList &&
                                    this.state.currencyList.map((currency) => (
                                      <option key={currency} value={currency}>
                                        {currency}
                                      </option>
                                    ))}
                          </select>
                          <input type="text" placeholder="Min" className="form-control search-input" value={this.state.paymentAmountMin} onChange={(e) =>
                                    this.setState({
                                      paymentAmountMin: e.target.value,
                                    })
                              }/>
                          <input type="text" placeholder="Max" className="form-control search-input" value={this.state.paymentAmountMax} onChange={(e) =>
                                    this.setState({
                                      paymentAmountMax: e.target.value,
                                    })
                              }/>
                        </div>
                      </div> */}
                        {/* <div className="paymentAmountInput d-flex flex-column w-30">
                        <label htmlFor="paymentAmount">Collection Ref</label>
                        <input type="text" className="form-control" value={this.state.collectionRef} onChange={(e) =>
                          this.setState({ collectionRef: e.target.value })} />
                      </div> */}
                        {/* <div className="requestorTransactionIdInput d-flex flex-column w-33 ">
                        <label htmlFor="paymentAmount">Requestor Transaction Id</label>
                        <input type="text" className="form-control" value={this.state.requestorTransactionId} onChange={(e) =>
                          this.setState({ requestorTransactionId: e.target.value })
                        } />
                      </div> */}
                      </div>
                      <div className="d-flex justify-content-start mr-5">
                        <span style={{ marginRight: "60px" }}>
                          {/* <ButtonPrimary onClick={this.paymentSettlement}>
                            Settlement
                          </ButtonPrimary> */}
                          <ButtonPrimary
                            onClick={this.handleApplyClickPaymentSettlement}
                            style={{ marginLeft: "5px" }}
                          >
                            Apply
                          </ButtonPrimary>
                          <ButtonSecondary
                            onClick={this.clearProcessedDetails}
                            style={{ marginLeft: "5px" }}
                          >
                            Clear
                          </ButtonSecondary>
                        </span>
                      </div>
                      <div style={{ float: "left" }}>
                        {this.state.noResultFound && (
                          <span
                            style={{
                              float: "left",
                              fontSize: "15px",
                              marginRight: "150px",
                              color: "red",
                              marginTop: '30px'
                            }}
                          >
                            {"No Transactions matching Search Criteria"}
                          </span>
                        )}
                      </div>
                    </div>
                    <div
                      id="pills-failed-payment-attempts"
                      className="tab-pane fade show"
                      role="tabpanel"
                      aria-labelledby="pills-payments-failed-attempts-tab"
                    >
                      <Grid item xs={3} md={12}>
                        <Grid container>
                          <Grid item xs={3} md={12}>
                            <Grid container>
                              <Grid item xs={12} md={4} lg={3}>
                                <label
                                  htmlFor="PayerEmail"
                                  className="py-1"
                                >
                                  Payer Email
                                </label>
                                <input type="text" className="form-control" value={payerEmail} onChange={(e) => this.setState({ payerEmail: e.target.value })} />
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                md={4}
                                lg={4}
                                className="mt-3 mt-md-0 ml-md-3"
                              >
                                <label
                                  htmlFor="PayerEmail"
                                  className="py-1"
                                >
                                  Date of Attempt{" "}
                                </label>
                                <div className="d-flex">
                                  {/* <LocalizationProvider
                                  dateAdapter={AdapterDateFns}
                                  adapterLocale="en-gb"
                                >
                                  <input
                                    type="date"
                                    onChange={(e) =>
                                      this.setState({
                                        failedAttemptStartDate: e.target.value,
                                      })
                                    }
                                    value={failedAttemptStartDate}
                                    className="form-control"
                                    format="dd-mm-yyyy"
                                  />
                                </LocalizationProvider> */}
                                  <DatePicker style={{ width: '100%' }} selected={failedAttemptStartDate} placeholderText="From" dateFormat="dd-MMM-yyyy" onChange={(date) =>
                                    this.setState({
                                      failedAttemptStartDate: date,
                                    })
                                  } />
                                  <label
                                    htmlFor="PayerEmail"
                                    className="py-1"
                                  ></label>
                                  {/* <LocalizationProvider
                                  dateAdapter={AdapterDateFns}
                                  adapterLocale="en-gb"
                                >
                                  <input
                                    type="date"
                                    onChange={(e) =>
                                      this.setState({
                                        failedAttemptEndDate: e.target.value,
                                      })
                                    }
                                    value={failedAttemptEndDate}
                                    className="form-control"
                                    format="dd-mm-yyyy"
                                  />
                                </LocalizationProvider> */}
                                  <DatePicker style={{ width: '100%' }} selected={failedAttemptEndDate} placeholderText="To" dateFormat="dd-MMM-yyyy" onChange={(date) =>
                                    this.setState({
                                      failedAttemptEndDate: date,
                                    })
                                  } />
                                </div>
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                md={4}
                                lg={4}
                                className="mt-3 mt-md-0 ml-md-3"
                              >
                                <label
                                  htmlFor="PayerEmail"
                                  className="py-1"
                                >
                                  Amount
                                </label>
                                <div className="d-flex">
                                  <select className="form-control" value={this.state.requestedCcy} onChange={(e) =>
                                    this.setState({
                                      requestedCcy: e.target.value,
                                    })
                                  }>
                                    <option value="All">All</option>
                                    {this.state.currencyList &&
                                      this.state.currencyList.map((team) => (
                                        <option key={team} value={team}>
                                          {team}
                                        </option>
                                      ))}
                                  </select>
                                  <input
                                    type="number"
                                    className="form-control"
                                    placeholder="From"
                                    onChange={(e) =>
                                      this.setState({
                                        fromAmount: e.target.value,
                                      })
                                    }
                                    value={fromAmount}
                                  />
                                  <input
                                    type="number"
                                    className="form-control"
                                    placeholder="To"
                                    onChange={(e) =>
                                      this.setState({ toAmount: e.target.value })
                                    }
                                    value={toAmount}
                                  />
                                </div>
                              </Grid>
                            </Grid>
                            <Grid container className="my-md-3">
                              <Grid
                                item
                                xs={12}
                                md={4}
                                lg={3}
                                className="mr-md-3"
                              >
                                <label
                                  htmlFor="PayerEmail"
                                  className="py-1"
                                >
                                  Collection Reference
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={collectionReference}
                                  onChange={(e) =>
                                    this.setState({
                                      collectionReference: e.target.value,
                                    })
                                  }
                                />
                              </Grid>
                              <Grid item xs={12} md={4} lg={3}>
                                <label
                                  htmlFor="benepayPaymentRef"
                                  className="py-1"
                                >
                                  Benepay Payment Ref
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={benepayPaymentRef}
                                  onChange={(e) =>
                                    this.setState({
                                      benepayPaymentRef: e.target.value,
                                    })
                                  }
                                />
                              </Grid>
                            </Grid>
                            <Grid container className="my-4">
                              <div
                                style={{ float: "left" }}
                                className="rejected-benepay-action-items my-4"
                              >
                                <span>
                                  <ButtonPrimary onClick={this.applyFailedTransactionHandleClick}>
                                    Apply
                                  </ButtonPrimary>
                                  <ButtonSecondary
                                    onClick={this.clearFailedTransactionForm}
                                    style={{ marginLeft: "25px" }}
                                  >
                                    Clear
                                  </ButtonSecondary>
                                </span>
                              </div>
                            </Grid>
                            <hr
                              style={{ height: "1px", backgroundColor: "#ddd" }}
                            />
                            {failedTransactions && failedTransactions.length > 0 &&

                              <div>
                                <div className="row">
                                  <div className="search-records">
                                    <span
                                      style={{
                                        float: "left",
                                        fontSize: "14px",
                                        marginRight: "150px",
                                        color: "blue",
                                      }}
                                    >
                                      Your Search returned {this.state.totalFailedCount} failed payment attempts
                                    </span>
                                  </div>
                                  <div className="download-csv">
                                    <ButtonPrimary onClick={this.downloadFailedTransactionsCSV}>
                                      Download as CSV
                                    </ButtonPrimary>
                                  </div>
                                </div>
                                <div className="error-attempts-table mt-3 table-responsive" style={{ maxWidth: '100%', overflowX: 'auto' }}>
                                  <table className=" table-bordered w-auto mw-100 failure-attempts-table">
                                    <thead>
                                      <tr>
                                        <th scope="col" style={{ cursor: "pointer", minWidth: "117px" }} onClick={() => { this.sortingData("creationDate", "Failed") }}>Timestamp{<button className={`${this.state.coltype === "creationDate" && this.state.order === "ascn"
                                          ? "sort-button"
                                          : "sort-button sort-reverse"}`}  >▲</button>}
                                        </th>
                                        <th scope="col" style={{ cursor: "pointer", minWidth: "170px" }} onClick={() => { this.sortingData("collectionReferenceNo", "Failed") }}>Collection Reference{<button className={`${this.state.coltype === "collectionReferenceNo" && this.state.order === "ascn"
                                          ? "sort-button"
                                          : "sort-button sort-reverse"}`}>▲</button>}
                                        </th>
                                        <th scope="col" style={{ cursor: "pointer" }} onClick={() => { this.sortingData("debtorEmailId", "Failed") }}>Payer Email{<button className={`${this.state.coltype === "debtorEmailId" && this.state.order === "ascn"
                                          ? "sort-button"
                                          : "sort-button sort-reverse"}`}>▲</button>}
                                        </th>
                                        <th scope="col" style={{ cursor: "pointer" }} onClick={() => { this.sortingData("pgStatus", "Failed") }}>Status{<button className={`${this.state.coltype === "pgStatus" && this.state.order === "ascn"
                                          ? "sort-button"
                                          : "sort-button sort-reverse"}`}>▲</button>}
                                        </th>
                                        <th scope="col" style={{ cursor: "pointer", minWidth: "98px" }} onClick={() => { this.sortingData("dueAmount", "Failed") }}>Amount{<button className={`${this.state.coltype === "dueAmount" && this.state.order === "ascn"
                                          ? "sort-button"
                                          : "sort-button sort-reverse"}`}>▲</button>}
                                        </th>
                                        <th scope="col">Bene Id</th>
                                        <th scope="col" style={{ width: "250px" }}>BenePay Payment Ref</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {failedTransactions.map((ft, index) => (
                                        <tr key={index}>
                                          <td> {moment(ft.creationDate).format('DD-MMM-YYYY')} <br /> {moment(ft.creationDate).format('HH:mm:ss')}</td>
                                          <td style={{ width: '50px' }}>{ft.collectionReferenceNo}</td>
                                          <td>{ft.debtorEmailId}</td>
                                          <td><span className="pgStatus">{humanize(ft.pgStatus)}</span></td>
                                          <td>{ft.dueAmount}</td>
                                          <td className="d-flex justify-content-between align-items-center" style={{ height: '61px', minWidth: "170px", position: "relative" }}>{ft.beneId}
                                            {this.state.showCopiedMsg && (this.state.refundIndex === index && this.state.copiedId === ft.beneId) && (
                                              <span id="copied1"
                                                style={{
                                                  position: 'absolute',
                                                  fontSize: '13px',
                                                  color: 'rgb(222, 213, 213)',
                                                  backgroundColor: 'rgb(52, 47, 47)',
                                                  padding: '3px',
                                                  margin: '-43px 0px 0px 170px',
                                                  borderRadius: '7px 7px 7px 7px',
                                                }}
                                              >
                                                {"Copied!"}
                                              </span>
                                            )}

                                            <span title="copy">
                                              <FileCopyOutlinedIcon id="copiedIcon" color="primary" style={{ fontSize: 14, cursor: 'pointer' }} onClick={() => this.copyRequestedId(ft.beneId, index)} /></span>
                                          </td>
                                          <td style={{ whiteSpace: 'nowrap', position: "relative" }} > {ft.transactionId}
                                            {this.state.showCopiedMsg && (this.state.refundIndex === index && this.state.copiedId === ft.transactionId) && (
                                              <span id="copied1"
                                                style={{
                                                  position: 'absolute',
                                                  fontSize: '13px',
                                                  color: 'rgb(222, 213, 213)',
                                                  backgroundColor: 'rgb(52, 47, 47)',
                                                  padding: '3px',
                                                  margin: '-28px 0px 0px -27px',
                                                  borderRadius: '7px 7px 7px 7px',
                                                }}
                                              >
                                                {"Copied!"}
                                              </span>
                                            )}

                                            <span title="copy">
                                              <FileCopyOutlinedIcon id="copiedIcon" color="primary" style={{ fontSize: 14, cursor: 'pointer' }} onClick={() => this.copyRequestedId(ft.transactionId, index)} /></span>

                                          </td>
                                        </tr>

                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>}

                            {failedTransactions && failedTransactions.length === 0 &&
                              <p style={{ fontSize: '22px' }}>No Results Found</p>
                            }
                          </Grid>
                        </Grid>
                      </Grid>
                    </div>


                    {/* <div
                    className="tab-pane fade m-3"
                    id="pills-profile"
                    role="tabpanel"
                    aria-labelledby="pills-profile-tab"
                  >
                    {apply2Click && (
                      <Grid container className="mb-3">
                        <Grid item xs={2}>
                          <p className="mb-0 h-100 d-flex align-items-center">
                            Create Date
                          </p>
                        </Grid>
                        <Grid item xs={5} className={"my-4"} style={{ display: 'flex' }}>

                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <input
                              style={{ height: "40px", padding: "5px" }}
                              type="date"
                              onChange={(e) =>
                                this.setState({
                                  rejectedReceiptStartDate: e.target.value,
                                })
                              }
                              value={this.state.rejectedReceiptStartDate}
                            />
                          </LocalizationProvider>
                          <DatePicker style={{ width: '90%', paddingRight: '10px' }} selected={rejectedReceiptStartDate} placeholderText="From" dateFormat="dd-MMM-yyyy" onChange={(date) =>
                            this.setState({
                              rejectedReceiptStartDate: date,
                            })
                          } />

                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <input
                              style={{
                                marginLeft: "2px",
                                height: "40px",
                                padding: "5px",
                              }}
                              type="date"
                              onChange={(e) =>
                                this.setState({
                                  rejectedReceiptEndDate: e.target.value,
                                })
                              }
                              value={this.state.rejectedReceiptEndDate}
                            />
                          </LocalizationProvider>
                          <DatePicker style={{ width: '90%', paddingLeft: '10px' }} selected={rejectedReceiptEndDate} placeholderText="To" dateFormat="dd-MMM-yyyy" onChange={(date) =>
                            this.setState({
                              rejectedReceiptEndDate: date,
                            })
                          } />
                        </Grid>

                        <Grid container>
                          <div
                            style={{ float: "left" }}
                            className="rejected-benepay-action-items mt-4"
                          >
                            {this.state.noRejectedResultFound && (
                              <span
                                style={{
                                  float: "left",
                                  fontSize: "14px",
                                  marginRight: "150px",
                                  color: "red",
                                }}
                              >
                                {"No Transactions matching Search Criteria"}
                              </span>
                            )}
                            {this.state.showValidationMsg && (
                              <span
                                style={{
                                  float: "left",
                                  fontSize: "10px",
                                  marginRight: "150px",
                                  color: "red",
                                }}
                              >
                                {"Please fill Receipt start and end dates"}
                              </span>
                            )}
                          </div>
                        </Grid>

                        <Grid container>
                          <div
                            style={{ float: "right" }}
                            className="rejected-benepay-action-items mt-4"
                          >
                            <span>
                              <ButtonPrimary onClick={this.rejectedApply}>
                                Apply
                              </ButtonPrimary>
                              <ButtonSecondary
                                onClick={this.rejectedClear}
                                style={{ marginLeft: "5px" }}
                              >
                                Clear
                              </ButtonSecondary>
                            </span>
                          </div>
                        </Grid>
                      </Grid>
                    )}
                  </div> */}
                  </div>
                </CardContent>
              </Card>
            </Box>
          </Box>
        )}

        {showProcessedTable && !this.state.validationFailed && (
          <div className="mt-4">
            <div className="row">
              <div className="search-records">
                <span
                  style={{
                    float: "left",
                    fontSize: "14px",
                    marginRight: "150px",
                    color: "blue",
                  }}
                >
                  Your Search returned {totalPaymentsFound} payments and {refundCount} refund transactions
                </span>
              </div>
              <div className="download-csv">
                <ButtonPrimary onClick={this.downloadTransactions}>
                  Download as CSV
                </ButtonPrimary>
              </div>
            </div>
          <TableContainer component={Paper} className="mt-4">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell> Action </TableCell>
                  <TableCell>Benepay Payment Ref</TableCell>
                  <TableCell align="right" >Transaction Type</TableCell>
                  {/* moved status position */}
                  <TableCell align="right" style={{ cursor: "pointer", minWidth: "133px" }} onClick={() => { this.sortingData("status", "Payment") }}>
                    {" "}
                    Status
                    <Tooltip
                      placement="right"
                      arrow
                      title={
                        <>
                          <div><b>Payment Transaction Statuses</b></div>
                          <div>AWAITING_PAYMENT - Transaction awaiting payment</div>
                          <div>PAID - Paid transaction</div>
                          <div>REFUNDED - Refunded transaction</div>
                          <div>EXPIRED - Expired transaction </div>
                          <div>CANCELLED - Cancelled transaction </div>
                          <div>SETTLED - Settled transaction  </div><br/>

                          <div><b>Refund Transaction Statuses</b></div>
                          <div>SUCCESS - Successfully refunded</div>
                          <div>FAILED - Failed Refund</div>
                        </>
                      }
                    >
                      <IconButton>
                        <HelpIcon />
                      </IconButton>
                    </Tooltip>
                    {<button className={`${this.state.coltype === "status" && this.state.order === "ascn"
                      ? "sort-button"
                      : "sort-button sort-reverse"}`}>▲</button>}
                  </TableCell>
                  <TableCell align="right" style={{ cursor: "pointer", minWidth: "185px" }} onClick={() => { this.sortingData("receiptTimestamp", "Payment") }} >Create Timestamp
                    {<button className={`${this.state.coltype === "receiptTimestamp" && this.state.order === "ascn"
                      ? "sort-button"
                      : "sort-button sort-reverse"}`}>▲</button>}
                    </TableCell>
                    <TableCell align="right" style={{ cursor: "pointer", minWidth: "145px" }} onClick={() => { this.sortingData("debtorName", "Payment") }}> Payer Name{<button className={`${this.state.coltype === "debtorName" && this.state.order === "ascn"? "sort-button"
                      : "sort-button sort-reverse"}`}>▲</button>}
                    </TableCell>
                    <TableCell align="right" style={{ cursor: "pointer", minWidth: "160px" }} onClick={() => { this.sortingData("finalDueAmount", "Payment") }}>
                      Amount
                      <Tooltip
                        placement="right"
                        arrow
                        title={
                          <>
                            <div>Amount of Payment/Cancellation/Refund</div>
                          </>
                        }
                      >
                        <IconButton>
                          <HelpIcon />
                        </IconButton>
                      </Tooltip>
                      {<button className={`${this.state.coltype === "finalDueAmount" && this.state.order === "ascn"
                        ? "sort-button"
                        : "sort-button sort-reverse"}`}>▲</button>}
                    </TableCell>
                    {/* <TableCell align="right" style={{ minWidth: "100px" }}> Payment Mode</TableCell> */}
                    <TableCell align="right" style={{ cursor: "pointer", minWidth: "268px" }} onClick={() => { this.sortingData("paymentCompletionTimestamp", "Payment") }}> Last Updated Timestamp
                      <Tooltip
                        placement="right"
                        arrow
                        title={
                          <>
                            <div>Timestamp of Payment/Cancellation/Refund</div>
                          </>
                        }
                      >
                        <IconButton>
                          <HelpIcon />
                        </IconButton>
                      </Tooltip>
                      {<button className={`${this.state.coltype === "paymentCompletionTimestamp" && this.state.order === "ascn"
                        ? "sort-button"
                        : "sort-button sort-reverse"}`}>▲</button>}
                    </TableCell>
                    <TableCell align="right"> Payment Ccy</TableCell>
                    <TableCell align="right" style={{ cursor: "pointer", minWidth: "183px" }} onClick={() => { this.sortingData("collectionReferenceNumber", "Payment") }}> Collection Ref No {<button className={`${this.state.coltype === "collectionReferenceNumber" && this.state.order === "ascn"
                      ? "sort-button"
                      : "sort-button sort-reverse"}`}>▲</button>}
                    </TableCell>
                    <TableCell align="right" style={{ cursor: "pointer", minWidth: "244px" }} onClick={() => { this.sortingData("requestorTransactionId", "Payment") }}> Requestor TransactionId{<button className={`${this.state.coltype === "requestorTransactionId" && this.state.order === "ascn"
                      ? "sort-button"
                      : "sort-button sort-reverse"}`}>▲</button>}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.serachedPaymentResultList &&
                    this.state.serachedPaymentResultList.map((item, index) => (
                      <React.Fragment key={index + item.transactionId}>
                        {item.transactionType.toUpperCase() === "PAYMENT" &&
                          (item.status === "AWAITING_PAYMENT" ||
                            item.status === "PAID" ||
                            item.status === "PARTIALLY_REFUNDED" ||
                            item.status === "FULLY_REFUNDED" ||
                            item.status.toUpperCase() === "EXPIRED" ||
                            item.status.toUpperCase() === "SETTLED" ||
                            item.status.toUpperCase() === "CANCELLED" ||
                            item.status === "REFUNDED"
                          ) && (
                            <TableRow
                              onClick={() => this.setRowVisibility(item, index)}
                              style={{ cursor: "pointer", transition: "all .2s" }}
                            >
                              <TableCell
                                className={
                                  item.transactionType.toUpperCase() ===
                                    "PAYMENT" && item.paymentAttempts === 0
                                    ? "visibility-hidden"
                                    : ""
                                }
                              >
                                {selectedItem.transactionId ===
                                  item.transactionId &&
                                  selectedItem.isRowVisible ? (
                                  <RemoveIcon />
                                ) : (
                                  <AddIcon />
                                )}
                              </TableCell>
                              <TableCell
                                id="actionIconsCell"
                                align="right"
                                className={"p-0 text-center cursor-pointer"}
                                onMouseLeave={() => { this.setState({ copyText: 'Copy Payment Link' }) }}
                              >
                                {/* <a style={{ color: "blue" }}>
                                {(item.status === "PAID" ||
                                  item.status === "PARTIALLY_REFUNDED" ||
                                  item.status === "REFUNDED") &&
                                  (item.paymentMode === "CREDIT CARD" ||
                                    item.paymentMode === "DEBIT CARD")
                                  ? "Refund"
                                  : item.status === "AWAITING_PAYMENT"
                                    ? "Cancel Payment"
                                    : ''}
                              </a> */}
                              {/* if(config.isLocal){navigator.clipboard.writeText(`http://localhost:3001/?token=${item?.transactionId}`);}else{navigator.clipboard.writeText(`https://uat-collect.benepay.io/?token=${item?.transactionId}`); */}
                              {item.status === "AWAITING_PAYMENT"
                                ? <Tooltip placement="top" arrow title={<><div>{this.state.copyText}</div></>}><FileCopyIcon className="actionIcons copyIcon" onClick={() => { this.setState({ copyText: 'Payment Link Copied to Clipboard' }); navigator.clipboard.writeText(item.paymentURL); }} /></Tooltip>
                                : <FileCopyIcon color="disabled" className="actionIcons" />}
                              {item.status === "AWAITING_PAYMENT"
                                ? <Tooltip placement="top" arrow title={<><div>Cancel Transaction</div></>}><CancelIcon className="actionIcons cancelIcon" onClick={(e) => this.refundClick(e, item)} /></Tooltip>
                                : <CancelIcon color="disabled" className="actionIcons" />}
                              {(item.status === "PAID" || item.status === "SETTLED" || item.status === "REFUNDED")
                                ? <Tooltip placement="top" arrow title={<><div>Issue Refund</div></>}><UndoIcon className="actionIcons refundIcon" onClick={(e) => this.refundClick(e, item)} /></Tooltip>
                                : <UndoIcon color="disabled" className="actionIcons" />}
                              {(item.status === "AWAITING_PAYMENT" && item.paymentReminder)
                                ? <Tooltip placement="top" arrow title={<><div>Send Payment Reminder</div></>}><NotificationsIcon className="actionIcons notificationIcon" onClick={() => { this.setState({ showReminderModal: true, transactionIdForReminder: item?.transactionId }) }} /></Tooltip>
                                : <NotificationsIcon color="disabled" className="actionIcons" />}
                            </TableCell>
                            <TableCell align="right">
                              {item?.transactionId}
                            </TableCell>

                            {/* <TableCell align="right" className={'p-0'}>{new Date(item?.receiptTimestamp).toISOString().substring(0, 10)}</TableCell> */}
                            <TableCell align="right" className={"p-0"}>
                              {item?.transactionType}
                            </TableCell>

                            {/* moved status column */}
                            <TableCell align="right">
                              <div
                                className={`payment-status text-center ${item?.status === "AWAITING_PAYMENT" ? "black"
                                  : item?.status === "PAID" ||
                                    item?.status === "PARTIALLY_REFUNDED" ||
                                    item?.status === "REFUNDED" ? "green"
                                    : item.status === "FULLY_REFUNDED" ||
                                      item.status === "SUCCESS" ? "blue"
                                      : item.status === "SETTLED" ? 'grey' : item.status === "CANCELLED" ? 'orange' :
                                        item.status === "EXPIRED" ? 'orangered' : "red"
                                  }`}
                              >
                                {item?.status}
                              </div>
                            </TableCell>
                            <TableCell align="right" >
                              {moment(item?.receiptTimestamp).format('DD-MMM-YYYY')} <br /> {moment(item?.receiptTimestamp).format('HH:mm:ss')}
                            </TableCell>
                            <TableCell align="right" style={{ overflowWrap: "anywhere" }}>
                              {item?.debtorName}
                            </TableCell>
                            <TableCell align="right">
                              {item?.collectionCurrency} {item?.finalDueAmount}
                            </TableCell>
                            {/* <TableCell align="right">
                              {!item.paymentMode ? "NA" : item.paymentMode}
                            </TableCell> */}
                              {/* <TableCell align="right" className={'p-0'}>{new Date(item?.paymentCompletionTimestamp).toISOString().substring(0, 10)}</TableCell> */}
                              <TableCell align="right" className={"p-0"}>
                                {item.updateTimeStamp
                                  ? <div>

                                    {/* //                                   {moment(item?.paymentCompletionTimestamp).format('DD-MMM-YYYY')}
//                                   <br />
//                                   {moment(item?.paymentCompletionTimestamp).format('HH:mm:ss')}
//                                 </div> */}

                                    {moment(item?.updateTimeStamp).format('DD-MMM-YYYY')}
                                    <br />
                                    {moment(item?.updateTimeStamp).format('HH:mm:ss')}
                                  </div>

                                  : "NA"}
                              </TableCell>
                              <TableCell align="right">
                                {!item.paymentCurrency
                                  ? "NA"
                                  : item.paymentCurrency}
                              </TableCell>
                              <TableCell align="right">
                                {item?.collectionReferenceNumber}
                              </TableCell>
                              <TableCell align="right">
                                {item?.requestorTransactionId}
                              </TableCell>
                            </TableRow>
                          )}
                        {/* TODO: Need to move in seprate component */}
                        {selectedItem.isRowVisible &&
                          item.parentTransactionId !== null &&
                          item.parentTransactionId ===
                          selectedItem.transactionId && selectedItem.paymentAttempts > 0 && (
                            <TableRow
                              sx={{
                                "& th": {
                                  color: "rgba(255, 255, 255)",
                                  backgroundColor: "#767676",
                                },
                              }}
                            >
                              <TableCell colSpan={14}>
                                <TableContainer>
                                  <Table className="innerTable">
                                    {currentIndex === index - 1 && (
                                      <TableHead>
                                        <TableRow>
                                          <TableCell>Benepay Payment Ref</TableCell>
                                          <TableCell align="right">
                                            Transaction Type
                                          </TableCell>
                                          <TableCell align="right">
                                            {" "}
                                            Status
                                          </TableCell>
                                          <TableCell align="right">
                                            Create Timestamp
                                          </TableCell>
                                          <TableCell align="right">
                                            {" "}
                                            Payer Name
                                          </TableCell>
                                          <TableCell align="right">
                                            {" "}
                                            Amount
                                            <Tooltip
                                              placement="right"
                                              arrow
                                              title={
                                                <>
                                                  <div>Amount of Payment/Cancellation/Refund</div>
                                                </>
                                              }
                                            >
                                              <IconButton>
                                                <HelpIcon style={{ color: 'white' }} />
                                              </IconButton>
                                            </Tooltip>
                                          </TableCell>
                                          <TableCell align="right">
                                            {" "}
                                            Payment Mode
                                          </TableCell>
                                          <TableCell align="right" style={{ minWidth: "235px" }}>
                                            {" "}
                                            Last Updated Timestamp
                                            <Tooltip
                                              placement="right"
                                              arrow
                                              title={
                                                <>
                                                  <div>Timestamp of Payment/Cancellation/Refund</div>
                                                </>
                                              }
                                            >
                                              <IconButton>
                                                <HelpIcon style={{ color: 'white' }} />
                                              </IconButton>
                                            </Tooltip>
                                          </TableCell>
                                          <TableCell align="right">
                                            {" "}
                                            Payment Ccy
                                          </TableCell>
                                          <TableCell align="right">
                                            {" "}
                                            Collection Ref No
                                          </TableCell>
                                          <TableCell align="right">
                                            {" "}
                                            Requestor TransactionId
                                          </TableCell>
                                        </TableRow>
                                      </TableHead>
                                    )}
                                    <TableBody>
                                      <TableRow>
                                        <TableCell
                                          align="right"
                                          className="border-bottom-0"
                                          style={{ minWidth: "293.21px" }}
                                        >
                                          {item?.transactionId}
                                        </TableCell>

                                        <TableCell
                                          align="right"
                                          className={"p-0 border-bottom-0"}
                                          style={{ minWidth: "117.19px" }}
                                        >
                                          {item?.transactionType}
                                        </TableCell>
                                        <TableCell
                                          align="right"
                                          className="border-bottom-0"
                                          style={{ width: "206.94px" }}
                                        >
                                          <div
                                            className={`payment-status text-center ${item?.status === "AWAITING_PAYMENT"
                                              ? "black"
                                              : item?.status === "PAID" ||
                                                item?.status ===
                                                "PARTIALLY_REFUNDED" ||
                                                item?.status ===
                                                "REFUNDED" ||
                                                item?.status ===
                                                "PAYMENT_SUCCESS"
                                                ? "green"
                                                : item.status ===
                                                  "FULLY_REFUNDED" ||
                                                  item.status === "SUCCESS"
                                                  ? "blue"
                                                  : "red"
                                              }`}
                                            style={{ minWidth: "174.95px" }}
                                          >
                                            {item?.status}
                                          </div>
                                        </TableCell>

                                        <TableCell
                                          align="right"
                                          className="border-bottom-0"
                                          style={{ minWidth: "90.23px" }}
                                        >
                                          {/* {
                                          new Date(item?.receiptTimestamp)
                                            .toLocaleString("en-US", {
                                              year: "numeric",
                                              month: "2-digit",
                                              day: "2-digit",
                                            })
                                            .split(",")[0]
                                        } */}
                                          {moment(item?.receiptTimestamp).format('DD-MMM-YYYY')} <br /> {moment(item?.receiptTimestamp).format('HH:mm:ss')}
                                        </TableCell>
                                        <TableCell
                                          align="right"
                                          className="border-bottom-0"
                                          style={{ minWidth: "112.31px" }}
                                        >
                                          {item?.debtorName}
                                        </TableCell>
                                        <TableCell
                                          align="right"
                                          className="border-bottom-0"
                                          style={{ minWidth: "139.58px" }}
                                        >
                                          {item?.collectionCurrency}{" "}
                                          {item?.finalDueAmount}
                                        </TableCell>
                                        <TableCell
                                          align="right"
                                          className="border-bottom-0"
                                          style={{ width: "106.32px" }}
                                        >
                                          {!item.paymentMode
                                            ? "NA"
                                            : item.paymentMode}
                                        </TableCell>
                                        {/* <TableCell align="right" className={'p-0'}>{new Date(item?.paymentCompletionTimestamp).toISOString().substring(0, 10)}</TableCell> */}
                                        <TableCell
                                          align="right"
                                          className={"p-0 border-bottom-0"}
                                          style={{ width: "173.84px" }}
                                        >
                                          {item.paymentCompletionTimestamp
                                            ? <div>
                                              {moment(item?.paymentCompletionTimestamp).format('DD-MMM-YYYY')}
                                              <br />
                                              {moment(item?.paymentCompletionTimestamp).format('HH:mm:ss')}
                                            </div>
                                            : "NA"}


                                        </TableCell>
                                        <TableCell
                                          align="right"
                                          className="border-bottom-0"
                                          style={{ width: "100.68px" }}
                                        >
                                          {!item.paymentCurrency
                                            ? "NA"
                                            : item.paymentCurrency}
                                        </TableCell>
                                        <TableCell
                                          align="right"
                                          className="border-bottom-0"
                                          style={{ width: "117.85px" }}
                                        >
                                          {item?.collectionReferenceNumber}
                                        </TableCell>
                                        <TableCell
                                          align="right"
                                          className="border-bottom-0"
                                          style={{ width: "158.23px" }}
                                        >
                                          {item?.requestorTransactionId}
                                        </TableCell>
                                      </TableRow>
                                    </TableBody>
                                  </Table>
                                </TableContainer>
                              </TableCell>
                            </TableRow>
                          )}
                      </React.Fragment>
                    ))}
                </TableBody>
              </Table>
              {showModal && (!this.state.isDeviceMobile) && (
                <ConfirmDialog
                  style={{ width: "500px" }}
                  title="Warning"
                  open={true}
                  setOpen={true}
                >
                  <b>Refund Request</b>
                  <br />
                  <br />
                  <span>
                    Select Refund Type{" "}
                    <input
                      disabled={this.state.paymentAttempts > 0 ? true : false}
                      type="radio"
                      value="Full Refund"
                      id="male"
                      onChange={this.handleOnChange}
                      name="gender"
                      checked={selectedOption === "Full Refund"}
                    />
                    <label htmlFor="fullRefund">Full Refund</label>
                    <input
                      style={{ marginLeft: "5px" }}
                      type="radio"
                      value="Partial Refund"
                      id="female"
                      onChange={this.handleOnChange}
                      name="gender"
                      checked={selectedOption === "Partial Refund"}
                    />
                    <label htmlFor="partialRefund">Partial Refund</label>
                  </span>
                  <br />
                  <br />

                  <div className="row" style={{ marginLeft: "0px" }}>
                    <span style={{ marginTop: "10px" }}>Refund Amount</span>
                    <TextField
                      size="small"
                      disabled={true}
                      onChange={this.handleRefundCcyChange}
                      value={this.state.refundCcy}
                      style={{
                        width: "60px",
                        marginRight: "3px",
                        marginLeft: "5px",
                      }}
                    ></TextField>
                    <TextField
                      type={"number"}
                      label="Amount"
                      size="small"
                      disabled={
                        this.state.selectedOption === "Full Refund" ? true : false
                      }
                      style={{
                        paddingLeft: "2px",
                        width: "100px",
                        marginLeft: "2px",
                      }}
                      onChange={this.handleRefundAmountChange}
                      value={this.state.refundAmount}
                    ></TextField>
                  </div>
                  <br />
                  <span>
                    <span> Reason For Refund</span>
                    <br />
                    <textarea
                      style={{ width: "280px" }}
                      placeholder={"enter reason for refund"}
                      onChange={this.handleRefundReason}
                      value={this.state.refundReason}
                    ></textarea>
                  </span>
                  <br />
                  <br />

                  <Backdrop
                    sx={{
                      color: "#fff",
                      zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={refundLoading}
                    onClick={this.handleClose}
                  >
                    <CircularProgress color="inherit" />
                  </Backdrop>

                  <ButtonPrimary onClick={this.confirmRefund} disabled={refundLoading}>
                    Confirm
                  </ButtonPrimary>
                  <ButtonPrimary
                    onClick={this.cancelRefund}
                    style={{ marginLeft: "5px" }}
                    disabled={refundLoading}
                  >
                    Cancel
                  </ButtonPrimary>
                </ConfirmDialog>
              )}

              {showCancellationModal && (!this.state.isDeviceMobile) && (
                <ConfirmDialog
                  style={{ width: "300px" }}
                  title="Warning"
                  open={true}
                  setOpen={true}
                  dialogPadding={0}
                >
                  <b>Cancellation Request</b>
                  <br />
                  <br />

                  <p>Do you really want to Cancel this payment request</p>

                  <ButtonSecondary
                    onClick={() =>
                      this.setState({ showCancellationModal: false })
                    }
                    style={{ maxWidth: "95px" }}
                  >
                    No
                  </ButtonSecondary>
                  <ButtonPrimary
                    style={{ maxWidth: "95px", marginLeft: "5px" }}
                    onClick={() =>
                      this.setState({
                        showCancellationModal: false,
                        showCancellationReason: true,
                      })
                    }
                  >
                    Yes
                  </ButtonPrimary>
                </ConfirmDialog>
              )}


              {/* Reminder Modal */}
              {showReminderModal && (!this.state.isDeviceMobile) && (
                <ConfirmDialog
                  id="confirmDialogModal"
                  title="Warning"
                  open={true}
                  setOpen={true}
                  dialogPadding={0}
                >
                  <b>Send Payment Reminder</b>
                  <br />
                  <br />

                  <p>An email reminder will be sent to payer.. Please confirm</p>

                  <ButtonSecondary
                    onClick={() =>
                      this.setState({ showReminderModal: false })
                    }
                    className="buttonSecondary"
                  >
                    Cancel
                  </ButtonSecondary>
                  <ButtonPrimary
                    className="buttonPrimary ml-1"
                    onClick={() => {
                      this.sendReminder();
                      this.setState({
                        showReminderModal: false,
                      })
                    }
                    }
                  >
                    Send Reminder
                  </ButtonPrimary>
                </ConfirmDialog>
              )}

              {showCancellationReason && (!this.state.isDeviceMobile) && (
                <ConfirmDialog
                  style={{ width: "300px" }}
                  title="Warning"
                  open={true}
                  setOpen={true}
                  dialogPadding={0}
                >
                  <b>Reason for cancellation</b>
                  <br />
                  <br />

                  <Backdrop
                    sx={{
                      color: "#fff",
                      zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={isCancellationProcessing}
                    onClick={this.handleClose}
                  >
                    <CircularProgress color="inherit" />
                  </Backdrop>

                  <textarea
                    rows="2"
                    cols="50"
                    onChange={(e) =>
                      this.setState({ cancellationReason: e.target.value })
                    }
                    value={cancellationReason}
                  ></textarea>

                  <div className="suggested-reasons mt-2">
                    <span className="d-block py-2">
                      <b>Suggested Reasons: </b>
                    </span>
                    <div className="reasons">
                      <span
                        className="text-primary text-underline cursor-pointer"
                        onClick={() =>
                          this.setState({ cancellationReason: "Already Paid" })
                        }
                      >
                        Already Paid
                      </span>
                      <span
                        className="text-primary text-underline cursor-pointer ml-3"
                        onClick={() =>
                          this.setState({
                            cancellationReason: "Incorrectly sent earlier",
                          })
                        }
                      >
                        Incorrectly sent earlier
                      </span>
                      <br />
                      <span
                        className="text-primary text-underline cursor-pointer"
                        onClick={() =>
                          this.setState({
                            cancellationReason: "Payer requested cancellation",
                          })
                        }
                      >
                        Payer requested cancellation
                      </span>
                      <span
                        className="ml-3 text-primary text-underline cursor-pointer"
                        onClick={() =>
                          this.setState({ cancellationReason: "Amount Charged" })
                        }
                      >
                        Amount Charged
                      </span>
                    </div>
                  </div>

                  <div className="d-flex justify-content-end mt-5">
                    <ButtonSecondary
                      onClick={() =>
                        this.setState({ showCancellationReason: false, cancellationReason: '' })
                      }
                      disabled={isCancellationProcessing}
                      style={{ maxWidth: "95px" }}
                    >
                      Close
                    </ButtonSecondary>
                    <ButtonPrimary
                      style={{ maxWidth: "95px", marginLeft: "5px" }}
                      onClick={this.submitCancellationRequest}
                      disabled={!cancellationReason || loading}
                    >
                      Submit
                    </ButtonPrimary>
                  </div>
                </ConfirmDialog>
              )}

              {showConfirmationModal && (!this.state.isDeviceMobile) && (
                <ConfirmDialog title="Warning" open={true} setOpen={true}>
                  <b>Success!!! your refund has been successfully initiated</b>

                  <br />
                  <br />
                  <br />

                  <ButtonPrimary onClick={this.confirmBack}>OK</ButtonPrimary>
                </ConfirmDialog>
              )}

              {showFailureModal && (!this.state.isDeviceMobile) && (
                <ConfirmDialog title="Warning" open={true} setOpen={true}>
                  <b>
                    {
                      "An error occurred during the refund operation, please contact <contact@benepay.io> quoting the error details below."
                    }
                  </b>
                  <br />
                  <br />
                  <b>
                    {
                      this.state.errorDesc
                    }
                  </b>

                  <br />
                  <br />
                  <br />

                  <ButtonPrimary onClick={this.confirmBack}>OK</ButtonPrimary>
                </ConfirmDialog>
              )}
            </TableContainer>
          </div>
        )}

        {paymentSettlementModel && (
          <ConfirmDialog
            style={{ width: "200px" }}
            title="Warning"
            open={true}
            setOpen={true}
          >
            <b>Settlement Request</b>
            <br />
            <br />

            <Grid container>
              <Grid item xs={3}>
                <p className="mb-0 h-100 d-flex align-items-center">
                  Settlement Date
                </p>
              </Grid>
              <Grid item xs={3} md={8}>
                <Grid container>
                  <Grid item xs={12} md={5}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <input
                        style={{
                          marginLeft: "2px",
                          height: "40px",
                          padding: "5px",
                        }}
                        type="date"
                        onChange={(e) =>
                          this.setState({ settlementDate: e.target.value })
                        }
                        value={this.state.settlementDate}
                      />
                    </LocalizationProvider>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <div className="mt-4">
              <ButtonPrimary onClick={this.downloadSettlementFile} disabled={loading || !settlementDate}>
                Confirm
              </ButtonPrimary>
              <ButtonPrimary
                onClick={this.cancelSettlement}
                style={{ marginLeft: "5px" }}
                disabled={loading}
              >
                Cancel
              </ButtonPrimary>
            </div>
          </ConfirmDialog>
        )}

        {this.state.rejectedTableShow && (
          <div className="mt-4 ">
            {/* <div className="row ">
            <div className="search-records">
              <spans
                style={{
                  float: "left",
                  fontSize: "14px",
                  marginRight: "150px",
                  color: "blue",
                }}
              >
                Your Search returned {this.state.serachedRejectedPaymentResultList.length} Rejected transactions
              </spans>
            </div>
            <div className="download-csv">
              <ButtonPrimary onClick={this.downloadTransactions}>
                Download as CSV
              </ButtonPrimary>
            </div>
          </div> */}
            <TableContainer component={Paper} className="mt-4">
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ cursor: "pointer", textAlign: "center" }} onClick={() => { this.sortingData("receivedDate", "Reject") }}>Create   Timestamp{<button className={`${this.state.coltype === "receivedDate" && this.state.order === "ascn"
                      ? "sort-button"
                      : "sort-button sort-reverse"}`}>▲</button>}
                    </TableCell>
                    <TableCell align="right" style={{ cursor: "pointer" }} onClick={() => { this.sortingData("errorCode", "Reject") }}>Error Code{<button className={`${this.state.coltype === "errorCode" && this.state.order === "ascn"
                      ? "sort-button"
                      : "sort-button sort-reverse"}`}>▲</button>}
                    </TableCell>
                    <TableCell align="right">
                      Error Description
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.serachedRejectedPaymentResultList.map(
                    (item, index) => (
                      <TableRow key={index}>
                        <TableCell className={"p-0"}>
                          {moment(item?.receivedDate).format('DD-MMM-YYYY')} <br /> {moment(item?.receivedDate).format('HH:mm:ss')}
                        </TableCell>
                        <TableCell align="right">{item?.errorCode}</TableCell>
                        <TableCell align="right">{item?.errorDesc}</TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}

        {((apply2Click || apply1Click) && !this.state.rejectedFilePagination) && (
          <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={''}
            pageCount={this.state.totalPages}
            marginPagesDisplayed={0}
            pageRangeDisplayed={3}
            onPageChange={this.handlePageChange}
            containerClassName={'pagination justify-content-center'}
            pageClassName={'page-item '}
            pageLinkClassName={'page-link rounded-circle mx-1 my-2'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link rounded-circle mx-1 my-2'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link rounded-circle mx-1 my-2'}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
            activeClassName={'active'}
            forcePage={this.state.initalPage}
          />
        )}

        {(failedTransactions && failedTransactions.length > 0 && !this.state.rejectedFilePagination) && (
          <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={''}
            pageCount={this.state.totalFailedPages}
            marginPagesDisplayed={0}
            pageRangeDisplayed={3}
            onPageChange={this.handlePageChangeFailedTransaction}
            containerClassName={'pagination justify-content-center'}
            pageClassName={'page-item '}
            pageLinkClassName={'page-link rounded-circle mx-1 my-2'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link rounded-circle mx-1 my-2'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link rounded-circle mx-1 my-2'}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
            activeClassName={'active'}
            forcePage={this.state.initalPageFailed}
          />
        )}
      </div>
      <div id="mobileScreen">
        {/* Loading */}
        {loading && (<div id="semiTransparenDiv"></div>)}
        {/* Search Bar */}
        <div id="searchBarMobile" className="w-100 px-2 mt-2" >
          <div className="d-flex w-100 pl-2 overflow-hidden">
            <input placeholder="Search By Benepay/Requestor Transaction Id" className="py-2 w-100 bg-transparent text-xs outline-none border-none" value={this.state.requestorTransactionId} onChange={(e) => this.setState({ requestorTransactionId: e.target.value })}></input>
            <div className="bg-primary d-flex justify-content-center align-items-center px-2" onClick={() => { this.handleApplyClickPaymentSettlement(); }}>
              <SearchIcon className="text-white" />
            </div>
          </div>
        </div>
        {/* Filters */}
        <div className="w-100 px-2 py-2 mt-1 d-flex justify-content-between">
          <div className="d-flex">
            {/* Status Filter */}
            <div className="dropdown mr-1">
              <button id="statusDropDown" onClick={() => {
                document.getElementById('statusMenu').classList.toggle('d-block');
                document.getElementById('creationDateMenu').classList.remove('d-block');
              }}
                className="dropdown-toggle px-3 py-1 bg-transparent text-md">
                Status
              </button>
              <ul id="statusMenu" className="dropdown-menu py-0 overflow-hidden" >
                <li className="w-100 bg-primary text-white avoidToggle d-flex justify-content-between align-items-center py-1 px-1"><h6 className="text-center avoidToggle my-auto">Status</h6><CloseIcon /></li>
                {status.map((item) => (
                  <li className="px-1 mb-1" key={item.text}>
                    <label
                      key={item.text}
                      className="d-flex align-items-center cursor-pointer avoidToggle"
                    >
                      <input
                        checked={item.isChecked}
                        className="avoidToggle status-menu-option-mobile"
                        type="checkbox"
                        name={item.value}
                        value={item}
                        onChange={this.handleStatusChange}
                      />
                      {item.text}
                    </label>
                  </li>
                ))}
                <li className="w-100 px-2 py-1 avoidToggle">
                  <button className="btn w-100 bg-primary text-white text-center avoidToggle rounded py-1" onClick={() => { document.getElementById('statusMenu').classList.remove('d-block'); this.handleApplyClickPaymentSettlement(); }} style={{ outline: 'none' }}>Apply</button>
                </li>
              </ul>
            </div>
            {/* Creation Date Filter */}
            <div className="dropdown mx-1">
              <button id="creationDateDropDown" onClick={() => {
                document.getElementById('creationDateMenu').classList.toggle('d-block');
                document.getElementById('statusMenu').classList.remove('d-block');
              }}
                className="dropdown-toggle px-3 py-1 bg-transparent text-md"
              >
                Creation Date
              </button>
              <ul id="creationDateMenu" className="dropdown-menu py-0">
                <li className="w-100 bg-primary text-white avoidToggle d-flex justify-content-between align-items-center py-1 px-1"><h6 className="text-center avoidToggle my-auto">Creation Date</h6><CloseIcon /></li>
                <li className="my-1 px-1">
                  <label className="avoidToggle mb-1 ml-1">Start Date</label>

                  {/**
                   * @author Ragavan
                   * Changed the DatePicker to an MUIDatePicker
                   * For 'receiptStartDate' and 'receiptEndDate' fields are not working
                   * Because the Date Process is different
                   */}
                  <MuiDatePicker
                    name="receiptStartDate"
                    id="receiptStartDate" className="avoidToggle mb-1 w-100"
                    placeholder="From"
                    value={receiptStartDate ? dayjs(receiptStartDate) : null}
                    format='DD/MM/YYYY'
                    onChange={(e) => {
                      let value = this.changeDateFormat(e);
                      this.setState({ receiptStartDate: value })
                    }}
                  />
                </li>
                <li className="my-1 px-1">
                  <label className="avoidToggle mb-1 ml-1">End Date</label>
                  {/**
                   * @author Ragavan
                   * Changed the DatePicker to an MUIDatePicker
                   * For 'receiptStartDate' and 'receiptEndDate' fields are not working
                   * Because the Date Process is different
                   */}
                  <MuiDatePicker
                    name="CreatedEndDate"
                    placeholder="To"
                    value={receiptEndDate ? dayjs(receiptEndDate) : null}
                    format='DD/MM/YYYY'
                    onChange={(e) => {
                      let value = this.changeDateFormat(e);
                      this.setState({ receiptEndDate: value })
                    }}
                  />
                </li>
                <li className="w-100 px-2 py-1 avoidToggle">
                  <button className="btn w-100 bg-primary text-white text-center avoidToggle rounded py-1 outline-none" onClick={() => { document.getElementById('creationDateMenu').classList.toggle('d-block'); this.handleApplyClickPaymentSettlement(); }}>Apply</button>
                </li>
              </ul>
            </div>
          </div>
          <button className="dropdown-toggle px-3 py-1 bg-transparent text-md" id="filterDropDown" onClick={() => { document.getElementById('filterMenu').classList.toggle('filterMenuToggleClass'); }}>
            More Filters
          </button>
        </div>
        {/* Filer Menu */}
        <div id="filterMenu" className="filterMenu bg-white">
          <ul className="m-0 p-0">
            <li className="bg-primary text-white avoidToggle d-flex justify-content-between align-items-center py-3 px-4">
              <h6 className="text-center avoidToggle my-auto d-flex align-items-center"><CloseIcon className="mr-2" onClick={() => { document.getElementById('filterMenu').classList.toggle('filterMenuToggleClass'); }} /> Filters</h6>
              <button className="d-flex align-items-center m-0 p-0 bg-transparent text-white outline-none border-none" onClick={() => { this.clearProcessedDetails(); document.getElementById('filterMenu').classList.toggle('filterMenuToggleClass'); this.handleApplyClickPaymentSettlement(); }}>Clear</button>
            </li>
            <li className="text-white avoidToggle d-flex justify-content-between align-items-center py-2 px-4 bg-mobile-secondary">
              <label htmlFor="instructedAmount" className="avoidToggle">Instructed Amount</label>
            </li>
            <li className="avoidToggle d-flex justify-content-center align-items-center py-2 px-4">
              <div className="d-flex justify-content-start align-items-center avoidToggle">
                <select
                  className="form-control ccy-input w-33 avoidToggle"
                  id="instructedAmount"
                  onChange={(e) =>
                    this.setState({
                      instructedAmountCcy: e.target.value,
                    })
                  }
                >
                  <option className="w-100 avoidToggle">Currency</option>
                  {this.state.currencyList &&
                    this.state.currencyList.map((currency) => (
                      <option key={currency} value={currency} className="w-100 avoidToggle">
                        {currency}
                      </option>
                    ))}
                </select>
                <input type="text" placeholder="From" className="form-control search-input w-33 avoidToggle" value={this.state.instructedAmountMin} onChange={(e) =>
                  this.setState({
                    instructedAmountMin: e.target.value,
                  })
                } />
                <input type="text" placeholder="To" className="form-control search-input w-33 avoidToggle" value={this.state.instructedAmountMax} onChange={(e) =>
                  this.setState({
                    instructedAmountMax: e.target.value,
                  })
                } />
              </div>
            </li>
            <li className="text-white avoidToggle d-flex justify-content-between align-items-center py-2 px-4 bg-mobile-secondary">
              <label htmlFor="payerName" className="avoidToggle">Payer Name</label>
            </li>
            <li className="avoidToggle d-flex justify-content-center align-items-center py-2 px-4">
              <div className="d-flex justify-content-start align-items-center w-100 avoidToggle">
                <input id="payerName" type="text" className="form-control w-100 avoidToggle" placeholder="Payer Name" value={this.state.payerName} onChange={(e) => this.setState({ payerName: e.target.value })} />
              </div>
            </li>
            <li className="text-white avoidToggle d-flex justify-content-between align-items-center py-2 px-4 bg-mobile-secondary">
              <label htmlFor="collectionReference" className="avoidToggle">Collection Reference</label>
            </li>
            <li className="avoidToggle d-flex justify-content-center align-items-center py-2 px-4">
              <input id="collectionReference" type="text" className="form-control w-100 avoidToggle" placeholder="Collection Reference" value={this.state.collectionRef} onChange={(e) => this.setState({ collectionRef: e.target.value, })} />
            </li>
            <li id="applyMoreFiltersButton" className="bg-primary text-white avoidToggle d-flex justify-content-center align-items-center py-3 px-4" onClick={() => { document.getElementById('filterMenu').classList.toggle('filterMenuToggleClass'); this.handleApplyClickPaymentSettlement(); }}>
              <h5 className="btn text-center text-white p-0 m-0 my-auto d-flex align-items-center" >Apply</h5>
            </li>
          </ul>
        </div>

        {showProcessedTable && !this.state.validationFailed && (
          <div className="mt-2 w-100">
            <div id="mobileResultTable" className="w-100 h-full">
              {this.state.serachedPaymentResultList && this.state.serachedPaymentResultList.length !== 0 &&
                  this.state.serachedPaymentResultList.map((item, index) => (
                    <React.Fragment key={index + item.transactionId}>
                      {item.transactionType.toUpperCase() === "PAYMENT" &&
                        (item.status === "AWAITING_PAYMENT" ||
                          item.status === "PAID" ||
                          item.status === "PARTIALLY_REFUNDED" ||
                          item.status === "FULLY_REFUNDED" ||
                          item.status.toUpperCase() === "EXPIRED" ||
                          item.status.toUpperCase() === "CANCELLED" ||
                          item.status === "REFUNDED" ) && (
                            <div className="px-2 mb-2" >
                              <div className="mb-2">{moment(item?.receiptTimestamp).format('DD MMM YYYY')} {moment(item?.receiptTimestamp).format('HH:mm:ss')}</div>
                              <div className="w-100 d-flex justify-content-between align-items-center px-1 border-mobile-bottom">
                                <div className="d-flex justify-content-start align-items-center">
                                  <div onClick={() => this.setRowVisibility(item, index)}>
                                    {item.transactionType.toUpperCase() ==="PAYMENT" && item.paymentAttempts === 0 
                                    ? <AccountBalanceWalletIcon className="icon-color"/>
                                    : <UndoIcon className="icon-color"/>}
                                  </div>
                                  <div className="ml-3">
                                    <h6 className="mb-2">{item?.debtorName}</h6>
                                    <h6 className="text-xs">{item?.status}</h6>
                                  </div>
                                </div>
                                <div className="d-flex justify-content-end align-items-start">
                                  <div>
                                    <h6 className="mb-2 text-align-right">{item?.collectionCurrency} {item?.finalDueAmount}</h6>
                                    <h6 className="text-xs text-align-right">{item?.collectionReferenceNumber}</h6>
                                  </div>
                                  <div className="ml-2 position-relative overflow-visible">
                                    <div className="dropdown">
                                      <MoreVertIcon className="icon-color" type="button" id="transactionMenuBtn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
                                      <div id="mobileActionIcons" className="dropdown-menu" aria-labelledby="transactionMenuBtn">
                                        {item.status === "AWAITING_PAYMENT"
                                          ? <a className="dropdown-item"  onClick={() => { const textField = document.createElement('textarea'); textField.innerText = item.paymentURL; document.body.appendChild(textField); textField.select(); textField.setSelectionRange(0,99999); document.execCommand('copy'); textField.remove(); toast.success('Payment Link Copied to Clipboard'); }}><FileCopyIcon className="copyIcon actionIconsMobile"/> Copy Payment Link</a>
                                          : ""}
                                        {item.status === "AWAITING_PAYMENT"
                                          ? <a className="dropdown-item" onClick={(e) => this.refundClick(e, item)}><CancelIcon className="actionIconsMobile cancelIcon"/> Cancel Transaction</a>
                                          : ""}
                                        {item.status === "PAID" || item.status === "SETTLED" || item.status === "REFUNDED"
                                          ? <a className="dropdown-item"   onClick={(e) => this.refundClick(e, item)}><UndoIcon className="actionIconsMobile refundIcon"/> Issue Refund</a>
                                          : ""}
                                        { (item.status === "AWAITING_PAYMENT" && item.paymentReminder)
                                          ? <a className="dropdown-item" onClick={() => {this.setState({showReminderModal: true , transactionIdForReminder: item?.transactionId})}}><NotificationsIcon className="actionIconsMobile notificationIcon" /> Send Payment Reminder</a>
                                          : ""}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                      )}
                    {/* TODO: Need to move in seprate component
                      {selectedItem.isRowVisible && item.parentTransactionId !== null && item.parentTransactionId === selectedItem.transactionId && selectedItem.paymentAttempts > 0 && (
                          <div className="px-3 py-2" style={{backgroundColor: '#E0E0E0'}}>
                            <div className="py-2">{moment(item?.receiptTimestamp).format('DD MMM YYYY')} {moment(item?.receiptTimestamp).format('HH:mm:ss')}</div>
                            <div className="w-100 d-flex justify-content-between align-items-center px-1" style={{borderBottom: '1px solid #E0E0E0'}}>
                              <div className="d-flex justify-content-start align-items-center">
                                <div onClick={() => this.setRowVisibility(item, index)}>
                                  <AccountBalanceWalletIcon style={{color: '#4C73AE'}}/>
                                </div>
                                <div className="ml-3">
                                  <h6 className="mb-2">{item?.debtorName}</h6>
                                  <h6 className="text-xs">{item?.status}</h6>
                                </div>
                              </div>
                              <div className="d-flex justify-content-end align-items-start">
                                <div>
                                  <h6 className="mb-2" style={{textAlign: 'right'}}>{item?.collectionCurrency} {item?.finalDueAmount}</h6>
                                  <h6 className="text-xs" style={{textAlign: 'right'}}>{item?.collectionReferenceNumber}</h6>
                                </div>
                              </div>
                            </div>
                          </div>
                        )} */}
                  </React.Fragment>
                ))}

              {this.state.serachedPaymentResultList && this.state.serachedPaymentResultList.length !== 0 && (<div>
                <ReactPaginate
                  previousLabel={'<'}
                  nextLabel={'>'}
                  breakLabel={''}
                  pageCount={this.state.totalPages}
                  marginPagesDisplayed={0}
                  pageRangeDisplayed={3}
                  onPageChange={this.handlePageChange}
                  containerClassName={'pagination justify-content-center'}
                  pageClassName={'page-item '}
                  pageLinkClassName={'page-link rounded-circle mx-1 my-2'}
                  previousClassName={'page-item'}
                  previousLinkClassName={'page-link rounded-circle mx-1 my-2'}
                  nextClassName={'page-item'}
                  nextLinkClassName={'page-link rounded-circle mx-1 my-2'}
                  breakClassName={'page-item'}
                  breakLinkClassName={'page-link'}
                  activeClassName={'active'}
                  forcePage={this.state.initalPage}
                />
              </div>)}

              {this.state.serachedPaymentResultList && this.state.serachedPaymentResultList.length === 0 && (<div>
                <h6 className="text-align-center my-5">No Transactions Found</h6>
              </div>)}

            </div>

            {showModal && this.state.isDeviceMobile && (
              <ConfirmDialog
                title="Warning"
                open={true}
                setOpen={true}
                isDeviceMobile={true}
                className="font-poppins dialog-width-mobile"
              >
                <h5 className="mb-4">Refund Request</h5>
                <span>
                  <h6 className="mb-2 font-weight-normal">Select Refund Type Mobile{" "}</h6>
                  <input
                    disabled={this.state.paymentAttempts > 0 ? true : false}
                    type="radio"
                    value="Full Refund"
                    id="fullRefund"
                    onChange={this.handleOnChange}
                    name="refundType"
                    checked={selectedOption === "Full Refund"}
                  />
                  <label htmlFor="fullRefund" className="ml-1 text-xs">Full Refund</label>
                  <input
                    className="ml-2"
                    type="radio"
                    value="Partial Refund"
                    id="partialRefund"
                    onChange={this.handleOnChange}
                    name="refundType"
                    checked={selectedOption === "Partial Refund"}
                  />
                  <label htmlFor="partialRefund" className="ml-1 text-xs">Partial Refund</label>
                </span>
                <br />
                <br />

                <div className="row ml-0">
                  <h6 className="font-weight-normal refund-amount-mobile">Refund Amount</h6>
                  <br />
                  <TextField
                    size="small"
                    disabled={true}
                    onChange={this.handleRefundCcyChange}
                    value={this.state.refundCcy}
                    className="ml-2 refund-amount-ccy-mobile"
                  ></TextField>
                  <TextField
                    type={"number"}
                    label="Amount"
                    size="small"
                    disabled={
                      this.state.selectedOption === "Full Refund" ? true : false
                    }
                    className="ml-1 pl-1 refund-amount-change-mobile"
                    onChange={this.handleRefundAmountChange}
                    value={this.state.refundAmount}
                  ></TextField>
                </div>
                <br />
                <span>
                  <h6 className="mb-2 font-weight-normal"> Reason For Refund</h6>
                  <textarea
                    className="refund-reason-mobile"
                    placeholder={"Enter reason for refund"}
                    onChange={this.handleRefundReason}
                    value={this.state.refundReason}
                  ></textarea>
                </span>
                <br />

                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={refundLoading}
                  onClick={this.handleClose}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>

                <ButtonPrimary onClick={this.confirmRefund} disabled={refundLoading} className="w-100 mt-1">
                  Confirm
                </ButtonPrimary>
                <button
                  onClick={this.cancelRefund}
                  className="close-btn-dialog-mobile"
                  disabled={refundLoading}
                >
                  <CloseIcon />
                </button>
              </ConfirmDialog>
            )}

            {showCancellationModal && this.state.isDeviceMobile && (
              <ConfirmDialog
                title="Warning"
                open={true}
                setOpen={true}
                dialogPadding={0}
                className="dialog-width-mobile"
              >
                <h5 className="mb-4">Cancellation Request</h5>

                <h6 className="font-weight-normal">Do you really want to Cancel this payment request</h6>

                <button
                  onClick={() =>
                    this.setState({ showCancellationModal: false })
                  }
                  className="close-btn-dialog-mobile"
                  disabled={refundLoading}
                >
                  <CloseIcon />
                </button>
                <ButtonPrimary
                  className="w-100 mt-1"
                  onClick={() =>
                    this.setState({
                      showCancellationModal: false,
                      showCancellationReason: true,
                    })
                  }
                >
                  Yes
                </ButtonPrimary>
              </ConfirmDialog>
            )}

            {/* Reminder Modal */}
            {showReminderModal && this.state.isDeviceMobile && (
              <ConfirmDialog
                id="confirmDialogModal"
                title="Warning"
                open={true}
                setOpen={true}
                dialogPadding={0}
                className="dialog-width-mobile"
              >
                <h5 className="mb-4">Send Payment Reminder</h5>

                <h6 className="font-weight-normal">An email reminder will be sent to payer.. Please confirm</h6>

                <button
                  onClick={() =>
                    this.setState({ showReminderModal: false })
                  }
                  className="close-btn-dialog-mobile"
                  disabled={refundLoading}
                >
                  <CloseIcon />
                </button>
                <ButtonPrimary
                  className="w-100 mt-1"
                  onClick={() => {
                    this.sendReminder();
                    this.setState({
                      showReminderModal: false,
                    })
                  }
                  }
                >
                  Send Reminder
                </ButtonPrimary>
              </ConfirmDialog>
            )}

            {showCancellationReason && this.state.isDeviceMobile && (
              <ConfirmDialog
                className="dialog-width-mobile"
                title="Warning"
                open={true}
                setOpen={true}
                dialogPadding={0}
              >
                <h6>Reason for cancellation</h6>

                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={isCancellationProcessing}
                  onClick={this.handleClose}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>

                <textarea
                  className="cancel-reason-mobile"
                  onChange={(e) =>
                    this.setState({ cancellationReason: e.target.value })
                  }
                  value={cancellationReason}
                ></textarea>

                <div className="suggested-reasons mt-2">
                  <span className="d-block py-2">
                    <h6 className="font-weight-normal">Suggested Reasons: </h6>
                  </span>
                  <div className="reasons">
                    <span
                      className="text-primary text-underline cursor-pointer text-xs"
                      onClick={() =>
                        this.setState({ cancellationReason: "Already Paid" })
                      }
                    >
                      Already Paid
                    </span>
                    <span
                      className="text-primary text-underline cursor-pointer ml-3 text-xs"
                      onClick={() =>
                        this.setState({
                          cancellationReason: "Incorrectly sent earlier",
                        })
                      }
                    >
                      Incorrectly sent earlier
                    </span>
                    <br />
                    <span
                      className="text-primary text-underline cursor-pointer text-xs"
                      onClick={() =>
                        this.setState({
                          cancellationReason: "Payer requested cancellation",
                        })
                      }
                    >
                      Payer requested cancellation
                    </span>
                    <span
                      className="ml-3 text-primary text-underline cursor-pointer text-xs"
                      onClick={() =>
                        this.setState({ cancellationReason: "Amount Charged" })
                      }
                    >
                      Amount Charged
                    </span>
                  </div>
                </div>

                <div className="d-flex justify-content-end">
                  <button
                    onClick={() =>
                      this.setState({ showCancellationReason: false, cancellationReason: '' })
                    }
                    className="close-btn-dialog-mobile"
                    disabled={refundLoading}
                  >
                    <CloseIcon />
                  </button>
                  <ButtonPrimary
                    className="w-100 mt-2 bg-primary text-white"
                    onClick={this.submitCancellationRequest}
                    disabled={!cancellationReason || loading}
                  >
                    <span className="text-white">Submit</span>
                  </ButtonPrimary>
                </div>
              </ConfirmDialog>
            )}

            {showConfirmationModal && this.state.isDeviceMobile && (
              <ConfirmDialog title="Warning" open={true} setOpen={true}>
                <h6 className="font-weight-normal" >Success!!! your refund has been successfully initiated</h6>
                <br />
                <ButtonPrimary className="w-100 mt-2" onClick={this.confirmBack}>OK</ButtonPrimary>
              </ConfirmDialog>
            )}

            {showFailureModal && this.state.isDeviceMobile && (
              <ConfirmDialog title="Warning" open={true} setOpen={true}>
                <b>
                  {
                    "An error occurred during the refund operation, please contact <contact@benepay.io> quoting the error details below."
                  }
                </b>
                <br />
                <b>
                  {
                    this.state.errorDesc
                  }
                </b>

                <br />
                <br />

                <ButtonPrimary className="w-100 mt-2" onClick={this.confirmBack}>OK</ButtonPrimary>
              </ConfirmDialog>
            )}

          </div>
        )}

      </div>

    </div>
  );
}

// export function getSearchedItem(selectedItem, context) {
//     console.log("transactionid ", selectedItem);
//     console.log("context.state.serachedPaymentResultList ", context.state.serachedPaymentResultList);
//     return (

//     )
// }


function getPaymentRefundTimestamp(date) {
  const tempDate = date.toLocaleString("en-GB", {
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const modifiedDate = formatDate.format(new Date(date));
  return modifiedDate;
}

const formatDate = new Intl.DateTimeFormat("en",
  {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }
);

function humanize(str) {
  var i, frags = str.split('_');
  for (i = 0; i < frags.length; i++) {
    frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
  }
  return frags.join(' ');
}
