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

class loginModal extends Component{

  state = {
    uniEmail:"",
    password:"",
    loginBtnClicked:false,
    loading:false
  }

  handleUniEmailChange = event =>{
    this.setState({uniEmail:event.target.value});
  }

  handlePasswordChange = event =>{
    this.setState({password:event.target.value});
  }
  

  handleLogin = () =>{
    if(this.state.uniEmail == 3456)
    {
      this.props.history.push('/AdminHome');
    }
    else{
    // VERY VERY BAD SECURITY HERE (WON'T STAY LIKE THIS) ---> Token and POST request instead
    Axios.get("http://localhost:3000/users?uniEmail="+this.state.uniEmail+"&password="+this.state.password)
    .then(
      result =>{
        this.setState({loading:true});
        if(result.status == 200)
          {
            this.props.setUserEmail(this.state.uniEmail);
            console.log("Success "+result.status+this.state.uniEmail);
            this.props.history.push('/Homepage');}
            this.setState({loading:false});
           }

    )
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
      {this.state.loading? <Spinner/>:<Container className={classes.ModalContainer}>
                  <Row>
                      <Col>
                        <Form.Group controlId="formBasicEmail" className={classes.Titles}>
                            <Form.Label> Email </Form.Label>
                            <Form.Control 
                            type="email" 
                            placeholder="Required" 
                            className={classes.inputs} 
                            onChange={this.handleUniEmailChange}/>
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
                  
                  
                </Container>}         
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
