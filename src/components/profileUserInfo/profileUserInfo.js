import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from 'react-bootstrap/Button';
import classes from './profileUserInfo.module.css';

const userInfoContent = (props) =>{

    return(
      <div className={classes.UserInfo}>
      
      <form className={classes.root} noValidate autoComplete="off">
        <img src={props.userInfo.profilePic} className={classes.ProfilePic}/>
        <br/><br/><br/>
        <span>NAME</span>
        <TextField 
        id="username-input" 
        placeholder={props.userInfo.username} 
        disabled={props.disable} 
        className={classes.TextField}/>

        <br/><br/>
        <span>EMAIL</span>
        <TextField 
        id="email-input" 
        placeholder={props.userInfo.email} 
        disabled={props.disable} 
        className={classes.TextField}/>

        <br/><br/>
        <span>MAJOR</span>
        <TextField 
        id="major-input" 
        placeholder={props.userInfo.major} 
        disabled={props.disable} 
        className={classes.TextField}/>

        <br/><br/>
        <span>MOBILE NO.</span>
        <TextField 
        id="mobile-input" 
        placeholder={props.userInfo.phoneNum} 
        disabled={props.disable} 
        className={classes.TextField}/>

        <br/><br/>
        <span>STUDY PLAN</span>
        <TextField 
        id="plan-input" 
        placeholder={props.userInfo.studyPlan} 
        disabled={props.disable} 
        className={classes.TextField}/>

        <br/><br/>
        <span>PASSWORD</span>
        <TextField 
        id="password-input" 
        type="password" 
        placeholder={"something"} 
        disabled={props.disable} 
        className={classes.TextField}/>
      </form>
      <Button 
      className={classes.Button} 
      onClick={props.handleClicking}> {props.buttonText} </Button>
    </div>   
    );
    
}
export default userInfoContent;
