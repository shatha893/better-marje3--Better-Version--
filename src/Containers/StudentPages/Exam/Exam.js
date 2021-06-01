import React, { Component } from 'react';
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/footer';
import classes from './Exam.module.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Divider from '@material-ui/core/Divider';
import Clock from '../../../components/StudentComponents/UI/Clock/Clock';
import { withRouter } from 'react-router-dom';
import MainQuestion from '../MainQuestion/MainQuestion';

class Exam extends Component{
  
   state={
      questions: [],
      index:0
  };

   

   handleSubmit = () =>{
      this.props.history.push("/Feedback");
   }

   nextQuestion = ()=>{
      if(this.state.index < this.props.location.state.questionsId.length-1){
         {
            let temp = this.state.index;
         this.setState({
            index:temp+1
          });
         }
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
                        {/* {this.props.location.state.questionsId[this.state.index].content} */}
                        Eat owner's food mice open the door, let me out, let me out, let me-out, let me-aow, let meaow, meaow! or stare at ceiling, for inspect anything brought into the house wake up human for food at 4am. Chase mice your pillow is now my pet bed or lick left leg for ninety minutes, still dirty pee in the shoe purr as loud as possible, be the most annoying cat that you can, and, knock everything off the table, somehow manage to catch a bird but have no idea what to do next, so play with it until it dies of shock. I cry and cry and cry unless you pet me, and then maybe i cry just for fun reaches under door into adjacent room. Thinking longingly about tuna brine sleep in the bathroom sink, or lay on arms while you're using the keyboard. Murf pratt ungow ungow cat is love, cat is life but trip on catnip for poop on grasses. Crash against wall but walk away like
                     </Row>
                     <Row>
                        <MainQuestion 
                        lastQuestion={this.state.index === this.props.location.state.questionsId.length-1}
                        question={this.props.location.state.questionsId[this.state.index]} 
                        nextQuestion={this.nextQuestion}/>  
                     </Row>
                  </Container>
                  
               </div>
            </Col>
            <Col>
               <Clock 
               milliseconds={this.props.location.state.examDuration}/>
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