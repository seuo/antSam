import React, {Component} from 'react';
import RouteProductDetails from './RouteProductDetails';
import {Link, navigate} from '@reach/router';
import {api, server} from './API';
import {Card, Button, ListGroup} from 'react-bootstrap';

import './App.css';

class Item extends Component{
  constructor(props){
    super(props);
  }
  // routeGetProduct = (id) => {
  //   api.getProduct(id).then(res => this.setState({product:res.data}))
  // }
  deleteProduct = () => {
    var {id, refreshData} = this.props;
    api.deleteProduct(id).then(() => refreshData())
  }


  render(){
    var {name, description, price, photo, id} = this.props;

    return(
      

      <div className="Item">
      <Card
          style={{
              width: '18rem'
          }}>
          <Card.Img variant="top" src={photo}/>
          <Card.Body>
               <Card.Title><Link to={'/products/'+id}>{name}</Link><Button variant="outline-dark">
                      <i className="far fa-heart"></i>
                  </Button>
              </Card.Title>
              <Card.Text><span className="itemDescription">{description}</span></Card.Text>
              <Button className="AddButton" variant="primary">Add to Cart
                  <span className="itemPrice">${price}</span>
              </Button>
          </Card.Body>
      </Card>
  </div>

   
    );
  }
}

export default Item;
