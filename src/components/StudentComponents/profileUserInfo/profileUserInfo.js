import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from 'react-bootstrap/Button';
import classes from './profileUserInfo.module.css';
import Form from 'react-bootstrap/Form';

const userInfoContent = (props) =>{

    //Data will be sorted as this in the array:
    //name, email,major,mobileNo,studyPlan, password
    let tempData = [ "","","","","",""];

    const handleChange = (inputType,event) =>{
       switch(inputType){
          case "name":
            tempData[0]= event.target.value;
            break;
          case "email":
            tempData[1]= event.target.value;
            break;
          case "major":
            tempData[2]= event.target.value;
            break;
          case "mobileNo":
            tempData[3]= event.target.value;
            break;
          case "studyPlan":
            tempData[4]= event.target.value;
            break;
          case "password":
            tempData[5]= event.target.value;
            break;
          default:
            tempData[6]=event.target.value;
            break;
       }
    }


    return(
      <div className={classes.UserInfo}>
      
      <form className={classes.root} noValidate autoComplete="off">
        <img src={props.userInfo.profilePic} className={classes.ProfilePic}/>
        <Form.Group>
          <Form.File 
          label="Profile Picture" 
          className={props.type=="edit"?null:classes.imageEdit} 
          onChange={(event)=>handleChange("ProfilePic",event)}/>
        </Form.Group>
        <br/><br/><br/>
        <span>NAME</span>
        <TextField 
        id="username-input" 
        placeholder={props.userInfo.username} 
        disabled={props.disable} 
        className={classes.TextField}
        onChange={(event)=>handleChange("name",event)}/>

        <br/><br/>
        <span>EMAIL</span>
        <TextField 
        id="email-input" 
        placeholder={props.userInfo.email} 
        disabled={props.disable} 
        className={classes.TextField}
        onChange={(event)=>handleChange("email",event)}/>

        <br/><br/>
        <span>MAJOR</span>
        <TextField 
        id="major-input" 
        placeholder={props.userInfo.major} 
        disabled={props.disable} 
        className={classes.TextField}
        onChange={(event)=>handleChange("major",event)}/>

        <br/><br/>
        <span>MOBILE NO.</span>
        <TextField 
        id="mobile-input" 
        placeholder={props.userInfo.phoneNum} 
        disabled={props.disable} 
        className={classes.TextField}
        onChange={(event)=>handleChange("mobileNo",event)}/>

        <br/><br/>
        <span>STUDY PLAN</span>
        <TextField 
        id="plan-input" 
        placeholder={props.userInfo.studyPlan} 
        disabled={props.disable} 
        className={classes.TextField}
        onChange={(event)=>handleChange("studyPlan",event)}/>

        <br/><br/>
        <span>PASSWORD</span>
        <TextField 
        id="password-input" 
        type="password" 
        placeholder={"something"} 
        disabled={props.disable} 
        className={classes.TextField}
        onChange={(event)=>handleChange("password",event)}/>
      </form>
      <Button 
      className={classes.Button} 
      onClick={props.handleClicking(tempData)}> {props.buttonText} </Button>
    </div>   
    );
    
}
export default userInfoContent;
