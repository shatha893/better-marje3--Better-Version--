import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from 'react-bootstrap/Button';
import classes from './profileUserInfo.module.css';
import Form from 'react-bootstrap/Form';
import noPic from '../../../Assets/no_pic_try2.png';

const userInfoContent = (props) =>{

    //Data will be sorted as this in the array:
    //name, email,major,mobileNo,studyPlan, password
    let newData={
      username:props.userInfo === null?null:props.userInfo.name,
      profilePic:null,
      email:null,
      major:null,
      mobileNum:null,
      studyPlan:null,
      password:null
    };

    const handleChange = (inputType,event) =>{
       switch(inputType){
          case "name":
           newData.username = event.target.value;
            break;
          case "email":
           newData.email= event.target.value;
            break;
          case "major":
           newData.major = event.target.value;
            break;
          case "mobileNo":
           newData.mobileNo = event.target.value;
            break;
          case "studyPlan":
            newData.studyPlan= event.target.value;
            break;
          case "password":
            newData.password = event.target.value;
            break;
          case "profilePic":
            let reader = new FileReader();
            reader.onload = (e)=>{
              newData.profilePic = e.target.result;
            };
            reader.readAsDataURL(event.target.files[0]); 
            console.log("ProfilePic --> ",newData.profilePic);
            break;
          default:
            newData.password =event.target.value;
            break;
       }
    }


    return(
      <div className={classes.UserInfo}>
      {props.userInfo === null?null:
      <form className={classes.root} noValidate autoComplete="off">
        <img src={props.userInfo.profilePic==null
        ?noPic
        :`data:image/jpeg;base64,${props.userInfo.profilePic}`} 
        className={props.type=="edit"
          ?classes.hideImage
          :classes.ProfilePic}/>
        <Form.Group>
          <Form.File 
          className={props.type=="edit"?classes.changeImage:classes.hideImage} 
          onChange={(event)=>handleChange("profilePic",event)}/>
        </Form.Group>
        <br/><br/><br/>
        <span>NAME</span>
        <TextField 
        id="username-input" 
        placeholder={props.userInfo.name} 
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
      }
      <Button 
      className={classes.Button} 
      onClick={()=>props.handleClicking(newData)}> {props.buttonText} </Button>
    </div>   
    );
    
}
export default userInfoContent;
