import React, {Component} from 'react';
import {Table} from "react-bootstrap";
import LeaderboardResults from "./LeaderboardResults";


class LeaderboardComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }

    }

    componentDidMount() {
    }

    mapRows = () => {
        let i = 1;
        return this.props.responses.getResponses().map(x =>
            <tr>
                <td> {i++} </td>
                <td> {x[0]} </td>
                <td> {x[1]}</td>
            </tr>
        )
    }

    render() {
        return (
            <div>
                <h1 className="heading"> Leaderboard Component </h1>
                <Table striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th>Ranking</th>
                        <th>Username</th>
                        <th>Score</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                       this.mapRows()
                    }
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default LeaderboardComponent;