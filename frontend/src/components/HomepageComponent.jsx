import React, {Component} from 'react';
import NavigationBarComponent from "./Header/NavigationBarComponent";
import LeaderboardComponent from "./LeaderboardComponent";
import QuizComponent from "./QuizComponent";
import QuizRegistrationComponent from "./QuizRegistrationComponent";
import Swal from 'sweetalert2'
import LogoComponent from "./LogoComponent";
import LeaderboardResults from "./LeaderboardResults";

class HomepageComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            logged_in: false,
            showLogo: true,
            showRegistrationForm: false,
            showQuiz: false,
            showLeaderboard: false,
            username: "",
            password: "",
            responses: LeaderboardResults
        }

    }

    componentDidMount() {
    }

    clickedNewGame = () => {
        Swal.fire({
            icon: "question",
            title: 'Enter a username',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,

            cancelButtonColor: '#d33',
            confirmButtonText: 'Start',
            showLoaderOnConfirm: true,
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(result.value);
                this.setState({
                    showRegistrationForm: false,
                    showQuiz: true,
                    showLeaderboard: false,
                    username: result.value
                });

                window.scrollTo({
                    top: document.body.scrollHeight,
                    left: 0,
                    behavior: 'smooth'
                });

            } else {
                this.setState({
                    showRegistrationForm: false,
                    showQuiz: false,
                    showLeaderboard: false
                });
            }
        });
    }

    clickedShowLeaderboard = () => {
        this.setState({
            showRegistrationForm: false,
            showQuiz: false,
            showLeaderboard: true
        });

        window.scrollTo({
            top: document.body.scrollHeight,
            left: 0,
            behavior: 'smooth'
        });
    }

    render() {
        return (
            <div>
                <NavigationBarComponent clickedNewGame={this.clickedNewGame} clicked
                                        showLeaderboard={this.clickedShowLeaderboard}/>
                <LogoComponent id='logo'/>

                <div className="body">
                    {this.state.showLeaderboard ? <LeaderboardComponent responses={this.state.responses}/> : null}
                    {this.state.showQuiz ? <QuizComponent responses={this.state.responses} username = {this.state.username} /> : null}
                </div>
            </div>
        );
    }
}

export default HomepageComponent;