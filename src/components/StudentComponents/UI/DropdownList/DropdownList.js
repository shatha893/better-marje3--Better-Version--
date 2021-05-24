import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import classes from './DropdownList.module.css';

const dropdownList = (props)=>{

   return(
      <Dropdown>
      <Dropdown.Toggle 
      variant="success" id="dropdown-basic"
      fluid={+true}
      className={props.dark?classes.dropdownlistDark:classes.dropdownlistLight}>
        {props.text}
      </Dropdown.Toggle>
      <Dropdown.Menu className={props.dark?classes.scrollable_menuDark:classes.scrollable_menuLight}>
        {props.children}
      </Dropdown.Menu>
      </Dropdown>
   );
}

export default dropdownList;
