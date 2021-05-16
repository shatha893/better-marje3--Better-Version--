import React, { Component } from 'react';
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/footer';
import classes from './MainQuestion.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Divider from '@material-ui/core/Divider';
import MCQuestion from '../Exam/mcQuestion/mcQuestion';
import PQuestion from '../Exam/pQuestion/pQuestion';
import TFQuestion from '../Exam/tfQuestion/tfQuestion';
import { withRouter } from 'react-router-dom';

class MainQuestion extends Component{
  
   state={
       //Each question have to have a type so that we can choose the right view for it
      questions: []
   };

   chooseQuestion = (question)=>{    
      console.log(question.type);
      //1 --->FIB   
      switch(question.type){   
         case 0:
            return <MCQuestion question={question}/>;
         case 3:
            return <PQuestion question={question}/>;
         case 2:
            return <TFQuestion question={question}/>;
      }
   }


   componentDidMount(){

      var arr = [];
      this.props.question.examSubQuestions.map((ESubQuestion, index) => (

         arr.push(ESubQuestion.subQuestion.id)
     ))

      console.log(arr);

      fetch('http://localhost:1234/SubQuestion/Get', {
         method: 'POST',
         headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(arr)
      }).then(function(res){
         return res.json();
      }).then( (data) => {
         this.setState({
            questions:data
         });
      })
   
   }

   handleButtonClick() {
      this.forceUpdate();
    }

   render(){
      console.log('Child component: render()');

      return(
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
                        <span>{question.content}</span>
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
      );
   }
}

export default MainQuestion;
