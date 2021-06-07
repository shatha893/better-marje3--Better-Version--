import React,{ Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import Button from 'react-bootstrap/Button';
import classes from './CheckboxList.module.css';
import Filters from '../Filters/Filters';
import VisibilityIcon from '@material-ui/icons/Visibility';
import QuestionModal from '../QuestionModal/QuestionModal';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import QuestionsFilters from '../../../../Containers/StudentPages/Exams/ExamsTabs/QuestionsTab/QuestionsFilters/QuestionsFitlers';
import Axios from 'axios';

class CheckboxList extends Component{

   state={
      checked:[],
      checkedQuestions:[],
      dataPerPage:[],
      loading:false,
      filters:[],
      showModal:false,
      modalContent:null,
      totalWeight:0
   }

   handleToggle = (value) =>{
    const currentIndex = this.state.checked.indexOf(value.id);
    let newChecked = [...this.state.checked];
    let newCheckedObjs = [...this.state.checkedQuestions]
    Axios.post("http://localhost:1234/Question/Get",[value.id])
    .then(result=>{
      if (currentIndex === -1) {
     
      console.log("result",result);
      newChecked.push(value.id);
      newCheckedObjs.push(value);
      // let temp = this.state.totalWeight + result.data.examSubQuestions[0].weight;
      this.setState({checked:[...newChecked],checkedQuestions:[...newCheckedObjs] });
      console.log("newCheckedObjs",newCheckedObjs);
   } else 
    {
    let questionsExceptOne = [];
    let objs = [];
    for(let i in this.state.checked)
    {
        if(this.state.checked[i] === value.id)
          continue;
        questionsExceptOne.push(this.state.checked[i]);
        
    }
    this.state.checkedQuestions.map((obj)=>{
        if(value.id !== obj.id) 
          objs.push(obj);
    });
    let temp = this.state.totalWeight===0?0:this.state.totalWeight - result.data[0].examSubQuestions[0].weight;
    console.log("objs",objs);
    this.setState({ totalWeight:temp,checked:[...questionsExceptOne],checkedQuestions:[...objs] });
 
  }
})
  };

  handleData = (newData)=>{
    let tempArr = [...newData];
    this.setState({dataPerPage:[...tempArr]});
}

  handleSave = ()=>{
   //   questionsArr = [];
   //   for(i in newChecked)
   //   {
   //      if(i !== -1)

   //   }
   // props.handleSave(newChecked);
      console.log(this.state.checked);
  }

  handleViewQuestion = (item)=>{
    let tempArr = [];
    tempArr.push(item.id);
    Axios.post("http://localhost:1234/Question/Get",tempArr)
    .then(result=>{
      console.log("result",result);
      this.setState({
        showModal:true,
        modalContent:<>
            <p>{item.title}</p>
            <p>{result.data[0].content}</p>
        </>
      });
    })
    

  }

  handleHideQuestion = () =>{
    this.setState({showModal:false});
  }

  render()
  {

    console.log("checkedQuestions",this.state.checkedQuestions);
    const dataPerPage = this.state.dataPerPage == null
      ?null
      :this.state.dataPerPage.map((item,index) => {
       
        return (
          <ListItem 
          key={index} 
          role={undefined} 
          dense 
          button 
          onClick={()=>this.handleToggle(item)}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={this.state.checked.indexOf(item.id) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': index }}
              />
            </ListItemIcon>
            {/* In the text of the list item the question body should be there */}
            <ListItemText id={index} primary={item.title} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="comments">
                <VisibilityIcon 
                onClick={()=>this.handleViewQuestion(item)}/>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      });

  return (<>
      {/* <InputGroup className="mb-3">
      <InputGroup.Prepend>
        <Button variant="outline-secondary" className={classes.addButton}>Add</Button>
      </InputGroup.Prepend>
      <Form.Control 
      className={classes.formControl}
      aria-describedby="basic-addon1"
      placeholder="Add x number of random questions"/>
    </InputGroup> */}
    
    <QuestionsFilters
    handleData = {(arr)=>this.handleData(arr)}> 
     <p className={classes.paragraph}>
                {this.state.checked.length} &nbsp; 
                Questions  
                <span 
                className={classes.totalWeight}>
                    ({this.state.totalWeight}) 
                    Total Points
                </span>
                </p>
      <List className={classes.root}>
        {dataPerPage}
      </List>
    </QuestionsFilters>
    <Button 
    className={classes.button}
    onClick={()=>this.props.handleSubmitExam(this.state.checked,this.state.checkedQuestions)}>
      Submit Exam
    </Button>
    <QuestionModal
    show={this.state.showModal}
    closeModal={this.handleHideQuestion}>
      {this.state.modalContent}
    </QuestionModal>
  </>); 
  }

}

export default CheckboxList;