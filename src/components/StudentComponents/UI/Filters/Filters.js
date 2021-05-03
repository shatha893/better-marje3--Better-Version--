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
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
// import ListItemText from '@material-ui/core/ListItemText';
// import Checkbox from '@material-ui/core/Checkbox';
import Accordion from 'react-bootstrap/Accordion';
import FiltersList from './FiltersList/FiltersList';

class Filters extends Component{
   state={
      //For the pagination
      offset: 0,
      perPage: 10,
      currentPage: 0,
      pageCount:0,

      //For the filters checkboxes
//       filters:[
//           {
//               title:"course",
//               checkboxes:[] 
//           },
//           {
//               label:"Tag",
//               checked:false
//           },
//           {
//               label:"Semester"
//           }
//       ]
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
//    <Accordion 
//    className={classes.accordion} 
//    hidden={!this.state.addQuestionClicked}>
//    <Card className={classes.card}>
//        <Accordion.Toggle 
//        className={classes.cardHeader} 
//        as={Card.Header} 
//        eventKey="0">
//            <p> Make New Question </p>
//        </Accordion.Toggle>
//        <Accordion.Collapse eventKey="0">
//        <Card.Body>
//            <MakeQuestion handleSave={(obj)=>this.handleSave(obj)}/>
//        </Card.Body>
//        </Accordion.Collapse>
//    </Card>
//    {/*_______Already Created Questions Card_______*/}
//    <Card className={classes.card}>
//        <Accordion.Toggle 
//        className={classes.cardHeader} 
//        as={Card.Header} 
//        eventKey="1"
//        onClick={this.handleExistingQuestion}>
//            <p> Use already created Questions </p>
//        </Accordion.Toggle>
//        <Accordion.Collapse eventKey="1">
//        <Card.Body>
//            <Spinner loading={this.state.loading}/>
//            {/*__Haven't handled the save of the checkboxlist questions yet__*/}
//            {this.state.loading?null:
//            <CheckboxList 
//            itemList={this.state.existingQuestions}
//            handleSave={(obj)=>this.handleSave(obj)}/>}
//        </Card.Body>
//        </Accordion.Collapse>
//    </Card>
//    {/*____________________________________________*/}
//    </Accordion>

   render()
   {
    // const filters = this.props.filters == null
    // ?null
    // :this.props.filters.map((item,index) => {
     
    //   return (
    //     <ListItem 
    //     key={index} 
    //     role={undefined} 
    //     dense 
    //     button 
    //     onClick={()=>this.handleToggle(item)}
    //     >
    //       <ListItemIcon>
    //         <Checkbox
    //           edge="start"
    //         //   checked={this.props.filters.checked.indexOf(item) !== -1}
    //           tabIndex={-1}
    //           disableRipple
    //           inputProps={{ 'aria-labelledby': index }}
    //         />
    //       </ListItemIcon>
    //       <ListItemText id={index} primary={item.name} />
    //     </ListItem>);
    //     });
        let newArr=[];
        this.props.courses.map((course,index)=>{
            newArr.push(course);
            return;
        });
        console.log("newArr = ",newArr);

        const accCards = [
            {
                title:"Courses",
                data:[...newArr]
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
                       
                        {/* <CheckboxList 
                        itemList={this.props.filters }
                        displaySave={false}/> */}
                       
                    </div>
                    <Accordion 
                    className={classes.accordion} 
                    // hidden={!this.state.addQuestionClicked}
                    >
                         {accCards.map((card,index)=>{
                            return(
                                <Card className={classes.card}>
                                <Accordion.Toggle 
                                className={classes.cardHeader} 
                                as={Card.Header} 
                                eventKey={index.toString()}>
                                <p> {card.title} </p>
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey={index.toString()}>
                                <Card.Body>
                                    <FiltersList filters={card.data}/>
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