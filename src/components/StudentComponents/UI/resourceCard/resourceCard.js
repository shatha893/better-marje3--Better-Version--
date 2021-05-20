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
                    {props.description.course} <br/>
                    {props.description.author} <br/>
                    {props.description.creationDate} <br/>
                </Card.Text>
                <div><a 
                href={`http://localhost:1234/Resource/GetResourceFile?resourceId=${props.resourceId}`}
                className={classes.anchor}>Download Me!</a>
                </div>
            </Card.Body>
        </Card>
    );
}

export default localCard;