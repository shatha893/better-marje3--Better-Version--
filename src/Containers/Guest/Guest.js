import React, {Component} from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import LoginModal from '../Login/Login';
import SignupModal from '../Signup/Signup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Slideshow from '../../components/UI/slideshow/slideshow';


class Guest extends Component{
    state = {
        //For Modals
        showLoginModal:false,
        showSignupModal:false,       
    };

    //Login Modal Handling
    showLoginModalHandler =()=>{
        this.setState({showLoginModal:true});
    }
    closeLoginModalHandler = () =>{
        this.setState({showLoginModal:false});
    }

    //Signup Modal Handling
    showSignupModalHandler =()=>{
        this.setState({showSignupModal:true});
    }
    closeSignupModalHandler = () =>{
        this.setState({showSignupModal:false});
    }


    //Guestpage's Render Function
    render(){
        return(<Container fluid>

            <Row>
                <Header  
                showLoginModal={this.showLoginModalHandler} 
                showSignupModal={this.showSignupModalHandler} 
                pageType={"Guest"}/>
            </Row>
            <Row>
                <Col>
                    <main>
                        <Slideshow></Slideshow>
                    </main>
                </Col>
                
            </Row>
            <Row>
            <Footer></Footer>
            </Row>

            <LoginModal 
            show={this.state.showLoginModal} 
            closeModal={this.closeLoginModalHandler}
            setUserEmail = {(email)=>this.props.setUserEmail(email)}/>  

            <SignupModal 
            show={this.state.showSignupModal} 
            closeModal={this.closeSignupModalHandler}/>

        </Container>);
    }
}
export default Guest;


