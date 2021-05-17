import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import classes from './DropdownList.module.css';

const dropdownList = (props)=>{

   return(
      <Dropdown>
      <Dropdown.Toggle 
      variant="success" id="dropdown-basic"
      className={classes.dropdownlist}>
        {props.text}
      </Dropdown.Toggle>
      <Dropdown.Menu className={classes.scrollable_menu}>
        {props.children}
      </Dropdown.Menu>
      </Dropdown>
   );
}

export default dropdownList;
