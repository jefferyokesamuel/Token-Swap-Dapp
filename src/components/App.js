import React, {Component} from "react";
import './App.css'
import Navbar from './Navbar.js'

import Web3 from "web3";

import Tether from '../truffle_abis/Tether.json' 
import Reward from '../truffle_abis/Reward.json'
import DBank from '../truffle_abis/DBank.json'

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
            const tether = new web3.eth.Contract(Tether.abi, tetherData.address)
            this.setState({tether})
            let tetherBalance = await tether.methods.balanceOf(this.state.account).call()
            this.setState({tetherBalance: tetherBalance.toString()})
            console.log(tetherBalance)
        } else {
            window.alert('Tether Contract is not detected')
        }

        //Loading Reward Contract
        const rewardData = Reward.networks[networkId]
        if(rewardData) {
            const reward = new web3.eth.Contract(Reward.abi, rewardData.address)
            this.setState({reward})
            let rewardBalance = await reward.methods.balanceOf(this.state.account).call()
            this.setState({rewardBalance: rewardBalance.toString()})
            console.log(rewardBalance)
        } else  {
            window.alert('Reward Contract was not deployed')
        }

        //Loading Dbank and staking balance
        const dbankData = DBank.networks[networkId]
        if(dbankData) {
            const dbank = new web3.eth.Contract(DBank.abi,  dbankData.address)
            this.setState({dbank})
            const stakingBalance = await dbank.methods.stakingBalance(this.state.account).call()
            this.setState({stakingBalance})
        }
        this.setState({loading: false})
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
                    <h1>

                        {console.log(this.state.loading )}

                    </h1>
                 </div>
            </div>
        )
    }
}

export default App;