import React, {Component} from 'react';

function SearchBox(props) {
    return (
            <>
                <input onChange={props.handleInput} type="text"/>
            </>
    )
}

export default SearchBox;