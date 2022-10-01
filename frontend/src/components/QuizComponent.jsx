import React, {Component, useState, useEffect} from 'react';
import AIController from "../controller/AIController";

export default function QuizComponent(){
    //options: Healthy, pneumonia bacterial, pneumonia viral, tuberculosis, COVID19, edema, lesion    
    const [result, setResult] = useState(0);
    const [images, setImages] = useState([]);
    const [currentImage, setCurrentImage] = useState(0);
    const [showResult, setShowResult] = useState(false);


    const checkAnswer = (imageUrl, userInput) => {
        let apiUrl = "https://studentcustomvision-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/3ffcf92d-eaab-4841-82c6-9c1116bc65ef/classify/iterations/HighPrecisionModelFinal/url"
        fetch(apiUrl, {
            method: "POST",
            headers: {
                'Prediction-Key': 'c4e91f529cc24912a0ecc45339b04679',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"Url": imageUrl})
        })
        .then((response) => console.log(response.json()))
        //   .then((response) => )
          
          .catch((error) => console.log(error))
        
        return true
    }



    const updateResult = (equalsAnswer) => {
        checkAnswer(images[currentImage].image_url, "asds")
        if (equalsAnswer) setResult(result + 1);
        const nextQuestion = currentImage + 1;
        if (nextQuestion < images.length) {
            setCurrentImage(nextQuestion);
        } else {
            setShowResult(true);
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
        <div className="card" >
            {showResult ? <div> You result is: {result} / {images.length} </div>
             : (
                <div>
                    <div>
                        <div>
                            <span> Question {currentImage + 1} </span>/{images.length}
                        </div>

                        <div>
                            {images.length != 0 ?
                            <img src={images[currentImage].image_url}></img> : null }
                        </div>

                    </div>
                    
                    <div className="list-group">
                        <button onClick={() =>updateResult(true)}>Healthy</button>
                        <button onClick={() =>updateResult(true)}>pneumonia bacterial</button>
                        <button onClick={() =>updateResult(true)}>pneumonia viral</button>
                        <button onClick={() =>updateResult(true)}>tuberculosis</button>
                        <button onClick={() =>updateResult(true)}>COVID19</button>
                        <button onClick={() =>updateResult(true)}>Edema</button>
                        <button onClick={() =>updateResult(true)}>lesion</button>
                    </div>
                </div>
            )}
        </div>
    );
}