import React, { Component } from 'react';
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/footer';
import classes from './ExamEntrée.module.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

class ExamEntrée extends Component{
   state={
      userName:null,
      avatar:null
   }

   handleExamClick = () =>{
      this.props.history.push('/Exam');
   }

   render(){
      return(
         <Container fluid={+true} className={classes.container}>
                <Row>
                    <Header pageType={"Home"} userName={this.state.userName} avatar={this.state.avatar}/> 
                </Row>
                <div className={classes.content}>
                <Row>
                    {/* {this.state.loading?<Spinner loading={this.state.loading}/>: pageContent} */}
                    <h5>Exam Title</h5>
                </Row>
                <Row>
                <p>Instructions</p>
                </Row>
                <Row>
                  <ul>
                  <li>Exam Time</li>
                  <li>instruction #2</li>
                  </ul>
                </Row>
                <Button 
                className={classes.button}
                onClick={this.handleExamClick}>Start Exam</Button>
                </div>
                <Row>
                    <Footer> </Footer>
                </Row>
            </Container>
      );
   }
}

export default withRouter(ExamEntrée);