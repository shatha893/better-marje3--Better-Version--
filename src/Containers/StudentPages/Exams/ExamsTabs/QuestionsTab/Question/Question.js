import React, { Component } from 'react';
import Header from '../../../../../../components/header/header';
import Footer from '../../../../../../components/footer/footer';
import classes from './Question.module.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Divider from '@material-ui/core/Divider';
import MCQuestion from '../../../../Exam/mcQuestion/mcQuestion';
import PQuestion from '../../../../Exam/pQuestion/pQuestion';
import FBQuestion from '../../../../Exam/fBQuestion/fbQuestion';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import Cookies from 'js-cookie';


class Question extends Component{
  
   state={
     questionContent:null
   };

   chooseQuestion = ()=>{    
      console.log(this.state.questionContent.subQuestion.type);
      //1 --->FIB   
      switch(1){   
         case 0:
            return <MCQuestion 
            // question={}
            handleAnswer={(type,id,event)=>this.handleAnswer(type,id,event)}/>;
         case 3:
            return <PQuestion 
            // question={}
            handleAnswer={(type,id,event)=>this.handleAnswer(type,id,event)}
            handleLanguage={(type,id,event)=>this.handleLanguage(type,id,event)}/>;
         case 1:
            return <FBQuestion 
            // question={}
            handleAnswer={(type,id,event)=>this.handleAnswer(type,id,event)}/>;

      }
   }

   getQuestion = async() =>{
      const queryParams = new URLSearchParams(window.location.search);
      const id = queryParams.get('id');
      console.log(id);

      try{
         let idArr = [];
         idArr.push(id);

         const finalResult = await Axios.post("http://localhost:1234/Question/Get",idArr);
         
         console.log("Question",finalResult)

         idArr.pop(); 
         idArr.push(finalResult.data[0].subQuestions[0].id);
         const config = { 
            headers: { Authorization: `${JSON.parse(Cookies.get('user')).token}` } 
        };
         const subqresult = await Axios.post("http://localhost:1234/SubQuestion/Get",idArr,config);
         console.log("subquestion results:",subqresult);

         let tempArray = [];
         subqresult.data[0].tags.map(tag=>{
            tempArray.push(tag.name); });

         this.setState({questionContent:{
            title:finalResult.data[0].title,
            content:finalResult.data[0].content,
            type:finalResult.data[0].subQuestions[0].type,
            subQuestion:{
               id:subqresult.data[0].id,
               type:subqresult.data[0].type,
               tags:[...tempArray]
            }
         }});
      }
      catch(error){
            console.log("Error = ",error);
      } 
   }

   componentDidMount(){
      this.getQuestion();
   }
   
   handleSubmit = () =>{
      this.state.questions.map((question)=>{
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
     }, console.log(this.state.answers));
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
      }, console.log(this.state.answers));
    }
    
   render(){ 
      console.log("questioncontent-->",this.state.questionContent);
      let questionContent = this.state.questionContent;  
      if(questionContent !== null && questionContent !== undefined)  
      {
         questionContent = questionContent.content;
      }

      return(
      <Col sm={8} className={classes.examCol}>
      <div>
      <Container 
      className={classes.questionContainer}>

      <Row className={classes.questionTitle}>
         {questionContent}
      </Row>
      <Row>
         {this.state.questionContent===null?null:this.chooseQuestion()}  
      </Row>
      </Container>

      <Button 
      className={!this.props.lastQuestion?classes.hideButton:classes.submitButton}>
      Submit Answer
      </Button>
      </div>
      </Col>       
      );
   }
}

export default Question;
