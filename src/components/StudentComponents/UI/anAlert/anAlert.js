import React from 'react';
import Alert from 'react-bootstrap/Alert';
import classes from './anAlert.module.css';

const anAlert=(props)=>{
   return(
          <Alert 
          hidden={props.hide} 
          variant={props.variant}
          className={classes.Content}>
            <Alert.Heading> {props.title} </Alert.Heading>
            <p> {props.textContent} </p>
          </Alert>
        );
}
export default anAlert;
