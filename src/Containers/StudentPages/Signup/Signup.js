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
      password:{
        value:"",
        label:"Password",
        type:"password",
        controlId:"formBasicPassword",
        tooltipText:"Password must be at least 8 characters and has "+
        "at least one of these special symbols !@#$%^&*|\\+_.,"
      },
      studyPlanValues:[],
      chosenStudyPlan:{},
      majorValues:[],
      chosenMajor:"",
      
      profilePic:"",
      hideSuccessAlert:true,
      hideWarningAlert:true
  }

  componentDidMount = ()=>{
   this.getMajors();
   this.getStudyPlans();
}

getMajors = async() =>{
  let majorsIds = await Axios.post("http://localhost:1234/Major/GetAll",{
    offset:0,
    count:99999
  });
  let majorsData = await Axios.post("http://localhost:1234/Major/Get",majorsIds.data);
  this.setState({majorValues:majorsData.data});
}

getStudyPlans = () =>{
  Axios.post("http://localhost:1234/StudyPlan/GetAll",{
    offset:0,
    count:99999
  })
  .then(response=>{
    return Axios.post("http://localhost:1234/StudyPlan/Get",response.data);
  })
    .then(response =>{
      console.log("study plans (get request) ",response);
      let tempArr = [];
      response.data.map(studyPlan =>{
        tempArr.push({
          id:studyPlan.id,
          year:studyPlan.year,
          major:studyPlan.major.name
        });
      });
      this.setState({studyPlanValues:[...tempArr]});
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
    let tempArr = this.state.profilePic.split(',');
    let tempPP = tempArr[1];
    let data = {
      name:this.state.username.value,
      email:this.state.uniEmail.value,
      major:this.state.chosenMajor,
      password:this.state.password.value,
      profilePictureJpgBase64:this.state.profilePic == "" || this.state.profilePic == undefined
      ?null:tempPP,
      studyPlanId:this.state.chosenStudyPlan.id
    };
    
     Axios.post("http://localhost:1234/User/Create",data)
      .then(response =>{
        console.log(response);
        this.setState({hideSuccessAlert:false});  
    })
    .catch((error)=>{
      this.setState({hideWarningAlert:false});
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

  handleStudyPlanClick = (studyPlanObj) =>{
    console.log("I'M REALLY REALLY TIRED", studyPlanObj);
    this.setState({chosenStudyPlan:{
      id:studyPlanObj.id,
      year:studyPlanObj.year,
      major:studyPlanObj.major.name
    }});
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
    console.log("STH I'M TIRED",this.state.studyPlanValues);
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
                          required
                          className={classes.inputs} 
                          onChange={(event)=>this.handleChange(formGroup.content.controlId,event)}/>
                      </Form.Group>))
                  }
                  <DropdownList
                  text={this.state.chosenMajor !== ""?this.state.chosenMajor:"Choose your Major"}
                  dark>
                    {this.state.majorValues.map((major,index)=>{
                       return(
                          <Dropdown.Item
                          key={index}
                          onClick={()=>this.handleMajorClick(major.name)}>{major.name}</Dropdown.Item>
                       );
                    })}
                  </DropdownList>
                  {/* <DropdownList
                  text={this.state.chosenMajor !== ""?this.state.chosenMajor:"Choose your Major"}>
                    {this.state.majorValues.map((major,index)=>{
                       return(
                          <Dropdown.Item
                          key={index}
                          onClick={()=>this.handleMajorClick(major.name)}>{major.name}</Dropdown.Item>
                       );
                    })}
                  </DropdownList> */}
                  </Col>
                  <Col>
                    {/* Password Input */}
                    <Form.Group 
                    controlId={this.state.password.controlId}
                    className={classes.Titles}>
                      <Form.Label>{this.state.password.label}</Form.Label>
                      <MyTooltip tooltipText={this.state.password.tooltipText}>
                        <Form.Control 
                        required
                        type={this.state.password.type} 
                        className={classes.inputs}
                        onChange={(event)=>this.handleChange(this.state.password.controlId,event)}/>
                      </MyTooltip>
                    </Form.Group>
    
                    {/* Study Plan Input */}
                    <DropdownList
                    text={this.state.chosenStudyPlan.year !== 0 && this.state.chosenStudyPlan.year !== undefined?this.state.chosenStudyPlan.year:"Choose your StudyPlan"}
                    dark>
                      {this.state.studyPlanValues === undefined?null:this.state.studyPlanValues.map((studyPlan,index)=>{
                        return(
                            <Dropdown.Item
                            key={index}
                            onClick={()=>this.handleStudyPlanClick(studyPlan)}>{studyPlan.major} <b>/</b> {studyPlan.year}</Dropdown.Item>
                        );
                      })}
                    </DropdownList>
                    {/* <Form.Group 
                    // controlId={this.state.studyPlan.controlId} 
                    className={classes.Titles}>
                        <Form.Label> {this.state.studyPlan.label} </Form.Label>
                        <MyTooltip tooltipText={this.state.studyPlan.tooltipText}>
                          <Form.Control 
                          type="text"  
                          className={classes.inputs} 
                          onChange={(event)=>this.handleChange(this.state.studyPlan.controlId,event)}/>
                        </MyTooltip>
                    </Form.Group> */}
  
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
            textContent={"Please Check the you provided everything correctly and according to the tooltips provided on some text boxes"}/>

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
