import React, { Component } from 'react';
import classes from './MakeQuestion.module.css';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TF from '../../Assets/trueFalse.svg';
import MC from '../../Assets/multipleChoice.svg';
import P from '../../Assets/programming.svg';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import FB from '../../Assets/FiB_2.svg';
import Question from '../question/question';

//___I've only written the proper states for the true false questions!!!___
class MakeQuestion extends Component{

    state = {
      TFClicked:true,
      TFformData:{
        body:"",
        selectedOption:"",
        weight:0,
        type:"True False",
        tags:[]
     },
      MCClicked:false,
      MCformData:{
        body:"",
        selectedOption:"",
        weight:0,
        type:"Multiple Choice",
        tags:[]
     },
      PClicked:false,
      FBClicked:false
    }

    handleQuestionType = (val) =>{
        switch(val)
        {
            case "TF":
                this.setState({
                    TFClicked:true,
                    MCClicked:false,
                    PClicked:false,
                    FBClicked:false
                });
                break;

            case "MC":
                this.setState({
                    TFClicked:false,
                    MCClicked:true,
                    PClicked:false,
                    FBClicked:false
                });
                break;

            case "P":
                this.setState({
                    TFClicked:false,
                    MCClicked:false,
                    PClicked:true,
                    FBClicked:false
                });
                break;
            case "FB":
                this.setState({
                    TFClicked:false,
                    MCClicked:false,
                    PClicked:false,
                    FBClicked:true
                })
            default:
                break;
        }
        
    }

    handleChange = (type,event) =>{
        switch(type){
            case "radioTrue":
            case "radioFalse":
              this.setState(
                prevState =>{
                    return{
                        TFformData:{
                            ...prevState.TFformData,
                            selectedOption: type
                          }}
                    }); 
              break;

              case "weight":
                  this.setState( prevState =>{
                    return{
                        TFformData:{
                            ...prevState.TFformData,
                            weight:event.target.value
                          }}
                    }); 
                  break;
              
              case "body":
                  this.setState(prevState =>{
                    return{
                        TFformData:{
                            ...prevState.TFformData,
                            body:event.target.value
                          }}
                    });
                  break;
        }
  }

   generateTags = (event) =>{
        this.setState(prevState =>{
            return{
                TFformData:{
                    ...prevState.TFformData,
                    tags:[...prevState.TFformData.tags,event.target.value]
                  }}
            });
    }

    handleSave = () =>{
        this.props.handleSave(this.state.TFformData);
        document.getElementById("question-form").reset();
        this.setState(prevState =>{
            return{
                TFformData:{
                    ...prevState.TFformData,
                    tags:[]
                  }}
            });
    }



    render(){

        const optionsArr = [
            {
                key:0,
                clicked:this.state.TFClicked,
                onClick:()=>this.handleQuestionType("TF"),
                imgSrc:TF,
                spanText:"True False",
                questionInput:<>
                              <fieldset className={classes.formGroup}>
                                <span> Answers </span>
                                <Form.Text id="rightAnsSen" muted>
                                    Please choose the right answer
                                </Form.Text>
                                <Form.Group as={Row} >
                                <Col>
                                    <Form.Check
                                    type="radio"
                                    label="True"
                                    name="formHorizontalRadios"
                                    id="trueRadio"
                                    className={classes.radioBtn}
                                    onChange={(event)=>this.handleChange("radioTrue",event)}/>
                                    <Form.Check
                                    type="radio"
                                    label="False"
                                    name="formHorizontalRadios"
                                    id="falseRadio"
                                    className={classes.radioBtn}
                                    onChange={(event)=>this.handleChange("radioFalse",event)}/>
                                </Col>
                                </Form.Group>
                              </fieldset>
                              </>
            },
            {
                key:1,
                clicked:this.state.MCClicked,
                onClick:()=>this.handleQuestionType("MC"),
                imgSrc: MC, 
                spanText:"Multiple Choice",
                questionInput:<>
                              <fieldset className={classes.formGroup}>
                                <span>Answers</span>
                                <Form.Text id="passwordHelpBlock" muted>
                                    Please choose the right answers
                                </Form.Text>

                                <br/>
                                <Form.Group as={Row} >
                                <Col>
                                    <Form.Group controlId="exampleForm.ControlInput1">
                                        <span className={classes.checkOp}>(A)</span>
                                        <Form.Label 
                                        className={classes.checkbox}>
                                            <Form.Check
                                            type="checkbox"
                                            label="This answer option is correct"
                                            name="formHorizontalRadios"
                                            id="trueRadio"
                                            onChange={(event)=>this.handleChange("A",event)}/>
                                        </Form.Label>
                                        <Form.Control 
                                        as="textarea" 
                                        rows={3}
                                        onChange={(event)=>this.handleChange("",event)}/>
                                    </Form.Group>

                                    <br/>
                                    <Form.Group controlId="exampleForm.ControlInput1">
                                        <span className={classes.checkOp}>(B)</span>
                                        <Form.Label
                                        className={classes.checkbox}> 
                                            <Form.Check
                                            type="checkbox"
                                            label="This answer option is correct"
                                            name="formHorizontalRadios"
                                            id="falseRadio"
                                            
                                            onChange={(event)=>this.handleChange("B",event)}/>
                                        </Form.Label>
                                        <Form.Control 
                                        as="textarea" 
                                        rows={3}
                                        onChange={(event)=>this.handleChange("body",event)}/>
                                    </Form.Group>

                                    <br/>
                                    <Form.Group controlId="exampleForm.ControlInput1">
                                        <span className={classes.checkOp}>(C)</span>
                                        <Form.Label
                                        className={classes.checkbox}>
                                            <Form.Check
                                            type="checkbox"
                                            label="This answer option is correct"
                                            name="formHorizontalRadios"
                                            id="falseRadio"
                                            onChange={(event)=>this.handleChange("C",event)}/>

                                        </Form.Label>
                                        <Form.Control 
                                        as="textarea" 
                                        rows={3}
                                        onChange={(event)=>this.handleChange("body",event)}/>
                                    </Form.Group>

                                    <br/>
                                    <Form.Group controlId="exampleForm.ControlInput1">
                                        <span className={classes.checkOp}>(D)</span>
                                        <Form.Label
                                        className={classes.checkbox}>
                                            <Form.Check
                                            type="checkbox"
                                            label="This answer option is correct"
                                            name="formHorizontalRadios"
                                            id="falseRadio"
                                            onChange={(event)=>this.handleChange("D",event)}/>
                                        </Form.Label>
                                        <Form.Control 
                                        as="textarea" 
                                        rows={3}
                                        onChange={(event)=>this.handleChange("body",event)}/>
                                    </Form.Group>

                                </Col>
                                </Form.Group>
                              </fieldset>
                              </>
            },
            {
                key:2,
                clicked:this.state.PClicked,
                onClick:()=>this.handleQuestionType("P"),
                imgSrc:P,
                spanText:"Programming",
                questionInput:<>
                              <Form.Group>
                                <Form.File  
                                label="Answer Code"
                                onChange={(event)=>this.handleChange("",event)}/>
                              </Form.Group>
                              </>
            },
            {
                key:3,
                clicked:this.state.FBClicked,
                onClick:()=>this.handleQuestionType("FB"),
                imgSrc:FB,
                spanText:" Fill in Blank",
                questionInput:<>
                                <fieldset className={classes.formGroup}>
                                <Form.Group as={Row} >
                                <Col>
                                    <Form.Group controlId="exampleForm.ControlInput1">
                                        <Form.Label>
                                           Answer
                                        </Form.Label>
                                        <Form.Control 
                                         type="text" 
                                        onChange={()=>this.handleChange()}/>
                                    </Form.Group>
                                </Col>
                                </Form.Group>
                              </fieldset>
                              </>
            }
        ];


        return(
            <>
            <Grid 
            container 
            className={classes.root} 
            spacing={2}>
                <Grid item xs>
                <Grid container spacing={1}>
                    
                    {optionsArr.map(option=>(
                        <Grid key={option.key} item>
                        <Paper 
                        className={option.clicked?classes.paperClicked:classes.paperNotClicked} 
                        onClick={option.onClick}>
                            <img 
                            src={option.imgSrc} 
                            className={classes.qIcon}/>
                            <br/>
                            <span 
                            className={classes.paperText}> 
                                {option.spanText} 
                            </span>
                        </Paper>
                    </Grid>
                    ))}

                </Grid>
                </Grid>
            </Grid>

            {optionsArr.map(option =>{
                return(
                    <Question 
                    hide={option.clicked}
                    handleChange={this.handleChange}
                    tags={this.state.TFformData.tags}
                    generateTags={this.generateTags}
                    handleSave={this.handleSave}>
                        {option.questionInput}
                    </Question>);
            })}
            
        </>
        );
    }
    
}

export default MakeQuestion;