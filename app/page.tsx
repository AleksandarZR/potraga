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
    const [question, setQuestion] = useState("Question");

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
    }

    const buttonOtkaziClicked = () => {
        setPopUpVisible(false);
    }

    const buttonPotvrdiClicked = () => {
        setPopUpVisible(false);
    }

    return (
        <main className={styles.main}>
            <div className={popUpVisible? styles.popUpWindow : styles.popUpWindowHidden}>
                <div>{question}</div>
                <input className={styles.answer}></input>
                <div className={styles.buttons}>
                    <div className={styles.button} onClick={buttonPotvrdiClicked}>Potvrdi</div>
                    <div className={styles.button} onClick={buttonOtkaziClicked}>Otkaži</div>
                </div>
            </div>

            <h1 className={styles.headline}>Zna<span className={styles.spanLetter}>nj</span>em d<span className={styles.spanLetter3}>o</span> slat<span className={styles.spanLetter2}>k</span>iša!</h1>
            <div className={styles.grid}>
                {numbers.map((n) => (
                    <Number key={n.id} id={n.id} question={n.question} imageURL={n.imageURL} isAnswerCorrect={false} onNumberClicked={numberClicked}/>
                ))}
            </div>
        </main>
    );
}
