import React, { Component } from 'react';
import classes from './MainQuestion.module.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Divider from '@material-ui/core/Divider';
import MCQuestion from '../Exam/mcQuestion/mcQuestion';
import PQuestion from '../Exam/pQuestion/pQuestion';
import FbQuestion from '../Exam/fBQuestion/fbQuestion';
import Cookies from 'js-cookie';
import Axios from 'axios';

class MainQuestion extends Component{
  
   state={
       //Each question have to have a type so that we can choose the right view for it
      questionContent: [],
      questionsAnswer:[],
      examFeedback:null
      // answers: new Map()
   };

   chooseQuestion = ()=>{
      console.log("jklsadfji",this.state.questionContent)
      if(this.state.questionContent.subQuestion === null ||this.state.questionContent.subQuestion === undefined) return;
      switch(this.state.questionContent.subQuestion.type){   
         case 0:
            return <MCQuestion 
            question={this.state.questionContent}
            // handleAnswer={(type,id,event)=>this.handleAnswer(type,id,event)}
            handleMCQchange={(qId,chosenChoiceId)=>this.handleMCQchange(qId,chosenChoiceId)}
            />;
         case 3:
            return <PQuestion 
                  question={this.state.questionContent}
                  handlePchange={(event,sqId)=>this.handlePchange(event,sqId)}/>;
         // case 2:
         //    return <TFQuestion question={question}/>;
         case 1:
            return <FbQuestion 
            question={this.state.questionContent}
            handleFBchange={(qId,event)=>this.handleFBchange(qId,event)}/>;

      }
   }


   componentDidMount(){
      var arr = [];
      arr.push(this.props.question.examSubQuestions[0].id);

      fetch('http://localhost:1234/SubQuestion/Get', {
         method: 'POST',
         headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(arr)
      }).then((res)=>{
         return res.json();
      }).then( (data) => {
         console.log("jjfjf",data);
         this.setState({questionContent:{subQuestion:{
               id:data[0].id,
               type:data[0].type,
               choices:data[0].type === 0?[...data[0].choices]:null
         }}
         });
      })
   
   }

   handleMCQchange = (qId,chosenChoiceId)=>{
      let tempArr2 = [...this.state.questionsAnswer];
      let tempArr = [...this.state.questionAnswer.SelectedChoices];
      if(tempArr.length === 0){
         tempArr.push(chosenChoiceId);}
      else{
         //Since they're radio buttons there should be only one id so
         //we don't have to worry about poping the wrong element.
         tempArr.pop();
         tempArr.push(chosenChoiceId);
      }
      tempArr2.push({
         $type:"CreateMCQSubQuestionAnswerDto",
         examSubQuestionId: qId,
         SelectedChoices: [...tempArr]
      });

      this.setState({questionsAnswer:[...tempArr2]});
    }

   handleFBchange = (qId,event) =>{
      let tempArr2 = [...this.state.questionsAnswer];
      tempArr2.push({
         $type:"CreateBlankSubQuestionAnswerDto",
         examSubQuestionId: qId,
         Answer: event.target.value
      });
      this.setState({questionsAnswer:[...tempArr2]});
   }

   handlePchange =(event,sqId)=>{
      let temp = event.target.value.split('.');
      let fExtension = temp[1];
      let tempArr2 = [...this.state.questionsAnswer];

      let reader = new FileReader();

      reader.onload = (e)=>{
         tempArr2.push({
            $type: "CreateProgrammingSubQuestionAnswerDto",
            examSubQuestionId: sqId,
            Answer : e.target.result,
            ProgrammingLanguage:fExtension,
            FileExtension:fExtension
         });
      this.setState({questionsAnswer:[...tempArr2]});
   };
   reader.readAsDataURL(event.target.files[0]); 
   }
   
   handleNext = () =>{
          if(this.state.questionContent.subQuestion.type !== 3){
            fetch('http://localhost:1234/SubQuestionAnswer/Create', {
               method: 'POST',
               headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `${JSON.parse(Cookies.get('user')).token}`
              },
              body: JSON.stringify(this.state.questionsAnswer[0])
            }).then(function(res){
               return res.json();
            });
          }
          else{
            let tempArr = this.state.questionsAnswer.Answer.split(',');
            let tempPP = tempArr[1];
             let answer ={
               $type: "CreateProgrammingSubQuestionAnswerDto",
               examSubQuestionId: this.state.questionContent.subQuestion.examSubQuestionId,
               Answer : tempPP,
               ProgrammingLanguage:this.state.questionContent.subQuestion.FileExtension,
               FileExtension:this.state.questionContent.subQuestion.FileExtension
            }
            fetch('http://localhost:1234/SubQuestionAnswer/Create', {
               method: 'POST',
               headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `${JSON.parse(Cookies.get('user')).token}`
              },
              body: JSON.stringify(answer)
            }).then(function(res){
               return res.json();
            });
          }
         
      this.props.nextQuestion();
   }



   //  handleAnswer = (type,id,event)=>{
   //     let tempMap = new Map();
   //     for(let [key, value] of this.state.answers)
   //       tempMap.set(key,value);
   //    if(type === 1)
   //       tempMap.set(id,event.target.value);
   //    else
   //       tempMap.set(id,event);
   //    this.setState({
   //       answers:tempMap
   //    }, console.log(this.state.answers));
   //  }
   handleSubmit = () =>{
         fetch('http://localhost:1234//ExamAttempt/GradeCurrent', {
            method: 'GET',
            headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
           'Authorization': `${JSON.parse(Cookies.get('user')).token}`
           }}).then((res)=>{
            return res.json();
         })
         .then((data)=>{
            this.setState({examFeedback:data});
            return fetch('http://localhost:1234/ExamAttempt/FinishCurrent', {
               method: 'POST',
              headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `${JSON.parse(Cookies.get('user')).token}`
              }}) 
         .catch(function (error) {  console.log(error); });
      })
      
   } 

   render(){
      return(
            <Col sm={8} className={classes.examCol}>
               {/*____A Single question's div_____ */}
                 
                     <Container 
                     className={classes.questionContainer}>
                     <Row>
                        {this.chooseQuestion()}  
                     </Row>
                  </Container>
 

                    <Button 
                   className={this.props.lastQuestion?classes.hideButton:classes.submitButton}
                   onClick={this.handleNext}>
                      Next
                   </Button>
                   <Button 
                   className={!this.props.lastQuestion?classes.hideButton:classes.submitButton}
                   onClick={this.handleSubmit}>
                      Submit Answers
                   </Button>
            </Col>       
      );
   }
}

export default MainQuestion;
