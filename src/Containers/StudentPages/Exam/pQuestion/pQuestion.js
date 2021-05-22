import React,{Component} from 'react';
import Form from 'react-bootstrap/Form';
import classes from './pQuestion.module.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownList from '../../../../components/StudentComponents/UI/DropdownList/DropdownList';
const pQuestion=(props)=>{
   let languages = ["cpp","java","csharp","c","py"];

   return(
         <Form.Group>
             <DropdownList 
            className={classes.dropdownList}>
                  {languages.map((course,index)=>{
                  return(
                     <Dropdown.Item
                     key={index}
                     onClick={()=>props.handleLanguage(props.question.id,course)}>{course}</Dropdown.Item>
                  );
                  })}
            </DropdownList>
            <Form.File 
            className={classes.formGroup} 
            label="Upload Answer"
            onChange={(event)=>props.handleAnswer(2,props.question.id,event)}/>
         </Form.Group>
      );
}

export default pQuestion;