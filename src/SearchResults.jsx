import React, {Component} from 'react';
import Item from './Item';

import {
    Container
} from 'react-bootstrap';

function SearchResults(props){
    let results = props.searchedItems.map((item, i)=> {
        return <Item key={item.id} name={item.name} price={item.price} purchaser_id={item.purchaser_id}/>

    })
    return (
        <>
         {results}
        </>
    )
}

export default SearchResults;