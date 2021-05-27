import React, { Component } from 'react';
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/footer';
import classes from './MainQuestion.module.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Divider from '@material-ui/core/Divider';
import MCQuestion from '../Exam/mcQuestion/mcQuestion';
import PQuestion from '../Exam/pQuestion/pQuestion';
import { withRouter } from 'react-router-dom';
import FbQuestion from '../Exam/fBQuestion/fbQuestion';
import Cookies from 'js-cookie';


class MainQuestion extends Component{
  
   state={
       //Each question have to have a type so that we can choose the right view for it
      questions: [],
      answers: new Map(),
   };

   chooseQuestion = (question)=>{    
      switch(question.type){   
         case 0:
            return <MCQuestion 
            question={question}
            handleAnswer={(type,id,event)=>this.handleAnswer(type,id,event)}/>;
         case 3:
            return <PQuestion 
            question={question}
            handleAnswer={(type,id,event)=>this.handleAnswer(type,id,event)}
            handleLanguage={(type,id,event)=>this.handleLanguage(type,id,event)}/>;
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
   
   handleSubmit = () =>{
      this.state.questions.map((question,index)=>{
          if(question.type == 0){
            fetch('http://localhost:1234/SubQuestionAnswer/Create', {
               method: 'POST',
               headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `${JSON.parse(Cookies.get('user')).token}`
              },
              body: JSON.stringify({
                 "$type":"CreateMCQSubQuestionAnswerDto",
               "examSubQuestionId": question.id,
               "SelectedChoices" : [this.state.answers.get(question.id)]
              })
            }).then(function(res){
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
              'Authorization': `${JSON.parse(Cookies.get('user')).token}`
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
          else if(question.type == 2)
          {
             fetch('http://localhost:1234/SubQuestionAnswer/Create', {
               method: 'POST',
               headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `${JSON.parse(Cookies.get('user')).token}`
              },
              body: JSON.stringify({
               "$type": "CreateProgrammingSubQuestionAnswerDto",
               "examSubQuestionId": question.id,
               "Answer" : this.state.answers.get(question.id).substr(28,this.state.answers.get(question.id).length),
               "ProgrammingLanguage":this.state.answers.get(question.id+"L"),
               "FileExtension":this.state.answers.get(question.id+"L")
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
    handleLanguage = (id,lang) =>{
      let tempMap = new Map();
      for(let [key, value] of this.state.answers)
        tempMap.set(key,value);
      tempMap.set(id+"L",lang);
    
     this.setState({
        answers:tempMap
     });
    }

    handleAnswer = (type,id,event)=>{
       let tempMap = new Map();
       for(let [key, value] of this.state.answers)
         tempMap.set(key,value);
      if(type === 1)
         tempMap.set(id,event.target.value);
      else if(type == 2)
      {
         let reader = new FileReader();
         reader.onload = (e)=>{
           tempMap.set(id,e.target.result);
         };
         reader.readAsDataURL(event.target.files[0]); 
      }
      else
         tempMap.set(id,event);
      this.setState({
         answers:tempMap
      });
    }
    
   render(){
    
      return(
            <Col sm={8} className={classes.examCol}>
               <div>
                  {this.state.questions.map( (question,index)=>{
                 
                     let temp = question.content.split(".");
                     let questionContent = temp[2];
                     
                  return(
                     <Container 
                     className={classes.questionContainer}
                     key={index}>
                     <Row className={classes.questionTitle}>
                        {index+1}){questionContent}
                     </Row>
                     <Row>
                        {this.chooseQuestion(question)}  
                     </Row>
                  </Container>
                  );
   })}
                   <Button 
                   className={this.props.lastQuestion?classes.hideButton:classes.submitButton}
                   onClick={this.handleSubmit}>
                      Next
                   </Button>
                   <Button 
                   className={!this.props.lastQuestion?classes.hideButton:classes.submitButton}>
                      Submit Answers
                   </Button>
               </div>
            </Col>       
      );
   }
}

export default MainQuestion;
