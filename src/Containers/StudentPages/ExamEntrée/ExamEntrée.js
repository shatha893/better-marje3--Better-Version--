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
         ExamQuestion:data[0].questions
      }))
      console.log(data[0].questions);

      

         // Fetch another API
      })
   
   }



   handleExamClick = () =>{
      console.log(this.state.ExamQuestion);

      this.props.history.push({
      pathname: '/Exam',
      state: { questionsId: this.state.ExamQuestion }
   });
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
                    <h5>{this.state.Exam.name}</h5>
                </Row>
                <Row>
                <p>Instructions</p>
                </Row>
                <Row>
                  <ul>
                  <li>{this.state.Exam.time/60000}  minutes</li>
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