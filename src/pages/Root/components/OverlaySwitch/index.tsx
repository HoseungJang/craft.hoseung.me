import { css } from "@emotion/css";
import { useEffect, useState } from "react";
import { HistoryEvent, history } from "utils/history";
import { OverlayComponent } from "../../models/overlay";
import { OVERLAY_ROUTES } from "../../constants/overlay";

export function OverlaySwitch() {
  const [pathname, setPathname] = useState(() => history.pathname);
  const [Component, setComponent] = useState<OverlayComponent | null>(
    () => OVERLAY_ROUTES.find((route) => route.pathname === history.pathname)?.component ?? null
  );

  useEffect(() => {
    const listen = (e: HistoryEvent) => {
      setPathname(e.pathname);

      const nextComponent = OVERLAY_ROUTES.find((route) => route.pathname === e.pathname)?.component ?? null;
      if (nextComponent != null) {
        setComponent(() => nextComponent);
      }
    };

    const unlisten = history.listen(listen);
    return () => unlisten();
  }, []);

  return (
    <div
      className={css`
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;

        width: 100%;
        height: 100%;

        pointer-events: ${Component != null && pathname !== "/" ? "auto" : "none"};
      `}
    >
      {Component != null && <Component isOpen={pathname !== "/"} />}
    </div>
  );
}
