import React,{Component} from 'react';
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/footer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import classes from './Home.module.css';
import FilterSearch from '../../../Assets/search.svg';
import Accordion from '../../../components/StudentComponents/homeAcc/homeAcc';
import noteImg from '../../../Assets/notes_slideshow.jpg';
import Pagination from 'react-bootstrap/Pagination';
import Axios from 'axios';
import ResourcesPage from '../../../components/StudentComponents/homeResources/resources';
import Spinner from '../../../components/StudentComponents/UI/spinner/spinner';

class Home extends Component{


    state={
        cards:[],
            // title:"",   //should be like this "",
            // description:"", //should be like this "",
            // file:"", //should be like this "",
        courses:[],
        userName:null,
        firstMount:false,
        avatar:null,
        toggleDrawer:false,
        loading:false
    }

    componentDidMount(){

        this.mounted = true;
        this.setState({loading:true});
        Axios.all([
            Axios.get("http://localhost:3000/courses"),
            Axios.get("http://localhost:3000/users?uniEmail="+this.props.userEmail)])
        .then(
            
            responseArr=>{
                
                if(this.mounted)
                {
                    let tempArr = [];
                    for(let i in responseArr[0].data)
                    {
                        tempArr.push({
                            id:responseArr[0].data[0].id,
                            name:responseArr[0].data[0].name,
                            checked:false
                        });
                    }

                    this.setState({courses:[...tempArr],
                    userName:responseArr[1].data[0].username,
                    avatar:responseArr[1].data[0].profilePic,
                    loading:false});
                }
            }
            )
        .catch(error=>{
        console.log("Error :( = "+error);
        })

    }

    render()
    {
        const pageContent = <>
                                {/* The filter search column */}
                                <Col md={3} >
                                    <div className={classes.FiltersDiv}>
                                        <img src={FilterSearch} alt="workspace" fluid={+true}/> 
                                        <p>Filter Results by</p>
                                        <Accordion courses={this.state.courses} />
                                    </div>               
                                </Col>

                                {/* The Results column */}
                                <Col md={9}>
                                    <Row>
                                        <p className={classes.PageTitle}> Notes and Pastpapers </p>
                                    </Row>
                                    <ResourcesPage cardsInfo={this.state.cards}/>
                                </Col>
                            </>;


        return(
            <Container fluid={+true} className={classes.Container}>
                <Row>
                    <Header pageType={"Home"} userName={this.state.userName} avatar={this.state.avatar}/> 
                </Row>
                <Row className={classes.content}>
                    {this.state.loading?<Spinner loading={this.state.loading}/>: pageContent}
                </Row>
               
                <Row>
                    <Footer/>
                </Row>
            </Container>
            );
}
}

export default Home;




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
