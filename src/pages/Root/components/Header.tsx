import { css } from "@emotion/css";

export function Header() {
  return (
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
        Craft
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
  );
}
