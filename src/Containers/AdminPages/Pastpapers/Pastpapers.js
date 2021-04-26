import React,{Component} from 'react';
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/footer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import NotesCard from '../../../components/homeResources/resources';
import classes from './Pastpapers.module.css';
import Filters from '../../../components/StudentComponents/UI/Filters/Filters';

class Pastpapers extends Component{
    // title:"",   //should be like this "",
            // description:"", //should be like this "",
            // file:"", //should be like this "",
    state = {
        pastpapersInfo:[
            {
                title:"Calculus II Pastpaper",
                //the "description" is supposed to be the "description"
                description:"Thomas Wodsworth",
                file:""
        },
        {
            title:"Databases Pastpaper",
            description:"Audrey Patterson",
            file:""
    },
    {
        title:"English Pastpaper",
        description:"Liam Neeson",
        file:""
    },
    {
        title:"Calculus II Pastpaper",
        description:"Thomas Wodsworth",
        file:""
},
{
    title:"Databases Pastpaper",
    description:"Audrey Patterson",
    file:""
},
{
title:"English Pastpaper",
description:"Liam Neeson",
file:""
},
{
    title:"Calculus II Pastpaper",
    description:"Thomas Wodsworth",
    file:""
},
{
title:"Databases Pastpaper",
description:"Audrey Patterson",
file:""
},
{
title:"English Pastpaper",
description:"Liam Neeson",
file:""
}   
        ]
    };

   render(){
      return(
            <Container 
            fluid={+true}>
                <Row>
                   {/* USER TYPE IS TEMPORARY UNTIL WE DO PROPER AUTHENTICATION */}
                    <Header pageType={"AdminHome"} userType={"Admin"}/> 
                </Row>
                <Row
                className={classes.content}>
                    <Filters>
                        <NotesCard 
                        cardsInfo={this.state.pastpapersInfo}
                        className={classes.card}/>
                    </Filters>
                </Row>
               
                <Row>
                    <Footer/>
                </Row>
            </Container>);
   }

}

export default Pastpapers;
