import 'bootstrap/dist/css/bootstrap.css';
import Layout from '../components/Layout.js'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'

const Index = (props) => (
    
    <Layout>
        <Container>
            <Row className="justify-content-md-center">
                <Col>
                    <h1 className="text-center">Hello, world!</h1>
                </Col>
            </Row>
            <Jumbotron>
            <h1>Hello, world!</h1>
            <p>
            This is a simple hero unit, a simple jumbotron-style component for calling
            extra attention to featured content or information.
            </p>
            <p>
            <Button variant="primary">Learn more</Button>
            </p>
            </Jumbotron>
        </Container>
    </Layout>
)
  
export default Index