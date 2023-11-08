import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {html} from "./app-header.html";
import {withSnackbar} from "notistack";
import {connect} from "react-redux";
import {StorageService, TempStorage, StorageKeys} from "../../../service/core/storage.service";
import AuthService from "../../../service/core/auth.service";
import Action from "../../../redux/action";
import { DashboardService } from "../../../service/api/dashboard.service";
import {Auth} from '@aws-amplify/auth';
import { useHistory } from "react-router-dom"

class AppHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            beneficiaryName: '',
            drawerOpen: false,
            logoUrl: '',
            merchantName: '',
            activeMenu: 'transaction'
        }
    }

    toggleDrawer = () => {
        this.setState((state) => {
            return {
                drawerOpen: !state.drawerOpen
            }
        })
    }

    getMerchantName = (merchantName) => {
        
    }

    handleLogout = () => {
        StorageService.clearAll();
        TempStorage.loggedInUser = {};
        TempStorage.authToken = '';
        this.props.history.push('/guest-login')
    };

    getUserInfo = async () => {
        const response = await DashboardService.getUserInfo()
        if (!response) {
            return
        }
        this.setState({logoUrl: response?.logo, merchantName: response?.merchantName});
    }

    onExit = () => {
        if (this.props.location.pathname === '/guest/beneficiary-details' || this.props.location.pathname === '/guest/claim-summary') {
            new Action(this).emitCommonEvent();
        } else {
            this.handleLogout();
        }
    };

    onSignOut = () => {
        console.log('...signing out ....');
        Auth.signOut();
    }

    signOut = async () => {
        try {
            StorageService.clearAll();
            StorageService.clearAllLocalStorage();
            StorageService.clearAllTempStorage();
            await Auth.signOut();
        } catch (error) {
            toast.error('Something went wrong, please try again later');  
            console.log('error signing out: ', error);
        }
    }

    handleNavigateUpload = (route) => {
        if (route === '/file-upload') {
    this.setState({activeMenu: 'upload'})
        }    
    console.log('File upload clicked ')
    this.props.history.push(route)
    }

    handleNavigate = () => {
        this.setState({activeMenu: 'transaction'})    
        this.props.history.push('/home')

    };

    decideNavigationForPayment() {
        this.props.history.push('/home')
        
    }

    async componentDidMount() {
        await Auth.currentSession().then(res => {
            let jwt = res["idToken"]["jwtToken"]
            StorageService.set(StorageKeys.clientJwt, jwt);
            StorageService.set(StorageKeys.userEmail, res.accessToken.payload.username);
        })
        this.getUserInfo()
    }

    render = () => html.apply(this);
}

function mapStateToProps(state) {
    return {
        commonEvent: state.commonEvent,
        device: state.device,
    }
}

export default connect(mapStateToProps)(withRouter(withSnackbar(AppHeader)));
