import React, {Component} from "react";
import './App.css'
import Navbar from './Navbar.js'
import Web3 from "web3";
import Tether from '../truffle_abis/Tether.json' 

class App extends Component {

    async UNSAFE_componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
    }

    async loadWeb3() {
        if(window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        } else if (window.web3){
            window.web3 = new Web3(window.web3.currentProvider)
        } else {
            alert('No Ethereum browser detected, Checkout MetaMask')
        }
    }

    async loadBlockchainData() {
        const web3 = window.web3
        const account = await web3.eth.getAccounts()
        this.setState({account: account[0]})
        console.log(account)
        const networkId = await web3.eth.net.getId()
        console.log(networkId, 'Network Id')

        //Load Tether Contract 
        const tetherData = Tether.networks[networkId]
        if(tetherData) {
            const tether = web3.eth.Contract(Tether.abi, tetherData.address)
            this.setState({tether})
            let tetherBalance = tether.methods.balanceOf(this.state.account).call()
            this.setState({tetherBalance: tetherBalance.toString()})
        } else {
            window.alert('Tether Contract is not detected')
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            account: '0x0',
            tether: {},
            reward: {},
            dbank: {},
            tetherBalance: '0',
            rewardBalance: '0',
            stakingBalance: '0',
            loading: true
        }
    }
    // React code goes here 
    render () {
        return (
            <div>
                <Navbar account={this.state.account}/>
                <div className='text-center'>
                    <h1>Hello World</h1>
                 </div>
            </div>
        )
    }
}

export default App;