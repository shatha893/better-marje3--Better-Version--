import React,{Component} from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import classes from './Profile.module.css';
import ResourcesProgress from '../../components/resourceProgress/resourcesProgress';

//This is the container for all profile components 
//{this.props.children} contains the infoPage and the editpage which contain the user
//Info and the <ResourcesProgress/> is the components for pastpapers and exams progress
//of that specific user.
class Profile extends Component {

    state={
      examsInfo:[],
      ppNotesInfo:[]
    }

    render()
    {
    return (
        <Container fluid className={classes.Container}>
                <Row>
                    <Header pageType={"Profile"} />
                </Row>
                <Row> <p className={classes.PageTitle}>YOUR PROFILE</p> </Row>
                <Row> 
                    <Col className={classes.ProfileInfo}>
                        {this.props.children}
                    </Col>
                    <Col xs={8}>
                        <Row>
                            <ResourcesProgress 
                            Title={"exams you made"} 
                            resources={[...this.state.examsInfo]} 
                            resourceType={"exam"}/>
                        </Row>
                        <Row>
                            <ResourcesProgress 
                            Title={"your pastpapers & notes"} 
                            resources={[...this.state.ppNotesInfo]} 
                            resourceType={"pp&notes"}/>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Footer></Footer>
                </Row>
            </Container>
    );
    }
}

export default Profile;
