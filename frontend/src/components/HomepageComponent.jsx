import React, {Component} from 'react';
import NavigationBarComponent from "./Header/NavigationBarComponent";
import LeaderboardComponent from "./LeaderboardComponent";
import QuizComponent from "./QuizComponent";
import QuizRegistrationComponent from "./QuizRegistrationComponent";
import Swal from 'sweetalert2'

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
                this.setState({
                    showRegistrationForm: false,
                    showQuiz: true,
                    showLeaderboard: false
                })
            } else {
                this.setState({
                    showRegistrationForm: false,
                    showQuiz: false,
                    showLeaderboard: false
                })
            }
        });

    }

    clickedShowLeaderboard = () => {
        this.setState({
            showRegistrationForm: false,
            showQuiz: false,
            showLeaderboard: true
        });
        const y = document.getElementById('body').getBoundingClientRect().top - 200;
        setTimeout(() => {
            window.scrollTo({top: y, behavior: 'smooth'})
        }, 300);
    }

    clickedShowQuiz = () => {
        this.setState({
            showRegistrationForm: false,
            showQuiz: true,
            showLeaderboard: true
        });
        const y = document.getElementById('body').getBoundingClientRect().top - 200;
        setTimeout(() => {
            window.scrollTo({top: y, behavior: 'smooth'})
        }, 300);
    }

    render() {
        return (
            <div>
                <NavigationBarComponent clickedNewGame={this.clickedNewGame} clicked
                                        showLeaderboard={this.clickedShowLeaderboard}/>

                <div className="body">
                    {this.state.showLeaderboard ? <LeaderboardComponent/> : null}
                    {this.state.showQuiz ? <QuizComponent/> : null}
                </div>
            </div>
        );
    }
}

export default HomepageComponent;