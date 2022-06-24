import React, {Component} from "react";
import './App.css'
import Navbar from './Navbar.js'

class App extends Component {
    // React code goes here 
    render () {
        return (
            <div>
                <Navbar />
                <div className='text-center'>
                    <h>Hello World</h>
                 </div>
            </div>
        )
    }
}

export default App;