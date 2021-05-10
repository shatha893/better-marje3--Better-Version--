import React,{ Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

class FiltersList extends Component{

    render(){
    const filters = this.props.filters == null
      ?null
      :this.props.filters.map((item,index) => {
        return (
          <ListItem 
          key={index} 
          role={undefined}
          dense 
          button>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={this.props.checkedValues.indexOf(item.id)!== -1?true:false}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': index }}
                onChange={()=>this.props.filterValue(item.id)}/>
            </ListItemIcon>
            <ListItemText id={index} primary={item.name} />
          </ListItem>);
          });

        return( <List> {filters} </List> );
    }
}


export default FiltersList;