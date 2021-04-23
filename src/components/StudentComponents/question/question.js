import React from 'react';
import Form from 'react-bootstrap/Form';
import Divider from '@material-ui/core/Divider';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import classes from './question.module.css';
import Col from 'react-bootstrap/Col';

const question = (props) =>{
    return(<div className={props.hide?null:classes.hidden}>
      <Form 
      id="question-form" 
      className={classes.form}
      hasValidation>
          <Form.Group controlId="questionInput">
              <Form.Label> Question </Form.Label>
              <Form.Control 
              as="textarea" 
              rows={3}
              onChange={(event)=>props.handleQuestion("body",event)}/>
          </Form.Group>

          {props.children}

          <Form.Group controlId="questionWeight" className={classes.formGroup}>
              <Form.Label> Question Weight </Form.Label>
              <Col sm={2}>
                  <Form.Control 
                  type="number" 
                  min="0"
                  isInvalid={!props.hasValidWeight}
                  onChange={(event)=>props.handleQuestion("weight",event)}/>
                  <Form.Control.Feedback type="invalid">
                     Please provide a valid weight.
                  </Form.Control.Feedback>
              </Col>
          </Form.Group>
         
          <Form.Group controlId="TagsInput">
              <Form.Label>
                  Tags &nbsp;
                  {props.tags.map(tag=>{
                  return(
                  <>
                      <Badge 
                      pill 
                      variant="primary"
                      className={classes.badge}>
                          {tag} 
                      </Badge>  &nbsp;
                  </>
                  ); })}
              </Form.Label>
              <Form.Control 
              type="text"
              onBlur={(event)=>props.generateTags(event)}/>
          </Form.Group>
      </Form>
      <Button 
      className={classes.button}
      disabled={props.hasValidWeight?false:true}
      onClick={()=>props.handleSave()}>
         Save
      </Button>
      <Divider/>
      </div>
   );
}

export default question;