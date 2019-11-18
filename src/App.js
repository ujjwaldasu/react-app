import React, { Component } from 'react'
import NavBar from './NavBar';
import { SaleTransaction } from './TransactionForm'


export default class App extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <SaleTransaction />
            </div>
        )
    }
}