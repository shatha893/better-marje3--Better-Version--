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
import Divider from '@material-ui/core/Divider';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import FB from '../../Assets/FiB_2.svg';
import Question from '../../Containers/Exams/MakeExamTab/MakeExam';

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
              this.setState({
                // prevState =>{
                //     return{
                //         TFformData:{
                //             ...prevState.TFformData,
                //             selectedOption: type
                //           }}
                //     }
                // }
                   
                  }); 
              break;

              case "weight":
                  this.setState({
                      TFformData:{
                          ...this.state.TFformData,
                          weight:event.target.value}
                      });  
                  break;
              
              case "body":
                  this.setState({
                      TFformData:{
                          ...this.state.TFformData,
                          body:event.target.value}
                      });  
                  break;
        }
  }

   generateTags = (event) =>{
        this.setState({
            TFformData:{
                ...this.state.TFformData,
                tags:[...this.state.TFformData.tags,event.target.value]}
            })
    }

    handleSave = () =>{
       this.props.handleSave(this.state.TFformData);
    }


    render(){

        const optionsArr = [
            {
                key:0,
                className:this.state.TFClicked,
                onClick:()=>this.handleQuestionType("TF"),
                imgSrc:TF,
                spanText:"True False"
            },
            {
                key:1,
                className:this.state.MCClicked,
                onClick:()=>this.handleQuestionType("MC"),
                imgSrc: MC, 
                spanText:"Multiple Choice"
            },
            {
                key:2,
                className:this.state.PClicked,
                onClick:()=>this.handleQuestionType("P"),
                imgSrc:P,
                spanText:"Programming"
            },
            {
                key:3,
                className:this.state.FBClicked,
                onClick:()=>this.handleQuestionType("FB"),
                imgSrc:FB,
                spanText:" Fill in Blanks"
            }
        ];

        return(
            <>
            {/* ___________Questions' Options Grid_______________ */}
            <Grid 
            container 
            className={classes.root} 
            spacing={2}>
                <Grid item xs>
                    <Grid container spacing={1}>

                        {optionsArr.map(option=>(
                            <Grid key={option.key} item>
                            <Paper 
                            // className={option.className?classes.paperClicked:classes.paperNotClicked} 
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
            {/* _______________________________________________*/}


            <Question 
            className={this.state.TFClicked?null:classes.hidden}
            handleChange={this.handleChange}
            tags={this.state.TFformData.tags}
            generateTags={this.generateTags}
            handleSave={this.handleSave}>
                <fieldset className={classes.formGroup}>
                    <span> Answers </span>
                    <Form.Text id="passwordHelpBlock" muted>
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
            </Question>
            
                 {/* ___________Mulitple Choice Questions__________ */}

                 {/* <div className={this.state.MCClicked?null:classes.hidden}>
                 <Form className={classes.form} >
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label> Question </Form.Label>
                        <Form.Control 
                        as="textarea" 
                        rows={3}
                        onChange={(event)=>this.handleChange("body",event)}/>
                    </Form.Group>
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
                            <Form.Group controlId="questionWeight" className={classes.formGroup}>
                                <Form.Label> Question Weight </Form.Label>
                                <Col sm={1}>
                                    <Form.Control 
                                    type="number" 
                                    onChange={(event)=>this.handleChange("weight",event)}/>
                                </Col>
                            </Form.Group>
                        </Form>
                        <Button 
                        className={classes.button}
                        onClick={()=>this.props.handleSave(this.state.TFformData)}>
                            Save
                        </Button>
                    <Divider/>
                 </div>
                 {/* _______________________________________________*/}


                 {/* ___________Programming Questions__________ */}

                 {/* <div className={this.state.PClicked?null:classes.hidden}>
                    <Form className={classes.form} >
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label> Question </Form.Label>
                            <Form.Control 
                            as="textarea" 
                            rows={3}
                            onChange={(event)=>this.handleChange("body",event)}/>
                        </Form.Group>
                        <Form.Group>
                        <Form.File  
                        label="Answer Code"
                        onChange={(event)=>this.handleChange("",event)}/>
                        </Form.Group>
                        <Button 
                        className={classes.button}
                        onClick={()=>null}>
                            Save
                        </Button>
                    </Form>
                    <Divider/>
                 </div> */}
                 {/* _______________________________________________ */} 

            </>
        );
    }
    
}

export default MakeQuestion;


//  {/* Multiple Choice Option  */}
//  <Grid key = {1} item>
//  <Paper 
//  className={this.state.MCClicked?classes.paperClicked:classes.paperNotClicked} 
//  onClick={()=>this.handleQuestionType("MC")}>
//      <img src={MC} className={classes.qIcon}/>
//      <br/>
//      <span className={classes.paperText}> Multiple Choice </span>
//  </Paper>
// </Grid>

// {/* Programming Option  */}
// <Grid key = {2} item>
//  <Paper 
//  className={this.state.PClicked?classes.paperClicked:classes.paperNotClicked} 
//  onClick={()=>this.handleQuestionType("P")}>
//      <img src={P} className={classes.qIcon}/>
//      <br/>
//      <span className={classes.paperText}> Programming </span>
//  </Paper>
// </Grid>