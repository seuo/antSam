import React, {Component} from 'react';
import Item from './Item';
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
            <Container className="categoryContainer">
                <Row className="productsListing">
                    
                    {
                        category.products.map((item) => {
                            var itemProps = {
                                ...item,
                                key:item.id,
                                refreshData:() => this.routeGetCat(category.id)
                            };
                            return (
                                <Item {...itemProps} />
                            )
                        })
                    }
                    
                    
                </Row>
            </Container>
        ) : null

    }
}

export default RouteCat;