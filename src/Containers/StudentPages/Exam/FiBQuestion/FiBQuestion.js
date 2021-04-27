import React,{Component} from 'react';
import Form from 'react-bootstrap/Form';
import classes from './fibQuestion.module.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const fibQuestion=(props)=>{
   return(
      <Form.Group 
      as={Row}
      className={classes.formGroup}>
      <Col>
         <Form.Label
         className={classes.formLabel}> Answer </Form.Label>
         <Form.Control type="text"/>
      </Col>
      </Form.Group>);
}

export default fibQuestion;