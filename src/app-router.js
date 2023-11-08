import React, {Component, Fragment} from 'react';
import {BrowserRouter, HashRouter, Redirect, Route, Switch} from "react-router-dom";
import Home from './components/home/home'
import AppFrame from "./components/app-frame/app-frame";
import fileUpload from './components/file-upload/file-upload';
import Reports from './components/reports/reports';
import { USER_TYPE } from '../src/service/core/storage.service';
import {TempStorage} from "../src/service/core/storage.service";
import UploadSettlement from "./components/admin/upload-settlement/upload-settlement";
import Merchant from './components/admin/merchants/merchant';

export default class AppRouter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BrowserRouter>
                <Route exact path='/' component={Home}/>
                <Route path='/' component={AppFrame}/>
            

                

            </BrowserRouter>
        );
    }

   
};

export const GuestRouter = () => {
    return (
        <>
            <Route exact path={`/`}>
                <Redirect to={`/home`}/>
            </Route>
           
            <Route exact path='/home' component={Home}/>
            <Route exact path='/file-upload' component={fileUpload}/>
            <Route exact path='/reports' component={Reports}/>
            <Route exact path={`*`}>
                <Redirect to={`/home`}/>
            </Route>
        </>
    );
};

export const AdminRouter= () => {
    return (
        <>
            <AdminUser>
                <Route exact path='/merchants' component={Merchant}/>
                <Route exact path='/upload-settlement' component={UploadSettlement}/>
            </AdminUser>
        </>
    );
};

function AdminUser({children}){
    if(TempStorage.loginUserRole === USER_TYPE.ADMIN_USER){
        return <>{children}</>;
    }else{
        return <></>;
    }
}