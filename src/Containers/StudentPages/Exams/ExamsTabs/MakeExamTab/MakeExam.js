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
       questionObj:null,
       open:false
     }

    handleChange = (questionObj) =>{
      this.setState({questionObj:questionObj});
    }

    handleSave = () =>{
      const config = { 
         headers: { Authorization: `${JSON.parse(Cookies.get('user')).token}` } 
     };
      if(this.state.questionObj.type === 0)
      {
         Axios.post("http://localhost:1234/SubQuestion/Create",{
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
          },config);
      }
    }

    render()
    {
        return(
            <>
            <Container className={classes.form}>

                <MakeQuestion 
               handleChange={(obj)=>this.handleChange(obj)}/>
                <Button 
                onClick={this.handleSave}
                className={classes.submitExam}>
                    Submit Question
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
             message={`Question Created`}
             action={
             <React.Fragment>
                 <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleCloseSnackbar}>
                     <CloseIcon fontSize="small" />
                 </IconButton>
             </React.Fragment>}/>
             {/*_____________________________________________*/}
             </>
        );
    }
}

export default MakeExam;