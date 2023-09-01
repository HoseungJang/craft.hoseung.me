import { css } from "@emotion/css";
import { useEffect, useRef } from "react";
import { Scratchable as ScratchableRenderer } from "scratchable";
import { AspectRatio } from "components/AspectRatio";
import { OverlayProps } from "../../models/overlay";
import { Animator } from "utils/animation";
import { easeInBack, easeInOutQuart, easeOutBack, easeOutBounce, easeOutCubic } from "utils/easings";

export function Scratchable({ isOpen }: OverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const title = titleRef.current;
    const link = linkRef.current;

    if (container == null || title == null || link == null) {
      return;
    }

    if (isOpen) {
      const containerAnimator = new Animator(container, {
        translateY: { from: window.innerHeight, to: 0 },
        duration: 800,
        easing: easeOutBounce,
      });

      const titleAnimator = new Animator(title, {
        opacity: { from: 0, to: 1 },
        translateY: { from: 70, to: 0 },
        duration: 400,
        delay: 1000,
        easing: easeOutCubic,
      });

      const linkAnimator = new Animator(link, {
        opacity: { from: 0, to: 1 },
        translateY: { from: 70, to: 0 },
        duration: 400,
        delay: 1200,
        easing: easeOutCubic,
      });

      containerAnimator.play();
      titleAnimator.play();
      linkAnimator.play();

      return () => {
        containerAnimator.seek(1);
        titleAnimator.seek(1);
        linkAnimator.seek(1);
      };
    } else {
      const containerAnimator = new Animator(container, {
        translateY: { from: 0, to: window.innerHeight },
        duration: 800,
        delay: 600,
        easing: easeInOutQuart,
      });

      const titleAnimator = new Animator(title, {
        scale: { from: 1, to: 0 },
        duration: 400,
        delay: 200,
        easing: easeInBack,
      });

      const linkAnimator = new Animator(link, {
        scale: { from: 1, to: 0 },
        duration: 400,
        delay: 100,
        easing: easeInBack,
      });

      containerAnimator.play();
      titleAnimator.play();
      linkAnimator.play();

      return () => {
        containerAnimator.seek(1);
        titleAnimator.seek(1);
        linkAnimator.seek(1);
      };
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
      `}
      ref={containerRef}
    >
      <div
        className={css`
          font-size: 2rem;
          font-weight: 500;

          opacity: 0;
        `}
        ref={titleRef}
      >
        Scratchable
      </div>
      <a
        href="https://github.com/HoseungJang/scratchable"
        className={css`
          margin-bottom: 1rem;

          text-decoration: underline;

          opacity: 0;
        `}
        ref={linkRef}
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
          <Card isOpen={isOpen} />
        </AspectRatio>
      </div>
    </div>
  );
}

function Card({ isOpen }: { isOpen: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (container == null) {
      return;
    }

    if (isOpen) {
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

      const containerAnimator = new Animator(container, {
        scale: { from: 0, to: 1 },
        duration: 400,
        delay: 1800,
        easing: easeOutBack,
      });

      scratchable.render().then(() => containerAnimator.play());

      return () => {
        containerAnimator.seek(1);
      };
    } else {
      const containerAnimator = new Animator(container, {
        scale: { from: 1, to: 0 },
        duration: 400,
        easing: easeInBack,
      });

      containerAnimator.play();

      return () => {
        containerAnimator.seek(1);
      };
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

        background-color: #ffffff;

        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

        border-radius: 24px;

        transform: scale(0);

        overflow: hidden;

        isolation: isolate;
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
