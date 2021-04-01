import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import classes from './drawerItem.module.css';

const drawerListItem = (props)=>{
    return(
        <>
            <ListItem 
            button 
            onClick={props.click} 
            disabled={props.disable} 
            key={props.text} 
            className={props.text=='logout'?classes.ListItem:null}>

              <ListItemIcon> {props.children} </ListItemIcon>
              <ListItemText primary={props.text} />

            </ListItem>
            <Divider />
        </>
    );
}

export default drawerListItem;