import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const localCard = (props) =>{
    return(
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={props.image} />
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>
                {props.description}
                </Card.Text>
                {/* a link that will download the pdf file when clicking it!! */}
                <a href={props.file} download>Download Me!</a>
            </Card.Body>
        </Card>
    );
}

export default localCard;