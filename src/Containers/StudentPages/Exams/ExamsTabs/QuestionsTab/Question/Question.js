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
     questionContent:null,
     questionAnswer:{
      $type:"",
      examSubQuestionId: null,
      SelectedChoices: []
     }
   };

   chooseQuestion =(type)=>{ 

      switch(type){   
         case 0:
            return   <MCQuestion 
                     question={this.state.questionContent}
                     handleMCQchange={(qId,chosenChoiceId)=>this.handleMCQchange(qId,chosenChoiceId)}/>;
         case 3:
            return   <PQuestion 
                     question={this.state.questionContent}
                     handlePchange={(event,sqId)=>this.handlePchange(event,sqId)}
                     // handlePchange={}
                     // handleAnswer={(type,id,event)=>this.handleAnswer(type,id,event)} 
                     />;
         case 1:
            return   <FBQuestion 
                     question={this.state.questionContent}
                     handleFBchange={(qId,event)=>this.handleFBchange(qId,event)} />;

      }
   }

   handleMCQchange = (qId,chosenChoiceId)=>{
      let tempArr = [...this.state.questionAnswer.SelectedChoices];
      if(tempArr.length === 0){
         tempArr.push(chosenChoiceId);
         this.setState({questionAnswer:{
            $type:"CreateMCQSubQuestionAnswerDto",
            examSubQuestionId: qId,
            SelectedChoices: [...tempArr]
         }});
      }
      else{
         //Since they're radio buttons there should be only one id so
         //we don't have to worry about poping the wrong element.
         tempArr.pop();
         tempArr.push(chosenChoiceId);
         this.setState({questionAnswer:{
            $type:"CreateMCQSubQuestionAnswerDto",
            examSubQuestionId: qId,
            SelectedChoices: [...tempArr]
         }});
      }
     
   }

   handleFBchange = (qId,event) =>{
      this.setState({questionAnswer:{
         $type:"CreateBlankSubQuestionAnswerDto",
         examSubQuestionId: qId,
         Answer: event.target.value
      }});
   }

   HandlePchange =(event,sqId)=>{
      let temp = event.target.value.split('.');
      let fExtension = temp[1];

      let reader = new FileReader();

      reader.onload = (e)=>{
      this.setState({questionAnswer:{
         $type: "CreateProgrammingSubQuestionAnswerDto",
         examSubQuestionId: sqId,
         Answer : e.target.result,
         ProgrammingLanguage:fExtension,
         FileExtension:fExtension
      }});
   };
   reader.readAsDataURL(event.target.files[0]); 
   }

   getQuestion = async() =>{
      const queryParams = new URLSearchParams(window.location.search);
      const id = queryParams.get('id');
      console.log(id);

      try{
         let idArr = [];
         idArr.push(id);

         const finalResult = await Axios.post("http://localhost:1234/ExamQuestion/Get",idArr);
         
         console.log("Question",finalResult)

         idArr.pop(); 
         idArr.push(finalResult.data[0].subQuestions[0].id);
         const config = { 
            headers: { Authorization: `${JSON.parse(Cookies.get('user')).token}` } 
        };
         const subqresult = await Axios.post("http://localhost:1234/subQuestion/Get",idArr,config);

         let tempArray = [];
         subqresult.data[0].tags.map(tag=>{
            tempArray.push(tag.name); });

         this.setState({questionContent:{
            title:finalResult.data[0].title,
            content:finalResult.data[0].content,
            type:finalResult.data[0].subQuestions[0].type,
            subQuestion:{
               id:finalResult.data[0].examSubQuestions[0].id,
               type:subqresult.data[0].type,
               tags:[...tempArray],
               choices:subqresult.data[0].type === 0?[...subqresult.data[0].choices]:null
            }
         }},()=>{console.log("questionContent",this.state.questionContent)});
      }
      catch(error){
            console.log("Error = ",error);
      } 
   }

   componentDidMount(){
      this.getQuestion();
   }
   
   handleSubmit = () =>{

      const config = { 
         headers: { Authorization: `${JSON.parse(Cookies.get('user')).token}` } 
      };

      Axios.post("http://localhost:1234/SubQuestionAnswer/Create",this.state.questionAnswer,config)
      .then(response=>{console.log("create subCRAP",response)})
      .catch(error=>console.log(error.message));
 }

   render(){ 

      let questionContent = this.state.questionContent;  
      if(questionContent !== null && questionContent !== undefined)  
      {
         questionContent = questionContent.content;
      }

      return(
         <Container fluid={+true}>
            <Row>  <Header pageType={"Home"} />  </Row>
            <Row className={classes.content}>
            <Col></Col>
            <Col sm={8} className={classes.examCol}>
            {/* <div> */}
               <Container 
               className={classes.questionContainer}>

               <Row className={classes.questionTitle}>
                  {this.state.questionContent===null?null:this.state.questionContent.title}
               </Row>
               <Divider/>
               <Row className={classes.questionBody}> {questionContent} </Row>
               <Row>
                  {this.state.questionContent===null?null:this.chooseQuestion(this.state.questionContent.subQuestion.type)}  
               </Row>
               <Row>

                  <Button 
                  className={classes.submitButton}
                  onClick={()=>this.handleSubmit()}>
                  Submit Answer
                  </Button>
               </Row>
               </Container>
            {/* </div> */}
            </Col> 
            <Col></Col>
            </Row>
            <Row>
             <Footer> </Footer>
            </Row>
         </Container>
            
      );
   }
}

export default Question;
