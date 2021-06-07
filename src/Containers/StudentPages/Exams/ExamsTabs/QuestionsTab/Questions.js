import React,{ Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import classes from './Questions.module.css';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import Spinner from '../../../../../components/StudentComponents/UI/spinner/spinner';
import QuestionsFilters from './QuestionsFilters/QuestionsFitlers';
import CheckboxList from '../../../../../components/StudentComponents/UI/CheckboxList/CheckboxList';
import Form from 'react-bootstrap/Form';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Cookies from 'js-cookie';

class Questions extends Component{
    
        state={ 
            dataPerPage:[],
            examTitle:"",
            openSnackbar:false,
            snackbarMessage:"",
            isValidDuration:true,
            duration:0
        }

        handleCloseSnackbar = () =>{
            this.setState({openSnackbar:false});
        }
    
        handleExamTitle = (event) =>{
            this.setState({examTitle:event.target.value});
        }

        handleDuration = (event) =>{
           let isValid = this.handleDurationValidity(event.target.value);
           this.setState({isValidDuration:isValid, duration:event.target.value});
        }

        handleDurationValidity = (value) =>{
            if(value<=0) return false;
            else return true;
        }

        handleSave = async(Ids,objects) =>{
            console.log("objects",Ids);
            try{
                const config = { 
                    headers: { Authorization: `${JSON.parse(Cookies.get('user')).token}` } 
                };
                const result = await  Axios.post("http://localhost:1234/Exam/Create",{
                    "year": 1990,
                    "type": 1,
                    "semester": 0,
                    "name": this.state.examTitle,
                    "duration": this.state.duration*60000,
                    "courseId": 6
                  },config);
                  console.log("result1",result.data) ;
                  let count = 0;
                    objects.map(async(object)=>{
                        console.log(object);
                        let result2 = await Axios.post("http://localhost:1234/ExamQuestion/Create",{
                            // "examId": result.data.id,
                            "examId": result.data.id,
                            "questionId": object.id,
                            // "questionId":6,
                            "order": 0
                    },config);
                    console.log("result2",result2.data) ;
                    let result3 = await Axios.post("http://localhost:1234/ExamSubQuestion/Create",{
                        "examQuestionId": result2.data.id,
                        "subQuestionId": object.subQuestion.id,
                        "weight": 1,
                        "order": 0
                    },config);
                    console.log("result3",result3.data) ;
                    count++;
                
                    })
                   
                this.setState({openSnackbar:true,snackbarMessage:"Exam Created"});
            }
            catch(error){
                console.log("Error = ",error);
                this.setState({openSnackbar:true,snackbarMessage:"Exam wasn't created. something is wrong"});
            }
        }
    
        render(){
        
            return(
                <>
                <br/>
                 <Form.Label className={classes.resultsTitle}>
                    Exam Title
                </Form.Label>
                <br/>
                <Form.Control 
                type="text" 
                onChange={(event)=>this.handleExamTitle(event)}/>
                <br/><br/>
                <Form.Label className={classes.duration}>
                    Exam Duration
                </Form.Label>
                <br/>
                <Form.Control 
                min="0"
                isInvalid={!this.state.isValidDuration}
                className={classes.durationTextBox}
                type="number" 
                onChange={(event)=>this.handleDuration(event)}/>
                 <Form.Control.Feedback type="invalid">
                     Please provide a valid duration.
                  </Form.Control.Feedback>
                <br/><br/><br/>
                <p className={classes.resultsTitle}> Choose Questions for your exam </p>
                <br/>
                <CheckboxList 
                itemList={this.state.dataPerPage}
                handleSubmitExam={(checkedQuestions,objs)=>this.handleSave(checkedQuestions,objs)}/>
                 {/*_____SnackBar when saving a question_____ */}
             <Snackbar
             anchorOrigin={{
             vertical: 'bottom',
             horizontal: 'left',
             }}
             open={this.state.openSnackbar}
             autoHideDuration={1000}
             onClose={this.handleCloseSnackbar}
             message={this.state.snackbarMessage}
             action={
             <React.Fragment>
                 <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleClose}>
                     <CloseIcon fontSize="small" />
                 </IconButton>
             </React.Fragment>}/>
             {/*_____________________________________________*/}
                </>);
        }
        
   
}
export default Questions;