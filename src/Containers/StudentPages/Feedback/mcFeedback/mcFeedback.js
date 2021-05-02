import React,{Component} from 'react';
import Form from 'react-bootstrap/Form';
import classes from './mcFeedback.module.css';

const mcFeedback=(props)=>{
   return(
      <fieldset id="group2" className={classes.formGroup}>
               <br/>
               <Form.Label>
                  <Form.Check
                  disabled
                  type="radio"
                  checked={props.question.answer == props.question.options[0]?true:false}
                  label={props.question.options[0]}
                  name="group2"
                  id="choice1"/>
               </Form.Label>
               <br/>
               <Form.Label>
                  <Form.Check
                  disabled
                  type="radio"
                  checked={props.question.answer=== props.question.options[1]?true:false}
                  label={props.question.options[1]}
                  name="group2"
                  key='group2'
                  id="choice2"/>
               </Form.Label>
               <br/>
               <Form.Label>
                  <Form.Check
                  type="radio"
                  disabled
                  label={props.question.options[2]}
                  checked={props.question.answer===props.question.options[2]?true:false}
                  name="group2"
                  key='group2'
                  id="choice3"/>
               </Form.Label>
               <p className={props.question.answer === props.question.UserAnswer
               ?classes.rightOpt :classes.wrongOpt}> 
               Your answer was: <br/> {props.question.userAnswer} </p>
         </fieldset>
      );
}

export default mcFeedback;