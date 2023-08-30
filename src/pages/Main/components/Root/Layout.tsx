import { css } from "@emotion/css";
import { ReactNode } from "react";

interface Props {
  background: ReactNode;
  children: ReactNode;
}

export function Layout({ background, children }: Props) {
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
        {background}
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
