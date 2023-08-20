import { Route, RouteSwitch } from "components/Router";
import { Main } from "pages/Main";
import { createRoot } from "react-dom/client";

const routes: Route[] = [{ pathname: "/", component: Main }];

function App() {
  return <RouteSwitch routes={routes} />;
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
