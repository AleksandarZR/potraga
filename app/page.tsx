'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { numbers } from '../data/mocks';
import { useState, useEffect } from 'react';
import Number from "../components/number";

interface NumberSquare {
    id: number;
    question: string;
    imageURL: string;
    isAnswerCorrect: boolean;
}

var numberSquares = new Array<NumberSquare>();

export default function Home() {
    const [popUpVisible, setPopUpVisible] = useState(false);
    const [activeNumber, setActiveNumber] = useState(0);
    const [question, setQuestion] = useState("Question");
    const [answer, setAnswer] = useState("");

    useEffect(() => {
        console.log("Initialize called");
        if (numberSquares.length === 0) {
            numbers.forEach((n: any) => {
                console.log('n.id= ' + n.id);
                const ns: NumberSquare = { id: n.id, question: n.question, imageURL: n.imageURL, isAnswerCorrect: n.isAnswerCorrect };
                numberSquares.push(ns);
            });
        }
    }, []);

    const numberClicked = (id: number, question: string) => {
        console.log("Number clicked: " + id);
        setQuestion(question);
        setPopUpVisible(!popUpVisible);
        setActiveNumber(id);
        setAnswer("");
    }

    const buttonOtkaziClicked = () => {
        setPopUpVisible(false);
    }

    const buttonPotvrdiClicked = () => {
        if (numbers[activeNumber - 1].answerExpected.includes(answer)) {
            numbers[activeNumber - 1].isAnswerCorrect = true;
        }

        setPopUpVisible(false);
    }

    const onKeyDown = (e: any) => {
        if (e.key == 'Enter') {
            console.log("You hit enter.")
            buttonPotvrdiClicked();
        }
    }

    return (
        <main className={styles.main}>
            <img className={styles.svg} src="/svg/questionMark.svg"></img>

            <div className={popUpVisible ? styles.popUpWindow : styles.popUpWindowHidden} onKeyDown={(e) => { onKeyDown(e); }}>
                <div className={styles.question}>{question}</div>
                <input className={styles.answer} value={answer} onChange={e => setAnswer(e.target.value)} placeholder="Ovde upisati odgovor"></input>
                <div className={styles.buttons}>
                    <div className={styles.button} onClick={buttonPotvrdiClicked}>Potvrdi</div>
                    <div className={styles.button} onClick={buttonOtkaziClicked}>Otkaži</div>
                </div>
            </div>

            <div className={styles.headerContainer}>
                <img className={styles.cupcake} src="/images/cupcake.png"></img>
                <h1 className={styles.headline}>Zna<span className={styles.spanLetter}>nj</span>em <span className={styles.spanLetter3}>do</span> slat<span className={styles.spanLetter2}>ki</span>ša!</h1>
                <img className={styles.cupcake2} src="/images/cupcake2.png"></img>    
            </div>
            <div className={styles.grid}>
                {numbers.map((n) => (
                    <Number key={n.id} id={n.id} question={n.question} imageURL={n.imageURL} answerExpected={n.answerExpected} isAnswerCorrect={n.isAnswerCorrect} onNumberClicked={numberClicked} />
                ))}
            </div>
            <div className={styles.dummyGrid}></div>
        </main>
    );
}
