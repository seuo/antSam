import React, {Component} from 'react';
import Item from './Item';

function SearchResults(props){
    let results = props.searchedItems.map((item, i)=> {
        return <Item key={i} name={item.name}/>

    })
    return (
        <>
         {results}
        </>
    )
}

export default SearchResults;