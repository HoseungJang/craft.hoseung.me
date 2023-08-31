import { css } from "@emotion/css";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function Column({ children }: Props) {
  return (
    <div
      className={css`
        width: 100%;

        display: flex;
        flex-direction: column;

        &:not(:last-child) {
          margin-right: 16px;
        }
      `}
    >
      {children}
    </div>
  );
}
