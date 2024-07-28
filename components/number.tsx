'use client'

import React, { useEffect, useState } from "react";
import styles from "../app/page.module.css";

interface Props {
    key: number;
    id: number;
    question: string;
    imageURL: string;
    answerExpected: string[];
    isAnswerCorrect: boolean;
    onNumberClicked(id: number, question: string) : void;
};

export default function Number(props: Props) {
    const numberClickedEventHandler = () => {
        props.onNumberClicked(props.id, props.question);
    }

    return (
        <div className={styles.gridItem} onClick={numberClickedEventHandler}>
            <div className={styles.imageNumber}>{props.id}</div>
            <img className={props.isAnswerCorrect ? styles.imageVisible : styles.imageHidden} src={props.imageURL}></img>
        </div>
    );
}