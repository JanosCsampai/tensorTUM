import React, {Component} from 'react';
import NavigationBarComponent from "./Header/NavigationBarComponent";

class HomepageComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            logged_in: false,
            showLogo: true,
            showRegistrationForm: false,
            showQuiz: false,
            showLeaderboard: false,
        }

    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <NavigationBarComponent/>
            </div>
        );
    }
}

export default HomepageComponent;