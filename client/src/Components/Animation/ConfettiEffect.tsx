import s from "../../Styles/ConfettiEffect.module.css";
import { useEffect, useRef } from "react";
import { getRandomNumber, getRandomInt } from "../../Utils/calculations";

function ConfettiEffect() {
  const confetti = useRef<HTMLDivElement>(null);

  const createConfettiPieces = () => {
    if (!confetti.current) return;

    const pageWidth = confetti.current.offsetWidth;
    // const pageHeight = confetti.current.offsetHeight;
    const colorList = [
      "DodgerBlue",
      "OliveDrab",
      "Gold",
      "Pink",
      "SlateBlue",
      "LightBlue",
      "Gold",
      "Violet",
      "PaleGreen",
      "SteelBlue",
      "SandyBrown",
      "Chocolate",
      "Crimson",
    ];
    for (let i = 0; i < 15; i++) {
      const piece = document.createElement("span");
      const height = getRandomNumber(5, 15);
      const width = getRandomNumber(5, 10);
      const color = colorList[getRandomNumber(0, colorList.length - 1)];
      const skewX = getRandomNumber(0, 30);
      const skewY = getRandomNumber(0, 30);
      const left = getRandomNumber(20, pageWidth - 20);
      const delay = getRandomInt(0, 3);
      const duration = getRandomInt(5, 8);

      //   piece.className = "confettiPiece";
      piece.style.position = "absolute";
      piece.style.height = `${height}px`;
      piece.style.width = `${width}px`;
      piece.style.background = `${color}`;
      piece.style.transform = `skew(${skewX}deg, ${skewY}deg)`;
      piece.style.left = `${left}px`;
      piece.style.animationDelay = `${delay}s`;
      piece.style.animationDuration = `${duration}s`;
      piece.style.top = `-20px`;

      confetti.current.appendChild(piece);
    }
    return;
  };

  useEffect(() => {
    createConfettiPieces();
  }, []);

  return (
    <div className={s.confettiContainer}>
      <div className={s.confettiWrapper} ref={confetti}></div>
    </div>
  );
}

export default ConfettiEffect;
