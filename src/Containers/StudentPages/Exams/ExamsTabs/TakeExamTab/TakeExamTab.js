import React,{ Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import classes from './TakeExamTab.module.css';
import Axios from 'axios';
import Spinner from '../../../../../components/StudentComponents/UI/spinner/spinner';
import Filters from '../../../../../components/StudentComponents/UI/Filters/Filters';
import { withRouter } from 'react-router-dom';

class TakeExamTab extends Component{
    
    state={ 
        originalData:[],
        dataPerPage:[],
        loading:false,
        filters:[],
        ids:[]
    }

    componentDidMount(){
        this.setState({loading:true});

        const requestOptions = {
            method: 'POST',
            headers: {},
            body: JSON.stringify({ count: 10 })
        };
        
        fetch('http://localhost:1234/Exam/GetAll', {
            method: 'POST',
            headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
           },
           body: JSON.stringify({
            count: '10'
          })
         }).then(res => res.json())
         .then(json =>{
            this.setState({
             ids:json 
                   })  
                   console.log(json)    
         })
   


    }

    handleData = (newData)=>{
        this.setState({dataPerPage:[...newData]});
    }

    handleListItemClick = () =>{
        this.props.history.push("");
    }

    render(){
        
        const dataList = this.state.dataPerPage.map(exam => 
            <ListGroup.Item 
            key={exam.id}
            action 
            href="/ExamEntrée" 
            className={classes.listItem}> 
                <p className={classes.content}> 
                    {exam.name} 
                    <span 
                    className={classes.subContent}>
                        {/* {exam.date}  */} &nbsp;
                        Date Created: {exam.date}{/* {exam.duration}   */}
                    </span> 
                </p>
            </ListGroup.Item>);
        
        return(
            <>
           
            <Filters
            handleData={this.handleData}
            data={this.state.originalData == null?undefined:this.state.originalData}>    
                <p className={classes.resultsTitle}> Available Exams </p>
                <ListGroup className={classes.list}>
                    {dataList}
                </ListGroup>
            </Filters> 
            </>);
    }
    
}
export default withRouter(TakeExamTab);


{/* <ListGroup.Item action className={classes.listItem}>
        <p className={classes.content}> Calculus Exam
        <span 
        className={classes.subContent}>
        created: 22/5/2021 &nbsp; Duration: 120 minutes 
        </span>
        </p> 
    </ListGroup.Item> */}
