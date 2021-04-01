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
import Divider from '@material-ui/core/Divider';
import MakeQuestion from '../../../components/MakeQuestion/MakeQuestion';

class MakeExam extends Component{

    state={
        addQuestionClicked:false,
        savedQuestions:[],
        totalWeight:0,
        totalTags:[]
    }

    handleAddQues = () =>{
        this.setState({addQuestionClicked:true});
    }

    handleSave = (questionObj) =>{
        const tempWeight = this.state.totalWeight+parseInt(questionObj.weight);
        const tempTags = [...this.state.totalTags, ...questionObj.tags];
        console.log(tempTags);
        this.setState({savedQuestions:[...this.state.savedQuestions,questionObj],
                totalWeight:tempWeight,
                totalTags:[...tempTags]});
    }

    render()
    {
        return(
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
                {/* The following is to view the saved questions */}
                {this.state.savedQuestions.map((obj,index)=>{
                        return(
                        // <div className={classes.containerDiv}>
                        // <Container 
                        // fluid={+true}
                        // key={index}
                        // classNames={"p-0"}>
                        //     <Row className={classes.row}>
                        //         <Col></Col>
                        //         <Col className={classes.title} sm={3}> <h4> Question {index+1} Saved </h4> </Col>
                        //         <Col></Col>
                        //     </Row>
                        //     <Row>
                        //     <Col sm={6}>
                        //         <span 
                        //         className={classes.spanTitle}> Question: </span> <br/>
                        //         <span 
                        //         className={classes.spanBody}> {obj.body} </span> <br/>
                        //     </Col>

                        //     <Col>
                        //         <span 
                        //         className={classes.spanTitle}> Answer: </span> <br/> 
                        //         <span 
                        //         className={classes.spanBody}> {obj.selectedOption == "radioTrue"?"true":"false"} </span>
                        //     </Col>
                        //     <Col> <span className={classes.jumbWeight}> ({obj.weight}) Points </span> </Col>
                        //     </Row>
                        // </Container>
                        // </div>
                        <div>TEMPORARY</div>
                        );
                })}
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
                    <Card className={classes.card}>
                        <Accordion.Toggle 
                        className={classes.cardHeader} 
                        as={Card.Header} 
                        eventKey="1">
                            <p> Use already created Questions </p>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                        <Card.Body>
                            {/* -something- */}
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    </Accordion>
                </div>
            </Container>
        );
    }
}

export default MakeExam;
