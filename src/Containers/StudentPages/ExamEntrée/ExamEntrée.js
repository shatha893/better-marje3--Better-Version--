import React, { Component } from 'react';
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/footer';
import classes from './ExamEntrée.module.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

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
         ExamQuestion:data.questions
      }))
      console.log(data[0].questions);

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
         this.setState(prevState => ({
            ExamQuestion:userData
      }))
      }).catch(function (error) {
         console.warn(error);
      });
   
   }



   handleExamClick = () =>{
      this.props.history.push('/Exam');
   }

   render(){
      return(
         <Container fluid={+true} className={classes.container}>
                <Row>
                    <Header pageType={"Home"} userName={this.state.userName} avatar={this.state.avatar}/> 
                </Row>
                <div className={classes.content}>
                <Row>
                    {/* {this.state.loading?<Spinner loading={this.state.loading}/>: pageContent} */}
                    <h5>Exam Title</h5>
                </Row>
                <Row>
                <p>Instructions</p>
                </Row>
                <Row>
                  <ul>
                  <li>Exam Time</li>
                  <li>instruction #2</li>
                  </ul>
                </Row>
                <Button 
                className={classes.button}
                onClick={this.handleExamClick}>Start Exam</Button>
                </div>
                <Row>
                    <Footer> </Footer>
                </Row>
            </Container>
      );
   }
}

export default withRouter(ExamEntrée);