import { css } from "@emotion/css";
import { ReactNode } from "react";

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

          filter: blur(100px);

          overflow: hidden;
        `}
      >
        <div
          className={css`
            flex-shrink: 0;

            width: 150vh;
            height: 150vh;

            background: radial-gradient(at 0% 0%, #ff9b9b 0%, transparent 60%),
              radial-gradient(at 90% 30%, #bce29e 0%, transparent 60%),
              radial-gradient(at 10% 70%, #8ea7e9 0%, transparent 60%),
              radial-gradient(at 100% 100%, #beadfa 0%, transparent 60%);

            @keyframes rotate {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }

            animation: rotate 10s linear infinite;
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
