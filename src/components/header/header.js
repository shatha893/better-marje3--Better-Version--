import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Image from 'react-bootstrap/Image';
import cssClasses from './header.module.css';
import Drawer from '../StudentComponents/UI/Drawer/Drawer';
import Logo from '../logo/logo';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  }, 
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const ButtonAppBar=(props)=> {
  const classes = useStyles();

  //The content I want to manipulate depending on the pageType
  let menuIcon = null;
  let loginSignupButtons = null;
  let userProfile = null;
  let logoutButton = null;
  let isAdmin=false;

  const openProfile = () =>{
    props.history.push('/Homepage/Infopage');
  }
  
  //Depending on pageType specific content will be shown on the header
  const pageConfigs = (pageType,userType="student")=>{
    if(userType == "Admin") isAdmin = true;
    //Guestpage Configurations
    if(pageType == "Guest")
    {
      menuIcon = false;
      logoutButton=null;
      loginSignupButtons= <>
                            <Button 
                            color="inherit" 
                            onClick={props.showLoginModal} 
                            show={props.showLoginButton}> login </Button>

                            <Button 
                            color="inherit" 
                            onClick={props.showSignupModal} 
                            show={props.showSignupButton}> Sign up </Button>
                          </>;
      userProfile=null;
    }

    //Profilepage Configurations
    else if(pageType == "Profile")
    {
      menuIcon=true;
      loginSignupButtons= null;
      userProfile=null;
      logoutButton=null;
    }
    else if(pageType == "AdminHome")
    {
      menuIcon=false;
      loginSignupButtons = null;
      logoutButton= <>
                       <Button color="inherit"> logout </Button>
                    </>
    }

     //Any other page Configurations
     else
     {
       menuIcon = true;
       loginSignupButtons= null;
       logoutButton=null;
       userProfile = <>
                        <Image 
                        src={props.avatar} 
                        roundedCircle 
                        className={cssClasses.profilePic}/>
                        <Button className={cssClasses.profile} onClick={openProfile}>{props.userName}</Button>
                     </>
          
     }
  
  };
  

  return (
    <div className={classes.root} onLoad={pageConfigs(props.pageType,props.userType)}>
      <AppBar position="static" className={classes.AppBar}>
        <Toolbar className={cssClasses.Toolbar}>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <Drawer menuIconToggle={menuIcon}/>
          </IconButton>
          <Logo/>
          <Typography 
          variant="h6" 
          className={classes.title}>
            <a 
            href={isAdmin?"/AdminHome":"/Homepage"}
            className={cssClasses.title}>
              A Better Marje3
            </a>
          </Typography>
          {loginSignupButtons}
          {logoutButton}
          {userProfile}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(ButtonAppBar);
