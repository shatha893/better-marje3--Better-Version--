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

class CheckboxList extends Component{

   state={
      checked:[],
      dataPerPage:[],
      loading:false,
      filters:[],
      showModal:false,
      modalContent:null
   }

   handleToggle = (value) =>{
    const currentIndex = this.state.checked.indexOf(value);
    const newChecked = [...this.state.checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({checked:[...newChecked]});
  };

  handleData = (newData)=>{
    this.setState({dataPerPage:[...newData]});
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
    //dataPerPage[index].name ... etc
    this.setState({
      showModal:true,
      modalContent:<>
          <p>{item.name}</p>
          <p>Answer: TRUE</p>
          <p>Points: 100</p>
      </>
    });

  }

  handleHideQuestion = () =>{
    this.setState({showModal:false});
  }

  render()
  {
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
                checked={this.state.checked.indexOf(item) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': index }}
              />
            </ListItemIcon>
            {/* In the text of the list item the question body should be there */}
            <ListItemText id={index} primary={item.name} />
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
    <Filters
    handleData = {(arr)=>this.handleData(arr)}
    data={this.props.itemList}> 
      <List className={classes.root}>
        {dataPerPage}
      </List>
    </Filters>
    <Button 
    className={classes.button}
    onClick={()=>this.handleSave()}>
      Save
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