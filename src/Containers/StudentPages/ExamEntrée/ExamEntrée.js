import React, { Component } from 'react';
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/footer';
import classes from './ExamEntrée.module.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import Cookies from 'js-cookie';

class ExamEntrée extends Component{
   state={
      Exam:{
         name:"",
         time:"",
      },
      ExamQuestion:[]
   }


   componentDidMount(){

      const queryParams = new URLSearchParams(window.location.search);
      const id = queryParams.get('id');
      console.log(id);

      
      fetch('http://localhost:1234/Exam/Get', {
         method: 'POST',
         headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify([id])
      }).then(function(res){
         return res.json();
      }).then( (data) => {
        // console.log(data);
         // Store the post data to a variable
         this.setState(prevState => ({
            Exam: {            
             name:data[0].name,
             time:data[0].duration
         },
         ExamQuestion:data[0].questions
      }))
      console.log(data[0].questions);

      

         // Fetch another API
      })
   
   }

  

   handleExamClick = (duration) =>{
      const queryParams = new URLSearchParams(window.location.search);
      const id = queryParams.get('id');

      const config = { 
         headers: { Authorization: `${JSON.parse(Cookies.get('user')).token}` } 
     };
      Axios.get("http://localhost:1234/ExamAttempt/Create?examId="+id,config)
     
      this.props.history.push({
      pathname: '/Exam',
      state: { questionsId: this.state.ExamQuestion, examDuration:duration }
   });
   }

   msConversion = (millis) =>{
      let sec = Math.floor(millis / 1000);
      let hrs = Math.floor(sec / 3600);
      sec -= hrs * 3600;
      let min = Math.floor(sec / 60);
      sec -= min * 60;
    
      sec = '' + sec;
      sec = ('00' + sec).substring(sec.length);
    
      if (hrs > 0) {
        min = '' + min;
        min = ('00' + min).substring(min.length);
        return hrs + ":" + min + ":" + sec;
      }
      else {
        return min + ":" + sec;
      }
    }

   render(){
      let milliseconds = this.state.Exam.time;
      let duration = this.msConversion(milliseconds);
      return(
         <Container fluid={+true} className={classes.container}>
                <Row>
                    <Header pageType={"Home"} userName={this.state.userName} avatar={this.state.avatar}/> 
                </Row>
                <div className={classes.content}>
                <Row>
                    {/* {this.state.loading?<Spinner loading={this.state.loading}/>: pageContent} */}
                    <h5>{this.state.Exam.name}</h5>
                </Row>
                <Row>
                <p>Instructions</p>
                  <ul>
                  <li>The exam duration will be {duration}. </li>
                  <li>The exam will be <b>One Way</b> so as soon as you submit your answer there's no going back.</li>
                  <li>During the exam Press "Next" to save your answer and proceed to the next question <i>(If you didn't press "Next" your answer won't be saved!)</i></li>
                  </ul>
                </Row>
                <Button 
                className={classes.button}
                onClick={()=>this.handleExamClick(milliseconds)}>Start Exam</Button>
                </div>
                <Row>
                    <Footer> </Footer>
                </Row>
            </Container>
      );
   }
}

export default withRouter(ExamEntrée);