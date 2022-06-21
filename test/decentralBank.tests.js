const Tether = artifacts.require('Tether')
const Reward = artifacts.require('Reward')
const DBank = artifacts.require('DBank')

require('chai')
.use(require('chai-as-promised'))
.should() 

contract('DBank', (accounts) => {
     //Code will be tested here
    describe('Mock Tether Deployment', async () => { 
        it('matches name successfuly', async () => {
            let tether = await Tether.new()
            const name = await tether.name()
            assert.equal(name, 'Tether Token')

        })
        it('Checkes reward token', async () => {
            let reward = await Reward.new()
            const rwdName = await reward.name()
            assert.equal(rwdName, 'Reward Token')
        })
    })
})