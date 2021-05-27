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
//        fetch('http://localhost:1234/Exam/GetAll', {
//             method: 'POST',
//             headers: {
//            'Accept': 'application/json',
//            'Content-Type': 'application/json',
//            },
//            body: JSON.stringify({
//             count: '10'
//           })
//          }).then(function(res){
//             return res.json();
//          }).then(function (data) {
//             console.log(data);
//             // Store the post data to a variable
                 
   
//             console.log(data);
   
        
//            var arr=data;
            
//             console.log(arr);
   
//             // Fetch another API
//    return  fetch('http://localhost:1234/Exam/Get', {
//     method: 'POST',
//     headers: {
//    'Accept': 'application/json',
//    'Content-Type': 'application/json',
//    },
//               body: JSON.stringify(arr)
//               });
         
//          }).then(function (response) {
//             if (response.ok) {
//                return response.json();
//             } else {
//                return Promise.reject(response);
//             }
//          }).then( (userData) => {
//             console.log(userData);

//             let tempArr = [];

//             for(let i in userData)
//             {
//                tempArr.push({
//                     id:userData[i].id,
//                     date:userData[i].year,
//                     name:userData[i].name
//                 })
//             }

//             this.setState({
//                 originalData:[...tempArr],
//                 loading:false
//             })
//             console.log("Sssssssss");

//          }).catch(function (error) {
//             console.warn(error);
//          });
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
        const dataList = this.state.dataPerPage.map(exam => {

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
                    <span
                    className={classes.subContent}>
                        Duration: {duration} &nbsp;&nbsp;
                        Year Created: {exam.year} &nbsp;&nbsp;
                        Made By: {exam.author}
                    </span> 
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
