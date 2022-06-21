const Tether = artifacts.require('Tether')
const Reward = artifacts.require('Reward')
const DBank = artifacts.require('DBank')

require('chai')
.use(require('chai-as-promised'))
.should() 

contract('DBank', ([owner, customer]) => {
    let tether, reward, dbank

    function toWei(value){
        return web3.utils.toWei(value, 'ether')
    }
    before(async () => {
        // Loading the Contracts
        tether = await Tether.new()
        reward = await Reward.new()
        dbank = await DBank.new(reward.address, tether.address)

        //Transfer all Tokens to the Decentral Bank
        await reward.transfer(dbank.address, toWei('1000000'))

        //Transfer 100 Tokens to investor
        await tether.transfer(customer, toWei('100'), {from: owner})
    })

     //Code will be tested here
    describe('Mock Tether Deployment', async () => { 
        it('matches name successfuly', async () => {
            const name = await tether.name()
            assert.equal(name, 'Tether Token')

        })
        it('Checkes reward token', async () => {
            const rwdName = await reward.name()
            assert.equal(rwdName, 'Reward Token')
        })
    })

    describe('Decentral Bank Deployment', async () => {
        it('Matches name successfuly', async () => {
            const name = await dbank.name()
            assert.equal(name, 'Decentral Bank')
        })
        it('Check if Tokens are available', async () => {
            let balance = await reward.balanceOf(dbank.address)
            assert.equal(balance, toWei('1000000'))
        })
    })

    describe('Staking Test', async () => {
        it('rewards tokens for staking', async () => {
            let result
            //Check investor balance
            result = await tether.balanceOf(customer)
            assert.equal(result.toString(), toWei('100'), 'Customer balance before staking')
            //Check Staking of Customer for 100 Tokens
            await tether.approve(dbank.address, toWei('100'), {from: customer})
            await dbank.depositTokens(toWei('100'), {from: customer})
            //Check balanceof customer after staking
            result = await tether.balanceOf(customer)
            assert.equal(result.toString(), toWei('0'), 'Customer balance before staking')
            // Check Balance of the bank
            let bankBalance
            bankBalance = await tether.balanceOf(owner)
        })  
    })
})