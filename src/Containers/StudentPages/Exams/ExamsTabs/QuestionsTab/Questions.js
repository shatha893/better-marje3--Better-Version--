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
        loading:false
   }

   handleData = (newData)=>{
    this.setState({dataPerPage:[...newData]});
}

    componentDidMount(){
        this.setState({loading:true});
        //questions data instead which is supposed to be consisting of ( Question, Question tags)
        Axios.get("http://localhost:3000/exams").then(response=>{
            let tempArr = [];
            console.log(response);
            for(let i in response.data)
            {
                tempArr.push({
                    id:i,
                    name:response.data[i].name,
                    date:response.data[i].year
                })
            }
            this.setState({
                originalData:[...tempArr],
                loading:false
            })

        })
    }

    render(){
         
        const dataList = this.state.dataPerPage.map(question => 
            <ListGroup.Item 
            key={question.id}
            action 
            href="/Question" 
            className={classes.listItem}> 
                <p className={classes.content}> 
                    What is C++? 
                    <span 
                    className={classes.subContent}>
                        Date Created: {question.date} <br/>
                        Created By: {question.name} 
                    </span> 
                </p>
            </ListGroup.Item>);

        return(
            <>
            <Spinner loading={this.state.loading}/>
            { this.state.loading?null:
            <Filters
            handleData={this.handleData}
            data={this.state.originalData == null?undefined:this.state.originalData}>    
                <p className={classes.resultsTitle}> Available Questions </p>
                <ListGroup className={classes.list}>
                    {dataList}
                </ListGroup>
            </Filters> }
            </>
            );
    }
    
}
export default Questions;