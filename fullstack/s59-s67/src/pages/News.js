import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import newsData from "../data/newsData";
import NewsCard from "../components/NewsCard";

export default function News() {
  const news = newsData.map(news => (
    <NewsCard key={news.id} newsProp={news} />
  ));

  return (
    <>
      <h1>News</h1>
      {news}
    </>
  );
}

function FeedbackForm() {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isActive, setisActive] = useState(false);

  useEffect(() => {
    if (!email || !feedback) {
      setisActive(false);
    } else {
      setisActive(true);
    }
  }, [email, feedback]);

  // Function to handle form submission
  const sendFeedback = (e) => {
    e.preventDefault();

    alert("Thank you for your feedback. We'll get back to you as soon as we can.");

    setEmail('');
    setFeedback('');
  };

  return (
    <Form onSubmit={sendFeedback}>
      <h1 className='my-5 text-center'>Feedback</h1>

      <Form.Group>
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Feedback:</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Enter your feedback"
          required
          rows={5}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
      </Form.Group>

      <Button variant={isActive ? 'primary' : 'danger'} type='submit' id='submitBtn' disabled={!isActive}>
        Send Feedback
      </Button>
    </Form>
  );
}

// export { FeedbackForm, News };
