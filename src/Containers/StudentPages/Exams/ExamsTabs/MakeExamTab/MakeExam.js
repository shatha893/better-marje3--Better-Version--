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
import MakeQuestion from '../../../../../components/StudentComponents/MakeQuestion/MakeQuestion';
import CheckboxList from '../../../../../components/StudentComponents/UI/CheckboxList/CheckboxList';
import Axios from 'axios';
import Spinner from '../../../../../components/StudentComponents/UI/spinner/spinner';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Cookies from 'js-cookie';

class MakeExam extends Component{

    state={
        addQuestionClicked:false,
        ExamId:0,
        examQuestionId:0,
        examTitle:"",
        savedQuestions:[],
        totalWeight:0,
        totalTags:[],
        existingQuestions:[],
        SubExistingQuestions:[],
        questionId:0,
        open:false,
        loading:false,
        index:-1,
        questionObj:null

    }

    componentDidMount =()=>{
    

      fetch('http://localhost:1234/Exam/Create', {
        method: 'POST',
        headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
       'Authorization': `${JSON.parse(Cookies.get('user')).token}`
       },
       body: JSON.stringify({
        "year": 2000,
        "type": 0,
        "semester": 0,
        "name": "string",
        "duration": 20000,
        "courseId": 1
      })
     }).then((res)=>{
        return res.json();
     }).then((data)=> {
       console.log(data);
        var id = data.id;  

        this.setState({
            ExamId:id
             })
        
      return  fetch('http://localhost:1234/Exam/Update', {
           method: 'PATCH',
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `${JSON.parse(Cookies.get('user')).token}`
          },
          body: JSON.stringify({
                "examId":id,
                "isApproved": true  
          })
          });  
     }).then((response) =>{
        console.log("update exam",response);
      //   if (response.ok) {
      //      return response.json();
      //   } else {
      //      return Promise.reject(response);
      //   }           
     }).catch((error)=> {
        console.warn(error);
     });

    
    }

    handleAddQues = () =>{

        this.setState({addQuestionClicked:true});
        fetch('http://localhost:1234/Question/Create', {
                        method: 'POST',
                        headers: {
                       'Accept': 'application/json',
                       'Content-Type': 'application/json',
                       'Authorization': `${JSON.parse(Cookies.get('user')).token}`
                       },
                       body: JSON.stringify({
                        "content": "adfgsdfg",
                        // "title": this.state.examTitle===null?"":this.state.examTitle,
                        "title":"aaabbb",
                        "courseId": 1
                      })
                     }).then((res)=>{
                        return res.json();
                     }).then((data)=>{
                        console.log("create question  ",data)
                        // Store the post data to a variable
                        var id = data.id;               
                        this.setState({questionId:id});
                        // Fetch another API
                return  fetch('http://localhost:1234/Question/Update', {
                           method: 'PATCH',
                          headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json',
                          'Authorization': `${JSON.parse(Cookies.get('user')).token}`
                          },
                          body: JSON.stringify({
                                "questionId": id,
                                "isApproved": true  
                          })
                          });
                     }).then( (userData) => {
                        console.log(userData);            
                     }).catch(function (error) {
                        console.warn(error);
                     });
                     
    }

    handleSave = ()=>{
       console.log(this.state.questionObj)
       if(this.state.questionObj === null) return;
        if(this.state.questionObj.type == 0){

         fetch('http://localhost:1234/SubQuestion/Create', {
            method: 'POST',
            headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
           'Authorization': `${JSON.parse(Cookies.get('user')).token}`
           },
           body: JSON.stringify( {
            "$type":"CreateMCQSubQuestionDto",
             "content": "string",
             "tags": [
                12
              ],
          "questionId": this.state.questionId,
          "Choices":[
              {
                  "Content":this.state.questionObj.choices.get("A"),
                  "weight":this.state.questionObj.selectedOption==="A"?1:0
              },
              {
                "Content":this.state.questionObj.choices.get("B"),
                "weight":this.state.questionObj.selectedOption==="B"?1:0
              },
              {
                "Content":this.state.questionObj.choices.get("C"),
                "weight":this.state.questionObj.selectedOption==="C"?1:0
              }
          ]
          })
         }).then(function(res){
            return res.json();
         }).then((data)=>{
            // Store the post data to a variable
            var id = data.id; 
                    
           
            // this.setState({
            //     SubExistingQuestions:[...this.state.SubExistingQuestions,id]
            //      })
            // Fetch another API
              return  fetch('http://localhost:1234/ExamSubQuestion/Create', {
              method: 'POST',
              headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             'Authorization': `${JSON.parse(Cookies.get('user')).token}`
             },
              body: JSON.stringify({
                "examQuestionId": this.state.examQuestionId,
                "subQuestionId": id,
                "weight": this.state.questionObj.weight
              })
              });
         
         }).then((response)=>{
            if (response.ok) {
               return response.json();
            } else {
               return Promise.reject(response);
            }
         }).then( (userData) => {
            console.log(userData);            
         }).catch(function (error) {
            console.warn(error);
         });
        }
        else if(this.state.questionObj.type == 1){
             console.log("!!!! ",this.state.questionObj.answer);
            fetch('http://localhost:1234/SubQuestion/Create', {
                method: 'POST',
                headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization': `${JSON.parse(Cookies.get('user')).token}`
               },
               body: JSON.stringify( {
                "$type":"CreateBlankSubQuestionDto",
                 "content": "string",
                 "tags": [
                    12
                  ],
            //   "questionId": this.state.questionId, this.state.questionObj.answer
              "questionId":this.state.questionId,
              "Answer":this.state.questionObj.answer,
              "HasChecker":false

              })
             }).then((res)=>{
                return res.json();
             }).then( (data)=> {
                // Store the post data to a variable
                var id = data.id;  
                console.log("data",data)  ;                
                // var subquestion = this.state.SubExistingQuestions;
                // this.setState({
                //     SubExistingQuestions:[...subquestion,id]
                //      })
                // Fetch another API
                  return  fetch('http://localhost:1234/ExamSubQuestion/Create', {
                  method: 'POST',
                  headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json',
                 'Authorization': `${JSON.parse(Cookies.get('user')).token}`
                 },
                  body: JSON.stringify({//this.state.examQuestionId   this.state.questionObj.weight   id
                    "examQuestionId": 200,
                    "subQuestionId": 695,
                    "weight": 10,
                    "order":10
                  })
                  });
             
             }).then((response)=>{
                if (response.ok) {
                   return response.json();
                } else {
                   return Promise.reject(response);
                }
             }).then( (userData) => {
                console.log(userData);            
             }).catch((error)=> {
                console.warn(error);
             });
        }
        else{


            fetch('http://localhost:1234/SubQuestion/Create', {
                method: 'POST',
                headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization': `${JSON.parse(Cookies.get('user')).token}`
               },
               body: JSON.stringify( {
                "$type":"CreateProgrammingSubQuestionDto",
                 "content": "string",
                 "tags": [
                    12
                  ],
              "questionId": this.state.questionId,
              "KeyAnswer":this.state.questionObj.answer,
              "CheckerBase64":this.state.questionObj.language

              })
             }).then((res)=>{
                return res.json();
             }).then( (data) =>{
                // Store the post data to a variable
                var id = data.id;               
               
                // Fetch another API
                  return  fetch('http://localhost:1234/ExamSubQuestion/Create', {
                  method: 'POST',
                  headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json',
                 'Authorization': `${JSON.parse(Cookies.get('user')).token}`
                 },
                  body: JSON.stringify({
                    "examQuestionId": this.state.examQuestionId,
                    "subQuestionId": id,
                    "weight": this.state.questionObj.weight,
                  })
                  });
             
             }).then((response)=>{
                if (response.ok) {
                   return response.json();
                } else {
                   return Promise.reject(response);
                }
             }).then( (userData) => {
                console.log(userData);            
             }).catch((error)=>{
                console.warn(error);
             });


        }
    }
   
    handleChange = (questionObj) =>{
       console.log("question", questionObj);
       this.setState({questionObj:questionObj});
      }

    NewExamQ = ()=>{
       console.log("this.state.ExamId --> ",this.state.ExamId,"this.state.questionId",this.state.questionId);
        fetch('http://localhost:1234/ExamQuestion/Create', {
            method: 'POST',
            headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
           'Authorization': `${JSON.parse(Cookies.get('user')).token}`
           },
           body: JSON.stringify({
            "examId": this.state.ExamId,
            "questionId":this.state.questionId,
            "order": 0
          })
         }).then((res)=>{
            console.log("res",res);
            return res.json();
         }).then( (data) => {
            console.log(data);
            this.setState({
               examQuestionId:data.id
            });
         }).catch(error=>console.log(error));
         
    }

    handleSubmit = ()=>{

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

    handleExamName=(event)=>{
       this.setState({examTitle:event.target.value});
    }

    render()
    {
        console.log("sth sth sth",this.state.SubExistingQuestions);
        return(
            <>
            <Container className={classes.form}>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label className={classes.label}>Exam Name</Form.Label>
                    <Form.Control 
                    type="text"
                    onChange={(event)=>this.handleExamName(event)}/>
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
                {/* Total Tags &nbsp;
                {this.state.totalTags.map(tag=>(
                <>
                    <Badge 
                    pill 
                    variant="primary"
                    className={classes.badge}>
                    {tag} 
                    </Badge>  &nbsp;
                </>
                ))} */}
                </p>
                <br/>
                <div>
                    {/*_____Divs that appear with every saved question____*/}
                    {this.state.savedQuestions.map((obj,index)=>{
                    return(
                    <div 
                    className={classes.containerDiv}
                    key={index}>
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
                    <Card className={classes.card} 
                    >
                        <Accordion.Toggle 
                        className={classes.cardHeader} 
                        as={Card.Header} 
                        eventKey="0"
                        onClick= {this.NewExamQ}>
                            <p> Make New Question </p>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <MakeQuestion 
                            handleChange={(obj)=>this.handleChange(obj)}
                            handleSave = {()=>this.handleSave()}/>
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    {/*_______Already Created Questions Card_______*/}
                    {/* <Card 
                    className={classes.card}>
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
                            {/* </Accordion>{this.state.loading?null: 
                            <CheckboxList 
                            itemList={this.state.existingQuestions}
                            handleSave={(obj)=>this.handleSave(obj)}/>}
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card> */}
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