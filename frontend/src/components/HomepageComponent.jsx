import React, {Component} from 'react';
import NavigationBarComponent from "./Header/NavigationBarComponent";
import LeaderboardComponent from "./LeaderboardComponent";
import QuizComponent from "./QuizComponent";
import QuizRegistrationComponent from "./QuizRegistrationComponent";

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

    clickedNewGame = () =>   {
        this.setState({
            showRegistrationForm: true,
            showQuiz: false,
            showLeaderboard: false
        });
        const y = document.getElementById('body').getBoundingClientRect().top - 200;
        setTimeout(() => {window.scrollTo({top: y, behavior: 'smooth'})}, 300);
    }

    clickedShowLeaderboard = () =>   {
        this.setState({
            showRegistrationForm: false,
            showQuiz: false,
            showLeaderboard: true
        });
        const y = document.getElementById('body').getBoundingClientRect().top - 200;
        setTimeout(() => {window.scrollTo({top: y, behavior: 'smooth'})}, 300);
    }

    clickedShowQuiz = () =>   {
        this.setState({
            showRegistrationForm: false,
            showQuiz: true,
            showLeaderboard: true
        });
        const y = document.getElementById('body').getBoundingClientRect().top - 200;
        setTimeout(() => {window.scrollTo({top: y, behavior: 'smooth'})}, 300);
    }

    render() {
        return (
            <div>
                <NavigationBarComponent/>

                <div className="body">
                    {this.state.showLeaderboard ? <LeaderboardComponent/> : null}
                    {this.state.showQuiz ? <QuizComponent/> : null}
                    {this.state.showRegistrationForm ? <QuizRegistrationComponent/> : null}
                </div>
            </div>
        );
    }
}

export default HomepageComponent;