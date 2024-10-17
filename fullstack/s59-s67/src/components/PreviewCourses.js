import { Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function PreviewCourses(prop) {
    const {breakPoint, data} = prop;
    const {_id, name, description, price} = data;
    return (
        <Col  xs={12} md={breakPoint} >
            <Card className="cardHighlight">
                <Card.Body>
                    <Card.Title className="text-center">
                        <Link to={`/courses/${_id}`}>{name}</Link>
                    </Card.Title>
                    <Card.Text>{description}</Card.Text>
                </Card.Body>
                <Card.Footer>
                    <h5 className="text-center">Php {price}</h5>
                    <Link className="btn btn-primary d-block" to={`/courses/${_id}`}>Details</Link>
                </Card.Footer>
            </Card>
        </Col>
    )
}





