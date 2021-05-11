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
      questions: [{
         type: "MCQSubQuestionDto",
         isCheckBox: true,
         choices: [
           {
             $type: "MCQSubQuestionChoiceDto",
             id: 312,
             content: "Choice 0, Subquestion 827, Question 158"
           },
           {
             $type: "MCQSubQuestionChoiceDto",
             id: 313,
             content: "Choice 1, Subquestion 827, Question 158"
           },
           {
             $type: "MCQSubQuestionChoiceDto",
             id: 314,
             content: "Choice 2, Subquestion 827, Question 158"
           }
         ],
         content: "Question 158, SubQuestion 827. grMcGnKtGKYd3ULQr9l7ZfuQ9H.7nlvUwwFR8SK81kUpZSLOhq24W8da99f,pQfuoeUGo7VLzpfPxf3r9vZ9wE,AtEU,MMTleAaV,fAmIqEG3BP4g1c63i,XgtnXmW!0J7K.ehs38NBf!EK4125XJ0u8BqOR5PaYrR.84S0,Jl.qU6YO .",
         tags: [],
         id: 827,
         type: 0,
         questionId: 158
       },
       {
         "$type": "MCQSubQuestionDto",
         "isCheckBox": false,
         "choices": [
           {
             "$type": "MCQSubQuestionChoiceDto",
             "id": 31,
             "content": "Choice 0, Subquestion 738, Question 19"
           },
           {
             "$type": "MCQSubQuestionChoiceDto",
             "id": 32,
             "content": "Choice 1, Subquestion 738, Question 19"
           },
           {
             "$type": "MCQSubQuestionChoiceDto",
             "id": 33,
             "content": "Choice 2, Subquestion 738, Question 19"
           }
         ],
         "content": "Question 19, SubQuestion 738. zEluzSE0Pq,ZfHTcn3TNsL6GvVPFyzILpqyiJcF4k .",
         "tags": [
           {
             "$type": "TagDto",
             "id": 9,
             "name": "NFA"
           },
           {
             "$type": "TagDto",
             "id": 11,
             "name": "Trees"
           },
           {
             "$type": "TagDto",
             "id": 12,
             "name": "Binary Search"
           },
           {
             "$type": "TagDto",
             "id": 14,
             "name": "Pointers"
           }
         ],
         "id": 738,
         "type": 0,
         "questionId": 19
       }      
      ]
   };

   chooseQuestion = (question)=>{    
      switch(question.type){   
         case 0:
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

      fetch('http://localhost:1234/ExamSubQuestion/Get', {
         method: 'POST',
         headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify([id])
      }).then(function(res){
         return res.json();
      }).then(function (data) {
         console.log(data);
         // Store the post data to a variable
              

         console.log(data[0].subQuestion);

     
        var arr=data[0].subQuestion.id;
         
         console.log(arr);

         // Fetch another API
return fetch('http://localhost:1234/SubQuestion​/Get', {
         method: 'POST',
         headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify([arr])
      });
      
      }).then(function (response) {
         if (response.ok) {
            return response.json();
         } else {
            return Promise.reject(response);
         }
      }).then(function (userData) {
         console.log(userData);
      }).catch(function (error) {
         console.warn(error);
      });
   
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
         </Row>
         <Row>
             <Footer> </Footer>
         </Row>
     </Container>
      );
   }
}

export default MainQuestion;
