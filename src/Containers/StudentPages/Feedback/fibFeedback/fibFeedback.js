import React,{Component} from 'react';
import Form from 'react-bootstrap/Form';
import classes from './fibFeedback.module.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const fibFeedback=(props)=>{
   return(
      <Form.Group 
      as={Row}
      className={classes.formGroup}>
      <Col>
         <Form.Label
         className={classes.formLabel}> Answer </Form.Label>
         <Form.Control 
         type="text"
         disabled
         value={props.question.answer}/>
         <p className={props.question.answer === props.question.userAnswer
         ?classes.rightOpt :classes.wrongOpt}> 
         Your answer was: <br/> {props.question.userAnswer} </p>
      </Col>
      
      </Form.Group>);
}

export default fibFeedback;