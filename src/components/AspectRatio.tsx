import { css } from "@emotion/css";
import { ReactNode } from "react";

interface Props {
  width: number;
  height: number;
  children?: ReactNode;
}

export function AspectRatio({ width, height, children }: Props) {
  return (
    <div
      className={css`
        position: relative;
        width: 100%;
      `}
    >
      <div
        className={css`
          padding-bottom: ${(height / width) * 100}%;
        `}
      />
      <div
        className={css`
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;

          width: 100%;
          height: 100%;
        `}
      >
        {children}
      </div>
    </div>
  );
}
