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
import TFQuestion from '../Exam/tfQuestion/tfQuestion';
import { withRouter } from 'react-router-dom';
import question from '../../../components/StudentComponents/question/question';

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
         case "TFQ":
            return <TFQuestion question={question}/>;
      }
   }
   componentDidMount(){

      const queryParams = new URLSearchParams(window.location.search);
      const id = queryParams.get('id');
      console.log(id);

      fetch('http://localhost:1234/Question/Get', {
         method: 'POST',
         headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify([id])
      }).then(res => res.json())
         .then(json =>{
                   console.log(json[0]);
                    this.setState(prevState => ({
                     question: {                   // object that we want to update
                      ...prevState.question,    // keep all other key-value pairs
                      body: json[0].content     // update the value of specific key
                  }
              }))


      })
   
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