'use client'

import React, { useEffect, useState } from "react";
import styles from "../app/page.module.css";

interface Props {
    key: number;
    id: number;
    question: string;
    imageURL: string;
    isAnswerCorrect: boolean;
    // onAnswered(id: number, isAnswerCorrect: boolean): void
};

export default function Number(props: Props) {
    const [answer, setAnswer] = useState("");

    // const isAnswerCorrect = () => {
    //     if (props.answerExpected.includes(answer)) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    // const answerChanged = (value: any) => {
    //     setAnswer(value);
    //     props.onAnswered(props.id, (props.answerExpected.includes(value))? true : false);
    // }

    return (
        <div>
            {/* <p className={styles.question}>{props.questionText}</p>
            <input className={styles.answer} type="text" value={answer} onChange={e => answerChanged(e.target.value)}></input>
            <div className={isAnswerCorrect() ? styles.cipherVisible : styles.cipherInvisible}>
                {props.cipher}
            </div> */}
            <div className={styles.gridItem}>{props.id}</div>
        </div>
    );
}