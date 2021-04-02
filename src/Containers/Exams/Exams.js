import React, { Component } from 'react';
import ExamsTabs from './ExamsTabs/ExamsTabs';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import classes from './Exams.module.css';

class Exams extends Component{
    
    render()
    {
        return(
            <Container fluid={+true}>
                <Row>
                    <Header pageType={"exams"} />
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