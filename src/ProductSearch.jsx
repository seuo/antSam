import React, {Component} from 'react';
import {api} from './API';
import SearchResults from './SearchResults';
import SearchBox from './SearchBox';

import {
    Col,
    Row,
    Container
} from 'react-bootstrap';



class ProductSearch extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: [],
        searchTerm: ''
      };

    }


    getProducts = () => {
        api.getProducts().then(res => {
                this.setState({data:res.data})
            })
    }

    componentDidMount() {
        this.getProducts()
    }


      handleInput = (e) => {
          console.log(e.target.value);
        this.setState({searchTerm: e.target.value})
      };

      render() {
        let searchResults = this.state.data.filter((item) => {
            return item.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
        })
        return (

            <Container className="searchList">
                <Row className="searchBox">
                <SearchBox handleInput={this.handleInput}/>
                </Row>
                <Row className="searchResults">
                <SearchResults searchedItems={searchResults}/>
                </Row>
            </Container>
            
        );
      }
    }

    export default ProductSearch;