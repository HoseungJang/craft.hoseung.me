import { css } from "@emotion/css";
import { AspectRatio } from "components/AspectRatio";
import { useViewportSize } from "hooks/useViewportSize";
import { ReactNode, useMemo } from "react";
import { history } from "utils/history";
import { OVERLAY_ROUTES } from "../constants/overlay";
import { OverlayRoute } from "../models/overlay";

export function Main() {
  const [vw] = useViewportSize();

  const columnLength = vw >= 1000 ? 3 : vw >= 500 ? 2 : 1;

  const columns = useMemo(() => {
    return OVERLAY_ROUTES.reduce((acc, cur, index) => {
      acc[index % columnLength].push(cur);
      return acc;
    }, Array.from({ length: columnLength }).map(() => []) as OverlayRoute[][]);
  }, [columnLength]);

  return (
    <main
      className={css`
        width: 100%;

        margin-bottom: 4rem;
        padding: 16px;
      `}
    >
      <div
        className={css`
          width: 100%;

          display: flex;
        `}
      >
        {columns.map((column, index) => (
          <Column key={index}>
            {column.map((row, index) => (
              <Row key={index}>
                <a
                  href={row.pathname}
                  onClick={(e) => {
                    if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) {
                      return;
                    }

                    e.preventDefault();
                    history.push(row.pathname);
                  }}
                >
                  <AspectRatio width={row.thumbnail.ratio.width} height={row.thumbnail.ratio.height} />
                </a>
              </Row>
            ))}
          </Column>
        ))}
      </div>
    </main>
  );
}

function Column({ children }: { children: ReactNode }) {
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

function Row({ children }: { children: ReactNode }) {
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
