import React, {Component, useState} from 'react';

export default function QuizComponent() {
    //options: Healthy, pneumonia bacterial, pneumonia viral, tuberculosis, COVID19, edema, lesion
    const images = [];
    const [result, setResult] = useState(0);
    const [currentImage, setCurrentImage] = useState(0);
    const [showResult, setShowResult] = useState(false);


    const checkAnswer = (imageUrl, userInput) => {
        return true
    }

    const updateResult = (equalsAnswer) => {
        if (equalsAnswer) setResult(result + 1);
        const nextQuestion = currentImage + 1;
        if (nextQuestion < images.length) {
            setCurrentImage(nextQuestion);
        } else {
            setShowResult(true);
        }
    };

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
                            <img src="https://picsum.photos/536/354" />
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