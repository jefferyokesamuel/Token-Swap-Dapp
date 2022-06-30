import React, {Component} from 'react';

class Main extends Component {

    render () {
        return (
            <div id='content' className='mt-3'>
                <table className='table text-muted text-center'>
                    <thead>
                    <tr style={{color:'black'}}>
                        <th scope='col'>Staking Balance</th>
                        <th scope='col'>Reward Balance</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr style={{color:'black'}}>
                            <td>USDT</td>
                            <td>RWD</td>
                        </tr>
                    </tbody>
                </table>
                <div className='card mb-2' style={{opacity: '.9'}}>
                    <form className='mb-3'>
                        <div style={{borderSpace: '0 1em'}}>
                            <label className='float-left' style={{marginLeft: '15px'}}><b>State Token</b></label>
                            <span className='float-right' style={{marginRight: '8px'}}>
                                Balance:
                            </span>
                            <div className='input-gropu mb-4'>
                                <input 
                                type="text"
                                placeholder='0'
                                required />
                                <div className='
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Main;