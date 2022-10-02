import React, {Component, useEffect, useRef, useState, useContext} from 'react';
import NavigationBarComponent from "./Header/NavigationBarComponent";
import LeaderboardComponent from "./LeaderboardComponent";
import QuizComponent from "./QuizComponent";
import QuizRegistrationComponent from "./QuizRegistrationComponent";
import Swal from 'sweetalert2'
import LogoComponent from "./LogoComponent";
import AuthContext from '../context/AuthContext';
import { Card, Container, Row, ProgressBar } from 'react-bootstrap';

import  { Redirect } from 'react-router-dom'

export default function HomepageComponent(props){
    const {user, setUser} = useContext(AuthContext)
    const [showLogo, setShowLogo] = useState(true)
    const [showRegistrationForm, setshowRegistrationForm] = useState(false)
    const [showQuiz, setshowQuiz] = useState(false)
    const [showQuizPractice, setshowQuizPractice] = useState(false)
    const [showLeaderboard, setshowLeaderboard] = useState(false)
    const [showStats, setShowStats] = useState(false)
    const [stats, setStats] = useState(null)

    function quizEnded() {
        setshowQuiz(false)
        setshowLeaderboard(true)
    }

    function showMenu() {
        setShowLogo(true)
        setshowLeaderboard(false)
        setshowQuiz(false)
        setShowStats(false)
    }

    function clickedNewGame() {
        setShowLogo(false)
        setshowLeaderboard(false)
        setshowQuiz(true)
        setShowStats(false)
        setshowQuizPractice(false)
    }

    function clickedShowLeaderboard() {
        setShowLogo(false)
        setshowLeaderboard(true)
        setshowQuiz(false)
        setShowStats(false)
    }

    function clickedShowStatistics() {
        setShowLogo(false)
        setshowLeaderboard(false)
        setshowQuiz(false)
        setShowStats(true)
    }

    function clickedShowQuizPractice() {
        setshowQuizPractice(true);
        setShowLogo(false)
        setshowLeaderboard(false)
        setshowQuiz(true)
        setShowStats(false)
    }
    
    useEffect(() => {
        console.log(user.user_name)
        const apiUrl = "http://127.0.0.1:8000/api/statistics/edit/" + user.id + "/"
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                setStats(data)
                console.log(data);
            })

            .catch((error) => console.log(error))
    }, [user]);
    
    return (<>
            <NavigationBarComponent clickedNewGame={clickedNewGame} showLeaderboard={clickedShowLeaderboard} setUser={setUser} showMenu={showMenu} clickedShowStatistics={clickedShowStatistics}/>
            <Container className="p-3 h-100 justify-content-center align-items-center">
            {showLogo ? <Row className="h-75">
                
                
                {user.user_name}
                    <Card onClick={clickedShowQuizPractice} className="col-6 m-2" style={{ width: '40rem', cursor: 'pointer' }}>
                        <Card.Body>
                            <Card.Title><h1 style={{fontWeight: "bold"}} className="text-bold">Daily Practice</h1></Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Tailored to your needs</Card.Subtitle>
                        </Card.Body>
                    </Card>
                    <Card onClick={clickedNewGame} className="col-6 m-2" style={{ width: '40rem', cursor: 'pointer' }}>
                        <Card.Body>
                            <Card.Title><h1 style={{fontWeight: "bold"}} className="text-bold">Quick Quiz</h1></Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Random samples of images</Card.Subtitle>
                        </Card.Body>
                    </Card>
                    <Card className="col-6 m-2" style={{ width: '40rem', opacity: 0.5}}>
                        <Card.Body>
                            <Card.Title><h1 style={{fontWeight: "bold"}} className="text-bold">Challenge Friends</h1></Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">(Coming Soon) Invite friends to challenges and see who comes up on top</Card.Subtitle>
                        </Card.Body>
                    </Card>
            
            
                    </Row> : null }
                    {showStats ? 
                    <Card className="quiz p-4">
                        <Card.Body>
                            <Card.Title><h1 style={{fontWeight: "bold"}} className="text-bold">{user.user_name}</h1></Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Statistics</Card.Subtitle>
                            <Card.Text>
                            {stats != null ?<>
                            <small>Practiced with {stats.total_count} Images</small>
                            <br></br>
                            <small>Correctly identified {stats.total_correct_count} Images</small>
                            <Card.Subtitle className="mt-3 mb-2 text-muted">Accuracy</Card.Subtitle>
                            <small>Total</small>
                            <ProgressBar className="mb-2" now={stats.total_correct_count / stats.total_count * 100} />                            
                            <small>Healthy</small>
                            <ProgressBar className="mb-2" now={stats.healthy_correct_count / stats.healthy_count * 100} />
                            <small>Pneumonia</small>
                            <ProgressBar className="mb-2" now={stats.pneunomia_correct_count / stats.pneunomia_count * 100} />
                            <small>Covid</small>
                            <ProgressBar className="mb-2" now={stats.covid_correct_count / stats.covid_count * 100} />
                            <small>Tuberculosis</small>
                            <ProgressBar className="mb-2" now={stats.tuberculosis_correct_count / stats.tuberculosis_count * 100} />
                            </> : null }
                            </Card.Text>
                        </Card.Body>
                    </Card>:
                    null}
                <div className="body">
                    {showLeaderboard ? <LeaderboardComponent/> : null}
                    {showQuiz ? <QuizComponent quizEnded = {quizEnded} showPractice={showQuizPractice} stats={stats}/> : null}
                </div>
            </Container></>
    );
}