import React,{ Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import classes from './TakeExamTab.module.css';
import Axios from 'axios';
import Spinner from '../../../../../components/StudentComponents/UI/spinner/spinner';
import ExamsFilters from '../../../../../components/StudentComponents/UI/ExamsFilters/ExamsFilters';
import { withRouter } from 'react-router-dom';

class TakeExamTab extends Component{
    
    state={ 
        dataPerPage:[],
        loading:false,
    }

    componentDidMount(){
        this.setState({loading:true});
}
    handleData = (newData)=>{
        let tempArr = [...newData];
        this.setState({dataPerPage:[...tempArr]});
    }

    msConversion = (millis) =>{
        let sec = Math.floor(millis / 1000);
        let hrs = Math.floor(sec / 3600);
        sec -= hrs * 3600;
        let min = Math.floor(sec / 60);
        sec -= min * 60;
      
        sec = '' + sec;
        sec = ('00' + sec).substring(sec.length);
      
        if (hrs > 0) {
          min = '' + min;
          min = ('00' + min).substring(min.length);
          return hrs + ":" + min + ":" + sec;
        }
        else {
          return min + ":" + sec;
        }
      }

    render(){
        console.log("dataPerPage  ",this.state.dataPerPage)
        const dataList = this.state.dataPerPage.map(exam => {
            console.log("exam.duration",exam.duration);
            let duration = this.msConversion(exam.duration);
            return(
            <ListGroup.Item 
            key={exam.id}
            action 
            href={"/ExamEntrée?id=" + exam.id}
            className={classes.listItem}> 
                <p className={classes.content}> 
                    {exam.name}
                    <br/> 
                    <p
                    className={classes.subContent}>
                        Duration: {duration} &nbsp;&nbsp;
                        Year Created: {exam.year} &nbsp;&nbsp;
                        Made By: {exam.author}
                    </p> 
                </p>
            </ListGroup.Item>);
        });
        
        return(
            <>
           
            <ExamsFilters
            className={classes.container}
            handleData={(newData)=>this.handleData(newData)}>    
                <p className={classes.resultsTitle}> Available Exams </p>
                <ListGroup className={classes.list}>
                    {dataList}
                </ListGroup>
            </ExamsFilters> 
            </>);
    }
    
}
export default withRouter(TakeExamTab);