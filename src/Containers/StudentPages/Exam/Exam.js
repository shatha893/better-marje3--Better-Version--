import React, { Component } from 'react';
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/footer';
import classes from './Exam.module.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Divider from '@material-ui/core/Divider';
import MCQuestion from './mcQuestion/mcQuestion';
import PQuestion from './pQuestion/pQuestion';
import TFQuestion from './tfQuestion/tfQuestion';
import Clock from '../../../components/StudentComponents/UI/Clock/Clock';
import { withRouter } from 'react-router-dom';

class Exam extends Component{
  
   state={
       //Each question have to have a type so that we can choose the right view for it
      questions:[{
         type:'MCQ',
         body:'what is the capital of the maldives?',
         options:['Malé','Amman','Albany'],
         answer:'Malé'
      },
   {
      type:'PQ',
      body:'What is the output of the following:'+
      "Petya is preparing for his birthday. He decided that there would be n different dishes on the dinner table, numbered from 1 to n. Since Petya doesn't like to cook, he wants to order these dishes in restaurants.\n"+
      "Unfortunately, all dishes are prepared in different restaurants and therefore Petya needs to pick up his orders from n different places. To speed up this process, he wants to order courier delivery at some restaurants. Thus, for each dish, there are two options for Petya how he can get it:\n"+      
      "the dish will be delivered by a courier from the restaurant i, in this case the courier will arrive in ai minutes,\n"+     
      "Petya goes to the restaurant i on his own and picks up the dish, he will spend bi minutes on this.\n"+
      "Each restaurant has its own couriers and they start delivering the order at the moment Petya leaves the house. In other words, all couriers work in parallel. Petya must visit all restaurants in which he has not chosen delivery, he does this consistently.\n"+   
      "For example, if Petya wants to order n=4 dishes and a=[3,7,4,5], and b=[2,1,2,4], then he can order delivery from the first and the fourth restaurant, and go to the second and third on your own. Then the courier of the first restaurant will bring the order in 3 minutes, the courier of the fourth restaurant will bring the order in 5 minutes, and Petya will pick up the remaining dishes in 1+2=3 minutes. Thus, in 5 minutes all the dishes will be at Petya's house.\n"+      
      "Find the minimum time after which all the dishes can be at Petya's home.\n"+
      "Input\n"+     
      "The first line contains one positive integer t (1≤t≤2⋅105) — the number of test cases. Then t test cases follow.\n"+    
      "Each test case begins with a line containing one integer n (1≤n≤2⋅105) — the number of dishes that Petya wants to order.",     
      answer:'I don\'t know yet'
   },
   {
      type:'TFQ',
      body:'The company IBM was founded in 1912?',
      answer:'false'
   },
   {
      type:'FiBQ',
      body:'_________invented the telegraph.',
      answer:'David Alter'
   }]
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
               {/*____A Single question's div_____ */}
               <div>
                  {/* Make a form for each type of question for the answers */}
                  {this.state.questions.map( (question,index)=>(
                     <Container 
                     className={classes.questionContainer}
                     key={index}>
                     <Row className={classes.questionTitle}>
                        <p>Question {index+1}</p>
                     </Row>
                     <Divider className={classes.divider}/>
                     <Row className={classes.questionBody}>
                        <span>{question.body}</span>
                     </Row>
                     <Row>
                        {this.chooseQuestion(question)}  
                     </Row>
                  </Container>
                  ))}
                   <Button 
                   className={classes.submitButton}
                   onClick={this.handleSubmit}>
                      Submit Answers
                   </Button>
               </div>
            </Col>
            <Col>
               <Clock/>
            </Col>
         </Row>
         <Row>
             <Footer> </Footer>
         </Row>
     </Container>
      );
   }
}

export default withRouter(Exam);