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
      pendingExams:[],
      uploadedExams:[],
      pendingPpsNotes:[],
      uploadedPpsNotes:[]
    }

    componentDidMount = () => {
        this.getPendingExams();
        this.getUploadedExams();
        this.getPendingPpsNotes();
        this.getUploadedPpsNotes();
    }

    getPendingExams = async()=>{
        try{
            const result = await Axios.post("http://localhost:1234/Exam/Search",{
                "isApproved": false,
                "volunteersIds": [JSON.parse(Cookies.get('user')).id],
                "offset": 0,
                "count": 9999,
                "metadata": true
              });
            let tempArr = [];
            result.data.map((exam)=>{
                tempArr.push({
                    id:exam.id,
                    name:exam.name
                })
            });
            this.setState({pendingExams:[...tempArr]});
        }
        catch(error){
            console.log("Error = ",error);
        }
    }

    getUploadedExams = async() => {
        try{
            const result = await Axios.post("http://localhost:1234/Exam/Search",{
                "isApproved": true,
                "volunteersIds": [JSON.parse(Cookies.get('user')).id],
                "offset": 0,
                "count": 9999,
                "metadata": true
              });
            let tempArr = [];
            result.data.map((exam)=>{
                tempArr.push({
                    id:exam.id,
                    name:exam.name
                })
            });
            console.log("examssss",tempArr)
            this.setState({uploadedExams:[...tempArr]});
        }
        catch(error){
            console.log("Error = ",error);
        }
    }

    getPendingPpsNotes = async() => {
        try{
            const result = await Axios.post("http://localhost:1234/Resource/Search",{
                "isApproved": false,
                "volunteers": [JSON.parse(Cookies.get('user')).id],
                "offset": 0,
                "count": 9999,
                "metadata": true
              });
              console.log(result);
            let tempArr = [];
            result.data.map((exam)=>{
                tempArr.push({
                    id:exam.id,
                    name:exam.name
                })
            });
            this.setState({uploadedPpsNotes:[...tempArr]});
        }
        catch(error){
            console.log("Resource Search Error (Note Approved Yet) = ",error);
        }
    }

    getUploadedPpsNotes = async() => {
        try{
            const result = await Axios.post("http://localhost:1234/Resource/Search",{
                "isApproved": true,
                "volunteers": [JSON.parse(Cookies.get('user')).id],
                "offset": 0,
                "count": 9999,
                "metadata": true
              });
            let tempArr = [];
            result.data.map((exam)=>{
                tempArr.push({
                    id:exam.id,
                    name:exam.name
                })
            });
            this.setState({uploadedPpsNotes:[...tempArr]});
        }
        catch(error){
            console.log("Resource Search Error (Approved)= ",error);
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
                            pendingResources={[...this.state.pendingExams]}
                            uploadedResources={[...this.state.uploadedExams]} 
                            resourceType={"exam"}/>
                        </Row>
                        <Row>
                            <ResourcesProgress 
                            Title={"your pastpapers & notes"} 
                            pendingResources={[...this.state.pendingPpsNotes]}
                            uploadedResources={[...this.state.uploadedPpsNotes]} 
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
