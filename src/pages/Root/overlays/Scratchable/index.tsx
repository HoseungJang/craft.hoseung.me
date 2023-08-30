import { css } from "@emotion/css";
import { useEffect, useRef, useState } from "react";
import { Scratchable as ScratchableRenderer } from "scratchable";
import { AspectRatio } from "components/AspectRatio";
import { OverlayProps } from "../../models/overlay";
import { history } from "utils/history";

export function Scratchable({ isOpen }: OverlayProps) {
  const [opacity, setOpacity] = useState(() => (history.state.animate ? 0 : 1));

  useEffect(() => {
    let started: number | null = null;
    let elapsed = 0;
    const duration = 200;

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
      if (history.state.animate) {
        animate({ from: 0, to: 1 });
        history.replace(history.pathname, {});
      }
    } else {
      animate({ from: 1, to: 0 });
    }
  }, [isOpen]);

  return (
    <div
      className={css`
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        background-color: #e3cef6;
        opacity: ${opacity};
      `}
    >
      <div
        className={css`
          font-size: 2rem;
          font-weight: 500;
        `}
      >
        Scratchable
      </div>
      <a
        href="https://github.com/HoseungJang/scratchable"
        className={css`
          margin-bottom: 1rem;

          text-decoration: underline;
        `}
      >
        https://github.com/HoseungJang/scratchable
      </a>
      <div
        className={css`
          width: 80%;
          max-width: 500px;
        `}
      >
        <AspectRatio width={1} height={0.8}>
          <Card />
        </AspectRatio>
      </div>
    </div>
  );
}

function Card() {
  const [ready, setReady] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (container == null) {
      return;
    }

    const scratchable = new ScratchableRenderer({
      container,
      background: {
        type: "linear-gradient",
        gradients: [
          { offset: 0, color: "#FA58D0" },
          { offset: 0.5, color: "#DA81F5" },
          { offset: 1, color: "#BE81F7" },
        ],
      },
    });

    scratchable.render().then(() => setReady(true));
  }, []);

  return (
    <div
      className={css`
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        background-color: #ffffff;

        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

        border-radius: 24px;

        opacity: ${ready ? 1 : 0};

        transition: opacity 0.2s;

        overflow: hidden;
      `}
      ref={ref}
    >
      <div
        className={css`
          font-size: 1.8rem;
          font-weight: 700;
        `}
      >
        Hi there!
      </div>
    </div>
  );
}
