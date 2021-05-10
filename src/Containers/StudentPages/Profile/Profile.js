import React,{Component} from 'react';
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/footer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import classes from './Profile.module.css';
import ResourcesProgress from '../../../components/StudentComponents/resourceProgress/resourcesProgress';
import Axios from 'axios';
import Cookies from 'js-cookie';
//This is the container for all profile components 
//{this.props.children} contains the infoPage and the editpage which contain the user
//Info and the <ResourcesProgress/> is the components for pastpapers and exams progress
//of that specific user.
class Profile extends Component {

    state={
      exams:[],
      PPsandNotes:[]
    }

    componentDidMount = () => {
        this.getExams();
    }

    getExams = async()=>{
        try{
            const result = await Axios.post("http://localhost:1234/Exam/Search",{
                "nameMask": null,
                "minYear": null,
                "maxYear": null,
                "types": null,
                "semesters": null,
                "minDuration": null,
                "maxDuration": null,
                "courses": null,
                "tags": null,
                "isApproved": true,
                "volunteersIds": [JSON.parse(Cookies.get('user')).id],
                "offset": 0,
                "count": 10,
                "metadata": true
              });

            const awaiting = await result;
            let tempArr = [];
            awaiting.data.map((exam)=>{
                tempArr.push({
                    id:exam.id,
                    name:exam.name
                })
            });
           
            this.setState({exams:[...tempArr]});
        }
        catch(error){
            console.log("Error = ",error);
        }
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
                            resources={[...this.state.exams]} 
                            resourceType={"exam"}/>
                        </Row>
                        <Row>
                            <ResourcesProgress 
                            Title={"your pastpapers & notes"} 
                            resources={[...this.state.PPsandNotes]} 
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
