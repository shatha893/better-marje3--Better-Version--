import React,{ Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import classes from './Questions.module.css';
import Axios from 'axios';
import Spinner from '../../../../../components/StudentComponents/UI/spinner/spinner';
import Filters from '../../../../../components/StudentComponents/UI/Filters/Filters';

class Questions extends Component{
    
   state = {
    originalData:[],
    dataPerPage:[],
    loading:false,
    filters:[]
   }

  

    componentDidMount(){

        this.setState({loading:true});
        //questions data instead which is supposed to be consisting of ( Question, Question tags)

        fetch('http://localhost:1234/Question/GetAll', {
            method: 'POST',
            headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
           },
           body: JSON.stringify({
            count: '30'
          })
         }).then(function(res){
            return res.json();
         }).then(function (data) {
           
           var arr=data;
            
            console.log(arr);
   
       return   fetch('http://localhost:1234/Question/Get', {
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
                console.log(userData[i]);
                tempArr.push({
                    id:userData[i].id,
                    title:userData[i].title,
                    name:userData[i].volunteer.name
                })
            }
             console.log(tempArr);
            this.setState({
                originalData:[...tempArr],
                loading:false
            })

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
         
        const dataList = this.state.dataPerPage.map(question => 
            <ListGroup.Item 
            key={question.id}
            action 
            href= {"/Question/?id=" + question.id}  
            className={classes.listItem}> 
                <p className={classes.content}> 
                {question.title} 
                    <span 
                    className={classes.subContent}>
                        Created By: {question.name} 
                    </span> 
                </p>
            </ListGroup.Item>
            );

         console.log(dataList);

        return(
            <>
            <Spinner loading={this.state.loading}/>
            { this.state.loading?null:
            <Filters
            handleData={this.handleData}
            data={this.state.originalData == null?undefined:this.state.originalData}>    
                <p className={classes.resultsTitle}> Available Exams </p>
                <ListGroup className={classes.list}>
                    {dataList}
                </ListGroup>
            </Filters> }
            </>);
    }
    
}
export default Questions;