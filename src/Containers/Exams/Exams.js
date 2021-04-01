import React, { Component } from 'react';
import TabsBar from '../../components/UI/TabsBar/TabsBar';
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
                    <TabsBar className={classes.TabsBar}/>
                </Row>

                <Row>
                    <Footer className={classes.footer}></Footer>
                </Row>
            </Container>
        );
    }
}

export default Exams;