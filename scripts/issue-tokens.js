const dbank = artifacts.require('DBank')

module.exports = async function issueRewards(callback) {
    let dbank = await dbank.deployed()
    await dbank.issueTokens()
    console.log('The Tokens have been issued')
    callback()
}