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
import FbQuestion from '../Exam/fBQuestion/fbQuestion';

class MainQuestion extends Component{
  
   state={
       //Each question have to have a type so that we can choose the right view for it
      questions: [],
      answers: new Map(),
   };

   chooseQuestion = (question)=>{    
      console.log(question.type);
      //1 --->FIB   
      switch(question.type){   
         case 0:
            return <MCQuestion 
            question={question}
            handleAnswer={(type,id,event)=>this.handleAnswer(type,id,event)}/>;
         case 3:
            return <PQuestion question={question}/>;
         // case 2:
         //    return <TFQuestion question={question}/>;
         case 1:
            return <FbQuestion 
            question={question}
            handleAnswer={(type,id,event)=>this.handleAnswer(type,id,event)}/>;

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
         console.log(data);
         this.setState({
            questions:data
         });
      })
   
   }
   
   handleSubmit = () =>{
      this.state.questions.map((question,index)=>{
          if(question.type == 0){
            fetch('http://localhost:1234/SubQuestionAnswer/Create', {
               method: 'POST',
               headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': '1:637571352355928818'
              },
              body: JSON.stringify({
                 "$type":"CreateMCQSubQuestionAnswerDto",
               "examSubQuestionId": question.id,
               "SelectedChoices" : [this.state.answers.get(question.id)]
              })
            }).then(function(res){
               console.log("HEREEE",res)
               return res.json();
            }).then( (data) => {
               this.setState({
                  questions:data
               });
            })
          }
          else if(question.type === 1)
          {//SubQuestionAnswer/Create
            fetch('http://localhost:1234/SubQuestionAnswer/Create', {
               method: 'POST',
               headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': '1:637571352355928818'
              },
              body: JSON.stringify({
               "$type": "CreateBlankSubQuestionAnswerDto",
               "examSubQuestionId": question.id,
               "Answer" : this.state.answers.get(question.id)
              })
            }).then(function(res){
               
               return res.json();
            }).then( (data) => {
               this.setState({
                  questions:data
               });
            })
            .catch(error=>{
               console.log(error);
            }
            )
          }
      })
      this.props.nextQuestion();
   }

   // handleButtonClick() {
   //    this.forceUpdate();
   //  }

    handleAnswer = (type,id,event)=>{
       let tempMap = new Map();
       for(let [key, value] of this.state.answers)
         tempMap.set(key,value);
      if(type === 1)
         tempMap.set(id,event.target.value);
      else
         tempMap.set(id,event);
      this.setState({
         answers:tempMap
      }, console.log(this.state.answers));
    }
    
   render(){
      console.log('Child component: render()');
      console.log("Questions",this.state.questions)
      return(
            <Col sm={8} className={classes.examCol}>
               {/*____A Single question's div_____ */}
               <div>
                  {/* Make a form for each type of question for the answers */}
                  {this.state.questions.map( (question,index)=>{
                     let questionContent = question.content;
                     if(question.type === 1)
                        {
                           let temp = questionContent.split(".")
                           questionContent = temp[2];
                     }
                  return(
                     <Container 
                     className={classes.questionContainer}
                     key={index}>
                     <Row className={classes.questionTitle}>
                        <p>Question {index+1}</p>
                     </Row>
                     <Divider className={classes.divider}/>
                     <Row className={classes.questionBody}>
                        <span>{questionContent}</span>
                     </Row>
                     <Row>
                        {this.chooseQuestion(question)}  
                     </Row>
                  </Container>
                  );
   })}
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
