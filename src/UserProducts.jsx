import React, {Component} from 'react';
import Product from './Product';
import RouteProductDetails from './RouteProductDetails';
import {Router, Link, navigate} from '@reach/router';
import {api} from './API';
import {
  Card,
  Button,
} from 'react-bootstrap';


class UserProducts extends Component{
  constructor(props){
    super(props)
    this.state = {
      products: [],
      item: null,
    }
  }

  getProducts = () => {
    var {user} = this.props
    api.getUser(user.id).then(res => {
      this.setState({products:res.data.products})

    //   for(var i=0;i<res.data.products.length;i++){
    //     if(res.data.products[i].purchaser_id == null){
    //         this.state.products.push(i)
    //     }
    // }
    })
  }

  componentDidMount(){
    this.getProducts()
  }
  

  

  render(){
    var {products} = this.state;
    
    return(
       this.state.item ? null : (
        <>
      <div className="listings">
        <h1>My Products</h1>
          <div className="listProduct"><Link to="/products/new"><Button className="AddButton" variant="primary" type="submit">List a product</Button></Link></div>
        {
          products.map((item) => {
            var props = {
              ...item,
              key: item.id,
              refreshData: this.getProducts,
            }
            return <Product {...props}/>
            
          })
        }
        
      </div>
      </>)
    );
  }


}

export default UserProducts;
