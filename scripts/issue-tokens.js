const DBank = artifacts.require('DBank')

module.exports = async function issueRewards(callback) {
    let dbank = await DBank.deployed()
    await dbank.issueTokens()
    console.log('The Tokens have been issued')
    callback()
}