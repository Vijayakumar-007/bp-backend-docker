import React, { Component } from 'react';
import { html } from './merchant.html'; // Importing HTML template
import { toast } from 'react-toastify';
import { DashboardService } from '../../../service/api/dashboard.service'
import Utils from '../../../service/core/utils';
import { BenepayUserService } from '../../../service/api/benepay-user.service';

/**
 * @author Vijayakumar
 * 
 * Class created to handle merchants and merchant summary events
 */
class Merchant extends Component {
  
  constructor(props) {
    super(props);

    // Initializing component state
    this.state = {
      value: 0,
      self: '', 
      isApiCalled: false,
      merchantSummary: [], // Array to store merchant summary data
      rowsWithId:[],
      columns:[    
        // Define the columns for the data grid
        { field: 'merchantId', headerName: 'ID', width: 325, flex: 1, headerClassName: 'blue-header' },
        { field: 'merchantName', headerName: 'Name', width: 325, flex: 1, headerClassName: 'blue-header' },
        { field: 'emailIdForNotifications', headerName: 'Email', width: 325, flex: 1, headerClassName: 'blue-header' },
        { field: 'phone', headerName: 'Phone', width: 325, flex: 1, headerClassName: 'blue-header' },
        { field: 'status', headerName: 'Status', width: 325, flex: 1, headerClassName: 'blue-header' },
        { field: 'merchantAddress', headerName: 'Address', width: 325, flex: 1, headerClassName: 'blue-header' },
        
      ],
    };
  }

  handleChange = (ev) => {
    // Handling changes in the input field
    this.setState({ self: ev.target.value });
    this.getAllMerchant(); // Calling a method to fetch merchant data
  };

  GetMerchantSummaryIds =() => {
    this.setState({ rowsWithId:
      this.state.merchantSummary.map((row, index) => ({ // Map rows to add 'id', 'status', 'phone', and 'email' propertie
        ...row,
        id: index,
        status: 'Active',
        phone: '-',
        emailIdForNotifications: row.emailIdForNotifications || '-',// You can use index as a unique id if emailIdForNotifications is not available
      }))
    })
  };

  handleDownloadClick = () => {  // Handle the click event for the Download button
    const currentDate = new Date();
    const formattedDate = Utils.formatTwoDigitMonth(currentDate);
    const filename = `merchant_summary_${formattedDate}.csv`;//Csv file name and date format 
    const csvHeaders = this.state.columns.map((column) => column.headerName).join(",");
    const csvData = this.state.rowsWithId.map((row) => this.state.columns.map((column) => row[column.field]).join(",")).join("\n");
    const csvContent = csvHeaders +  "\n" + csvData;
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");  // Create a download link and trigger the download
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  getAllMerchant = async () => {
    try {
      this.setState({ isApiCalled: true }); // Setting API call flag

      // Making an API request to get all merchant data
      const result = await BenepayUserService.getMerchants();

      if (result.data && result.data.merchantSummary ){
          // Updating the component state with merchant summary data
          this.setState({ merchantSummary: result.data.merchantSummary })
          this.GetMerchantSummaryIds();
      }
      
      if (result.data.status !== '200') {
        // Displaying an error toast message if the API response has an error
        toast.error(result.data.message);
        return;
      }

    } catch (error) {
      console.error(error);
    }
  };

  componentDidMount = async () => {
    // Calling the method to fetch merchant data when the component mounts
    this.getAllMerchant()
  }
  
  // Rendering the component using the HTML template
  render = () => html.apply(this);
}

export default Merchant;
