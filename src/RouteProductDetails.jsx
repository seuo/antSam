import React, {Component} from 'react';
import {Link, navigate} from '@reach/router';
import {
    Form,
    Button,
    ToggleButtonGroup,
    ToggleButton,
    Card,
    Row,
    Container,
    Col
} from 'react-bootstrap';
import {api, server} from './API';
import Modal from 'react-awesome-modal';
import Login from './Login';

import './App.css';

class RouteProductDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: {},
            mLogin: false,
            mCreditCard: false,
            product:{},
        }
    }

    openLoginModal = () => {
        this.setState({mLogin: true});
    }

    closeLoginModal = () => {
        this.setState({mLogin: false});
    }

    openCreditModal = () => {
        this.setState({mCreditCard: true});
    }

    closeCreditModal = () => {
        this.setState({mCreditCard: false});
    }

    routeGetProduct = (id) => {
        api.getProduct(id).then(res => this.setState({product:res.data}))
    }
    
    componentDidMount(){
        var {id} = this.props;
        //console.log(id);
        this.routeGetProduct(id);
    }

    handlePurchase = (e) => {
        e.preventDefault();
        var user = this.state.user;
        var data = {
            purchaser_id: user
        }
        var {
            id
        } = this.props;
        api
            .updateProducts(id, data)
            .then(res => navigate("/thanks"))
    }

    render() {
        var {name,description,price,photo} = this.state.product
        var user = this.state.currentUser;


        return ( 
            <>
            <div className="Item">
                <Card>
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>
                        <Card.Img variant="top" src={server + photo}/>
                        <Card.Text>{description}</Card.Text>
                        <Card.Text className="productPrice">${price}
                            {
                                user ? ( <Form className="purchaseForm" onSubmit={() => this.openCreditModal()} ref={(el) => {this.form = el}} >
                                        < Button onClick = {() => this.openCreditModal()}className = "purchaseButton" name = "purchase" variant = "outline-dark" > Purchase</Button></Form>
                                ) : <Button onClick={() => this.openLoginModal()} className="purchaseButton" name="purchase" variant="outline-dark">Purchase</Button>
                            }
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
            <Modal className="modalStyle" visible = {this.state.mLogin}width = "95%" height = "80%" effect = "fadeInUp" onClickAway = {() => this.closeLoginModal()}> 
            <div className="loginModal">
                    <span>
                        <h6>Login / Register to Buy & Sell</h6>
                        <a href="javascript:void(0);" onClick={() => this.closeLoginModal()}>
                            <i className="far fa-window-close"></i>
                        </a>
                    </span>
                    <Login
                        closeModal={this.closeLoginModal}
                        updateCurrentUser={this.updateCurrentUser}/>

                </div>
            </Modal>
            <Modal
                className="modalStyle"
                visible={this.state.mCreditCard}
                width="95%"
                height="80%"
                effect="fadeInUp"
                onClickAway={() => this.closeCreditModal()}>
                <Container className="creditCard">
                    <Row className="modalText">
                        <h6>Delivery & Payment Information</h6>
                        <a href="javascript:void(0);" onClick={() => this.closeCreditModal()}>
                            <i className="far fa-window-close"></i>
                        </a>
                    </Row>
                    <Form
                        className="purchaseForm"
                        onSubmit={this.handlePurchase}
                        ref={(el) => {
                            this.form = el
                        }}>
                        <Form.Row>
                            <Col>
                                <Form.Control placeholder="First name"/>
                            </Col>
                            <Col>
                                <Form.Control placeholder="Last name"/>
                            </Col>
                        </Form.Row>

                        <Form.Group controlId="formGridAddress1">
                            <Form.Row>
                                <Col>
                                    <Form.Label></Form.Label>
                                    <Form.Control placeholder="Street Address"/>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                    <Form.Label></Form.Label>
                                    <Form.Control placeholder="Address 2"/>
                                </Col>
                                <Col>
                                    <Form.Label></Form.Label>
                                    <Form.Control placeholder="Ph Number"/>
                                </Col>
                            </Form.Row>
                        </Form.Group>

                        <Form.Group controlId="formGridAddress2">
                            <Form.Row>
                              <Col>
                                <Form.Control placeholder="City"/>
                                 </Col>
                            </Form.Row>
                        </Form.Group>
                        <Button
                            type="submit"
                            className="purchaseButton"
                            name="purchase"
                            variant="outline-dark">Purchase</Button>
                    </Form>
                </Container>
            </Modal>
            </>
     )
    }
  }

export default RouteProductDetails;
