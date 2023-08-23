import { css } from "@emotion/css";
import { ReactNode } from "react";
import { useViewportSize } from "hooks/useViewportSize";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div
      className={css`
        width: 100%;
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
        `}
      >
        <Background />
      </div>
      <div
        className={css`
          position: relative;
          z-index: 1;

          width: 100%;

          display: flex;
          justify-content: center;
        `}
      >
        <div
          className={css`
            width: 100%;
            max-width: 1440px;
          `}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

const red = "#f675a8";
const green = "#c8ffe0";
const blue = "#8ea7e9";
const purple = "#beadfa";

function Background() {
  const [vw, vh] = useViewportSize();

  const backgroundSize = vw > vh ? vw * 1.2 : vh * 1.2;

  return (
    <div
      className={css`
        width: 100%;
        height: 100%;

        display: flex;
        justify-content: center;
        align-items: center;

        overflow: hidden;
      `}
    >
      <div
        className={css`
          position: absolute;
          z-index: 0;

          flex-shrink: 0;

          width: ${backgroundSize}px;
          height: ${backgroundSize}px;

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

          filter: blur(50px);
        `}
      />
      <div
        className={css`
          position: absolute;
          z-index: 1;

          flex-shrink: 0;

          width: ${backgroundSize}px;
          height: ${backgroundSize}px;

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

          filter: blur(50px);
        `}
      />
    </div>
  );
}
