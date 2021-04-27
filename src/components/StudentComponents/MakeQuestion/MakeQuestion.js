import React, { Component } from 'react';
import classes from './MakeQuestion.module.css';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TF from '../../../Assets/trueFalse.svg';
import MC from '../../../Assets/multipleChoice.svg';
import P from '../../../Assets/programming.svg';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import FB from '../../../Assets/FiB_2.svg';
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
      PformData:{
        body:"",
        ansFile:null,
        weight:0,
        type:"Programming",
        tags:[]
     },
      FiBClicked:false,
      FiBformData:{
        body:"",
        answer:"",
        weight:0,
        type:"FillInBlank",
        tags:[]
     },
    }

    handleQuestionType = (val) =>{
        switch(val)
        {
            case "TF":
                this.setState({
                    TFClicked:true,
                    MCClicked:false,
                    PClicked:false,
                    FiBClicked:false
                });
                break;

            case "MC":
                this.setState({
                    TFClicked:false,
                    MCClicked:true,
                    PClicked:false,
                    FiBClicked:false
                });
                break;

            case "P":
                this.setState({
                    TFClicked:false,
                    MCClicked:false,
                    PClicked:true,
                    FiBClicked:false
                });
                break;
            case "FiB":
                this.setState({
                    TFClicked:false,
                    MCClicked:false,
                    PClicked:false,
                    FiBClicked:true
                })
            default:
                break;
        }
        
    }

    handleQuestionTF = (type,event) =>{
        switch(type){
            case "weight":
                  if(event.target.value<0) 
                  {
                    this.setState( prevState =>{
                        return{
                            TFformData:{
                                ...prevState.TFformData,
                                weight:-1
                              }}
                        }); 
                  }
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

            default:
              this.setState(
                prevState =>{
                    return{
                        MCformData:{
                            ...prevState.TFformData,
                            selectedOption: type
                          }}
                    }); 
              break;

        }
  }

  handleQuestionMC = (type,event) =>{
    switch(type){
        
          case "weight":
              if(event.target.value<0) 
              {
                this.setState( prevState =>{
                    return{
                        TFformData:{
                            ...prevState.TFformData,
                            weight:-1
                          }}
                    }); 
              }
              else{
              this.setState( prevState =>{
                return{
                    TFformData:{
                        ...prevState.TFformData,
                        weight:event.target.value
                      }}
                }); 
            }
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
        default:
          this.setState(
            prevState =>{
                return{
                    MCformData:{
                        ...prevState.TFformData,
                        selectedOption: type
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

    handleSave = (questionType) =>{
        switch(questionType){
            case "TF":
                this.props.handleSave(this.state.TFformData);
                this.setState(prevState =>{
                    return{
                        TFformData:{
                            ...prevState.TFformData,
                            tags:[]
                          }}
                    });
                break;
            case "MC":
                this.props.handleSave(this.state.MCformData);
                this.setState(prevState =>{
                    return{
                        MCformData:{
                            ...prevState.MCformData,
                            tags:[]
                          }}
                    });
                break;
            case "P":
                this.props.handleSave(this.state.PformData);
                this.setState(prevState =>{
                    return{
                        PformData:{
                            ...prevState.PformData,
                            tags:[]
                          }}
                    });
                break;
            case "FiB":
                this.props.handleSave(this.state.FiBformData);
                this.setState(prevState =>{
                    return{
                        FiBformData:{
                            ...prevState.FiBformData,
                            tags:[]
                          }}
                    });
                break;

        }
        document.getElementById("question-form").reset();
    }



    render(){

        const optionsArr = [
            {
                key:0,
                hasValidWeight:this.state.TFformData.weight>=0?true:false,
                clicked:this.state.TFClicked,
                onClick:()=>this.handleQuestionType("TF"),
                imgSrc:TF,
                spanText:"True False",
                handleQuestion:this.handleQuestionTF,
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
                                    onChange={(event)=>this.handleQuestionTF("radioTrue",event)}/>
                                    <Form.Check
                                    type="radio"
                                    label="False"
                                    name="formHorizontalRadios"
                                    id="falseRadio"
                                    className={classes.radioBtn}
                                    onChange={(event)=>this.handleQuestionTF("radioFalse",event)}/>
                                </Col>
                                </Form.Group>
                              </fieldset>
                              </>
            },
            {
                key:1,
                hasValidWeight:this.state.MCformData.weight>=0?true:false,
                clicked:this.state.MCClicked,
                onClick:()=>this.handleQuestionType("MC"),
                imgSrc: MC, 
                spanText:"Multiple Choice",
                handleQuestion:this.handleQuestionMC,
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
                                            type="radio"
                                            label="This answer option is correct"
                                            name="formHorizontalRadios"
                                            id="choiceA"
                                            onChange={(event)=>this.handleChange("choiceA",event)}/>
                                        </Form.Label>
                                        <Form.Control 
                                        as="textarea" 
                                        rows={3}
                                        onChange={(event)=>this.handleChange("body",event)}/>
                                    </Form.Group>

                                    <br/>
                                    <Form.Group controlId="exampleForm.ControlInput1">
                                        <span className={classes.checkOp}>(B)</span>
                                        <Form.Label
                                        className={classes.checkbox}> 
                                            <Form.Check
                                            type="radio"
                                            label="This answer option is correct"
                                            name="formHorizontalRadios"
                                            id="choiceB"
                                            
                                            onChange={(event)=>this.handleChange("choiceB",event)}/>
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
                                            type="radio"
                                            label="This answer option is correct"
                                            name="formHorizontalRadios"
                                            id="choiceC"
                                            onChange={(event)=>this.handleChange("choiceC",event)}/>

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
                                            type="radio"
                                            label="This answer option is correct"
                                            name="formHorizontalRadios"
                                            id="choiceD"
                                            onChange={(event)=>this.handleChange("choiceD",event)}/>
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
                hasValidWeight:this.state.PformData.weight>=0?true:false,
                clicked:this.state.PClicked,
                onClick:()=>this.handleQuestionType("P"),
                imgSrc:P,
                spanText:"Programming",
                handleQuestion:this.handleQuestionP,
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
                hasValidWeight:this.state.FiBformData.weight>=0?true:false,
                clicked:this.state.FBClicked,
                onClick:()=>this.handleQuestionType("FB"),
                imgSrc:FB,
                spanText:" Fill in Blank",
                type:"FiB",
                questionInput:<>
                                <fieldset className={classes.formGroup}>
                                <Form.Group as={Row} >
                                <Col>
                                    <Form.Label>
                                        Answer
                                    </Form.Label>
                                    <Form.Control 
                                    type="text" 
                                    onChange={()=>this.handleChange()}/>
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
                    handleQuestion={option.handleQuestion}
                    tags={this.state.TFformData.tags}
                    generateTags={this.generateTags}
                    handleSave={this.handleSave}
                    hasValidWeight={option.hasValidWeight}>
                        {option.questionInput}
                    </Question>);
            })}
            
        </>
        );
    }
    
}

export default MakeQuestion;