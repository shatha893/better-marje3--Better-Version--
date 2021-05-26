import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AdminResourcesCard from '../AdminResourceCard/AdminResourceCard';
import classes from './AdminResources.module.css';

const adminResources = (props)=>{
    //cardsInfo = [{title:"...", description:"...", file:"..."},{...}]
    let cardsInfoCol1 = [];
    let cardsInfoCol2 = [];
    let cardsInfoCol3 = [];


    for(let i=0; i<props.cardsInfo.length; i++ ){

        if(cardsInfoCol1.length < 3)
        {
            cardsInfoCol1.push(props.cardsInfo[i]);
        }
        else if(cardsInfoCol2.length<3)
        {
            cardsInfoCol2.push(props.cardsInfo[i]);
        }
        else
        {
            cardsInfoCol3.push(props.cardsInfo[i]);
        }
    }
        console.log("AdminResources ----->  ",cardsInfoCol3 );
    return(
        <>
        <Row>
            {cardsInfoCol1.map( (cardInfo,index) =>(
                <AdminResourcesCard 
                key={index}
                className={classes.LocalCard} 
                title={cardInfo.name} 
                description={cardInfo.description}
                resourceId={cardInfo.id}/> ))   }
        </Row>

        <Row>   
            {cardsInfoCol2.map( (cardInfo,index) =>(
                    <AdminResourcesCard 
                    key={index}
                    className={classes.LocalCard} 
                    title={cardInfo.name} 
                    description={cardInfo.description}
                    downloadLink={cardInfo.file}
                    resourceId={cardInfo.id}/> ))   }
        </Row>
        <Row>
            {cardsInfoCol3.map( (cardInfo,index) =>(
                <AdminResourcesCard 
                key={index}
                className={classes.LocalCard} 
                title={cardInfo.name} 
                description={cardInfo.description}
                downloadLink={cardInfo.file}
                pageType={props.pageType}
                resourceId={cardInfo.id}/> ))   }
        </Row>
        </>);
}

export default adminResources;
