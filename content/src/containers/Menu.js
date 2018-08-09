import React from 'react';
import { Route, Link } from 'react-router-dom'
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import Test from './Test'

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <React.Fragment>
                <h1>Fight me bro</h1>
                <ListGroup>
                    <Link to='/choose-team'><ListGroupItem header="Pick Pokemon" bsStyle="danger">get a random team</ListGroupItem></Link>
                    <Link to='/create'><ListGroupItem header="Create your own" href="#" name="createPokemon" style={{ "backgroundColor": "#000", "color": "white" }}>upload pokemon to database</ListGroupItem></Link>
                    <Link to='/list'><ListGroupItem header="Edit your team" name="editPokemon">change pokemon you created</ListGroupItem></Link>
                </ListGroup>
                <Test />
            </React.Fragment>
        )
    }
}

export default Menu;