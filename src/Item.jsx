import React, {Component} from 'react';
import RouteProductDetails from './RouteProductDetails';
import {Link, navigate} from '@reach/router';
import {api, server} from './API';
import {Card, Button,Col, ListGroup} from 'react-bootstrap';

import './App.css';

class Item extends Component{
  constructor(props){
    super(props);
      this.state = {
        purchaser_id:null,
    }
  }
  // routeGetProduct = (id) => {
  //   api.getProduct(id).then(res => this.setState({product:res.data}))
  // }
  deleteProduct = () => {
    var {id, refreshData} = this.props;
    api.deleteProduct(id).then(() => refreshData())
  }

  componentDidMount(){
    var {purchaser_id} = this.props;
    this.setState({purchaser_id:purchaser_id})
  }


  render(){
    var {name, description, price, photo, id} = this.props;

    // var {purchaser_id} = this.props;
    // console.log(purchaser_id);

    return(
      

      this.state.purchaser_id ? null : (
      <Col>
        <Card>
        <Link to={'/products/'+id}><Card.Img variant="top" src={server+photo}/></Link>
            <Card.Body>
                <Card.Title><Link to={'/products/'+id}>{name}</Link>
                </Card.Title>

            </Card.Body>
        </Card>
      </Col>)

  // <div className="Item">
  //     <Card
  //         style={{
  //             width: '18rem'
  //         }}>
  //         <Card.Img variant="top" src={require('./item1.png')}/>
  //         <Card.Body>
  //              <Card.Title><Link to={'/products/'+id}>{name}</Link><Button variant="outline-dark">
                      
  //                 </Button>
  //             </Card.Title>

  //         </Card.Body>
  //     </Card>
  // </div>

   
    );
  }
}

export default Item;
