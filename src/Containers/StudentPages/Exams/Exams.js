import React, { Component } from 'react';
import ExamsTabs from './ExamsTabs/ExamsTabs';
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/footer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import classes from './Exams.module.css';
import Axios from 'axios';

class Exams extends Component{
    
    state={
        userName:null,
        avatar:null
    }
   
    render()
    {
        return(
            <Container fluid={+true}>
                <Row>
                    <Header 
                    pageType={"exams"} 
                    userName={this.state.userName} 
                    avatar={this.state.avatar}/>
                </Row>
                <Row className={classes.container}>
                    <ExamsTabs/>
                </Row>

                <Row>
                    <Footer></Footer>
                </Row>
            </Container>
        );
    }
}

export default Exams;