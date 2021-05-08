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
         var ids = [];
        fetch('http://localhost:1234/Question/GetAll', {
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
             ids = json 
             console.log(json)
         })
 
        var idsz = [  100, 104,108, 111,]
          console.log(idsz);
        
        fetch('http://localhost:1234/Question/Get', {
            method: 'POST',
            headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
           },
           body: JSON.stringify(["100","111"])
         }).then(res => res.json())
            .then(json =>{
        
                let tempArr = [];

                for(let i in json)
                {
                    console.log(json[i]);
                    tempArr.push({
                        id:json[i].id,
                        title:json[i].title,
                        name:json[i].volunteer.name
                    })
                }
                 console.log(tempArr);
                this.setState({
                    originalData:[...tempArr],
                    loading:false
                })
         })
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