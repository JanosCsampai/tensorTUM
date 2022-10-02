import React, {Component, useState, useEffect} from 'react';
import {Table} from "react-bootstrap";
import LeaderboardResults from "./LeaderboardResults";


export default function LeaderboardComponent(props) {
    const [leaderboard, setLeaderboard] = useState([])

    function mapRows(){
        let i = 1;
        return leaderboard.map(x =>
            <tr>
                <td> {i++} </td>
                <td> {x.user_name} </td>
                <td> {x.total_correct_count}</td>
            </tr>
        )
    }
    useEffect(() => {
        const apiUrl = "http://127.0.0.1:8000/api/leaderboard/"
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                setLeaderboard(data);
            })

            .catch((error) => console.log(error))
    }, []);

    return (
        <div>
            <h1 className="heading"> Current Session Leaderboard </h1>
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>Ranking</th>
                    <th>Username</th>
                    <th>Score</th>
                </tr>
                </thead>
                <tbody>
                { leaderboard ? mapRows() : null
                }
                </tbody>
            </Table>
        </div>
    );
}

