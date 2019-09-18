import React, {Component} from 'react';
import Products from './Products';
import PurchaseProductListings from './PurchaseProductListings';
import {
    Tabs,
    Tab,
    Sonnet,
    Container,
    Col,
    Image,
    Row
  } from 'react-bootstrap';
class UserProfile extends Component {

    render(){
        return(
            <Container>
                {/* <Row>
                    <Col xs={6} md={4} className="user-photo">
                    <Image src={require("./item1.png")} roundedCircle />
                    </Col>
                </Row> */}
               
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                <Tab eventKey="Products" title="My Listings">
                    {/* <Sonnet /> */}
                    <Products/>
                </Tab>
                <Tab eventKey="Reviews" title="Reviews">
                    {/* <Sonnet /> */}
                </Tab>
                <Tab eventKey="Purchases" title="Purchases" >
                    {/* <Sonnet /> */}
                    <PurchaseProductListings/>
                </Tab>
            </Tabs>
            </Container>
        )
    }
}
export default UserProfile;