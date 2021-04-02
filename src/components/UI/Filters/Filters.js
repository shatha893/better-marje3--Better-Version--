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

class Filters extends Component{
   state={
      //For the pagination
      offset: 0,
      perPage: 10,
      currentPage: 0,
      pageCount:0,

      //For the filters checkboxes
      filters:[
          {
              title:"course",
              checkboxes:[] 
          },
          {
              label:"Tag",
              checked:false
          },
          {
              label:"Semester"
          }
      ]
  }
  
  recievedData =()=>{

   if(this.props.data == undefined)  return;

   const slice = this.props.data.slice(this.state.offset, this.state.offset + this.state.perPage)
   this.props.handleData(slice);

   this.setState({
       pageCount: Math.ceil(this.props.data.length / this.state.perPage)
   })
}

  handlePageClick = (e) => {
   const selectedPage = e.selected;
   const offset = selectedPage * this.state.perPage;

   this.setState({
       currentPage: selectedPage,
       offset: offset
   });
   
   this.recievedData();  
};

   componentDidMount(){
      this.recievedData();
   }

   render()
   {
      console.log(this.props.data);
      return(
         <Container fluid={+true}>
                <Row>
                <Col sm={2} className={classes.filterCol}>
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
                            aria-label="Username"
                            aria-describedby="basic-addon1"/>
                        </InputGroup>
                        
                    </div>
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