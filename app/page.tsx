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

    return (
        <main className={styles.main}>
            <div>Znanjem do slatkisa!</div>
            <div className={styles.grid}>
                {/* {numbers.map((n) => (
                    <Number key={n.id} id={n.id} question={n.question} imageURL={n.imageURL} isAnswerCorrect={false} />
                ))} */}
                <div className={styles.gridItem}>1</div>
                <div className={styles.gridItem}>2</div>
                <div className={styles.gridItem}>3</div>
                <div className={styles.gridItem}>4</div>
                <div className={styles.gridItem}>5</div>
            </div>
        </main>
    );
}
