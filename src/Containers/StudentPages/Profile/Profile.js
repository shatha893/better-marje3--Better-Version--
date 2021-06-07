import React,{Component} from 'react';
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/footer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import classes from './Profile.module.css';
import ResourcesProgress from '../../../components/StudentComponents/resourceProgress/resourcesProgress';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Axios from 'axios';
import Cookies from 'js-cookie';

class Profile extends Component {

    state={
      pendingExams:[],
      uploadedExams:[],
      pendingPpsNotes:[],
      uploadedPpsNotes:[],
      openSnackbar:false
    }

    componentDidMount = () => {
        this.getPendingExams();
        this.getUploadedExams();
        this.getPendingPpsNotes();
        this.getUploadedPpsNotes();
    }

    getPendingExams = async()=>{

        const config = { 
            headers: { Authorization: `${JSON.parse(Cookies.get('user')).token}` } 
        };

        try{
            const result = await Axios.post("http://localhost:1234/Exam/Search",{
                "isApproved": false,
                "volunteersIds": [JSON.parse(Cookies.get('user')).id],
                "offset": 0,
                "count": 9999,
                "metadata": true
              },config);
              console.log("result",result);
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

        const config = { 
            headers: { Authorization: `${JSON.parse(Cookies.get('user')).token}` } 
        };
        try{
            const result = await Axios.post("http://localhost:1234/Exam/Search",{
                "isApproved": true,
                "volunteersIds": [JSON.parse(Cookies.get('user')).id],
                "offset": 0,
                "count": 9999,
                "metadata": true
              },config);
            let tempArr = [];
            console.log("result",result);
            result.data.map((exam)=>{
                tempArr.push({
                    id:exam.id,
                    name:exam.name
                })
            });
            this.setState({uploadedExams:[...tempArr]});
        }
        catch(error){
            console.log("Error = ",error);
        }
    }

    getPendingPpsNotes = async() => {
        const config = { 
            headers: { Authorization: `${JSON.parse(Cookies.get('user')).token}` } 
        };

        try{
            const result = await Axios.post("http://localhost:1234/Resource/Search",{
                "isApproved": false,
                "volunteers": [JSON.parse(Cookies.get('user')).id],
                "offset": 0,
                "count": 9999,
                "metadata": true
              },config);
            let tempArr = [];
            result.data.map((exam)=>{
                tempArr.push({
                    id:exam.id,
                    name:exam.name
                })
            });
            this.setState({pendingPpsNotes:[...tempArr]});
        }
        catch(error){
            console.log("Resource Search Error (Note Approved Yet) = ",error);
        }
    }

    getUploadedPpsNotes = async() => {
        const config = { 
            headers: { Authorization: `${JSON.parse(Cookies.get('user')).token}` } 
        };

        try{
            const result = await Axios.post("http://localhost:1234/Resource/Search",{
                "isApproved": true,
                "volunteers": [JSON.parse(Cookies.get('user')).id],
                "offset": 0,
                "count": 9999,
                "metadata": true
              },config);
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

    refreshAfterChange = () =>{
        window.location.reload(false);
    }

    handleRemoveResource = (key) =>{
        fetch('http://localhost:1234/Resource/Delete', {
         method: 'DELETE',
         headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization':`${JSON.parse(Cookies.get('user')).token}`
        },
        body: JSON.stringify([key])
      }).then( () => {
         this.setState({openSnackbar:true},
         ()=>this.refreshAfterChange());
         
      })
    }

    handleRemoveExam = (key) =>{
        fetch('http://localhost:1234/Exam/Delete', {
         method: 'DELETE',
         headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization':`${JSON.parse(Cookies.get('user')).token}`
        },
        body: JSON.stringify([key])
      }).then( () => {
         this.setState({openSnackbar:true},
         ()=>this.refreshAfterChange());
         
      })
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
                            resourceType={"exam"}
                            handleRemoveResource={(key)=>this.handleRemoveExam(key)}/>
                        </Row>
                        <Row>
                            <ResourcesProgress 
                            Title={"your pastpapers & notes"} 
                            pendingResources={[...this.state.pendingPpsNotes]}
                            uploadedResources={[...this.state.uploadedPpsNotes]} 
                            resourceType={"pp&notes"}
                            handleRemoveResource={(key)=>this.handleRemoveResource(key)}/>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Footer></Footer>
                </Row>
                <Snackbar
         anchorOrigin={{
         vertical: 'bottom',
         horizontal: 'left',
         }}
         open={this.state.openSnackbar}
         autoHideDuration={10000}
         onClose={this.handleCloseSnackbar}
         message={"Deleted Successfully"}
         action={
         <React.Fragment>
             <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleClose}>
                 <CloseIcon fontSize="small" />
             </IconButton>
         </React.Fragment>}/>
            </Container>
    );
    }
}

export default Profile;
