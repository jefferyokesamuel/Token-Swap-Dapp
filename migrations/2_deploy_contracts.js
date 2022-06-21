const Tether = artifacts.require('Tether')
const Reward = artifacts.require('Reward')
const DBank = artifacts.require('DBank')

module.exports = async function (deployer, network, accounts) {
    await deployer.deploy(Tether)
    const tether = await Tether.deployed()

    await deployer.deploy(Reward) 
    const reward = await Reward.deployed()

    await deployer.deploy(DBank, reward.address, tether.address)
    const dbank = await DBank.deployed()

    // Transfer all reward tokens to the bank
    await reward.transfer(DBank.address, '1000000000000000000000000')

    //Distribute 100 tokens to the Investor automatically
    await tether.transfer(accounts[1], '100000000000000000') 
};
