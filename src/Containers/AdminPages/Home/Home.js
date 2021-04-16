import React,{Component} from 'react';
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/footer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import classes from './Home.module.css';
import Card from 'react-bootstrap/Card';
import { withRouter } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';

class Home extends Component{

   
    render()
    {
      let homeOptions = [
         {
            color:'Success',
            title:'Pending Notes',
            link:'/notes'
         },
         {
           color:'Danger',
           title:'Pending Pastpapers',
           link:'/pastpapers'
        },
        {
           color:'Warning',
           title:'Pending Exams',
           link:'/exams'
        },
        {
           color:'Info',
           title:'Users\' Reports',
           link:'/reports'
        }
  
      ]
        return(
            <Container fluid={+true} >
                <Row>
                   {/* USER TYPE IS TEMPORARY UNTIL WE DO PROPER AUTHENTICATION */}
                    <Header pageType={"AdminHome"} userType={"Admin"}/> 
                </Row>
                <Row>
                <p className={classes.statusRow}>
                  Status 
                  <Divider className={classes.divider}/>
                </p>
                </Row>
                <Row className={classes.container}>
                
                 {homeOptions.map((option, idx) => (
                  <Card
                  bg={option.color.toLowerCase()}
                  key={idx}
                  text={'white'}
                  style={{ width: '18rem' }}
                  className={classes.card}
                  >
                  <Card.Header><b>{option.title}</b></Card.Header>
                  <Card.Body>
                  <Card.Text>
                     You have 500 pending request to approve
                     <br/>
                     <a 
                     href={option.link}
                     className={classes.anchor}>Go there</a>
                  </Card.Text>
                  </Card.Body>
                  </Card>
                  ))
                  }
                </Row>
               
                <Row>
                    <Footer/>
                </Row>
            </Container>
            );
}
}

export default withRouter(Home);