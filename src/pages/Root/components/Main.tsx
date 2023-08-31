import { css } from "@emotion/css";
import { AspectRatio } from "components/AspectRatio";
import { useViewportSize } from "hooks/useViewportSize";
import { ReactNode, useMemo } from "react";
import { history } from "utils/history";
import { OVERLAY_ROUTES } from "../constants/overlay";
import { OverlayRoute } from "../models/overlay";
import { Column } from "./Column";
import { Row } from "./Row";
import { FullFadeInImage } from "./FullFadeInImage";

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
        padding: 16px 24px;
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
                    history.push(row.pathname, { animate: true });
                  }}
                >
                  <div
                    className={css`
                      padding: 16px;
                    `}
                  >
                    <AspectRatio width={row.thumbnail.ratio.width} height={row.thumbnail.ratio.height}>
                      <div
                        className={css`
                          width: 100%;
                          height: 100%;

                          border-radius: 16px;

                          overflow: hidden;

                          isolation: isolate;
                        `}
                      >
                        <FullFadeInImage src={row.thumbnail.url} alt={row.title} />
                      </div>
                    </AspectRatio>
                    <div
                      className={css`
                        margin-top: 12px;

                        font-size: 1.4rem;
                        font-weight: 500;
                      `}
                    >
                      {row.title}
                    </div>
                  </div>
                </a>
              </Row>
            ))}
          </Column>
        ))}
      </div>
    </main>
  );
}
