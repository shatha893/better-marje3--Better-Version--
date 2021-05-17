import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import classes from './resourceCard.module.css';

const localCard = (props) =>{

    let test = () =>{
        props.getResourceFile(props.resouceId)
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
                {/* a link that will download the pdf file when clicking it!! */}
                <a 
                className={classes.anchor}
                href={props.file} 
                onClick={test}
                download>Download Me!</a>
            </Card.Body>
        </Card>
    );
}

export default localCard;