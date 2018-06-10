import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navigation extends Component {

    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {

        return <div>
            <ul>
                <li><Link to="/home">home</Link></li>
                <li><Link to="/public">public</Link></li>
                <li><Link to="/protected">protected</Link></li>    
            </ul>
        </div>
    }
}