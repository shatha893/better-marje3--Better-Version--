import React from 'react';
import Form from 'react-bootstrap/Form';
import Divider from '@material-ui/core/Divider';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

const question = (props) =>(
      <div 
      // className={this.state.TFClicked?null:classes.hidden}
      >
      <Form className={classes.form} >
          <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label> Question </Form.Label>
              <Form.Control 
              as="textarea" 
              rows={3}
              onChange={(event)=>props.handleChange("body",event)}/>
          </Form.Group>

          {/* {props.children} */}

          <Form.Group controlId="questionWeight" className={classes.formGroup}>
              <Form.Label> Question Weight </Form.Label>
              <Col sm={1}>
                  <Form.Control 
                  type="number" 
                  onChange={(event)=>this.handleChange("weight",event)}/>
              </Col>
          </Form.Group>
         
          <Form.Group controlId="exampleForm.ControlInput1">
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
      onClick={()=>props.handleSave()}>
         Save
      </Button>
      <Divider/>
      </div>
   );

export default question;