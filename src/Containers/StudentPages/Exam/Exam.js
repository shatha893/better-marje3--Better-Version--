import React, { Component } from 'react';
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/footer';
import classes from './Exam.module.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Divider from '@material-ui/core/Divider';
import MCQuestion from './mcQuestion/mcQuestion';
import PQuestion from './pQuestion/pQuestion';
import TFQuestion from './tfQuestion/tfQuestion';
import Clock from '../../../components/StudentComponents/UI/Clock/Clock';
import { withRouter } from 'react-router-dom';
import MainQuestion from '../MainQuestion/MainQuestion';

class Exam extends Component{
  
   state={
      questions: [],
      index:0
  };

   componentDidMount(){
   console.log()
     
   }


   handleSubmit = () =>{
      this.props.history.push("/Feedback");
   }

   nextQuestion = ()=>{
      if(this.state.index < this.props.location.state.questionsId.length - 1){
         this.setState({
            index:this.state.index+1
          });
      }
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
                     <Container 
                     className={classes.questionContainer}
                     key={this.state.index}>
                     <Row className={classes.questionTitle}>
                        <p>Question {this.state.index+1}</p>
                     </Row>
                     <Divider className={classes.divider}/>
                     <Row className={classes.questionBody}>
                        <span>{this.props.location.state.questionsId[this.state.index].content}</span>
                     </Row>
                     <Row>
                        <MainQuestion question={this.props.location.state.questionsId[this.state.index]} />  
                     </Row>
                  </Container>
                   <Button 
                   className={classes.submitButton}
                   onClick={this.nextQuestion}>
                      Submit Answers
                   </Button>
               </div>
            </Col>
            <Col>
               <Clock/>
            </Col>
         </Row>
         <Row>
             <Footer> </Footer>
         </Row>
     </Container>
      );
   }
}

export default withRouter(Exam);