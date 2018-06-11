import React from 'react';
import LoaderHOC from '../../HOC/LoaderHOC';

const List = (props) => {
    const elementList = props.data.map((item, i) => {
        return <li key = {i}>{item}</li>
    })

    return <ul> {elementList} </ul>
}

export default LoaderHOC('data')(List);