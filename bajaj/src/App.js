import React, { useState } from "react";
import { Button, Form, Container, Row, Col, ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import MultiSelectDropdown from "./MultiSelectDropdown";

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showPreferences, setShowPreferences] = useState(false);

  const handleSubmit = async () => {
    try {
      // Parse the JSON input
      const parsedJson = JSON.parse(jsonInput);
      console.log("Parsed JSON:", parsedJson); // Debugging statement

      // Send POST request to the backend
      const res = await fetch("http://localhost:3001/bfhl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsedJson),
      });

      // Check if the response is okay
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      // Parse and set the response data
      const data = await res.json();
      console.log("Response data:", data); // Debugging statement
      setResponse(data);
      setShowPreferences(true); // Show the dropdown after submitting
    } catch (error) {
      console.error("Error:", error); // Debugging statement
      alert("Invalid JSON input or network error");
    }
  };

  const handleDropdownChange = (e) => {
    const { options } = e.target;
    const selected = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setSelectedOptions(selected);
  };

  const renderResponse = () => {
    if (!response || selectedOptions.length === 0) return null;

    const { numbers, alphabets, highest_alphabet } = response;
    const showNumbers = selectedOptions.includes("Numbers");
    const showAlphabets = selectedOptions.includes("Alphabets");
    const showHighestAlphabet = selectedOptions.includes("Highest Alphabet");

    return (
      <ListGroup className="mt-3">
        {showNumbers && (
          <ListGroup.Item>Numbers: {JSON.stringify(numbers)}</ListGroup.Item>
        )}
        {showAlphabets && (
          <ListGroup.Item>
            Alphabets: {JSON.stringify(alphabets)}
          </ListGroup.Item>
        )}
        {showHighestAlphabet && (
          <ListGroup.Item>
            Highest Alphabet: {JSON.stringify(highest_alphabet)}
          </ListGroup.Item>
        )}
      </ListGroup>
    );
  };

  return (
    <Container className="App">
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <h1>YourRollNumber</h1>
          <Form>
            <Form.Group controlId="jsonInput">
              <Form.Control
                as="textarea"
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder="Enter JSON"
                rows="5"
              />
            </Form.Group>
            <Button variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
          {showPreferences && (
            <Form.Group controlId="responseOptions" className="mt-3">
              <Form.Label>Select Preferences</Form.Label>
              <Form.Control
                as="select"
                multiple
                onChange={handleDropdownChange}
              >
                <option value="Numbers">Numbers</option>
                <option value="Alphabets">Alphabets</option>
                <option value="Highest Alphabet">Highest Alphabet</option>
              </Form.Control>
            </Form.Group>
          )}
          {renderResponse()}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
