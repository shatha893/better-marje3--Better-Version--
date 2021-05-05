import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LocalCard from '../StudentComponents/UI/resourceCard/resourceCard';
import classes from './resources.module.css';

const resourcesPage = (props)=>{
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

    return(
        <>
        <Row>
            {cardsInfoCol1.map( cardInfo =>(
                <LocalCard 
                key={cardInfo.name}
                className={classes.LocalCard} 
                title={cardInfo.name} 
                description={cardInfo.description}
                downloadLink={cardInfo.file}/> ))   }
        </Row>

        <Row>   
            {cardsInfoCol2.map( cardInfo =>(
                    <LocalCard 
                    key={cardInfo.name}
                    className={classes.LocalCard} 
                    title={cardInfo.name} 
                    description={cardInfo.description}
                    downloadLink={cardInfo.file}/> ))   }
        </Row>
        <Row>
            {cardsInfoCol3.map( cardInfo =>(
                <LocalCard 
                key={cardInfo.name}
                className={classes.LocalCard} 
                title={cardInfo.name} 
                description={cardInfo.description}
                downloadLink={cardInfo.file}
                pageType={props.pageType}/> ))   }
        </Row>
        </>);
}

export default resourcesPage;
