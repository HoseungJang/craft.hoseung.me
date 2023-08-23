import { injectGlobal } from "@emotion/css";
import { Route, RouteSwitch } from "components/Router";
import { Main } from "pages/Main";
import { createRoot } from "react-dom/client";

const routes: Route[] = [{ pathname: "/", component: Main }];

injectGlobal`
  html, body {
    margin: 0;
    padding: 0;

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

function App() {
  return <RouteSwitch routes={routes} />;
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
