import { css } from "@emotion/css";
import { OverlayProps } from "../../models/overlay";
import { useEffect, useState } from "react";

export function Scratchable({ isOpen }: OverlayProps) {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    let started: number | null = null;
    let elapsed = 0;
    const duration = 500;

    const animate = ({ from, to }: { from: number; to: number }) => {
      const callback = (time: number) => {
        if (started == null) {
          started = time;
        }

        elapsed = time - started;

        const progress = elapsed / duration;

        const offset = to - from;

        setOpacity(from + offset * progress);

        if (progress < 1) {
          requestAnimationFrame(callback);
        }
      };

      requestAnimationFrame(callback);
    };

    if (isOpen) {
      animate({ from: 0, to: 1 });
    } else {
      animate({ from: 1, to: 0 });
    }
  }, [isOpen]);

  return (
    <div
      className={css`
        width: 100%;
        height: 100%;

        background-color: #ffffff;
        opacity: ${opacity};
      `}
    />
  );
}
