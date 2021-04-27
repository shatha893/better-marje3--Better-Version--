import React,{Component} from 'react';
import Form from 'react-bootstrap/Form';
import classes from './pQuestion.module.css';

const pQuestion=(props)=>{
   return(
         <Form.Group>
            <Form.File 
            className={classes.formGroup} 
            label="Upload Answer"/>
         </Form.Group>
      );
}

export default pQuestion;