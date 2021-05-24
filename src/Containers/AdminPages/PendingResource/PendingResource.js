import React,{Component} from 'react';
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/footer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import classes from '../../StudentPages/Home/Home.module.css';
import AdminFilters from '../AdminFilters/AdminFilters';
import AdminResources from '../AdminResources/AdminResources';
import FilterSearch from '../../../Assets/search.svg';

class PendingResource extends Component{
    state = {
        cardsPerPage:[],
        clickedResourceId:null
    };

    handleData = (newData)=>{
       
        let tempArr = [...newData];
        this.setState({cardsPerPage:[...tempArr]});
    }

    updateResourceId = (id)=>{
        this.setState({clickedResourceId:id});
    }


   render(){
      return(
            <Container 
            fluid={+true}
            className={classes.Container}>
                <Row>
                    <Header pageType={"AdminHome"} userType={"Admin"}/> 
                </Row>
                <Row
                className={classes.content}>
                    <img 
                    src={FilterSearch} 
                    alt="workspace"
                    className={classes.filtersImg}/>

                    <AdminFilters
                    handleData={(newData)=>this.handleData(newData)}
                    type={this.props.type}>
                        <AdminResources
                        cardsInfo={this.state.cardsPerPage}
                        updateResourceId={(id)=>this.updateResourceId(id)}/>
                    </AdminFilters>
                </Row>
               
                <Row>
                    <Footer/>
                </Row>
            </Container>);
   }

}

export default PendingResource;
