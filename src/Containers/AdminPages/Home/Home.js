import React,{Component} from 'react';
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/footer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import classes from './Home.module.css';
import Card from 'react-bootstrap/Card';
import busy from '../../../Assets/busy_purple.svg';
import { withRouter } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';

class Home extends Component{

   
    render()
    {
      let homeOptions = [
         {
            title:'Pending Notes',
            link:<a 
            href='/notes'
            className={classes.anchor}>Go there</a>
         },
         {
           title:'Pending Pastpapers',
           link:<a 
           href='/pastpapers'
           className={classes.anchor}>Go there</a>
        },
        {
           title:'Pending Quizes',
           link:<a 
           href='/quizes'
           className={classes.anchor}>Go there</a>
        },
        {
         title:'Pending Slides',
         link:<a 
         href='/slides'
         className={classes.anchor}>Go there</a>
      },
        {
           title:'Pending Exams',
           link:<a 
           href='/Exams'
           className={classes.anchor}>Go there</a>
        }]
        return(
            <Container fluid={+true} >
                <Row>
                   
                    <Header pageType={"AdminHome"} userType={"Admin"}/> 
                </Row>
               
                <Row>
               <Col className={classes.containerofAllCards}>
                 {homeOptions.map((option, idx) => (
                    <div className={classes.container}>
                  <Card
                  key={idx}
                  text={'white'}
                  style={{ width: '18rem' }}
                  className={classes.card}>
                  <Card.Header><b>{option.title}</b></Card.Header>
                  <Card.Body>
                  <Card.Text className={classes.anchorParent}>
                     You have pending requests to approve
                     <br/>
                     {option.link}
                  </Card.Text>
                  </Card.Body>
                  </Card>
                  </div>
                  ))
                  }
                </Col>
                <Col>
                  <br/>
                  <br/>
                  <br/>
                  <p className={classes.text}>Resources & Exams to Approve</p>
                  <img 
                  src={busy} 
                  alt="no results"
                  className={classes.img}/>
                
                </Col>
                </Row>
                <Row>
                    <Footer/>
                </Row>
            </Container>
            );
}
}

export default withRouter(Home);