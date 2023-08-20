import { css } from "@emotion/css";
import { Layout } from "./components/Layout";

export function Main() {
  return (
    <Layout>
      <div
        className={css`
          width: 100vw;
          height: 100vh;

          display: flex;
          justify-content: center;
          align-items: center;

          font-size: 3rem;
          font-weight: 700;
        `}
      >
        WIP...
      </div>
    </Layout>
  );
}
