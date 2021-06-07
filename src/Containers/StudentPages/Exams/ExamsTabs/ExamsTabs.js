import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import classes from './ExamsTabs.module.css';
import TakeExamTab from './TakeExamTab/TakeExamTab';
import MakeExamTab from './MakeExamTab/MakeExam';
import Questions from './QuestionsTab/Questions';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        >
        {value === index && (
            <Box p={3}>
            <Typography component={'span'}>{children}</Typography>
            </Box>
        )}
        </div>
    );
}

function a11yProps(index) {
return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
};
}
  

class ExamsTabs extends Component{

    state = { value:0 }

    componentDidMount(){
        this.handleChange(this.state.value);
    }

    handleChange = (val) =>{  
        this.setState({ value:val });  
    }

    render(){

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.bar}>
            <Tabs 
            value={this.state.value} 
            aria-label="simple tabs example"
            centered>
                <Tab label="take exam" {...a11yProps(0)} onClick={()=>this.handleChange(0)}/>
                <Tab label="make question" {...a11yProps(1)} onClick={()=>this.handleChange(1)}/>
                <Tab label="make exam" {...a11yProps(2)} onClick={()=>this.handleChange(2)}/>
            </Tabs>
            </AppBar>
            <TabPanel value={this.state.value} index={0} > 
                <TakeExamTab/>
            </TabPanel>
            <TabPanel value={this.state.value} index={1}>
                <MakeExamTab />
            </TabPanel>
            <TabPanel value={this.state.value} index={2} >
                <Questions/>
            </TabPanel>
        </div> );
    }
}
export default ExamsTabs;