import { css } from "@emotion/css";
import { AspectRatio } from "components/AspectRatio";
import { useViewportSize } from "hooks/useViewportSize";
import { useEffect, useMemo } from "react";
import { history } from "utils/history";
import { OVERLAY_ROUTES } from "../constants/overlay";
import { OverlayRoute } from "../models/overlay";
import { Column } from "./Column";
import { Row } from "./Row";
import { FullFadeInImage } from "./FullFadeInImage";
import { useOverlay } from "../contexts/Overlay";

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
                <Item {...row} />
              </Row>
            ))}
          </Column>
        ))}
      </div>
    </main>
  );
}

function Item({ pathname, thumbnail, title, component }: OverlayRoute) {
  const overlay = useOverlay();

  useEffect(() => {
    if (history.pathname === pathname) {
      overlay.open(component);
    }

    const unlisten = history.listen((e) => {
      if (e.pathname === pathname) {
        overlay.open(component);
      } else {
        overlay.close();
      }
    });

    return () => unlisten();
  }, [overlay, pathname, component]);

  return (
    <a
      href={pathname}
      onClick={(e) => {
        if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) {
          return;
        }

        e.preventDefault();
        history.push(pathname);
      }}
    >
      <div
        className={css`
          padding: 16px;
        `}
      >
        <AspectRatio width={thumbnail.ratio.width} height={thumbnail.ratio.height}>
          <div
            className={css`
              width: 100%;
              height: 100%;

              border-radius: 16px;

              overflow: hidden;

              isolation: isolate;
            `}
          >
            <FullFadeInImage src={thumbnail.url} alt={title} />
          </div>
        </AspectRatio>
        <div
          className={css`
            margin-top: 12px;

            font-size: 1.4rem;
            font-weight: 500;
          `}
        >
          {title}
        </div>
      </div>
    </a>
  );
}
