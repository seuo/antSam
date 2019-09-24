import React, {Component} from 'react';
import RouteProductDetails from './RouteProductDetails';
import {Link, navigate} from '@reach/router';
import {api, server} from './API';
import {Card, Button,Col, ListGroup} from 'react-bootstrap';

class Item extends Component{
  constructor(props){
    super(props);
      this.state = {
        purchaser_id:null,
        product:null,
    }
  }
  
  routeGetProduct = (id) => {
    api.getProduct(id).then(res => this.setState({product:res.data}))
  }

  deleteProduct = () => {
    var {id, refreshData} = this.props;
    api.deleteProduct(id).then(() => refreshData())
  }

  componentDidMount(){
    var {purchaser_id} = this.props;
    this.setState({purchaser_id:purchaser_id})
    var {id} = this.props
    //console.log(id);
    this.routeGetProduct(id)
  }

  addDefaultSrc(ev){
    ev.target.src = '/coming-soon.png'
  }


  render(){
    var {name, photos, id, price} = this.props;

    return(
      
      this.state.purchaser_id ? null : (
        <Col>
          <Card>
          <Link to={'/products/'+id}>
          <Card.Text className="itemPrice">${price}</Card.Text>
            <Card.Img variant="top" src={server+photos} onError={this.addDefaultSrc}/> 
              <Card.Body>
              <Card.Title><Link to={'/products/'+id}>{name}</Link>
              </Card.Title>
              
              </Card.Body></Link>
          </Card>
        </Col>)
    );
  }
}

export default Item;
