import React,{Component} from 'react';
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/footer';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DropdownList from '../../../components/StudentComponents/UI/DropdownList/DropdownList';
import Dropdown from 'react-bootstrap/Dropdown';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import classes from '../Signup/Signup.module.css';
import Cookies from 'js-cookie';

class SubmitResource extends Component {
    state = {
        avatar:null,
        courses:[],
        chosenCourse:{
            name:"",
            id:0
        },
        resource_name:"",
        resource_file:"",
        resource_semester:"",
        resource_year:"",
        open_snackbar:false,
        radio_types:{
            type_0:false,//Notes
            type_1:false,//Slides
            type_2:false,//Book
            type_3:false,//Exam
            type_4:false//Quiz
        },
        chosenType:null
    }

    componentDidMount = ()=> {
        this.getCourses()
    }

    getCourses = async() =>{
        try{
            const result = await  Axios.post("http://localhost:1234/Course/GetAll",{
                "offset": 0,
                "count": 99999
              });
            
            const finalResult = await Axios.post("http://localhost:1234/Course/Get",result.data);
            let tempArr = [];
            finalResult.data.map((course)=>{
                tempArr.push({
                    id:course.id,
                    name:course.name,})
                });
            this.setState({courses:[...tempArr]});
        }
        catch(error){
            console.log("Error = ",error);
        } 
    }

    handleChange = (key,event)=>{
        switch(key)
        {
            case "name":
                this.setState({ resource_name:event.target.value});
                break;
    
            case "year":
                this.setState({ resource_year:parseInt(event.target.value,10)});
                break;
    
            case "semester":
                this.setState({ resource_semester:event.target.value});
                break;
    
            case "file":
              let reader = new FileReader();
                reader.onload = (e)=>{
                  this.setState({resource_file: e.target.result});
                };
                reader.readAsDataURL(event.target.files[0]); 
                break;

            default://radio
                {
                    let value = true;
                    switch(key){

                        case "type_0":
                            if(this.state.radio_types.type_0)
                                value = false;
                            this.setState( prevState =>{
                                return{
                                    radio_types:{
                                        ...prevState.radio_types,
                                        type_0:value
                                      }}
                                },this.setState({chosenType:0})); 
                            break;
                        case "type_1":
                            if(this.state.radio_types.type_1)
                                value = false;
                            this.setState( prevState =>{
                                return{
                                    radio_types:{
                                        ...prevState.radio_types,
                                        type_1:value
                                      }}
                                },this.setState({chosenType:1})); 
                            break;
                        case "type_2":
                            if(this.state.radio_types.type_2)
                                value = false;
                            this.setState( prevState =>{
                                return{
                                    radio_types:{
                                        ...prevState.radio_types,
                                        type_2:value
                                      }}
                                },this.setState({chosenType:2})); 
                            break;
                        
                        case "type_3":
                            if(this.state.radio_types.type_3)
                                value = false;
                            this.setState( prevState =>{
                                return{
                                    radio_types:{
                                        ...prevState.radio_types,
                                        type_3:value
                                      }}
                                },this.setState({chosenType:3})); 
                            break;

                        case "type_4":
                            if(this.state.radio_types.type_4)
                                value = false;
                            this.setState( prevState =>{
                                return{
                                    radio_types:{
                                        ...prevState.radio_types,
                                        type_4:value
                                      }}
                                },this.setState({chosenType:4})); 
                            break;
                    }
                }
        }
    }

    handleDropdownClick = (course_id,course_name)=>{
        this.setState({
            chosenCourse: { 
                name:course_name,
                id:course_id
        }
        });
    }

    clearAll = () =>{
        this.setState({
            chosenCourse:{
                name:"",
                id:0
            },
            resource_name:"",
            resource_file:"",
            resource_semester:null,
            resource_year:null,
            open_snackbar:false,
            radio_types:{
                type_0:false,//Notes
                type_1:false,//Slides
                type_2:false,//Book
                type_3:false,//Exam
                type_4:false//Quiz
            },
            chosenType:null
        })
    }

    handleSubmit = () =>{
        let semester=null;
        switch(this.state.resource_semester.toLowerCase())
        {
            case "summer":
                semester=3;
                break;
            case "first":
                semester=1;
                break;
            case "second":
                semester=2;
                break;
        }

        let data = {
            courseId:this.state.chosenCourse.id,
            creationYear:this.state.resource_year,
            creationSemester:semester,
            name:this.state.resource_name,
            resource:{
                contentBase64:this.state.resource_file.substr(28,this.state.resource_file.length),
                fileExtension:"pdf"
            },
            type:this.state.chosenType,
            volunteer:JSON.parse(Cookies.get('user')).id
        }
        console.log("data:",data);
        const config = { 
            headers: { Authorization: `${JSON.parse(Cookies.get('user')).token}` } 
        };
        Axios.post("http://localhost:1234/Resource/Create",data,config)
        .then(response =>{
          console.log(response);
          this.setState({open_snackbar:true}, ()=>this.clearAll());  
       })
      .catch((error)=>{
        console.log(error);
       });
    }

    handleCloseSnackbar = ()=>{
        this.setState({open_snackbar:false});
    }

    render(){
        return(
            <>
            <Container fluid={+true} className={classes.Container}>
                <Row>
                    <Header 
                    pageType={"Home"} 
                    userName={this.props.username===null?null:this.props.username} 
                    avatar={this.state.avatar}/> 
                </Row>
                    <Row className={classes.ModalContainer}>
                        <Col className={classes.create_res_col}>
                        <Form.Group>
                            <Form.Label> Title </Form.Label>
                            <Form.Control 
                            type="text"
                            value={this.state.resource_name}
                            className={classes.inputs} 
                            onChange={(event)=>this.handleChange("name",event)}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label> Year of Creation </Form.Label>
                            <Form.Control 
                            type="text"
                            value={this.state.resource_year}
                            className={classes.inputs} 
                            onChange={(event)=>this.handleChange("year",event)}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label> Semester of Creation </Form.Label>
                            <Form.Control 
                            type="text"
                            value={this.state.resource_semester}
                            className={classes.inputs} 
                            onChange={(event)=>this.handleChange("semester",event)}/>
                        </Form.Group>
                        <DropdownList 
                        text={this.state.chosenCourse.name !== ""?this.state.chosenCourse.name:"Choose the resource course"}
                        className={classes.dropdownList}>
                            {this.state.courses.map((course,index)=>{
                            return(
                                <Dropdown.Item
                                key={index}
                                onClick={()=>this.handleDropdownClick(course.id,course.name)}>{course.name}</Dropdown.Item>
                            );
                            })}
                        </DropdownList>
                        </Col>
                        <Col className={classes.create_res_col_2}>
                        <fieldset id="group2" className="mb-3">
                            <Form.Label> Type of Resource </Form.Label>
                            <br/>
                            <Form.Check
                            type="radio"
                            label="Notes"
                            value={this.state.radio_types.type_0}
                            name="formHorizontalRadios"
                            id="type_0"
                            // key='group2'
                            inline
                            onChange={(event)=>this.handleChange("type_0",event)}/>
                            <Form.Check
                            type="radio"
                            label="Slides"
                            value={this.state.radio_types.type_1}
                            name="formHorizontalRadios"
                            id="type_1"
                            // key='group2'
                            inline
                            onChange={(event)=>this.handleChange("type_1",event)}/>
                            <Form.Check
                            type="radio"
                            label="Books"
                            value={this.state.radio_types.type_2}
                            name="formHorizontalRadios"
                            id="type_2"
                            // key='group2'
                            inline
                            onChange={(event)=>this.handleChange("type_2",event)}/>
                            <Form.Check
                            type="radio"
                            label="Quiz"
                            value={this.state.radio_types.type_3}
                            name="formHorizontalRadios"
                            id="type_3"
                            // key='group2'
                            inline
                            onChange={(event)=>this.handleChange("type_3",event)}/>
                            <Form.Check
                            type="radio"
                            label="Exam"
                            value={this.state.radio_types.type_4}
                            name="formHorizontalRadios"
                            id="type_4"
                            // key='group2'
                            inline
                            onChange={(event)=>this.handleChange("type_4",event)}/>
                        </fieldset>
                        <Form.Group>
                            <Form.File  
                            className={classes.ProfileAvatar} 
                            label="Upload File"
                            onChange={(event)=>this.handleChange("file",event)}/>
                        </Form.Group>
                        <Button 
                        className={classes.SubmitButton}  
                        onClick={this.handleSubmit} 
                        size="lg">
                        Submit
                        </Button>
                        </Col>
                    </Row>

                <Row>
                    <Footer/>
                </Row>
            </Container>
             {/*_____SnackBar when saving a question_____ */}
             <Snackbar
             anchorOrigin={{
             vertical: 'bottom',
             horizontal: 'left',
             }}
             open={this.state.open_snackbar}
             autoHideDuration={10000}
             onClose={this.handleCloseSnackbar}
             message={`We will check ${this.state.resource_name} as soon as we can`}
             action={
             <React.Fragment>
                 <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleClose}>
                     <CloseIcon fontSize="small" />
                 </IconButton>
             </React.Fragment>}/>
             {/*_____________________________________________*/}
             </>
        );
    }
}
export default SubmitResource;