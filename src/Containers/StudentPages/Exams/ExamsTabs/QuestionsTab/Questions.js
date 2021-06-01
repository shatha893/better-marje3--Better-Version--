import React,{ Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import classes from './Questions.module.css';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import Spinner from '../../../../../components/StudentComponents/UI/spinner/spinner';
import QuestionsFilters from './QuestionsFilters/QuestionsFitlers';

class Questions extends Component{
    
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
    
        render(){
            console.log("dataPerPage  ",this.state.dataPerPage)
            const dataList = this.state.dataPerPage.map(Question => {
                return(
                <ListGroup.Item 
                key={Question.id}
                action 
                href={"/Question?id=" + Question.id}
                className={classes.listItem}> 
                    <p className={classes.content}> 
                        {Question.title}
                        <br/> 
                        <span
                        className={classes.subContent}>
                            Course: {Question.description.course} &nbsp;&nbsp;
                            Made By: {Question.description.author}
                        </span> 
                    </p>
                </ListGroup.Item>);
            });
            
            return(
                <>
               
                <QuestionsFilters
                className={classes.container}
                handleData={(newData)=>this.handleData(newData)}>    
                    <p className={classes.resultsTitle}> Available Questions </p>
                    <ListGroup className={classes.list}>
                        {dataList}
                    </ListGroup>
                </QuestionsFilters> 
                </>);
        }
        
   
}
export default Questions;