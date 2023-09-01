import { css } from "@emotion/css";
import { useEffect, useRef, useState } from "react";
import { AspectRatio } from "components/AspectRatio";
import { OverlayProps } from "../../models/overlay";
import { Animator } from "utils/animation";
import { easeInCubic, easeOutBounce, easeOutCubic } from "utils/easings";

export function FlipBook({ isOpen }: OverlayProps) {
  const [isInitialAnimationDone, setIsInitialAnimationDone] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const containerShadowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const flipBookTopRef = useRef<HTMLDivElement>(null);
  const flipBookTopShadowRef = useRef<HTMLDivElement>(null);
  const flipBookBottomRef = useRef<HTMLDivElement>(null);
  const flipBookBottomShadowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const containerShadow = containerShadowRef.current;
    const title = titleRef.current;
    const flipBookTop = flipBookTopRef.current;
    const flipBookTopShadow = flipBookTopShadowRef.current;
    const flipBookBottom = flipBookBottomRef.current;
    const flipBookBottomShadow = flipBookBottomShadowRef.current;

    if (
      container == null ||
      containerShadow == null ||
      title == null ||
      flipBookTop == null ||
      flipBookTopShadow == null ||
      flipBookBottom == null ||
      flipBookBottomShadow == null
    ) {
      return;
    }

    if (isOpen) {
      const containerAnimator1 = new Animator(container, {
        opacity: { from: 0, to: 1 },
        duration: 400,
        easing: easeOutCubic,
      });

      const containerAnimator2 = new Animator(container, {
        rotateX: { from: 90, to: 0 },
        duration: 800,
        delay: 500,
        easing: easeInCubic,
      });

      const containerShadowAnimator = new Animator(containerShadow, {
        opacity: { from: 1, to: 0 },
        duration: 800,
        delay: 500,
        easing: easeInCubic,
      });

      const titleAnimator = new Animator(title, {
        opacity: { from: 0, to: 1 },
        translateY: { from: 70, to: 0 },
        duration: 400,
        delay: 1500,
        easing: easeOutCubic,
      });

      const flipTopAnimator = new Animator(flipBookTop, {
        rotateX: { from: -90, to: 0 },
        duration: 1500,
        delay: 1700,
        easing: easeOutBounce,
      });

      flipBookTopShadow.style.background = "linear-gradient(#6e6e6e 0%, #585858 30%, #424242 60%, #2e2e2e 100%)";
      const flipTopShadowAnimator = new Animator(flipBookTopShadow, {
        opacity: { from: 1, to: 0 },
        duration: 1500,
        delay: 1700,
        easing: easeOutBounce,
      });

      const flipBottomAnimator = new Animator(flipBookBottom, {
        rotateX: { from: 90, to: 0 },
        duration: 1500,
        delay: 1700,
        easing: easeOutBounce,
      });

      flipBookBottomShadow.style.background = "linear-gradient(#2e2e2e 0%, #424242 40%, #585858 70%, #6e6e6e 100%)";
      const flipBottomShadowAnimator = new Animator(flipBookBottomShadow, {
        opacity: { from: 1, to: 0 },
        duration: 1500,
        delay: 1700,
        easing: easeOutBounce,
      });

      containerAnimator1.play();
      containerAnimator2.play();
      containerShadowAnimator.play();
      titleAnimator.play();
      flipTopAnimator.play();
      flipTopShadowAnimator.play();
      flipBottomAnimator.play();
      flipBottomShadowAnimator.play();

      setTimeout(() => setIsInitialAnimationDone(true), 4000);

      return () => {
        containerAnimator1.seek(1);
        containerAnimator2.seek(1);
        containerShadowAnimator.seek(1);
        titleAnimator.seek(1);
        flipTopAnimator.seek(1);
        flipTopShadowAnimator.seek(1);
        flipBottomAnimator.seek(1);
        flipBottomShadowAnimator.seek(1);
      };
    } else {
      const containerAnimator1 = new Animator(container, {
        rotateY: { from: 0, to: 90 },
        duration: 800,
        easing: easeOutCubic,
      });

      const containerAnimator2 = new Animator(container, {
        opacity: { from: 1, to: 0 },
        duration: 400,
        delay: 800,
        easing: easeOutCubic,
      });

      containerAnimator1.play();
      containerAnimator2.play();

      return () => {
        containerAnimator1.seek(1);
        containerAnimator2.seek(1);
      };
    }
  }, [isOpen]);

  const flipBookPageTopRef = useRef<HTMLDivElement>(null);
  const flipBookPageTopShadowRef = useRef<HTMLDivElement>(null);
  const flipBookPageBottomRef = useRef<HTMLDivElement>(null);
  const flipBookPageBottomShadowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isInitialAnimationDone) {
      return;
    }

    const flipBookPageTop = flipBookPageTopRef.current;
    const flipBookPageTopShadow = flipBookPageTopShadowRef.current;
    const flipBookTopShadow = flipBookTopShadowRef.current;
    const flipBookPageBottom = flipBookPageBottomRef.current;
    const flipBookPageBottomShadow = flipBookPageBottomShadowRef.current;
    const flipBookBottomShadow = flipBookBottomShadowRef.current;

    if (
      flipBookPageTop == null ||
      flipBookPageTopShadow == null ||
      flipBookTopShadow == null ||
      flipBookPageBottom == null ||
      flipBookPageBottomShadow == null ||
      flipBookBottomShadow == null
    ) {
      return;
    }

    flipBookPageTop.style.display = "block";
    flipBookPageBottom.style.display = "block";

    const animate = () => {
      const flipBookPageTopAnimator = new Animator(flipBookPageTop, {
        rotateX: { from: 0, to: -90 },
        duration: 750,
      });

      flipBookPageTopShadow.style.background = "linear-gradient(#424242 0%, #2e2e2e 100%)";
      const flipBookPageTopShadowAnimator = new Animator(flipBookPageTopShadow, {
        opacity: { from: 0, to: 1 },
        duration: 750,
      });

      flipBookTopShadow.style.background = "linear-gradient(#424242 0%, #2e2e2e 100%)";
      const flipBookTopShadowAnimator = new Animator(flipBookTopShadow, {
        opacity: { from: 1, to: 0 },
        duration: 1125,
      });

      flipBookPageBottom.style.transform = "rotateX(90deg)";
      const flipBookPageBottomAnimator = new Animator(flipBookPageBottom, {
        rotateX: { from: 90, to: 0 },
        duration: 750,
        delay: 750,
      });

      flipBookPageBottomShadow.style.background = "linear-gradient(#585858 0%, #6e6e6e 100%)";
      const flipBookPageBottomShadowAnimator = new Animator(flipBookPageBottomShadow, {
        opacity: { from: 1, to: 0 },
        duration: 750,
        delay: 750,
      });

      flipBookBottomShadow.style.background = "linear-gradient(#2e2e2e 100%, #424242 0%)";
      const flipBookBottomShadowAnimator = new Animator(flipBookBottomShadow, {
        opacity: { from: 0, to: 1 },
        duration: 1500,
      });

      flipBookPageTopAnimator.play();
      flipBookPageTopShadowAnimator.play();
      flipBookTopShadowAnimator.play();
      flipBookPageBottomAnimator.play();
      flipBookPageBottomShadowAnimator.play();
      flipBookBottomShadowAnimator.play();
    };

    animate();

    const intervalId = setInterval(animate, 2000);
    return () => clearInterval(intervalId);
  }, [isInitialAnimationDone]);

  return (
    <div
      className={css`
        width: 100%;
        height: 100%;

        perspective: 2000px;
      `}
    >
      <div
        className={css`
          position: relative;

          width: 100%;
          height: 100%;

          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          background-color: #a4a4a4;

          transform: rotateX(90deg);
          transform-origin: 0% 100%;
          transform-style: preserve-3d;

          opacity: 0;
        `}
        ref={containerRef}
      >
        <div
          className={css`
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;

            background: linear-gradient(#d8d8d8 0%, #a4a4a4 30%, #6e6e6e 100%);
          `}
          ref={containerShadowRef}
        />

        <div
          className={css`
            margin-bottom: 16px;

            font-size: 2rem;
            font-weight: 500;

            opacity: 0;
          `}
          ref={titleRef}
        >
          Flip Book
        </div>

        <div
          className={css`
            width: 60%;
            max-width: 500px;
          `}
        >
          <AspectRatio width={1} height={0.8}>
            <div
              className={css`
                position: relative;

                width: 100%;
                height: 100%;

                perspective: 900px;
              `}
            >
              <div
                className={css`
                  position: relative;
                  z-index: 0;

                  width: 100%;
                  height: 50%;

                  background-color: #6e6e6e;

                  transform: rotateX(-90deg);
                  transform-origin: 0% 100%;
                  transform-style: preserve-3d;

                  border-radius: 24px 24px 0 0;

                  overflow: hidden;
                `}
                ref={flipBookTopRef}
              >
                <div
                  className={css`
                    width: 100%;
                    height: 100%;

                    opacity: 1;
                  `}
                  ref={flipBookTopShadowRef}
                />
              </div>

              <div
                className={css`
                  position: absolute;
                  top: 0;
                  left: 0;
                  z-index: 1;

                  width: 100%;
                  height: 50%;

                  display: none;

                  background-color: #6e6e6e;

                  transform: rotateX(0);
                  transform-origin: 0% 100%;
                  transform-style: preserve-3d;

                  border-radius: 24px 24px 0 0;

                  overflow: hidden;
                `}
                ref={flipBookPageTopRef}
              >
                <div
                  className={css`
                    width: 100%;
                    height: 100%;

                    opacity: 0;
                  `}
                  ref={flipBookPageTopShadowRef}
                />
              </div>

              <div
                className={css`
                  position: absolute;
                  top: 50%;
                  left: 0;
                  z-index: 1;

                  width: 100%;
                  height: 50%;

                  display: none;

                  background-color: #6e6e6e;

                  transform: rotateX(90deg);
                  transform-origin: 0% 0%;
                  transform-style: preserve-3d;

                  border-radius: 0 0 24px 24px;

                  overflow: hidden;
                `}
                ref={flipBookPageBottomRef}
              >
                <div
                  className={css`
                    width: 100%;
                    height: 100%;

                    opacity: 1;
                  `}
                  ref={flipBookPageBottomShadowRef}
                />
              </div>

              <div
                className={css`
                  position: relative;
                  z-index: 0;

                  width: 100%;
                  height: 50%;

                  background-color: #6e6e6e;

                  transform: rotateX(90deg);
                  transform-origin: 0% 0%;
                  transform-style: preserve-3d;

                  border-radius: 0 0 24px 24px;

                  overflow: hidden;
                `}
                ref={flipBookBottomRef}
              >
                <div
                  className={css`
                    width: 100%;
                    height: 100%;

                    opacity: 1;
                  `}
                  ref={flipBookBottomShadowRef}
                />
              </div>
            </div>
          </AspectRatio>
        </div>
      </div>
    </div>
  );
}
