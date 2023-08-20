import { ComponentType, useEffect, useMemo, useState } from "react";
import { history } from "utils/history";

export interface Route {
  pathname: string;
  component: ComponentType;
}

interface RouteSwitchProps {
  routes: Route[];
}

export function RouteSwitch({ routes }: RouteSwitchProps) {
  const [currentRoute, setCurrentRoute] = useState(() => routes.find((route) => route.pathname === history.pathname));

  useEffect(() => {
    history.listen((e) => {
      setCurrentRoute(routes.find((route) => route.pathname === e.pathname));
    });
  }, [routes]);

  if (currentRoute == null) {
    return;
  }

  const Component = currentRoute.component;

  return <Component />;
}
