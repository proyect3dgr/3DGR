import React, { Component } from 'react'
import '../../SASS/Main.scss'


export default class Search extends Component {
    render() {
        return (
            <React.Fragment>
                <input type="search" name="search" placeholder="Search"></input>
            </React.Fragment>
        )
    }
}
