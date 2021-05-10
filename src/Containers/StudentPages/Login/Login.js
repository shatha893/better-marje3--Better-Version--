import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Workspace from '../../../Assets/login_workspace.svg';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import classes from './Login.module.css';
import Spinner from '../../../components/StudentComponents/UI/spinner/spinner';
import Alert from '../../../components/StudentComponents/UI/anAlert/anAlert';
import Cookies from 'js-cookie';

class loginModal extends Component{

  state = {
    email:"",
    password:"",
    loginBtnClicked:false,
    hideWarningAlert:true
  }

  handleemailChange = event =>{
    this.setState({email:event.target.value});
  }

  handlePasswordChange = event =>{
    this.setState({password:event.target.value});
  }
  

  handleLogin = () =>{
    if(this.state.email == 3456)
    {
      this.props.history.push('/AdminHome');
    }
    else{
    this.setState({loading:true});
    Axios.post("http://localhost:1234/User/Login",
    {
          email:this.state.email,
          password:this.state.password
    })
    .then(result =>{
      console.log("result of login",result)
      // this.props.setUserInfo(result.data.user.name);
      let cookieBody = {
        name:result.data.user.name,
        id:result.data.user.id,
        token:result.data.token
      };
      Cookies.set('user',cookieBody);
      this.props.history.push('/Homepage');
      })
    .catch((error)=>{
      console.log(error);
    this.setState({hideWarningAlert:false});
  });
          
    }
  }


  render(){

  return(
    <>
      <Modal 
      show={this.props.show} 
      onHide={this.props.closeModal} 
      className={classes.Modal} 
      size="lg">

      <Modal.Header closeButton  className={classes.ModalHeader}>
         <Modal.Title className={classes.ModalTitle}>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container className={classes.ModalContainer}>
          <Row>
              <Col>
                <Form.Group controlId="formBasicEmail" className={classes.Titles}>
                    <Form.Label> Email </Form.Label>
                    <Form.Control 
                    type="email" 
                    placeholder="Required" 
                    className={classes.inputs} 
                    onChange={this.handleemailChange}/>
                </Form.Group>
  
                <Form.Group controlId="formBasicPassword" className={classes.Titles}>
                  <Form.Label> Password </Form.Label>
                  <Form.Control type="password" placeholder="Required" className={classes.inputs} onChange={this.handlePasswordChange}/>
                </Form.Group>
              </Col>
              <Col xs={6}>
                <img src={Workspace} alt="workspace" fluid={+true}/>
              </Col>
          </Row>
        </Container>
        <Alert 
        hide={this.state.hideWarningAlert}
        variant={"danger"}
        title={"Wrong Credentials"}
        textContent={"Please make sure you provided the right username and password"}/>        
      </Modal.Body>

      <Modal.Footer className={classes.ModalFooter}>
          <Button 
          className={classes.LoginButton}  
          onClick={this.handleLogin} 
          size="lg"> 
            Login 
          </Button>
      </Modal.Footer>

    </Modal>
  </>
  );

}
 
}

export default withRouter(loginModal);
