import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import MenuIcon from '@material-ui/icons/Menu';
import classes from './Drawer.module.css';
import Logo from '../../../logo/logo';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DateRangeIcon from '@material-ui/icons/DateRange';
import ComputerIcon from '@material-ui/icons/Computer';
import DrawerItem from './drawerItem/drawerItem';
import { withRouter } from 'react-router-dom';

class LocalDrawer extends Component{

  state={
    //For the Material UI Drawer
    left:false,
    disableHome:false,
    disableProfile:false,
    disableExams:false,
  };

  toggleDrawer(open){
    
    this.setState({left:open});
  };

  handleHomeBtn =()=>{
      this.props.history.push("/Homepage");
      this.setState(
        {
          disableExams:false,
          disableHome:true,
          disableProfile:false
        }
        );
  }

  handleProfileBtn =()=>{
    this.props.history.push("/Profile");
    this.setState(
      {
        disableExams:false,
        disableHome:false,
        disableProfile:true
      }
      );
}

handleExamsBtn =()=>{
  this.props.history.push("/MainExams");
  this.setState(
    {
      disableExams:true,
      disableHome:false,
      disableProfile:false
    }
    );
}

handleLogoutBtn=()=>{
  this.props.history.push("/");
}

render(){
  return (
    <div>
        <React.Fragment>
          <MenuIcon 
          hidden={!this.props.menuIconToggle} 
          onClick={()=>this.toggleDrawer(true)}/>

          <Drawer 
          anchor={'left'} 
          open={this.state.left} 
          onClose={()=>this.toggleDrawer(false)} >

            <div
            className={classes.Drawer}
            onClick={()=>this.toggleDrawer(false)}
            onKeyDown={()=>this.toggleDrawer(false)} >

              <Logo/>
              <List>
                <DrawerItem 
                disable={this.state.disableHome} 
                text={'Notes & Pastpapers'} 
                click={this.handleHomeBtn}> <HomeIcon className={classes.icons} /> </DrawerItem>
                <DrawerItem 
                disable={this.state.disableExams} 
                text={'Online Exams'} 
                click={this.handleExamsBtn}> <ComputerIcon className={classes.icons}/> </DrawerItem>
                 <DrawerItem 
                disable={this.state.disableProfile} 
                text={'Profile'} 
                click={this.handleProfileBtn}> <DateRangeIcon className={classes.icons}/> </DrawerItem>
                <DrawerItem 
                text={'logout'} 
                click={this.handleLogoutBtn}> <ExitToAppIcon className={classes.icons}/> </DrawerItem>
              </List>
            </div>

          </Drawer>
        </React.Fragment>
    </div>
  );
}
  
}

export default withRouter(LocalDrawer);
