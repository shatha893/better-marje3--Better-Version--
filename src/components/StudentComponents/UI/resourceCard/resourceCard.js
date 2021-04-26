import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import classes from './resourceCard.module.css';

const localCard = (props) =>{
    return(
        <Card 
        className={classes.content}>
            <Card.Img variant="top" src={props.image} />
            <Card.Body className={classes.card}>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>
                {props.description}
                </Card.Text>
                {/* a link that will download the pdf file when clicking it!! */}
                <a 
                className={classes.anchor}
                href={props.file} 
                download>Download Me!</a>
            </Card.Body>
        </Card>
    );
}

export default localCard;