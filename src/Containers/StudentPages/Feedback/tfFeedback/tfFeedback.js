import React,{Component} from 'react';
import Form from 'react-bootstrap/Form';
import classes from './tfFeedback.module.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const tfFeedback=(props)=>{
   return(
      <fieldset id="group1">
      <Form.Group 
      as={Row}
      className={classes.formGroup}>
      <Col>
         <Form.Check
         type="radio"
         label="True"
         checked={props.question.answer==="true"?true:false}
         disabled
         name="tf"
         id="trueRadio"
         key='group1'
         className={classes.radioBtn}/>
         <Form.Check
         type="radio"
         label="False"
         checked={props.question.answer==="false"?true:false}
         disabled
         name="tf"
         key='group1'
         id="falseRadio"
         className={classes.radioBtn}/>
         <p className={props.question.answer === props.question.userAnswer
               ?classes.rightOpt :classes.wrongOpt}> 
               Your answer was: <br/> {props.question.userAnswer} </p>
      </Col>
      </Form.Group>
      
      </fieldset>);
}

export default tfFeedback;