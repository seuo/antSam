import React, {Component} from 'react';
import {
    Form,
    FormControl,
    Button
} from 'react-bootstrap';

function SearchBox(props) {
    return (
            <>
                <Form inline>
                    <FormControl onChange={props.handleInput} type="text" type="text" placeholder="Search" className="mr-sm-2" />
                </Form>
            </>
    )
}

export default SearchBox;