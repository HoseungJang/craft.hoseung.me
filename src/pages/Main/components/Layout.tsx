import { css } from "@emotion/css";
import { ReactNode } from "react";

const red = "#f675a8";
const green = "#c8ffe0";
const blue = "#8ea7e9";
const purple = "#beadfa";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      className={css`
        width: 100vw;
        min-height: 100vh;
      `}
    >
      <div
        className={css`
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 0;

          display: flex;
          justify-content: center;
          align-items: center;

          filter: blur(50px);

          overflow: hidden;
        `}
      >
        <div
          className={css`
            position: absolute;
            z-index: 0;

            flex-shrink: 0;

            width: 200vh;
            height: 200vh;

            background: radial-gradient(at 0% 0%, ${red} 0%, transparent 50%),
              radial-gradient(at 5% 0%, ${red} 0%, transparent 30%),
              radial-gradient(at 100% 100%, ${purple} 0%, transparent 50%),
              radial-gradient(at 30% 50%, ${purple} 0%, transparent 30%),
              radial-gradient(at 80% 10%, ${purple} 0%, transparent 40%),
              radial-gradient(at 80% 60%, ${red} 0%, transparent 30%);

            @keyframes background-rotate {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }

            animation: background-rotate 15s linear infinite;
          `}
        />
        <div
          className={css`
            position: absolute;
            z-index: 1;

            flex-shrink: 0;

            width: 200vh;
            height: 200vh;

            background: radial-gradient(at 50% 100%, ${green} 0%, transparent 40%),
              radial-gradient(at 35% 30%, ${green} 0%, transparent 40%),
              radial-gradient(at 55% 35%, ${blue} 0%, transparent 30%),
              radial-gradient(at 10% 70%, ${blue} 0%, transparent 30%),
              radial-gradient(at 10% 70%, ${blue} 0%, transparent 30%);

            @keyframes background-rotate-reverse {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(-360deg);
              }
            }

            animation: background-rotate-reverse 20s linear infinite;
          `}
        />
      </div>
      <div
        className={css`
          position: relative;
          z-index: 1;
        `}
      >
        {children}
      </div>
    </div>
  );
}
