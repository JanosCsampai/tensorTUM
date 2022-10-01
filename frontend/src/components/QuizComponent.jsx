import React, {Component, useState, useEffect} from 'react';
import AIController from "../controller/AIController";
import Swal from 'sweetalert2'
import {Button, Form, Image} from "react-bootstrap";

export default function QuizComponent(props) {
    //options: Healthy, pneumonia bacterial, pneumonia viral, tuberculosis, COVID19, edema, lesion    
    const [result, setResult] = useState(0);
    const [images, setImages] = useState([]);
    const [currentImage, setCurrentImage] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [modelResponse, setModelResponse] = useState([]);

    const checkAnswer = (imageUrl, userInput) => {
        let apiUrl = "https://studentcustomvision-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/3ffcf92d-eaab-4841-82c6-9c1116bc65ef/classify/iterations/HighPrecisionModelFinal/url";
        fetch(apiUrl, {
            method: "POST",
            headers: {
                'Prediction-Key': 'c4e91f529cc24912a0ecc45339b04679',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"Url": imageUrl})
        })
            .then((response) => response.json())
            .then((data) => setModelResponse(data.predictions))
            .catch((error) => console.log(error))

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
        console.log(oracleValue);
        return oracleValue == userInput;
    }

    const updateResult = (disease) => {
        let equalsAnswer = checkAnswer(images[currentImage].image_url, disease);

        if (equalsAnswer) {
            setResult(result + 1);
        }

        const nextQuestion = currentImage + 1;
        if (nextQuestion < images.length) {
            setCurrentImage(nextQuestion);
        } else {
            setShowResult(true);
            props.addResult(props.username, result);
        }
    };

    useEffect(() => {
        const apiUrl = "http://127.0.0.1:8000/api/ctimages/" + 10
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                setImages(data);
            })
            //   .then((response) => )

            .catch((error) => console.log(error))
    }, []);

    return (
        <div>
            {showResult ? <div> You result is: {result} / {images.length} </div>
                : (
                    <div>
                        <div>
                            <div>
                                <span> Question {currentImage + 1} </span>/{images.length}
                            </div>

                            <div>
                                {images.length != 0 ?
                                    <Image fluid={true} src={images[currentImage].image_url}></Image> : null}
                            </div>

                        </div>

                        <div className="list-group">
                            <button onClick={() => updateResult("healthy")}>healthy</button>
                            <button onClick={() => updateResult("pneumonia")}>pneumonia</button>
                            <button onClick={() => updateResult("tuberculosis")}>tuberculosis</button>
                            <button onClick={() => updateResult("covid")}>covid</button>
                        </div>
                    </div>
                )}
        </div>
    );
}