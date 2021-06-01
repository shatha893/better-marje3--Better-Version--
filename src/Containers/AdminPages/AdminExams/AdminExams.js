import React, { Component } from 'react';
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/footer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class AdminExams extends Component{


   render(){
      return(
         <Container fluid={+true}>
            <Row> <Header pageType={"AdminHome"} userType={"Admin"}/> </Row>
            <Row>
            <Col> </Col>
            <Col>
            
            </Col>
            <Col> </Col>
            </Row>
            <Row> <Footer/> </Row>
         </Container>
      );
   }
}

export default AdminExams;
