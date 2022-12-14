import React, {Component, useState, useEffect, useContext} from 'react';
import AIController from "../controller/AIController";
import Swal from 'sweetalert2'
import {Button, ButtonGroup, Card, Form, Image, ProgressBar} from "react-bootstrap";
import AuthContext from '../context/AuthContext';

export default function QuizComponent(props) {
    // options: Healthy, pneumonia bacterial, pneumonia viral, tuberculosis, COVID19, edema, lesion
    const [result, setResult] = useState(0);
    const [images, setImages] = useState([]);
    const [currentImage, setCurrentImage] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [modelResponse, setModelResponse] = useState([]);
    const {user} = useContext(AuthContext)

    // using the shuffle algorithm by Fisher Yates
    function shuffleArray(array) {
        let randomPosition;
        for (let i = array.length; i != 0;) {
            randomPosition = Math.floor(Math.random() * i);
            i--;
            [array[i], array[randomPosition]] = [array[randomPosition], array[i]];
        }
        return array;
    }

    const updateStatistics = (user, disease, correct) => {
        correct = correct ? 1 : 0
        fetch("http://127.0.0.1:8000/api/statistics/edit/" + user)
            .then((response) => response.json())
            .then((data) => {
                let disease_count = disease + "_count"
                let disease_correct_count = disease + "_correct_count"

                let result = {
                    "total_count": data["total_count"] + 1,
                    "total_correct_count": data["total_correct_count"] + correct,
                };

                result[disease_correct_count] = data[disease_correct_count] + correct
                result[disease_count] = data[disease_count] + 1
                console.log(result)
                fetch("http://127.0.0.1:8000/api/statistics/edit/" + user + "/", {
                    method: "PUT",
                    headers: {

                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(result)
                })
                    .then((response) => response.json())
                    .then((data) => console.log(data))

            })
    }

    async function updateResult(disease) {
        let apiUrl = "https://studentcustomvision-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/3ffcf92d-eaab-4841-82c6-9c1116bc65ef/classify/iterations/HighPrecisionModelFinal/url";
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                'Prediction-Key': 'c4e91f529cc24912a0ecc45339b04679',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"Url": images[currentImage].image_url})
        })
            .then((response) => {
                let data = response.json();
                console.log(data);
                return data
            })
            .then((data) => setModelResponse(data.predictions))
            .then(() => {
                modelResponse.sort(
                    function (first, second) {
                        if (first.probability > second.probability) {
                            return -1;
                        } else if (second.probability > first.probability) {
                            return 1;
                        }
                        return 0;
                    }
                );

                // update the statistics.
                let oracleValue = modelResponse[0].tagName;

                if (oracleValue != disease) {
                    Swal.fire({
                        icon: 'error',
                        title: 'The correct answer is: ' + oracleValue,
                    })
                } else {
                    Swal.fire({
                        icon: 'success',
                        title: 'Well done, your answer was correct!',
                    })
                }
                let equalAnswer = oracleValue == disease;
                if (equalAnswer) {
                    setResult(result + 1);
                }
                updateStatistics(user.id, oracleValue, equalAnswer)

                const nextQuestion = currentImage + 1;
                if (nextQuestion < images.length) {
                    setCurrentImage(nextQuestion);
                } else {
                    setShowResult(true);

                }
            })
            .catch((error) => console.log(error))

    };

    useEffect(() => {
        if (!props.showPractice || props.stats == null) {
            const apiUrl = "http://127.0.0.1:8000/api/ctimages/" + 10

            fetch(apiUrl)
                .then((response) => response.json())
                .then((data) => {
                    setImages(shuffleArray(data));
                })
                .catch((error) => console.log(error))
        } else {
            let quizData = [];

            let correctHealthy = props.stats.healthy_count == 0 ? 0 :  props.stats.healthy_correct_count / props.stats.healthy_count;
            let correctPneumonia = props.stats.pneunomia_count == 0 ? 0 : props.stats.pneunomia_correct_count / props.stats.pneunomia_count
            let correctTuberculosis = props.stats.tuberculosis_count == 0 ? 0 :  props.stats.tuberculosis_correct_count / props.stats.tuberculosis_count;
            let correctCovid = props.stats.covid_count == 0 ? 0 : props.stats.covid_correct_count / props.stats.covid_count;

            let healthyDataToFetch  = Math.round(correctHealthy *20);
            let pneumoniaDataToFetch  = Math.round(correctPneumonia * 20);
            let tuberculosisDataToFetch = Math.round(correctTuberculosis * 20);
            let covidDataToFetch = Math.round(correctCovid * 20);

            /*
            console.log(healthyDataToFetch);
            console.log(pneumoniaDataToFetch);
            console.log(tuberculosisDataToFetch);
            console.log(covidDataToFetch);

             */

            fetch("http://127.0.0.1:8000/api/ctimages/healthy/" + healthyDataToFetch)
                .then((response) => response.json())
                .then((data) => { if (data.length != 0) {
                    //console.log(data)
                    quizData = quizData.concat(data);
                    console.log(quizData);
                }
                })
                .catch((error) => console.log(error))

            fetch("http://127.0.0.1:8000/api/ctimages/pneunomia/" + pneumoniaDataToFetch)
                .then((response) => response.json())
                .then((data) => { if (data.length != 0) {
                    //console.log(data);
                    quizData = quizData.concat(data);
                    console.log(quizData);
                }
                })
                .catch((error) => console.log(error))
            fetch("http://127.0.0.1:8000/api/ctimages/tuberculosis/" + tuberculosisDataToFetch)
                .then((response) => response.json())
                .then((data) => { if (data.length != 0) {
                    //console.log(data);
                    quizData = quizData.concat(data);
                    console.log(quizData);
                }
                })
                .catch((error) => console.log(error))
            fetch("http://127.0.0.1:8000/api/ctimages/covid/" + covidDataToFetch)
                .then((response) => response.json())
                .then((data) => { if (data.length != 0) {
                    //console.log(data);
                    quizData = quizData.concat(data);
                    console.log(quizData);
                }
                })
                .catch((error) => console.log(error))

            setTimeout(function() {
                console.log(quizData);
                setImages(shuffleArray(quizData));
            }, 2000);
        }
    }, [])
    ;

    return (
        <Card className="quiz p-4">
            {showResult ?
                <div className={"heading"}>
                    <h1> Your result is: {result} / {images.length} </h1>
                    <Button variant="success" onClick={props.quizEnded}>Proceed to Leaderboard</Button>
                </div>
                : (
                    <div>
                        <div>
                            <div className={"heading"}>
                                <ProgressBar className="mb-2" now={((currentImage) / (images.length)) * 100}
                                             label={`${Math.round(((currentImage) / (images.length)) * 100)}%`}/>
                            </div>

                            <div className="alignCenter">
                                {images.length != 0 ?
                                    <Image rounded={true} className="justify-content-md-center mb-4" fluid={true}
                                           src={images[currentImage].image_url}></Image> : null}
                            </div>

                        </div>

                        <div className={"d-grid gap-2"}>
                            <Button onClick={() => updateResult("healthy")}>healthy</Button>
                            <Button onClick={() => updateResult("pneumonia")}>pneumonia</Button>
                            <Button onClick={() => updateResult("tuberculosis")}>tuberculosis</Button>
                            <Button onClick={() => updateResult("covid")}>covid</Button>
                        </div>
                    </div>
                )}
        </Card>
    );
}