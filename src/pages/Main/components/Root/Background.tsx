import { css } from "@emotion/css";
import { useViewportSize } from "hooks/useViewportSize";

const red = "#fddde6";
const green = "#e5fdd1";
const blue = "#b9f3fc";
const purple = "#d6cadd";

export function Background() {
  const [vw, vh] = useViewportSize();

  const backgroundSize = vw > vh ? vw * 1.5 : vh * 1.5;

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
            radial-gradient(at 80% 60%, ${red} 0%, transparent 40%);

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

          width: ${backgroundSize}px;
          height: ${backgroundSize}px;

          background: radial-gradient(at 0% 0%, ${red} 0%, transparent 50%),
            radial-gradient(at 5% 0%, ${red} 0%, transparent 30%),
            radial-gradient(at 50% 100%, ${green} 0%, transparent 40%),
            radial-gradient(at 40% 30%, ${green} 0%, transparent 30%),
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
  );
}
