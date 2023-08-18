'use client'
import { useEffect } from 'react';
import anime from './anime.min.js';
import './movingLetters.css';

export default function MovingLetters({text}) {

    useEffect(() => {
        var textWrapper = document.querySelector('.ml6 .letters');
        textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

        anime.timeline({ loop: true })
            .add({
                targets: '.ml6 .letter',
                translateY: ["1.1em", 0],
                translateZ: 0,
                duration: 750,
                delay: (el, i) => 50 * i
            }).add({
                targets: '.ml6',
                opacity: 0,
                duration: 1000,
                easing: "easeOutExpo",
                delay: 1000
            });
    }, [])
    return (
        <h1 className="ml6">
            <span className="text-wrapper">
                <span className="letters">{text}</span>
            </span>
        </h1>
    )
}