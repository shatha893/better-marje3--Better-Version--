import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

const filtersList = (props)=>{

   const handleToggle = (courseId)=>{
        props.checkCourses(courseId);
   }

   const filters = props.filters == null
    ?null
    :props.filters.map((item,index) => {
     
      return (
        <ListItem 
        key={index} 
        role={undefined} 
        dense 
        button 
        onClick={()=>handleToggle(item.id)}
        >
          <ListItemIcon>
            <Checkbox
              edge="start"
            //   checked={this.props.filters.checked.indexOf(item) !== -1}
              tabIndex={-1}
              disableRipple
              inputProps={{ 'aria-labelledby': index }}
            />
          </ListItemIcon>
          <ListItemText id={index} primary={item.name} />
        </ListItem>);
        });
return(
   
      <List>
            {filters}
      </List> );
}

export default filtersList;