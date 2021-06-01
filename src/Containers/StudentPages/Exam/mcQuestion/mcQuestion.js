import React,{Component} from 'react';
import Form from 'react-bootstrap/Form';
import classes from './mcQuestion.module.css';



const mcQuestion=(props)=>{
   console.log("qqqqqqq ",props.question===undefined?"":props.question.subQuestion.choices[0].id);
   return(
      <>
      {props.question === null?null:
      <fieldset id={`group 9`} className={classes.formGroup} >
               <br/>
               <Form.Label>
                  <Form.Check
                  type="radio"
                  label={props.question.subQuestion.choices[0].content}
                  name="formHorizontalRadios"
                  id={1}
                  key={`group 9`}
                  onChange={()=>props.handleMCQchange(props.question.subQuestion.id,props.question.subQuestion.choices[0].id)}/>
               </Form.Label>
               <br/>
               <Form.Label>
                  <Form.Check
                  type="radio"
                  label={props.question.subQuestion.choices[1].content}
                  name="formHorizontalRadios"
                  id={2}
                  key={`group 9`}
                  onChange={()=>props.handleMCQchange(props.question.subQuestion.id,props.question.subQuestion.choices[1].id)}/>
               </Form.Label>
               <br/>
               {/* <Form.Label>
                  <Form.Check
                  type="radio"
                  label={props.question.subQuestion.choices[2].content}
                  name="formHorizontalRadios"
                  id={props.question.subQuestion.choices[1].content}
                  key={`group 9`}
                  onChange={()=>props.handleAnswer(0,props.question.id,2)}/>
               </Form.Label> */}
         </fieldset>
   }
   </>);
}

export default mcQuestion;