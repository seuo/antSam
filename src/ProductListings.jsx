import React, {Component} from 'react';
import Item from './Item';
import RouteCat from './RouteCategory'
import {Router, Link, navigate} from '@reach/router';
import {api} from './API';
import Carousel from 'react-multi-carousel';
import {Col, Card, Button, Image, Row, Jumbotron, Container} from 'react-bootstrap';

import './App.css';

const responsive = {
    desktop: {
        breakpoint: {
            max: 3000,
            min: 1024
        },
        items: 5,
        partialVisibilityGutter: 40 // this is needed to tell the amount of px that should be visible.
    },
    tablet: {
        breakpoint: {
            max: 1024,
            min: 464
        },
        items: 2,
        partialVisibilityGutter: 30 // this is needed to tell the amount of px that should be visible.
    },
    mobile: {
        breakpoint: {
            max: 464,
            min: 0
        },
        items: 1,
        partialVisibilityGutter: 100 // this is needed to tell the amount of px that should be visible.
    }
}

class ProductListings extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: [],
            products: []
        }
    }

    getProducts = () => {
        api.getProducts().then(res => {
          this.setState({products: res.data})
        })
      }

    componentDidMount() {
        this.getProducts()
    }

    render() {
        var {products} = this.state;
        return (

        <div className="Item carousel-container">
                <h3>Featured</h3>
                <Carousel swipeable={true} draggable={true} showDots={true} responsive={responsive} ssr={true}
                    // means to render carousel on server-side.
                    infinite={true} autoPlay={this.props.deviceType !== "mobile"
                        ? false
                        : false} autoPlaySpeed={1000} keyBoardControl={true} customTransition="ease all .5s" transitionDuration={500} containerClass="carousel-container" removeArrowOnDeviceType={["tablet", "mobile"]} deviceType={this.props.deviceType} dotListClass="custom-dot-list-style" itemClass="CarousalItem carousel-item-padding-40-px" partialVisbile={true}>
                <div className="Item">
                    <Card>
                        <Card.Img variant="featured" src={require('./suit1.png')}/>
                        <Card.Body>
                            <Card.Title>Dries Van Noten Pin Stripe<Button variant="outline-dark">
                                </Button>
                            </Card.Title>

                        </Card.Body>
                    </Card>
                </div>
                <div className="Item">
                    <Card>
                        <Card.Img variant="featured" src={require('./watch1.png')}/>
                        <Card.Body>
                            <Card.Title>Lorem ipsum dolor<Button variant="outline-dark">
                                </Button>
                            </Card.Title>

                        </Card.Body>
                    </Card>
                </div>
                <div className="Item">
                    <Card>
                        <Card.Img variant="featured" src={require('./suit2.png')}/>
                        <Card.Body>
                            <Card.Title>Ut ut gravida augue<Button variant="outline-dark">
                                </Button>
                            </Card.Title>

                        </Card.Body>
                    </Card>
                </div>
                <div className="Item">
                    <Card>
                        <Card.Img variant="featured" src={require('./footwear1.png')}/>
                        <Card.Body>
                            <Card.Title>Curabitur vitae<Button variant="outline-dark">
                                </Button>
                            </Card.Title>

                        </Card.Body>
                    </Card>
                </div>
                <div className="Item">
                    <Card>
                        <Card.Img variant="featured" src={require('./suit3.png')}/>
                        <Card.Body>
                            <Card.Title>Suspendisse massa<Button variant="outline-dark">
                                </Button>
                            </Card.Title>

                        </Card.Body>
                    </Card>
                </div>
                <div className="Item">
                    <Card>
                        <Card.Img variant="featured" src={require('./watch2.png')}/>
                        <Card.Body>
                            <Card.Title>Sed vel consequat ligula<Button variant="outline-dark">
                                </Button>
                            </Card.Title>

                        </Card.Body>
                    </Card>
                </div>
                <div className="Item">
                    <Card>
                        <Card.Img variant="featured" src={require('./footwear2.png')}/>
                        <Card.Body>
                            <Card.Title>Aliquam egestas<Button variant="outline-dark">
                                </Button>
                            </Card.Title>

                        </Card.Body>
                    </Card>
                </div>
                <div className="Item">
                    <Card>
                        <Card.Img variant="featured" src={require('./suit4.png')}/>
                        <Card.Body>
                            <Card.Title>Praesent quis est<Button variant="outline-dark">
                                </Button>
                            </Card.Title>

                        </Card.Body>
                    </Card>
                </div>
                <div className="Item">
                    <Card>
                        <Card.Img variant="featured" src={require('./footwear3.png')}/>
                        <Card.Body>
                            <Card.Title>Interdum et malesuada<Button variant="outline-dark">
                                </Button>
                            </Card.Title>

                        </Card.Body>
                    </Card>
                </div>
                <div className="Item">
                    <Card>
                        <Card.Img variant="featured" src={require('./watch3.png')}/>
                        <Card.Body>
                            <Card.Title>Sed ligula risus<Button variant="outline-dark">
                                </Button>
                            </Card.Title>

                        </Card.Body>
                    </Card>
                </div>


                </Carousel>
                <Container>
                    <Row className="productsListing">
                    {
                        products.map((item) => {
                            var itemProps = {
                                ...item,
                                key: item.id,
                                refreshData: this.getProducts
                            }
                            return <Item {...itemProps}/>

                        })
                    }
                </Row>
                </Container>
                <Container className="imageGrid">
                    <Row>
                            <Jumbotron fluid="fluid">
                                <Container>
                                    <h1>Our Store</h1>
                                    <p>
                                        We stock a huge range of new & second trade in's. We check the listing matches the product for quality assurance.
                                    </p>
                                </Container>
                            </Jumbotron>

                    </Row>
                    <Row>
                        <Col><Image src="/accessories.jpg" fluid="fluid"/></Col>
                        <Col><Image src="/suits.jpg" fluid="fluid"/><Image src="/footwear.jpg" fluid="fluid"/></Col>
                    </Row>
                </Container>
            </div>

        );
    }

}

export default ProductListings;
