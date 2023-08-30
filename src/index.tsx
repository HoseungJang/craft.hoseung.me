import { injectGlobal } from "@emotion/css";
import { Main } from "pages/Main";
import { createRoot } from "react-dom/client";

injectGlobal`
  html, body {
    margin: 0;
    padding: 0;

    width: 100%;
    height: 100%;

    overflow-y: auto;

    font-size: 100%;
    font-weight: 300;
    font-family: 'Nunito', sans-serif;


    * {
      box-sizing: border-box;
    }

    a {
      color: #000000;
      text-decoration: none;
    }
  }
`;

const root = createRoot(document.getElementById("root")!);
root.render(<Main />);
