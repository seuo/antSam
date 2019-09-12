import React, {Component} from 'react';
import Product from './Product';
import {api, server} from './API';
import {
    Container,
    Row,
    Col,
  } from 'react-bootstrap';

class RouteCat extends Component {
    constructor(props) {
        super(props);
            this.state = {
                category:null
            }
    }



    routeGetCat = (id) => {
        api
        .getCategory(id).then(res => this.setState({category:res.data}))
    }

    componentDidMount(){
        var {id} = this.props
        this.routeGetCat(id)
    }

    componentDidUpdate(prevProps, prevState){
        var {id} = this.props
        
        if (id != prevProps.id){
            this.routeGetCat(id)
        }
    }

    render(){
        var {category} = this.state
        
        return category ? (
            <Container>
                <Row>
                    <Col>
                    <h5>{category.name}</h5>
                    {
                        category.products.map((product) => {
                            var productProps = {
                                ...product,
                                key:product.id,
                                refreshData:() => this.routeGetCat(category.id)
                            };
                            return (
                                <Product {...productProps} />
                            )
                        })
                    }
                    
                    </Col>
                </Row>
            </Container>
        ) : null

    }
}

export default RouteCat;