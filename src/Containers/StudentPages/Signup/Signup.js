import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Axios from 'axios';
import Alert from '../../../components/StudentComponents/UI/anAlert/anAlert';
import classes from './Signup.module.css';
import MyTooltip from '../../../components/StudentComponents/UI/tooltip/tooltip';
import DropdownList from '../../../components/StudentComponents/UI/DropdownList/DropdownList';
import Dropdown from 'react-bootstrap/Dropdown';

class SignupModal extends Component{

  state= {
      username:{
        value:"",
        label:"Username",
        type:"text",
        controlId:"formBasicUserName"
      },
      uniEmail:{
        value:"",
        label:"University Email",
        type:"text",
        controlId:"formBasicUniEmail",
        tooltipText:"Please enter your univesity email"
      },
      phoneNum:{
        value:"",
        label:"Phone Number",
        type:"text",
        controlId:"formBasicPhoneNum"
      },
      password:{
        value:"",
        label:"Password",
        type:"password",
        controlId:"formBasicPassword",
        tooltipText:"Password must be at least 6 characters and has "+
        "numbers, special symbols, capital letters and small letters"
      },
      studyPlan:{
        value:"",
        label:"Study Plan",
        type:"text",
        controlId:"formBasicStudyPlan",
        tooltipText:"Input the year that represents your study plan. E.g 2020"
      },
      majorValues:[],
      chosenMajor:"",
      
      profilePic:"",
      hideSuccessAlert:true,
      hideWarningAlert:true
  }

  componentDidMount = ()=>{
    Axios.post("http://localhost:1234/Major/GetAll",{
      offset:0,
      count:99999
    })
    .then(response=>{
      return Axios.post("http://localhost:1234/Major/Get",response.data);
    })
      .then(response =>{
        console.log(response);
        this.setState({majorValues:response.data});
    })
    .catch(function (error) {
     console.log(error);
  })
}

   //Function to handle the change in the input "Form Control" value
   handleChange = (controlId,event)=>{
    switch(controlId)
    {
        case "formBasicUserName":
            this.setState({username:{
              ...this.state.username,
              value:event.target.value}
            });
            break;

        case "formBasicUniEmail":
            this.setState(
              {uniEmail:{
                ...this.state.uniEmail,
                value:event.target.value}
              });
            break;

        case "formBasicPassword":
            this.setState(
              {password:{
                ...this.state.password,
                value:event.target.value}
              });
            break;

        case "formBasicMajor":
            this.setState({major:{
              ...this.state.major,
              value:event.target.value}
            });
            break;

        case "formBasicStudyPlan":
          this.setState({studyPlan:{
            ...this.state.studyPlan,
            value:event.target.value}
          });
          break;
        
        case "formBasicPhoneNum":
          this.setState({phoneNum:{
            ...this.state.phoneNum,
            value:event.target.value}
          });
          break;

        default:
          let reader = new FileReader();
            reader.onload = (e)=>{
              this.setState({profilePic: e.target.result});
            };
            reader.readAsDataURL(event.target.files[0]);  
    }
}
//make drop down list
handleSubmit = ()=>{
    let data = {
      name:this.state.username.value,
      email:this.state.uniEmail.value,
      // major:this.state.chosenMajor,
      // phoneNum:this.state.phoneNum.value,
      password:this.state.password.value,
      profilePictureJpgBase64:this.state.profilePic.substr(23,this.state.profilePic.length),
      studyPlanId:this.state.studyPlan.value 
    };

     Axios.post("http://localhost:1234/User/Create",data)
      .then(response =>{
        console.log(response);
        this.setState({hideSuccessAlert:false});  
    })
    .catch((error)=>{
      this.setState({hideWarningAlert:false});
      // if (error.response) {
      //   // Request made and server responded
      //   console.log(error.response.data);
      //   console.log(error.response.status);
      //   console.log(error.response.headers);
      // } else if (error.request) {
      //   // The request was made but no response was received
      //   console.log(error.request);
      // } else {
      //   // Something happened in setting up the request that triggered an Error
      //   console.log('Error', error.message);
      // }
  
    });
  }

  handleCloseAlert = (variant) =>{
    if(variant == "success")
      this.setState({hideSuccessAlert:true});
    else
      this.setState({hideWarningAlert:true});
  }

  handleMajorClick = (majorName) =>{
    this.setState({chosenMajor:majorName});
  }

  render(){
    const inputs = {...this.state};
    let formGroups = [];

    for(let key in inputs){
      if(key == "password")
        break;
      formGroups.push({
        id:key,
        content:inputs[key]
      })

    }
    return (
      <>
        <Modal 
        show={this.props.show} 
        onHide={this.props.closeModal} 
        className={classes.Modal} 
        size="lg">
    
          {/* Modal's Title */}
          <Modal.Header 
          closeButton  
          className={classes.ModalHeader}>
            <Modal.Title 
            className={classes.ModalTitle}> 
              Signup 
            </Modal.Title>
          </Modal.Header>
    
          {/* Modal's Content */}
          <Modal.Body>
            <Form className={classes.ModalContainer}>
              <Row>
                  <Col>
                  { 
                    formGroups.map(formGroup=>(
                      <Form.Group 
                        key={formGroup.id} 
                        controlId={formGroup.content.controlId} 
                        className={classes.Titles}>
                        <Form.Label> {formGroup.content.label} </Form.Label>
                          <Form.Control 
                          type="text" 
                          className={classes.inputs} 
                          onChange={(event)=>this.handleChange(formGroup.content.controlId,event)}/>
                      </Form.Group>))
                  }
                  <DropdownList 
                  majors={this.state.majorValues}
                  text={this.state.chosenMajor !== ""?this.state.chosenMajor:"Choose your Major"}>
                    {this.state.majorValues.map((major,index)=>{
                       return(
                          <Dropdown.Item
                          key={index}
                          onClick={()=>this.handleMajorClick(major.name)}>{major.name}</Dropdown.Item>
                       );
                    })}
                  </DropdownList>
                  </Col>
                  <Col>
                    {/* Password Input */}
                    <Form.Group 
                    controlId={this.state.password.controlId}
                    className={classes.Titles}>
                      <Form.Label>{this.state.password.label}</Form.Label>
                      <MyTooltip tooltipText={this.state.password.tooltipText}>
                        <Form.Control 
                        type={this.state.password.type} 
                        className={classes.inputs}
                        onChange={(event)=>this.handleChange(this.state.password.controlId,event)}/>
                      </MyTooltip>
                    </Form.Group>
    
                    {/* Study Plan Input */}
                    <Form.Group 
                    controlId={this.state.studyPlan.controlId} 
                    className={classes.Titles}>
                        <Form.Label> {this.state.studyPlan.label} </Form.Label>
                        <MyTooltip tooltipText={this.state.studyPlan.tooltipText}>
                          <Form.Control 
                          type="text"  
                          className={classes.inputs} 
                          onChange={(event)=>this.handleChange(this.state.studyPlan.controlId,event)}/>
                        </MyTooltip>
                    </Form.Group>
  
                    {/* Profile picture */}
                    <Form.Group>
                      <Form.File  
                      label="Profile Picture" 
                      className={classes.ProfileAvatar} 
                      onChange={(event)=>this.handleChange("ProfilePic",event)}/>
                    </Form.Group>
                  </Col>
              </Row>
            </Form>
        </Modal.Body>

        <Modal.Footer className={classes.ModalFooter}>
            {/* An Alert to be shown as a result of successful Registration */}
            <Alert 
            hide={this.state.hideSuccessAlert} 
            close={()=>this.handleCloseAlert("success")}
            variant={"success"}
            title={"Successful Registration"}
            textContent={"Please check your email to verify :)"}/>

            <Alert 
            hide={this.state.hideWarningAlert} 
            close={()=>this.handleCloseAlert("warning")}
            variant={"warning"}
            title={"Something is wrong"}
            textContent={"Please Check the you provided everything correctly"}/>

            {/* Modal Submit Button */}
            <Button 
            className={classes.SubmitButton}  
            onClick={this.handleSubmit} 
            size="lg">
              Submit
            </Button>
        </Modal.Footer>
      </Modal>
    </>
    );
  }
  };

export default SignupModal;
