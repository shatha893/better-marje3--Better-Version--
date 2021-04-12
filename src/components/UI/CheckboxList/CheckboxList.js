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

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: '100%',
//     maxWidth: 360,
//     backgroundColor: theme.palette.background.paper,
//   },
// }));

class CheckboxList extends Component{

   state={
      checked:[],
      dataPerPage:[],
      loading:false,
      filters:[]
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

  render()
  {
    const dataPerPage = this.state.dataPerPage == null
      ?null
      :this.state.dataPerPage.map(item => {
        const labelId = `checkbox-list-label-${item}`;

        return (
          <ListItem 
          key={item.year} 
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
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            {/* In the text of the list item the question body should be there */}
            <ListItemText id={labelId} primary={item.name} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="comments">
                <VisibilityIcon />
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
  </>  
  );
   }
}

export default CheckboxList;