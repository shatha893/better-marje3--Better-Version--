import React, { Component } from 'react';
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/footer';
import classes from './Exam.module.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

class Exam extends Component{
   state={
      time:{},
      seconds:2000
   };

   timer = 0; 

   secondsToTime = (secs)=>{
      let hours = Math.floor(secs/(3600));

      let divisorForMins = secs%3600;
      let minutes = Math.floor(divisorForMins/60);

      let divisorForSecs = divisorForMins%60;
      let seconds = Math.ceil(divisorForSecs);

      let obj = {"h":hours, "m":minutes, "s":seconds};
      return obj;
   }

   componentDidMount = ()=>{
      let timeLeftVar = this.secondsToTime(this.state.seconds);
      this.setState({time:timeLeftVar});
      this.startTimer();
   }

   startTimer =()=>{
      if(this.timer == 0 && this.state.seconds>0){
         this.timer = setInterval(this.countdown, 1000);
      }
   }

   countdown = () =>{
      let seconds = this.state.seconds - 1;
      this.setState({
         time:this.secondsToTime(seconds),
         seconds:seconds
      })

      if(seconds == 0) 
         clearInterval(this.timer);
   }

   render(){
      return(
         <Container fluid={+true} className={classes.container}>
         <Row>
             <Header pageType={"Home"} /> 
         </Row>
         <div className={classes.content}>
         <Row>
            <Col>

            </Col>
            <Col sm={8} className={classes.examCol}>
               {/*____A Single question's div_____ */}
               <div>
                  {/* MAKE A PAGE FOR EACH QUESTION AND DO A MAP FCN ...ETC */}
               </div>
            </Col>
            <Col>
               Time: {this.state.time.h}:{this.state.time.m}:{this.state.time.s}
            </Col>
         </Row>
         </div>
         <Row>
             <Footer> </Footer>
         </Row>
     </Container>
      );
   }
}

export default Exam;