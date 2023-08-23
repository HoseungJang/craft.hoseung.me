import { css } from "@emotion/css";
import { Layout } from "./components/Layout";
import { useViewportSize } from "hooks/useViewportSize";
import { ReactNode, useMemo } from "react";
import { AspectRatio } from "components/AspectRatio";

interface Data {
  width: number;
  height: number;
}

const data: Data[] = [
  { width: 1, height: 0.5 },
  { width: 1, height: 1.2 },
  { width: 1, height: 0.8 },
  { width: 1, height: 1 },
  { width: 1, height: 0.7 },
  { width: 1, height: 0.7 },
  { width: 1, height: 0.8 },
  { width: 1, height: 0.7 },
  { width: 1, height: 0.4 },
  { width: 1, height: 1.3 },
  { width: 1, height: 0.4 },
  { width: 1, height: 0.8 },
  { width: 1, height: 0.3 },
  { width: 1, height: 1.2 },
  { width: 1, height: 1.2 },
  { width: 1, height: 0.7 },
  { width: 1, height: 0.7 },
  { width: 1, height: 0.8 },
  { width: 1, height: 1.3 },
  { width: 1, height: 0.6 },
  { width: 1, height: 1 },
];

export function Main() {
  const [vw] = useViewportSize();

  const columnLength = vw >= 1000 ? 3 : vw >= 500 ? 2 : 1;

  const columns = useMemo(() => {
    return data.reduce((acc, cur, index) => {
      acc[index % columnLength].push(cur);
      return acc;
    }, Array.from({ length: columnLength }).map(() => []) as Data[][]);
  }, [columnLength]);

  return (
    <Layout>
      <header
        className={css`
          width: 100%;

          margin: 4rem 0 2rem;
          padding: 0 16px;
        `}
      >
        <h1
          className={css`
            margin: 0;

            font-size: 2.4rem;
            color: rgba(0, 0, 0, 0.7);
          `}
        >
          Craft - WIP...
        </h1>
        <div
          className={css`
            > a {
              font-size: 1.2rem;
              font-weight: 500;
              color: rgba(0, 0, 0, 0.5);

              @media (hover: hover) {
                transition: color 0.15s;

                &:hover {
                  color: rgba(0, 0, 0, 0.4);
                }
              }

              &:not(:last-child) {
                margin-right: 8px;
              }
            }
          `}
        >
          <a href="https://about.hoseung.me">About</a>
          <a href="https://blog.hoseung.me">Blog</a>
          <a href="https://github.com/HoseungJang">Github</a>
        </div>
      </header>
      <main
        className={css`
          width: 100%;

          padding: 16px;
        `}
      >
        <div
          className={css`
            width: 100%;

            display: flex;
          `}
        >
          {columns.map((column) => (
            <Column>
              {column.map((row) => (
                <Row>
                  <AspectRatio width={row.width} height={row.height} />
                </Row>
              ))}
            </Column>
          ))}
        </div>
      </main>
    </Layout>
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

        background-color: rgba(0, 0, 0, 0.1);

        border: 2px solid rgba(0, 0, 0, 0.1);

        border-radius: 16px;

        &:not(:last-child) {
          margin-bottom: 16px;
        }
      `}
    >
      {children}
    </div>
  );
}
