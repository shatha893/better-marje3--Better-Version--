import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import classes from './homeAcc.module.css';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Axios from 'axios';

const accordion =(props) =>{

    let checkedCourses = [];

    //Handling the change in the checkboxes by putting the checked ones in an array to send it to the server to fetch 
    //the proper info. And removing the unchecked ones so that the output that is fetched is changed.
    //Also, with each change the checkedCourses array should be send to fetch the proper data.
    const handleChange = (courseIndex) =>{
        let course = props.courses.find(courseIndex);
            if(course.checked)
                {
                    course.checked = false;
                    checkedCourses.splice(courseIndex);
                }
            else
                {
                    course.checked = true;
                    checkedCourses.push(course);
                }
            //There should be an axios get here to get the proper data
    } 

                ;

    return(
          <Accordion defaultActiveKey="0">
            <Card className={classes.Card}>
              <Accordion.Toggle 
              className={classes.CardHeader} 
              as={Card.Header} 
              eventKey="0">
                Course
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                 
                  {/* Try using bootstrap's forms instead */}
                      <FormGroup>
                        <Card.Body>
                        sdfasd
                        {
                            props.courses.map(course=>{
                              <FormControlLabel
                              key={course.id}
                              control={
                                <Checkbox 
                                checked={course.checked} 
                                onChange={()=>handleChange(course)}/> }
                              label={course.name}
                              name="Courses"/>
                          })
                        }
                        </Card.Body>
                      </FormGroup>
                
              </Accordion.Collapse>
            </Card>
            <Card className={classes.Card}>
              <Accordion.Toggle className={classes.CardHeader} as={Card.Header} eventKey="1">
                Doctor
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="1">
                <Card.Body></Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
    );
}

export default accordion;