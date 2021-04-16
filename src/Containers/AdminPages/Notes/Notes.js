import React,{Component} from 'react';
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/footer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

class Notes extends Component{
   render(){
      return(
            <Container fluid={+true} >
                <Row>
                   {/* USER TYPE IS TEMPORARY UNTIL WE DO PROPER AUTHENTICATION */}
                    <Header pageType={"AdminHome"} userType={"Admin"}/> 
                </Row>
                <Row>
                  STH. JUST STH!!!
                </Row>
               
                <Row>
                    <Footer/>
                </Row>
            </Container>);
   }

}

export default Notes;
