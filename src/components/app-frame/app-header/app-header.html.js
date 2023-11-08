import React from 'react';
import logo from "../../../assets/images/logo.jpeg";
import vm from "../../../assets/images/vm.jpg";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {AppAccountIcon, AppExitIcon, AppMenuIcon, AppPaymentIcon} from "../../$widgets/icons/app-icons";
import IconButton from "@material-ui/core/IconButton";
import benepayLogo from "../../../assets/images/benepay.png";

import { MerchantName } from '../../$widgets/merchant-name/MerchantName';

export function html() {
    const {beneficiaryName, drawerOpen, logoUrl, merchantName, activeMenu, fullMerchantName} = this.state;
    const {device} = this.props;

    return (
        <nav className="navbar app-header-main navbar-expand-sm navbar-light text-white">
            {device.scale < 2 ?
                <div className="header-content">
                    
                    <div className='logo d-flex align-items-center text-white'>
                        {/* <p style={{marginTop:'10px',fontSize:'20px'}}>benepay</p> */}
                        <img className={'benepay-logo'} src={benepayLogo} alt=""/>  
                    </div>

                    <IconButton onClick={this.toggleDrawer} className='p-0' ><AppMenuIcon className='text-white m-0 p-0'/></IconButton>

                    <ul className={`drawer ${drawerOpen ? 'drawer-open' : ''}`}>
                        <li onClick={this.handleNavigate}>
                            <AppPaymentIcon/>
                            <p>Transaction Summary</p>
                        </li>
                        <li onClick={this.signOut}>
                            <AppExitIcon/>
                            <p>Sign Out</p>
                        </li>
                    </ul>

                    {/* <div className='user-section'>
                    
                        <AppAccountIcon/>
                        <span>{merchantName}</span>
                    </div> */}
                </div> :

                <div className="header-content">
                    <div className='logo d-flex align-items-center'>
                        
                    { merchantName !== "" && <MerchantName merchantName={merchantName} type="image"/>}
                    </div>

                    <div className='d-flex' style={{ marginLeft: "100px" }}>
                    </div>

                    <div className='d-flex align-items-center' style={{marginLeft:"100px"}}>
                        {merchantName ?
                        <div className='d-flex align-items-center' style={{marginLeft:"100px"}}>
                    <img className={'merchant-logo '} src={logoUrl} alt=""/>    
                        <p style={{fontSize:"15px"}}className="mt-1 my-3 pl-3  cursor-pointer text-capitalize" ><MerchantName merchantName={merchantName} type="text"/></p>
                    </div> :
                    <div className='d-flex align-items-center' style={{marginLeft:"100px"}}>
                        <AccountCircleIcon className={"mt-2 mr-2"} style={{fontSize: "40px"}}/>
                        <span style={{position: 'relative', top: '4px', marginLeft: '6px'}}>Guest</span>
                    </div>}
                    </div>
                </div>}


            {drawerOpen && <div className={'backdrop'} onClick={this.toggleDrawer}/>}
        </nav>
    );
};
