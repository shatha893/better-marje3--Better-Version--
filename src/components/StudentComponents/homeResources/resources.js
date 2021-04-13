import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LocalCard from '../UI/resourceCard/resourceCard';
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
        <Row>
            <Col 
            className={classes.ResultsCols}>
                {cardsInfoCol1.map( cardInfo =>(
                    <LocalCard 
                    key={cardInfo.title}
                    className={classes.LocalCard} 
                    title={cardInfo.title} 
                    description={cardInfo.description}
                    downloadLink={cardInfo.file}/> ))   }
            </Col>

            <Col 
            className={classes.ResultsCols}>
            {cardsInfoCol2.map( cardInfo =>(
                    <LocalCard 
                    className={classes.LocalCard} 
                    title={cardInfo.title} 
                    description={cardInfo.description}
                    downloadLink={cardInfo.file}/> ))   }
            </Col>

            <Col 
            className={ classes.ResultsCols }>
                {cardsInfoCol3.map( cardInfo =>(
                    <LocalCard 
                    className={classes.LocalCard} 
                    title={cardInfo.title} 
                    description={cardInfo.description}
                    downloadLink={cardInfo.file}/> ))   }
            </Col>
        </Row>);
}

export default resourcesPage;
