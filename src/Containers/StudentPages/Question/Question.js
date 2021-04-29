import React, { Component } from 'react';
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/footer';
import classes from './Question.module.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Divider from '@material-ui/core/Divider';
import MCQuestion from '../Exam/mcQuestion/mcQuestion';
import PQuestion from '../Exam/pQuestion/pQuestion';
import FiBQuestion from '../Exam/FiBQuestion/fibQuestion';
import TFQuestion from '../Exam/tfQuestion/tfQuestion';
import { withRouter } from 'react-router-dom';

class Question extends Component{
  
   state={
      question:{
         type:'MCQ',
         body:'what is the capital of the maldives?',
         options:['Malé','Amman','Albany'],
         answer:'Malé'
      }
   };

   chooseQuestion = (question)=>{
      switch(question.type){
         case "MCQ":
            return <MCQuestion question={question}/>;
         case "PQ":
            return <PQuestion question={question}/>;
         case "FiBQ":
            return <FiBQuestion question={question}/>;
         case "TFQ":
            return <TFQuestion question={question}/>;
      }
   }

   handleSubmit = () =>{
      this.props.history.push("/Feedback");
   }

   render(){
      return(
         <Container fluid={+true}>
         <Row>
             <Header pageType={"Home"} /> 
         </Row>
         <Row className={classes.content}>
            <Col>

            </Col>
            <Col sm={8} className={classes.examCol}>
               <div>
                     <Container 
                     className={classes.questionContainer}>
                     <Row className={classes.questionTitle}>
                        <p>Question</p>
                     </Row>
                     <Divider className={classes.divider}/>
                     <Row className={classes.questionBody}>
                        <span>{this.state.question.body}</span>
                     </Row>
                     <Row>
                        {this.chooseQuestion(this.state.question)}  
                     </Row>
                  </Container>

                   <Button 
                   className={classes.submitButton}
                   onClick={this.handleSubmit}>
                      Submit Answer
                   </Button>
               </div>
            </Col>
            <Col>
            </Col>
         </Row>
         <Row>
             <Footer> </Footer>
         </Row>
     </Container>
      );
   }
}

export default withRouter(Question);