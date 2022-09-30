import React, {Component} from 'react';
import logo from './BTMS-logo.jpeg'

class LogoComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }

    }

    componentDidMount() {
    }

    render() {
        return (
            <div className= "logo">
                <img className="logo" src={logo}/>
            </div>
        );
    }
}

export default LogoComponent;