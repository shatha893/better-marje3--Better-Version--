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
import DropdownList from '../UI/DropdownList/DropdownList';
import Dropdown from 'react-bootstrap/Dropdown';

//___I've only written the proper states for the true false questions!!!___
class MakeQuestion extends Component{

    state = {
      TFClicked:true,
      TFformData:{
        body:"",
        selectedOption:"",
        weight:0,
        type:"True False",
        tags:[],
        id:0

     },
      MCClicked:false,
      MCformData:{
        body:"",
        selectedOption:"",
        weight:0,
        type:0,
        tags:[],
        choices:new Map()

     },
      PClicked:false,
      PformData:{
        body:"",
        ansFile:null,
        weight:0,
        type:3,
        tags:[],
        id:0,
        answer:"",
        language:"",

     },
      FiBClicked:false,
      FiBformData:{
        body:"",
        answer:"",
        weight:0,
        type:1
     }
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
            case "FB":
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

    handleQuestionFB = (type,event) =>{
        switch(type){
            case "weight":
                  if(event.target.value<0) 
                  {
                    this.setState( prevState =>{
                        return{
                            FiBformData:{
                                ...prevState.FiBformData,
                                weight:-1
                              }}
                        }); 
                  }
                  this.setState( prevState =>{
                    return{
                        FiBformData:{
                            ...prevState.FiBformData,
                            weight:event.target.value
                          }}
                    }); 
                  break;
              
            case "body":
                  this.setState(prevState =>{
                    return{
                        FiBformData:{
                            ...prevState.FiBformData,
                            body:event.target.value
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
                        MCformData:{
                            ...prevState.MCformData,
                            weight:-1
                          }}
                    }); 
              }
              else{
              this.setState( prevState =>{
                return{
                    MCformData:{
                        ...prevState.MCformData,
                        weight:event.target.value
                      }}
                }); 
            }
              break;
          
          case "body":
              this.setState(prevState =>{
                return{
                    MCformData:{
                        ...prevState.MCformData,
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

    PQ = (event)=>{
        let tempMap = new Map();
        let reader = new FileReader();
        reader.onload = (e)=>{
          tempMap.set(this.state.id,e.target.result);
        };
        reader.readAsDataURL(event.target.files[0]); 
         this.props.handleChange(this.state.PformData);
                this.setState(prevState =>{
                    return{
                        PformData:{
                            ...prevState.PformData,
                            tags:[],
                            answers:tempMap

                          }}
                    });
    }

    handleLanguage = (id,lang) =>{
       
        this.props.handleChange(this.state.PformData);
       this.setState(prevState =>{
           return{
            PformData:{
                   ...prevState.PformData,
                   tags:[],
                   language:lang

                 }}
           });
      }

    handleChange = (questionType ) =>{
        switch(questionType){
            case "TF":
                this.props.handleChange(this.state.TFformData);
                this.setState(prevState =>{
                    return{
                        TFformData:{
                            ...prevState.TFformData,
                            tags:[],

                          }}
                    });
                break;
            case "MC":
                this.props.handleChange(this.state.MCformData);
                this.setState(prevState =>{
                    return{
                        MCformData:{
                            ...prevState.MCformData,
                            tags:[]
                          }}
                    });
                break;
            case "P":
                this.props.handleChange(this.state.PformData);
                this.setState(prevState =>{
                    return{
                        PformData:{
                            ...prevState.PformData,
                            tags:[]
                          }}
                    });
                break;
            case "FiB":
                this.props.handleChange(this.state.FiBformData);
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


    MCQ = (id , body) =>{
        let tempMap = new Map();
        for(let [key, value] of this.state. MCformData.choices)
          tempMap.set(key,value);
         tempMap.set(id,body.target.value);

        this.props.handleChange(this.state.MCformData);
        this.setState(prevState =>{
            return{
                MCformData:{
                    ...prevState.MCformData,
                    tags:[],
                    choices:tempMap
                  }}
            });
    }

    FIB = (event) =>{
        this.props.handleChange(this.state.FiBformData);
        this.setState(prevState =>{
            return{
                FiBformData:{
                    ...prevState.FiBformData,
                    tags:[],
                    answer:event.target.value

                  }}
            });
    }

    handleChange = (content , questionType ) =>{
        switch(questionType){
            case "TF":
                this.props.handleChange(this.state.TFformData);
                this.setState(prevState =>{
                    return{
                        TFformData:{
                            ...prevState.TFformData,
                            tags:[],
                            body:content

                          }}
                    });
                break;
            case "MC":
                this.props.handleChange(this.state.MCformData);
                this.setState(prevState =>{
                    return{
                        MCformData:{
                            ...prevState.MCformData,
                            tags:[],
                            body:content

                          }}
                    });
                break;
            case "P":
                this.props.handleChange(this.state.PformData);
                this.setState(prevState =>{
                    return{
                        PformData:{
                            ...prevState.PformData,
                            tags:[],
                            body:content

                          }}
                    });
                break;
            case "FiB":
                this.props.handleChange(this.state.FiBformData);
                this.setState(prevState =>{
                    return{
                        FiBformData:{
                            ...prevState.FiBformData,
                            tags:[],
                            body:content
                          }}
                    });
                break;

        }
        document.getElementById("question-form").reset();
    }

    handleSelected = (event)=>{
        this.props.handleChange(this.state.MCformData);
        this.setState(prevState =>{
            return{
                MCformData:{
                    ...prevState.MCformData,
                    tags:[],
                    selectedOption:event
                  }}
            });
    }

    render(){
 
        let languages = ["cpp","java","csharp","c","py"];

        const optionsArr = [
           
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
                                            onChange={()=>this.handleSelected("A")}/>
                                        </Form.Label>
                                        <Form.Control 
                                        as="textarea" 
                                        rows={3}
                                        onChange={(event)=>this.MCQ("A",event)}/>
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
                                            
                                            onChange={()=>this.handleSelected("B")}/>
                                        </Form.Label>
                                        <Form.Control 
                                        as="textarea" 
                                        rows={3}
                                        onChange={(event)=>this.MCQ("B",event)}/>
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
                                            onChange={()=>this.handleSelected("C")}/>

                                        </Form.Label>
                                        <Form.Control 
                                        as="textarea" 
                                        rows={3}
                                        onChange={(event)=>this.MCQ("C",event)}/>
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
                              <DropdownList 
                      className={classes.dropdownList}>
                     {languages.map((course,index)=>{
                  return(
                     <Dropdown.Item
                     key={index}
                     onClick={()=>this.props.handleLanguage(this.props.question.id,course)}>{course}</Dropdown.Item>
                  );
                  })}
            </DropdownList>
                                <Form.File  
                                label="Answer Code"
                                onChange={(event)=>this.PQ(event)}/>
                              </Form.Group>
                              </>
            },
            {
                key:3,
                hasValidWeight:this.state.FiBformData.weight>=0?true:false,
                clicked:this.state.FiBClicked,
                onClick:()=>this.handleQuestionType("FB"),
                imgSrc:FB,
                spanText:" Fill in Blank",
                type:"FiB",
                handleQuestion: this.handleQuestionFB,
                questionInput:<>
                                <fieldset className={classes.formGroup}>
                                <Form.Group as={Row} >
                                <Col>
                                    <Form.Label>
                                        Answer
                                    </Form.Label>
                                    <Form.Control 
                                    type="text" 
                                    onChange={(event)=>this.FIB(event)}/>
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
                    key={option.key}
                    hide={option.clicked}
                    handleQuestion={option.handleQuestion}
                    tags={this.state.TFformData.tags}
                    generateTags={this.generateTags}
                    handleChange={(obj)=>this.handleChange(obj)}
                    handleSave={()=>this.props.handleSave()}
                    hasValidWeight={option.hasValidWeight}>
                        {option.questionInput}
                    </Question>);
            })}
            
        </>
        );
    }
    
}

export default MakeQuestion;