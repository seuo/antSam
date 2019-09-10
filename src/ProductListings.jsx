import React, {Component} from 'react';
import Item from './Item';
import RouteProductDetails from './RouteProductDetails';
import {Router, Link, navigate} from '@reach/router';
import {api} from './API';
import Carousel from 'react-multi-carousel';
import {Col, Image, Row, Jumbotron, Container} from 'react-bootstrap';

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
        partialVisibilityGutter: 70 // this is needed to tell the amount of px that should be visible.
    }
}

class ProductListings extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: []
        }
    }

    getProducts = () => {
        api
            .getProducts()
            .then(res => {
                this.setState({products: res.data})
            })
    }

    componentDidMount() {
        this.getProducts()
    }

    render() {
        var {
            products
        } = this.state;
        return (

            <div className="Item carousel-container">
                <h3>Featured</h3>
                <Carousel swipeable={true} draggable={true} showDots={true} responsive={responsive} ssr={true}
                    // means to render carousel on server-side.
                    infinite={true} autoPlay={this.props.deviceType !== "mobile"
                        ? false
                        : false} autoPlaySpeed={1000} keyBoardControl={true} customTransition="ease all 1s" transitionDuration={500} containerClass="carousel-container" removeArrowOnDeviceType={["tablet", "mobile"]} deviceType={this.props.deviceType} dotListClass="custom-dot-list-style" itemClass="CarousalItem carousel-item-padding-40-px" partialVisbile={true}>
                    {
                        products.map((item) => {
                            var props = {
                                ...item,
                                key: item.id,
                                refreshData: this.getProducts
                            }
                            return <Item {...props}/>

                        })
                    }

                </Carousel>
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
