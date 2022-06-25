import React, {Component} from "react";
import './App.css'
import Navbar from './Navbar.js'
import Web3 from "web3"; 

class App extends Component {

    async UNSAFE_componentWillMount() {
        await this.loadweb3()
    }

    async Web3() {
        if(window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        } else if (window.web3){
            window.web3 = new Web3(window.web3.currentProvider)
        } else {
            alert('No Ethereum browser detected, Checkout MetaMask')
        }
    }
    constructor(props) {
        super(props)
        this.state = {
            account: '0x0'
        }
    }
    // React code goes here 
    render () {
        return (
            <div>
                <Navbar account={this.state.account}/>
                <div className='text-center'>
                    <h>Hello World</h>
                 </div>
            </div>
        )
    }
}

export default App;