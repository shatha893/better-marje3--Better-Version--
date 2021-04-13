import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import classes from './MakeExam.module.css';
import AddIcon from '@material-ui/icons/Add';
import MakeQuestion from '../../../../components/MakeQuestion/MakeQuestion';
import CheckboxList from '../../../../components/UI/CheckboxList/CheckboxList';
import Axios from 'axios';
import Spinner from '../../../../components/UI/spinner/spinner';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

class MakeExam extends Component{

    state={
        addQuestionClicked:false,
        savedQuestions:[],
        totalWeight:0,
        totalTags:[],
        existingQuestions:[],
        open:false,
        loading:false

    }

    handleAddQues = () =>{
        this.setState({addQuestionClicked:true});
    }

    handleSave = (questionObj) =>{
        const tempWeight = this.state.totalWeight+parseInt(questionObj.weight);
        const tempTags = [...this.state.totalTags, ...questionObj.tags];
        console.log(tempTags);
        this.setState({
            savedQuestions:[...this.state.savedQuestions,questionObj],
                totalWeight:tempWeight,
                totalTags:[...tempTags],
             open:true});
    }

    handleExistingQuestionsSave = (questionArr) =>{

    }

    handleCloseSnackbar = ()=>{
        this.setState({open:false});
    }

    handleExistingQuestion = () =>{
        this.setState({loading:true});
        //questions data instead which is supposed to be consisting of ( Question, Question tags)
        Axios.get("http://localhost:3000/exams").then(response=>{
            let tempArr = [];
            console.log(response);
            for(let i in response.data)
            {
                tempArr.push({
                    id:i,
                    name:response.data[i].name,
                    date:response.data[i].year
                })
            }
            this.setState({
                existingQuestions:[...tempArr],
                loading:false
            })

        })
    }

    render()
    {
        return(
            <>
            <Container className={classes.form}>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label className={classes.label}>Exam Name</Form.Label>
                    <Form.Control type="text"/>
                </Form.Group>

                <p>
                {this.state.savedQuestions.length} &nbsp; 
                Questions  
                <span 
                className={classes.totalWeight}>
                    ({this.state.totalWeight}) Total Points
                </span>
                </p>

                <p>
                Total Tags &nbsp;
                {this.state.totalTags.map(tag=>(
                <>
                    <Badge 
                    pill 
                    variant="primary"
                    className={classes.badge}>
                    {tag} 
                    </Badge>  &nbsp;
                </>
                ))}
                </p>
                <br/>
                <div>
                    {/*_____Divs that appear with every saved question____*/}
                    {this.state.savedQuestions.map((obj,index)=>{
                    return(
                    <div className={classes.containerDiv}>
                    <span className={classes.spanTitle}> Question {index+1}: </span> <br/>
                    <span className={classes.spanBody}> {obj.body} </span> 
                    <br/> <br/>
                    <span className={classes.spanTitle}> Answer: </span> <br/> 
                    <span className={classes.spanBody}> {obj.selectedOption == "radioTrue"?"true":"false"} </span>
                    <br/> <br/>
                    <span className={classes.jumbWeight}> ({obj.weight}) Points </span> 
                    </div> );
                    })}
                    {/*_____________________________________________________*/}

                    <Button 
                    className={classes.button}
                    onClick={this.handleAddQues}>
                        <AddIcon/>
                        Add Question
                    </Button>
            
                    {/*___Add Question Accordion___*/}
                    <Accordion 
                    className={classes.accordion} 
                    hidden={!this.state.addQuestionClicked}>
                    <Card className={classes.card}>
                        <Accordion.Toggle 
                        className={classes.cardHeader} 
                        as={Card.Header} 
                        eventKey="0">
                            <p> Make New Question </p>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <MakeQuestion handleSave={(obj)=>this.handleSave(obj)}/>
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    {/*_______Already Created Questions Card_______*/}
                    <Card className={classes.card}>
                        <Accordion.Toggle 
                        className={classes.cardHeader} 
                        as={Card.Header} 
                        eventKey="1"
                        onClick={this.handleExistingQuestion}>
                            <p> Use already created Questions </p>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                        <Card.Body>
                            <Spinner loading={this.state.loading}/>
                            {/*__Haven't handled the save of the checkboxlist questions yet__*/}
                            {this.state.loading?null:
                            <CheckboxList 
                            itemList={this.state.existingQuestions}
                            handleSave={(obj)=>this.handleSave(obj)}/>}
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    {/*____________________________________________*/}
                    </Accordion>
                    {/*____________________________*/}
                </div>

                <Button 
                className={this.state.savedQuestions.length>0
                ?classes.submitExam
                :classes.hideSubmitExam}>
                    Submit Exam
                </Button>
            </Container>

             {/*_____SnackBar when saving a question_____ */}
             <Snackbar
             anchorOrigin={{
             vertical: 'bottom',
             horizontal: 'left',
             }}
             open={this.state.open}
             autoHideDuration={1000}
             onClose={this.handleCloseSnackbar}
             message={`Question ${this.state.savedQuestions.length} Saved`}
             action={
             <React.Fragment>
                 <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleClose}>
                     <CloseIcon fontSize="small" />
                 </IconButton>
             </React.Fragment>}/>
             {/*_____________________________________________*/}
             </>
        );
    }
}

export default MakeExam;