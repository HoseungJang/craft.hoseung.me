import { css } from "@emotion/css";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function Row({ children }: Props) {
  return (
    <div
      className={css`
        width: 100%;

        background-color: rgba(255, 255, 255, 0.1);

        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

        border-radius: 16px;

        transform: scale(1);

        &:not(:last-child) {
          margin-bottom: 16px;
        }

        @media (hover: hover) {
          transition: background-color 0.4s, box-shadow 0.4s, transform 0.4s;

          &:hover {
            background-color: rgba(255, 255, 255, 0.15);

            box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;

            transform: scale(1.02);
          }
        }
      `}
    >
      {children}
    </div>
  );
}
