"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { numbers } from "../data/mocks";
import { useState, useEffect } from "react";
import Number from "../components/number";

interface FieldState {
    id: number;
    isAnswerCorrect: boolean;
}
var localStorageState = new Array<FieldState>();

export default function Home() {
    const [popUpVisible, setPopUpVisible] = useState(false);
    const [lockInfoVisible, setLockInfoVisible] = useState(false);
    const [activeNumber, setActiveNumber] = useState(0);
    const [question, setQuestion] = useState("Question");
    const [answer, setAnswer] = useState("");
    const [dummy, setDummy] = useState("");
    const [arrayState, setArrayState] = useState(null);
    const [numbersArray, setNumbersArray] = useState(numbers);

    useEffect(() => {
        console.log("Initialize called");

        let arrayState: Array<FieldState> | null = localStorageGetState();

        if (arrayState === null) {
            localStorageSetState();
        } else {
            localStorageState = arrayState;
            updateNumbers();
        }
        // Setting dummy only to assure that render will be called after each refresh
        setDummy("tandara");
    }, []);

    const numberClicked = (id: number, question: string) => {
        console.log("Number clicked: " + id);
        let locked = false;

        let array = localStorageGetState();
        if (!array) array = [];

        if (array[id - 1].isAnswerCorrect) {
            return;
        }

        if (id > 1) {
            for (let i = 0; i < id-1; i++) {
                console.log(array[i]);

                if (array[i].isAnswerCorrect === false) {
                    locked = true;
                }
            }
        }

        if (locked === false) {
            setQuestion(question);
            setPopUpVisible(!popUpVisible);
            setActiveNumber(id);
            setAnswer("");
        } else {
            setLockInfoVisible(!lockInfoVisible);
        }
    };

    const buttonOtkaziClicked = () => {
        setPopUpVisible(false);
    };

    const buttonZatvoriClicked = () => {
        setLockInfoVisible(false);
    };

    const buttonPotvrdiClicked = () => {
        if (numbers[activeNumber - 1].answerExpected.includes(answer)) {
            numbers[activeNumber - 1].isAnswerCorrect = true;
            localStorageSetState();
        }

        setPopUpVisible(false);
    };

    const onKeyDown = (e: any) => {
        if (e.key == "Enter") {
            console.log("You hit enter.");
            buttonPotvrdiClicked();
        }
    };

    const localStorageSetState = () => {
        localStorageState = [];
        setDummy("");

        for (let i = 0; i < numbers.length; i++) {
            let fieldState = {
                id: numbers[i].id,
                isAnswerCorrect: numbers[i].isAnswerCorrect,
            };
            localStorageState.push(fieldState);
        }

        localStorage.setItem("localStorageState", JSON.stringify(localStorageState));
    };

    function localStorageGetState(): Array<FieldState> | null {
        let stringArray = localStorage.getItem("localStorageState") || null;
        console.log("strArr: " + stringArray);
        let fieldArray: Array<FieldState> | null;
        setDummy("");

        if (stringArray != null) {
            fieldArray = JSON.parse(stringArray);
        } else {
            fieldArray = null;
        }
        return fieldArray;
    };

    const updateNumbers = () => {
        for (let i = 0; i < numbers.length; i++) {
            numbers[i].isAnswerCorrect = localStorageState[i].isAnswerCorrect;
        }
    };

    const buttonResetClickedEventHandler = () => {
        for (let i = 0; i < localStorageState.length; i++) {
            localStorageState[i].isAnswerCorrect = false;
        }

        updateNumbers();
        localStorageSetState();
        setDummy("aaa");
    };

    return (
        <div className={styles.main}>
            <div
                className={popUpVisible ? styles.popUpWindow : styles.popUpWindowHidden}
                onKeyDown={(e) => {
                    onKeyDown(e);
                }}
            >
                <div className={styles.question}>{question}</div>
                <input
                    className={styles.answer}
                    tabIndex={0}
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder='Ovde upisati odgovor'
                ></input>
                <div className={styles.buttons}>
                    <div className={styles.button} onClick={buttonPotvrdiClicked}>
                        Potvrdi
                    </div>
                    <div className={styles.button} onClick={buttonOtkaziClicked}>
                        Otkaži
                    </div>
                </div>
            </div>

            <div
                className={lockInfoVisible ? styles.popUpWindow : styles.popUpWindowHidden}
                onKeyDown={(e) => {
                    onKeyDown(e);
                }}
            >
                <div className={styles.question}>Polje je zaključano. Prvo odgovori na prethodna pitanja.</div>

                <div className={styles.buttons}>
                    <div className={styles.button} onClick={buttonZatvoriClicked}>
                        Zatvori
                    </div>
                </div>
            </div>

            <div className={styles.headerContainer}>
                <div className={styles.headerLeft}></div>
                <div className={styles.headerCenter}>
                    <img className={styles.cupcake} src='images/Sherlock.png'></img>
                    <h1 className={styles.headline}>
                        Pot<span className={styles.spanLetter}>ra</span>ga{" "}
                        <span className={styles.spanLetter3}>za</span> pita
                        <span className={styles.spanLetter2}>nj</span>ima!
                    </h1>
                    <img className={styles.cupcake} src='images/Sherlock.png'></img>
                </div>
                <div className={styles.headerRight}></div>
            </div>
            <div className={styles.grid}>
                {numbers.map((n) => (
                    <Number
                        key={n.id}
                        id={n.id}
                        question={n.question}
                        newQuestion={n.newQuestion}
                        answerExpected={n.answerExpected}
                        isAnswerCorrect={n.isAnswerCorrect}
                        onNumberClicked={numberClicked}
                    />
                ))}
            </div>
            <div className={styles.footer}>
                <div className={styles.resetButton} onClick={buttonResetClickedEventHandler}>
                    Reset
                </div>
                <p className={styles.dummyText}> {dummy}</p>
                {/* <div className={styles.infoButtonContainer}>
                    <input type="checkbox" id="infoControl" className={styles.checkboxHidden} />
                    <label className={styles.labelForCheckbox} htmlFor="infoControl">
                        <div className={styles.infoButton}>Info</div>
                        <p className={styles.infoFirst}>Klikni na broj!</p>
                        <p className={styles.infoSecound}>Odgovori tačno!</p>
                        <p className={styles.infoThird}>Zaradi slatkiš!</p>
                    </label>
                </div> */}
            </div>
        </div>
    );
}
