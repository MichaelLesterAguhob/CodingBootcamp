import { Card, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { useState } from "react";

export default function NewsCard({ newsProp }) {
  const { name, description } = newsProp;

  const [count, setCount] = useState(0);
  

function likeNews() {
    if(count === 10) {
        alert("Promo Alert: Since this news has reached a certain number of likes, we would like to offer a discount on your next class.");
    } else {
        setCount(count + 1);
    }
}

  return (
    <Card className="text-center">
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Subtitle>Likes</Card.Subtitle>
        <Card.Text>{count}</Card.Text>
        <Button variant="primary" onClick={likeNews}>
          Like
        </Button>
      </Card.Body>
    </Card>
  );
}

NewsCard.propTypes = {
  newsProp: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
};