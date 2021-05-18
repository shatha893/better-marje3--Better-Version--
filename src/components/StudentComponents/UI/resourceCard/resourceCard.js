import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import classes from './resourceCard.module.css';

const localCard = (props) =>{

    let test = () =>{
        console.log("test test test",props.resourceId);
        
    }

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
                <a 
                href={`http://localhost:1234/Resource/GetResourceFile?resourceId=${props.resourceId}`}
                className={classes.anchor}>Download Me!</a>
            </Card.Body>
        </Card>
    );
}

export default localCard;