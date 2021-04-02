import React,{ Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import classes from './TakeExamTab.module.css';
import Axios from 'axios';
import Spinner from '../../../../components/UI/spinner/spinner';
import Filters from '../../../../components/UI/Filters/Filters';

class TakeExamTab extends Component{
    
    state={ 
        examsData:[],
        loading:false
    }

    componentDidMount(){
        this.setState({loading:true});
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
                examsData:[...tempArr],
                loading:false
            })

        })
    }

    handleData = (newData)=>{
        this.setState({examsData:[...newData]});
    }

    render(){
        
        const dataList = this.state.examsData.map(exam => 
            <ListGroup.Item 
            key={exam.id}
            action 
            href="/" 
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
            <Spinner loading={this.state.loading}/>
            { this.state.loading?null:
            <Filters
            handleData={this.handleData}
            data={this.state.examsData == null?undefined:this.state.examsData}>    
                <p className={classes.resultsTitle}> Available Exams </p>
                <ListGroup className={classes.list}>
                    {dataList}
                </ListGroup>
            </Filters> }
            </>);
    }
    
}
export default TakeExamTab;


{/* <ListGroup.Item action className={classes.listItem}>
        <p className={classes.content}> Calculus Exam
        <span 
        className={classes.subContent}>
        created: 22/5/2021 &nbsp; Duration: 120 minutes 
        </span>
        </p> 
    </ListGroup.Item> */}
