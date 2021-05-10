import React,{Component} from 'react';
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/footer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import classes from './Home.module.css';
import FilterSearch from '../../../Assets/search.svg';
import ResourcesPage from '../../../components/homeResources/resources';
import Spinner from '../../../components/StudentComponents/UI/spinner/spinner';
import Filters from '../../../components/StudentComponents/UI/Filters/Filters';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

class Home extends Component{
    state={
        cardsPerPage:[],
        avatar:null,
        loading:false
    }


    handleData = (newData)=>{
        console.log("newData = ",newData);
        let tempArr = [...newData];
        this.setState({cardsPerPage:[...tempArr]});
    }

    handleResourceSubmit = () =>{
        this.props.history.push('/SubmitResource');
    }

    render()
    {
        console.log("cardsPerPage = ",this.state.cardsPerPage);
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
                                    handleData={(newData)=>this.handleData(newData)}>
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
                    // userName={this.props.username===null?null:this.props.username} 
                    avatar={this.state.avatar}/> 
                </Row>
                    {pageContent}
                <Row>
                    <Footer/>
                </Row>
            </Container>
           </> );
}
}

export default withRouter(Home);