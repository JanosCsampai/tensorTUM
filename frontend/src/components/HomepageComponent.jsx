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
            username: "",
            password: "",
            showLogo: true,
            showRegistrationForm: false,
            showQuiz: false,
            showLeaderboard: false,
            responses: LeaderboardResults
        }

    }

    isLoggedIn = () =>  {
        return this.state.logged_in;
    }

    setLoggedIn = (val) =>  {
        this.setState({logged_in: val});
    }

    setUser = (user) =>    {
        this.setState({username: user});
    }

    getUser = () => {
        return this.state.username;
    }

    setPassword = (pass) =>    {
        this.setState({password: pass});
    }

    getPassword = () => {
        return this.state.password;
    }

    componentDidMount() {
    }

    addResult = (username, result) => {
        this.state.responses.addResult(username, result);
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
                <NavigationBarComponent clickedNewGame={this.clickedNewGame} showLeaderboard={this.clickedShowLeaderboard} setLoggedIn={this.setLoggedIn} setUser={this.setUser} setPassword={this.setPassword}/>
                <LogoComponent id='logo'/>

                <div className="body">
                    {this.state.showLeaderboard ? <LeaderboardComponent responses={this.state.responses}/> : null}
                    {this.state.showQuiz ? <QuizComponent username = {this.state.username} addResult = {this.addResult} /> : null}
                </div>
            </div>
        );
    }
}

export default HomepageComponent;