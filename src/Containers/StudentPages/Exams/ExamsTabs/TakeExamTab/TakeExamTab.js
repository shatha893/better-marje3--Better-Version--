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
        filters:[]
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
                originalData:[...tempArr],
                loading:false
            })

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
            <Spinner loading={this.state.loading}/>
            { this.state.loading?null:
            <Filters
            handleData={this.handleData}
            data={this.state.originalData == null?undefined:this.state.originalData}
            displaySave={true}>    
                <p className={classes.resultsTitle}> Available Exams </p>
                <ListGroup className={classes.list}>
                    {dataList}
                </ListGroup>
            </Filters> }
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
