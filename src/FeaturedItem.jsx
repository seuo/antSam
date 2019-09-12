
import React, {Component} from 'react';
import RouteProductDetails from './RouteProductDetails';
import {Link, navigate} from '@reach/router';
import {api, server} from './API';
import {Card, Button, ListGroup} from 'react-bootstrap';

import './App.css';

class FeaturedItem extends Component{
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
      

  //   <div className="Item">
  //     <Card
  //         style={{
  //             width: '18rem'
  //         }}>
  //         <Card.Img variant="top" src={server+photo}/>
  //         <Card.Body>
  //              <Card.Title><Link to={'/products/'+id}>{name}</Link><Button variant="outline-dark">
                      
  //                 </Button>
  //             </Card.Title>

  //         </Card.Body>
  //     </Card>
  // </div>
  <div className="Item">
      <Card
          style={{
              width: '18rem'
          }}>
          <Link to={'/products/'+id}><Card.Img variant="featured" src={require('./suit1.png')}/></Link>
          <Card.Body>
               <Card.Title><Link to={'/products/'+id}>{name}</Link><Button variant="outline-dark">
                      
                  </Button>
              </Card.Title>

          </Card.Body>
      </Card>
  </div>

   
    );
  }
}

export default FeaturedItem;
