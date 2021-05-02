import React,{Component} from 'react';
import Form from 'react-bootstrap/Form';
import classes from './mcQuestion.module.css';

const mcQuestion=(props)=>{
   return(
      <fieldset id="group2" className={classes.formGroup}>
               <br/>
               <Form.Label>
                  <Form.Check
                  type="radio"
                  label={props.question.options[0]}
                  name="formHorizontalRadios"
                  id="choice1"
                  key='group2'/>
               </Form.Label>
               <br/>
               <Form.Label>
                  <Form.Check
                  type="radio"
                  label={props.question.options[1]}
                  name="formHorizontalRadios"
                  id="choice2"
                  key='group2'/>
               </Form.Label>
               <br/>
               <Form.Label>
                  <Form.Check
                  type="radio"
                  label={props.question.options[2]}
                  name="formHorizontalRadios"
                  id="choice3"
                  key='group2'/>
               </Form.Label>
         </fieldset>
      );
}

export default mcQuestion;