import React,{Component} from 'react';
import Form from 'react-bootstrap/Form';
import classes from './mcQuestion.module.css';

const mcQuestion=(props)=>{
   return(
      <Form>
         <p>
         <Form.Group 
         controlId="exampleForm.ControlInput1"
         className={classes.formGroup}>
               <br/>
               <Form.Label>
                  <Form.Check
                  type="radio"
                  label={props.question.options[0]}
                  name="formHorizontalRadios"
                  id="choice1"/>
               </Form.Label>
               <br/>
               <Form.Label>
                  <Form.Check
                  type="radio"
                  label={props.question.options[1]}
                  name="formHorizontalRadios"
                  id="choice2"/>
               </Form.Label>
               <br/>
               <Form.Label>
                  <Form.Check
                  type="radio"
                  label={props.question.options[2]}
                  name="formHorizontalRadios"
                  id="choice3"/>
               </Form.Label>
         </Form.Group>
         </p>
    </Form>
      );
}

export default mcQuestion;