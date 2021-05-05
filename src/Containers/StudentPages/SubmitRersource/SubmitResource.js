import React,{Component} from 'react';
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/footer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import classes from './SubmitResource.module.css';

class SubmitResource extends Component {

   render(){
      return(
         <Container fluid={+true} className={classes.Container}>
         <Row>
             <Header 
             pageType={"Home"} 
             userName={this.props.username===null?null:this.props.username} /> 
         </Row>

         <Row>
             <Footer/>
         </Row>
     </Container>
      );
   }
}
export default SubmitResource;