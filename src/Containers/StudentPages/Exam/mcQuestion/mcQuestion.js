import React,{Component} from 'react';
import Form from 'react-bootstrap/Form';
import classes from './mcQuestion.module.css';



const mcQuestion=(props)=>{
   
  
   return(
      <fieldset id={`group ${props.question.id}`} className={classes.formGroup} >
               <br/>
               <Form.Label>
                  <Form.Check
                  type="radio"
                  label={props.question.choices[0].content}
                  name="formHorizontalRadios"
                  id={props.question.choices[1].content}
                  key={`group ${props.question.id}`}
                  onChange={()=>props.handleAnswer(0,props.question.id,0)}/>
               </Form.Label>
               <br/>
               <Form.Label>
                  <Form.Check
                  type="radio"
                  label={props.question.choices[1].content}
                  name="formHorizontalRadios"
                  id={props.question.choices[1].content}
                  key={`group ${props.question.id}`}
                  onChange={()=>props.handleAnswer(0,props.question.id,1)}/>
               </Form.Label>
               <br/>
               <Form.Label>
                  <Form.Check
                  type="radio"
                  label={props.question.choices[2].content}
                  name="formHorizontalRadios"
                  id={props.question.choices[1].content}
                  key={`group ${props.question.id}`}
                  onChange={()=>props.handleAnswer(0,props.question.id,2)}/>
               </Form.Label>
         </fieldset>
      );
}

export default mcQuestion;