import React, {Component} from 'react';

class Navbar extends Component {

    render () {
        return (
            <nav className='navbar navbar-dark fixed-top shadow p-0' style={{backgroundcolor:'black', height: '50px'}}>
                <a style={{color:'white'}}>Token Swap</a>
                <ul>
                    <li>
                        <small style={{color:'white'}}> Account Number

                        </small>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Navbar;