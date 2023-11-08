import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import SearchIcon from '@material-ui/icons/SearchOutlined';
import BackupIcon from '@material-ui/icons/BackupOutlined';
import EventNoteOutlinedIcon from '@material-ui/icons/EventNoteOutlined';
import PrintOutlinedIcon from '@material-ui/icons/PrintOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import { useHistory } from "react-router-dom";
import PaymentIcon from '@material-ui/icons/Payment';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AssessmentIcon from '@material-ui/icons/Assessment';
import { GuestRouter } from '../../../app-router';
import { Auth } from 'aws-amplify';
import { toast } from 'react-toastify';
import './app-nav-drawer.scss'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import StoreOutlinedIcon from '@material-ui/icons/StoreOutlined';
import {StorageService, TempStorage, USER_TYPE} from "../../../service/core/storage.service";
import AccountBalance from '@material-ui/icons/AccountBalance';
import AssignmentInd from '@material-ui/icons/AssignmentInd';
import ReceiptIcon from '@material-ui/icons/Receipt';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

const drawerWidth = 240;


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    position: 'relative',
    height: '90vh',
    background: '#fafafa',
    marginTop: '15px'
  },
  content: {
    flexGrow: 1,
    padding:  '0 24px',
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [menu, setMenu] = useState('Transaction Summary')

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    console.log('location.pathname ', location.pathname)
    if (location.pathname.includes('merchants')) {
      setMenu('Merchants')
      return;
    }
    if (location.pathname.includes('file-upload')) {
      setMenu('Upload File')
      return;
    }
    if (location.pathname.includes('home')) {
      setMenu('Transaction Summary')
      return
    }
    if (location.pathname.includes('upload-settlement')) {
      setMenu('Settlement File Upload')
      return
    }
    if (location.pathname.includes('reports')) {
      setMenu('Reports')
      return
    }
    if (location.pathname.includes('merchants')) {
      setMenu('Merchant')
      return
    }
  })

  const signOut = async () => {
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

  const redirectToRequestedPage = (path, isSettlementRequested, selectedMenu) => {
    setMenu(selectedMenu)
    if (isSettlementRequested) {
      history.push({pathname: path, state: {isSettlementRequested: true}})
      return;  
    }
    history.push(path)
  }

  const merchantItems = [
    {
      text: 'Transaction Summary',
      icon: PaymentIcon,
      onClick: () => redirectToRequestedPage("/home", false, 'Transaction Summary')
    },
    {
      text: 'Upload File',
      icon: BackupIcon,
      onClick: () => redirectToRequestedPage("/file-upload", false, 'Upload File'),
    },
    {
      text: 'Reports',
      icon: InsertDriveFileIcon,
      onClick: () => redirectToRequestedPage("/reports", false, 'Reports') 
    }
  ];

  const loginFunctionItems = [
    {
      text: 'Sign Out',
      icon: ExitToAppOutlinedIcon,
      onClick: () => signOut(),
    },
  ]

  const benePayUserItems = [
    {
      text: 'Settlement File Upload',
      icon: AccountBalance,
      onClick: () => redirectToRequestedPage("/upload-settlement", false, 'Settlement File Upload')
    },
    {
      text: 'Merchant Summary',
      icon: StoreOutlinedIcon,
      onClick: () => redirectToRequestedPage("/merchants", false, 'Merchant')
    },
    // {
    //   text: 'Merchants',
    //   icon: AssignmentInd,
    //   onClick: () => redirectToRequestedPage("/merchants", false, 'Merchants'),
    // },
  
    // {
    //   text: 'Billings',
    //   icon: ReceiptIcon,
    //   onClick: () => redirectToRequestedPage("/billings", true, 'Billings') 
    // },

    // {
    //   text: 'Users',
    //   icon: PeopleAltIcon,
    //   onClick: () => redirectToRequestedPage("/users", true, 'Users') 
    // },
  
  ];

  let menuItems = merchantItems;

  if(TempStorage.loginUserRole === USER_TYPE.ADMIN_USER){
    menuItems = menuItems.concat(benePayUserItems);
  }

  menuItems = menuItems.concat(loginFunctionItems)

  const drawer = (
    <div>
      <List>
      {menuItems.map(({ text, icon: Icon, onClick }, index) => (
            <ListItem button key={text} onClick={onClick}>
            <ListItemIcon>
              <Icon />
            </ListItemIcon>
            <ListItemText primary={text} style={{color: menu === text && '#346799'}} />
          </ListItem>  
          ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
