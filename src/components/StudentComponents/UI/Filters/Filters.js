import React, { Component } from 'react';
import Pagination from 'react-paginate';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import SearchIcon from '@material-ui/icons/Search';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import classes from './Filters.module.css';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import FiltersList from './FiltersList/FiltersList';
import Axios from 'axios';

class Filters extends Component{
   state={
      //For the pagination
      offset: 0,
      perPage: 9,
      currentPage: 0,
      pageCount:0,
      checked:[],
      cards:[],
      filteredCards:[],
      courses:[]
}

// handleCheckToggle = (id,checkState)=>{
//     for(let i in this.state.courses)
//     {
//         if(i.id === id)
//             this.setState(prevState =>{
//                 return{
//                     courses:{
//                         ...prevState.courses,
//                         checked:checkState
//                       }}
//                 });
//     }
// }

filteredCourses = (newIds) =>{
    console.log("newIds = ",newIds);
    Axios.post("http://localhost:1234/Resource/Search",{
        "courses": newIds,
        "minCreationYear": null,
        "maxCreationYear": null,
        "isApproved": null,
        "creationSemesters": null,
        "nameMask": null,
        "volunteers": null,
        "extensions": null,
        "offset": 0,
        "count": 99999,
        "types": null
      })
      .then((response) => {
        console.log(response);
        let tempArr = [];
        response.data.map((resource,index)=>{
            let semester= "";
            switch(resource.creationSemester)
            {
                case 0:
                    semester = "first";
                    break;
                case 1:
                    semester = "second";
                    break;
                case 2:
                    semester = "summer";

            }
            tempArr.push({
                id:resource.id,
                name:resource.name,
                description:{
                    course:resource.course.name,
                    author:resource.volunteer.name,
                    creationDate:`Created In ${resource.creationYear}, in ${semester} semester`
                }
            })
        });
        this.setState({filteredCards:[...tempArr]},()=>this.recievedData());
        
    });
}

   filtersMounting = async() =>{
        try{
            const result = await  Axios.post("http://localhost:1234/Course/GetAll",{
                "offset": 0,
                "count": 99999
              });
            const coursesObjs = await result;
            const finalResult = await Axios.post("http://localhost:1234/Course/Get",coursesObjs.data);
            let tempArr = [];
            const awaiting = await finalResult;
            awaiting.data.map((course,index)=>{
                tempArr.push({
                    id:course.id,
                    name:course.name,
                    checked:false
                })
            });
           
            this.setState({courses:[...tempArr]})
        }
        catch(error){
            console.log("Error = ",error);
        }
    }
   
    getResources = async() =>{
        try{
            const result = await  Axios.post("http://localhost:1234/Resource/GetAll",{
                "offset": 0,
                "count": 99999
              });
            
            const finalResult = await Axios.post("http://localhost:1234/Resource/Get",result.data);
            let tempArr = [];
            const awaiting = await finalResult;
            awaiting.data.map((resource,index)=>{
                
                let semester= "";
                switch(resource.creationSemester)
                {
                    case 0:
                        semester = "first";
                        break;
                    case 1:
                        semester = "second";
                        break;
                    case 2:
                        semester = "summer";

                }
                tempArr.push({
                    id:resource.id,
                    name:resource.name,
                    description:{
                        course:resource.course.name,
                        author:resource.volunteer.name,
                        creationDate:`Created In ${resource.creationYear}, in ${semester} semester`
                    },
                    file:
                }) 
            });
            this.setState({cards:[...tempArr], filteredCards:[...tempArr]},()=>this.recievedData());
           
        }
        catch(error){
            console.log("Error = ",error);
        } 
    }

  recievedData =()=>{
    const slice = this.state.filteredCards.slice(this.state.offset, this.state.offset + this.state.perPage);
    this.props.handleData(slice);
    this.setState({
        pageCount: Math.ceil(this.state.filteredCards.length / this.state.perPage)
    });
}

  handlePageClick = (e) => {
   const selectedPage = e.selected;
   const offset = selectedPage * this.state.perPage;

   this.setState({
       currentPage: selectedPage,
       offset: offset
   },
   this.recievedData());
};

   componentDidMount(){
        this.recievedData();
        this.filtersMounting();
        this.getResources();
   }

   filterCourse = (courseId) =>{
    if(this.state.checked.indexOf(courseId)==-1)
       {
            let tempArr = [...this.state.checked];
            tempArr.push(courseId);
            this.setState({checked:[...tempArr]},()=>this.filteredCourses(tempArr));
       }
    else{
        let coursesExceptOne = [];
        for(let i in this.state.checked)
        {
            if(this.state.checked[i] === courseId)
              continue;
            coursesExceptOne.push(this.state.checked[i]);
        }
        this.setState({checked: [...coursesExceptOne]},()=>this.filteredCourses(coursesExceptOne));
    }
   }

   render()
   {
       console.log(this.state.cards);
        const accCards = [
            {
                title:"Courses",
                data:[...this.state.courses],
                checkedValues:[...this.state.checked],
                filterValue:(courseId)=>this.filterCourse(courseId)
            },
            {
                title:"Doctors",
                data:null
            },
            {
                title:"Other",
                data:null
            }]

        return(
         <Container fluid={+true}>
                <Row>
                <Col sm={3} className={classes.filterCol}>
                    <p className={classes.filtersTitle}> Refine By </p>
                    <div>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">
                                    <SearchIcon className={classes.searchIcon}/>
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                            className={classes.formControl}
                            placeholder="Search"
                            aria-label="search"
                            aria-describedby="basic-addon1"/>
                        </InputGroup>
                    </div>
                    <Accordion 
                    className={classes.accordion}>
                         {accCards.map((card,index)=>{
                            return(
                                <Card 
                                className={classes.card}
                                key={index+2}>
                                <Accordion.Toggle 
                                className={classes.cardHeader} 
                                as={Card.Header} 
                                eventKey={index.toString()}>
                                <p> {card.title} </p>
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey={index.toString()}>
                                <Card.Body>
                                    <FiltersList 
                                    checkedValues={card.checkedValues}
                                    filters={card.data}
                                    filterValue={(courseId)=>card.filterValue(courseId)}/>
                                </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            );})
                            } 
                        </Accordion>
                </Col>
                <Col>

                    {this.props.children}

                    <Pagination
                        containerClassName={classes.pagination}
                        activeClassName={classes.active}
                        previousLabel={<ArrowBackIcon/>}
                        nextLabel={<ArrowForwardIcon/>}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={this.state.pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}/>
                </Col>
                </Row>
            </Container>
      );
   }
}

export default Filters;