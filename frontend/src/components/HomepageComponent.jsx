import React, {Component, useEffect, useRef, useState, useContext} from 'react';
import NavigationBarComponent from "./Header/NavigationBarComponent";
import LeaderboardComponent from "./LeaderboardComponent";
import QuizComponent from "./QuizComponent";
import QuizRegistrationComponent from "./QuizRegistrationComponent";
import Swal from 'sweetalert2'
import LogoComponent from "./LogoComponent";
import AuthContext from '../context/AuthContext';
import { Card, Container, Row } from 'react-bootstrap';
import  { Redirect } from 'react-router-dom'

export default function HomepageComponent(props){
    const {user, setUser} = useContext(AuthContext)
    const [showLogo, setShowLogo] = useState(true)
    const [showRegistrationForm, setshowRegistrationForm] = useState(false)
    const [showQuiz, setshowQuiz] = useState(false)
    const [showLeaderboard, setshowLeaderboard] = useState(false)

    
    

    function quizEnded() {
        setshowQuiz(false)
        setshowLeaderboard(true)
    }

    function showMenu() {
        setShowLogo(true)
        setshowLeaderboard(false)
        setshowQuiz(false)
    }

    function clickedNewGame() {
        setShowLogo(false)
        setshowLeaderboard(false)
        setshowQuiz(true)
    }

    function clickedShowLeaderboard() {
        setShowLogo(false)
        setshowLeaderboard(true)
        setshowQuiz(false)
    }
    
    return (<>
            <NavigationBarComponent clickedNewGame={clickedNewGame} showLeaderboard={clickedShowLeaderboard} setUser={setUser}/>
            <Container className="p-3 h-100 justify-content-center align-items-center">
            {showLogo ? <Row className="h-75">
                
                
                
                    <Card className="col-12 w-100 m-2" style={{ width: '40rem', cursor: 'pointer' }}>
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
                <div className="body">
                    {showLeaderboard ? <LeaderboardComponent/> : null}
                    {showQuiz ? <QuizComponent quizEnded = {quizEnded}/> : null}
                </div>
            </Container></>
    );
}