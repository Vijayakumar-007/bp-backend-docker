import React, {Component, Fragment} from 'react';
import AppFooter from "./app-footer/app-footer";
import AppHeader from "./app-header/app-header";
import AppNavDrawer from "../$widgets/app-nav-drawer/app-nav-drawer";
import {TempStorage, USER_TYPE} from "../../service/core/storage.service";
import Action from "../../redux/action";
import {connect} from "react-redux";
// import {Route} from "../../app-router";
import {BrowserRouter, HashRouter as Router, Redirect, Route, Switch, Outlet} from "react-router-dom";
import {GuestRouter, AdminRouter} from "../../app-router";


class AppFrame extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        const {match} = this.props;

        return (
            <>
            <AppHeader/>
            <div className={'app-frame-main'}>
                 <AppNavDrawer />
                <main className={'app-container mb-sm-5 p-0 p-lg-2'}>
                    <GuestRouter/>
                    <AdminRouter/>
                </main>
            </div>
                <AppFooter/>
            </>
        );
    }

    onWindowResize = () => {
        const device = {
            width: document.documentElement.clientWidth,
            scale: 0,
            breakpoint: 'xs'
        }
        if (device.width > 1024) {
            device.scale = 3;
            device.breakpoint = 'lg';
            this.props.dispatch({type: Action.UpdateDevice, device});
        } else if (device.width > 768) {
            device.scale = 2;
            device.breakpoint = 'md';
            this.props.dispatch({type: Action.UpdateDevice, device});
        } else if (device.width > 600) {
            device.scale = 1;
            device.breakpoint = 'sm';
            this.props.dispatch({type: Action.UpdateDevice, device});
        } else {
            device.scale = 0;
            device.breakpoint = 'xs';
            this.props.dispatch({type: Action.UpdateDevice, device});
        }
    };

    componentDidMount = () => {
        this.onWindowResize();
        window.addEventListener('resize', this.onWindowResize);
    }
}

function mapStateToProps(state) {
    return {
        device: state.device,
    }
}

export default connect(mapStateToProps)(AppFrame);
