import React,{Component} from 'react';
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/footer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import classes from './Home.module.css';
import FilterSearch from '../../../Assets/search.svg';
import Axios from 'axios';
import ResourcesPage from '../../../components/homeResources/resources';
import Spinner from '../../../components/StudentComponents/UI/spinner/spinner';
import Filters from '../../../components/StudentComponents/UI/Filters/Filters';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

class Home extends Component{


    state={
        cards:[],
        cardsPerPage:[],
        courses:[],
        avatar:null,
        loading:false
    }

    filtersMounting = ()=>{
        Axios.post("http://localhost:1234/Course/GetAll",{
            "offset": 0,
            "count": 99999
          })
        .then((response) => {
          return Axios.post("http://localhost:1234/Course/Get",response.data); 
        })
        .then((response) => {
            let tempArr = [];
            response.data.map((course,index)=>{
                tempArr.push({
                    id:course.id,
                    name:course.name,
                    checked:false
                })
            });
            this.setState({courses:[...tempArr]})
        });
    }

    handleData = (newData)=>{
        let tempArr = [...newData];
        this.setState({cardsPerPage:[...tempArr]});
    }

    handleResourceSubmit = () =>{
        this.props.history.push('/SubmitResource');
    }

    componentDidMount(){
        this.filtersMounting();
        Axios.post("http://localhost:1234/Resource/GetAll",{
            "offset": 0,
            "count": 99999
          })
        .then((response) => {
            return Axios.post("http://localhost:1234/Resource/Get",response.data);
        })
        
        .then((response) => {
            console.log(response);
            let tempArr = [];
            response.data.map((resource,index)=>{
                let semester= "";
                switch(resource.creationSemester)
                {
                    case 0:
                        semester = "first";
                        break;
                    case 1:
                        semester = "second";
                        break;
                    case 2:
                        semester = "summer";

                }
                tempArr.push({
                    id:resource.id,
                    name:resource.name,
                    description:{
                        course:resource.course.name,
                        author:resource.volunteer.name,
                        creationDate:`Created In ${resource.creationYear}, in ${semester} semester`
                    }
                })
            });
            console.log(tempArr);
            this.setState({cards:[...tempArr],
            cardsPerPage:[...tempArr]});
            
        });
            // ______MY CODE________________________________
            // Axios.all([
            //     Axios.get("http://localhost:3000/courses"),
            //     Axios.get("http://localhost:3000/users?uniEmail="+this.props.userEmail)])
            // .then(
                
            //     responseArr=>{
            //             let tempArr = [];
            //             for(let i in responseArr[0].data)
            //             {
            //                 tempArr.push({
            //                     id:responseArr[0].data[0].id,
            //                     name:responseArr[0].data[0].name,
            //                     checked:false
            //                 });
            //             }

            //             this.setState({courses:[...tempArr],
            //             userName:responseArr[1].data[0].username,
            //             avatar:responseArr[1].data[0].profilePic});
            //         }
            //     )
            // .catch(error=>{
            // console.log("Error :( = "+error);
            // })

    }

    filteredCourses = (newIds) =>{

        Axios.post("http://localhost:1234/Resource/Search",{
            "courses": newIds,
            "minCreationYear": null,
            "maxCreationYear": null,
            "isApproved": null,
            "creationSemesters": null,
            "nameMask": null,
            "volunteers": null,
            "extesnions": null,
            "offset": null,
            "count": null,
            "types": null
          })
        .then((response) => {
            console.log(response);
            let tempArr = [];
            response.data.map((resource,index)=>{
                let semester= "";
                switch(resource.creationSemester)
                {
                    case 0:
                        semester = "first";
                        break;
                    case 1:
                        semester = "second";
                        break;
                    case 2:
                        semester = "summer";

                }
                tempArr.push({
                    id:resource.id,
                    name:resource.name,
                    description:{
                        course:resource.course.name,
                        author:resource.volunteer.name,
                        creationDate:`Created In ${resource.creationYear}, in ${semester} semester`
                    }
                })
            });
            this.setState({cards:[...tempArr]});
            
        });
    }

    render()
    {
        const pageContent = <>
                                <Row>
                                    <p className={classes.PageTitle}> Notes and Pastpapers </p>
                                    <Button 
                                    className={classes.submitResourceButton}
                                    onClick={this.handleResourceSubmit}>
                                        Submit Your Own Resource
                                    </Button>
                                </Row>
                                <Row className={classes.content}>
                                <img 
                                    src={FilterSearch} 
                                    alt="workspace"
                                    className={classes.filtersImg}/>
                                   
                                     
                                    <Filters
                                    filtersMounting={this.filtersMounting}
                                    data={this.state.cards == null?undefined:this.state.cards}
                                    handleData={(newData)=>this.handleData(newData)}
                                    courses={this.state.courses}
                                    filteredCourses={(newIds)=>this.filteredCourses(newIds)}>
                                        <ResourcesPage cardsInfo={this.state.cardsPerPage}/>
                                    </Filters>
                                </Row> 
                                 
                            </>;


        return(
            <>
            <Spinner loading={this.state.loading}/>
            <Container fluid={+true} className={classes.Container}>
                <Row>
                    <Header 
                    pageType={"Home"} 
                    userName={this.props.username===null?null:this.props.username} 
                    avatar={this.state.avatar}/> 
                </Row>
                    {this.state.loading?null: pageContent}
                <Row>
                    <Footer/>
                </Row>
            </Container>
           </> );
}
}

export default withRouter(Home);




{/* <Row>
                            <Col className={classes.ResultsCols}>

                                <LocalCard className={classes.LocalCard} 
                                image={this.state.card.image} 
                                title={this.state.card.title} 
                                description={this.state.card.description}
                                downloadLink={this.state.card.downloadLink}/>
                   
                                <LocalCard className={classes.LocalCard}
                                image={this.state.card.image}
                                title={this.state.card.title} 
                                content={this.state.card.content}
                                downloadLink={this.state.card.downloadLink}/>
                            
                                <LocalCard className={classes.LocalCard}/>
                            </Col>
                            <Col className={classes.ResultsCols}>
                                
                                <LocalCard image={noteImg}/>
                                
                                <LocalCard className={classes.LocalCard} image={noteImg}/>
                                
                                <LocalCard className={classes.LocalCard} image={noteImg}/>
                            </Col>
                            <Col className={classes.ResultsCols}>
                                
                                <LocalCard image={noteImg}/>
                                
                                <LocalCard className={classes.LocalCard} image={noteImg}/>
                               
                                <LocalCard className={classes.LocalCard} image={noteImg}/>
                            </Col>
                        </Row> */}
