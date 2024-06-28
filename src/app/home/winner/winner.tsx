"use client";


import './winner.scss';
import Confetti from 'react-confetti';


export default function Winner() {

    return (
        <Confetti recycle={false}/>
    )
}