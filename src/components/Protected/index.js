import React, { Component } from 'react';
import List from './List';

export default class ProtectedComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({data: [1,2,3,4,5,6,7]})
        }, 1000);
    }

    render() {
        return <List data={this.state.data} />
    }

}