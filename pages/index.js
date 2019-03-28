import 'bootstrap/dist/css/bootstrap.css';
import Layout from '../components/Layout.js'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Index = (props) => (
    
    <Layout>
        <Container>
            <Row className="justify-content-md-center">
                <Col>
                    <h1 className="text-center">Hello, world!</h1>
                </Col>
            </Row>
        </Container>
    </Layout>
)
  
export default Index