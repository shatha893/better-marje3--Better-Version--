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
    }

    componentDidMount(){

        this.setState({loading:true});

       fetch('http://localhost:1234/Exam/GetAll', {
            method: 'POST',
            headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
           },
           body: JSON.stringify({
            count: '10'
          })
         }).then(function(res){
            return res.json();
         }).then(function (data) {
            console.log(data);
            // Store the post data to a variable
                 
   
            console.log(data);
   
        
           var arr=data;
            
            console.log(arr);
   
            // Fetch another API
   return  fetch('http://localhost:1234/Exam/Get', {
    method: 'POST',
    headers: {
   'Accept': 'application/json',
   'Content-Type': 'application/json',
   },
              body: JSON.stringify(arr)
              });
         
         }).then(function (response) {
            if (response.ok) {
               return response.json();
            } else {
               return Promise.reject(response);
            }
         }).then( (userData) => {
            console.log(userData);

            let tempArr = [];

            for(let i in userData)
            {
               tempArr.push({
                    id:userData[i].id,
                    date:userData[i].year,
                    name:userData[i].name
                })
            }

            this.setState({
                originalData:[...tempArr],
                loading:false
            })
            console.log("Sssssssss");

         }).catch(function (error) {
            console.warn(error);
         });


      
    }

    handleListItemClick = () =>{
        this.props.history.push("");
    }

    handleData = (newData)=>{
        this.setState({dataPerPage:[...newData]});
    }

    render(){
        
        const dataList = this.state.originalData.map(exam => 
            <ListGroup.Item 
            key={exam.id}
            action 
            href={"/ExamEntrée?id=" + exam.id}
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
