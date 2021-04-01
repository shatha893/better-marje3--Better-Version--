import React,{ Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import classes from './TakeExamTab.module.css';
import Pagination from 'react-paginate';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import SearchIcon from '@material-ui/icons/Search';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl'

class TakeExamTab extends Component{
    
    state={
        //For the pagination
        offset: 0,
        data: [],
        perPage: 10,
        currentPage: 0,
        pageCount:0,

        //For the filters checkboxes
        filters:{
            course:{
                label:"course",
                checked:false
            }
        }
    }
    
    recievedData =()=>
    {
        console.log(this.props.examsData);
        // const data = [...this.props.examsData];
        const slice = this.props.examsData.slice(this.state.offset, this.state.offset + this.state.perPage)
        const postData = slice.map(exam => 
            <ListGroup.Item 
            key={this.state.name}
            action 
            href="/" 
            className={classes.listItem}> 
                <p className={classes.content}> 
                    {exam.name} 
                    <span 
                    className={classes.subContent}>
                        {/* {exam.date}  */} &nbsp;
                        Date Created: {exam.date}{/* {exam.duration}   */}
                    </span> 
                </p>
            </ListGroup.Item>)

        this.setState({
            pageCount: Math.ceil(this.props.examsData.length / this.state.perPage),
            data:[...postData]
        })
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        },
        ()=>this.recievedData());

        
    };
    
    componentDidMount(){
        this.setState(()=>this.recievedData());
    }

    render(){
        
        return(
            <Container fluid={+true}>
                <Row>
                    <Col sm={2} className={classes.filterCol}>
                        <p className={classes.filtersTitle}>Refine By</p>
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
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                            
                        </div>
                    </Col>
                    <Col>
                        <p className={classes.resultsTitle}>Available Exams</p>
                        <ListGroup className={classes.list}>
                            {this.state.data}
                        </ListGroup>
                        
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
export default TakeExamTab;



// {/* {
//                 props.examsData.map(exam=>{
//                     return(
//                         <ListGroup.Item action href="/examPath" className={classes.listItem}> 
//                            <p className={classes.content}> 
//                                 {exam.name} 
//                                 <span 
//                                 className={classes.subContent}>
//                                     {exam.date} 
//                                    {exam.duration}  
//                                 </span> 
//                             </p>
//                         </ListGroup.Item>
//                     );
//                 })
//             } */}



{/* <ListGroup.Item action className={classes.listItem}>
               <p className={classes.content}> Calculus Exam
                   <span 
                    className={classes.subContent}>
                    created: 22/5/2021 &nbsp; Duration: 120 minutes 
                    </span>
               </p> 
            </ListGroup.Item>
            <ListGroup.Item action className={classes.listItem}>
            <p className={classes.content}> C++ Exam
                   <span 
                    className={classes.subContent}>
                    created: 22/5/2021  &nbsp; Duration: 60 minutes
                    </span>
               </p> 
            </ListGroup.Item>
            <ListGroup.Item action className={classes.listItem}>
            <p className={classes.content}> Statistics Exam
                   <span 
                    className={classes.subContent}>
                    created: 22/5/2021 &nbsp; Duration:  30 minutes
                    </span>
               </p> 
            </ListGroup.Item>
            <ListGroup.Item action className={classes.listItem}>
            <p className={classes.content}> Discrete II Exam
                   <span 
                    className={classes.subContent}>
                    created: 22/5/2021 &nbsp; Duration: 130 minutes
                    </span>
               </p> 
            </ListGroup.Item> */}