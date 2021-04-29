import React,{Component} from 'react';
import Form from 'react-bootstrap/Form';
import classes from './tfQuestion.module.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const tfQuestion=(props)=>{
   return(
      <fieldset id='group1'>
      <Form.Group 
      as={Row}
      className={classes.formGroup}>
      <Col>
         <Form.Check
         type="radio"
         label="True"
         name="formHorizontalRadios"
         id="trueRadio"
         className={classes.radioBtn}
         key='group1'/>
         <Form.Check
         type="radio"
         label="False"
         name="formHorizontalRadios"
         id="falseRadio"
         className={classes.radioBtn}
         key='group1'/>
      </Col>
      </Form.Group>
      </fieldset>);
}

export default tfQuestion;