import React, {Component, useEffect, useRef} from 'react';
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
            logged_in: localStorage.getItem("access_token"),
            username: "",
            password: "",
            showLogo: true,
            showRegistrationForm: false,
            showQuiz: false,
            showLeaderboard: false,
            responses: LeaderboardResults,
        }

    }

    quizEnded = () => {
        this.setState(
            {
                showQuiz: false,
                showLeaderboard: true
            }
        )
    }

    showLogo = () => {
        this.setState({
            showLogo:true,
            showLeaderboard: false,
            showQuiz: false
        })
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
                    showLogo:false,
                    username: result.value
                });

               this.body.scrollIntoView({behavior:"smooth"});

            } else {
                this.setState({
                    showRegistrationForm: false,
                    showQuiz: false,
                    showLeaderboard: false,
                    showLogo: true
                });
            }
        });
    }

    clickedShowLeaderboard = () => {
        this.setState({
            showRegistrationForm: false,
            showQuiz: false,
            showLeaderboard: true,
            showLogo:false
        });
        this.body.scrollIntoView({behavior:"smooth"});
    }

    render() {
        return (
            <div>
                <NavigationBarComponent clickedNewGame={this.clickedNewGame} showLeaderboard={this.clickedShowLeaderboard} setLoggedIn={this.setLoggedIn} setUser={this.setUser} setPassword={this.setPassword} logged_in={this.state.logged_in} showLogo={this.showLogo}/>
                {this.state.showLogo ? <LogoComponent id='logo'/> : null }

                <div className="body" ref={body => { this.body = body; }}>
                    {this.state.showLeaderboard ? <LeaderboardComponent responses={this.state.responses}/> : null}
                    {this.state.showQuiz ? <QuizComponent username = {this.state.username} addResult = {this.addResult} quizEnded = {this.quizEnded}/> : null}
                </div>
            </div>
        );
    }
}

export default HomepageComponent;