import './App.css';
import { useState, useEffect } from 'react'
import { Card, Container, Row, Col } from 'react-bootstrap'

const axios = require('axios')
function App() {

  const [data, setData] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/test')
      .then((data) => {
        console.log("got some data", data)
        setData(data.data)
      })
      .catch((err) => {
        console.error('err in fetching: ', err)
      })
  }, [])

  return (
    <div class='outer'>
      <Container fluid>
        <Row>
          {
            data.map((d) => {
            return (<Col key={d.id}>
              <Card text='light' border='warning' bg='dark' key={d.id} style={{ width: '18rem' }}>
                <Card.Body>
                <Card.Title>
                  {d.test}
                </Card.Title>
                  <Card.Text>
                    {d.data}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>)
          })
          }
        </Row>
      </Container>
    </div>
  );



}

export default App;
