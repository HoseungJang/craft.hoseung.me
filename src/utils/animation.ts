import { clamp } from "./clamp";

export interface Animation {
  opacity?: AnimationProperty;
  translateX?: AnimationProperty;
  translateY?: AnimationProperty;
  scale?: AnimationProperty;
  width?: AnimationProperty;
  height?: AnimationProperty;
  duration: number;
  delay?: number;
  easing?: (progress: number) => number;
}

interface AnimationProperty {
  from: number;
  to: number;
}

export class Animator {
  private readonly element: HTMLElement;
  private readonly animation: Animation;

  private frameId: number | null = null;
  private prevFrameTimestamp: number | null = null;
  private delayProgress: number = 0;
  private animationProgress: number = 0;

  constructor(element: HTMLElement, animation: Animation) {
    this.element = element;
    this.animation = animation;
  }

  private animate(timestamp: number) {
    if (this.prevFrameTimestamp == null) {
      this.prevFrameTimestamp = timestamp;
    }

    if (
      this.animationProgress === 0 &&
      this.animation.delay != null &&
      this.animation.delay > 0 &&
      this.delayProgress < 1
    ) {
      this.delayProgress = this.delayProgress + (timestamp - this.prevFrameTimestamp) / this.animation.delay;

      this.prevFrameTimestamp = timestamp;
      this.requestFrame();
      return;
    }

    this.animationProgress = clamp(
      this.animationProgress + (timestamp - this.prevFrameTimestamp) / this.animation.duration,
      0,
      1
    );

    const easingProgress = this.animation.easing?.(this.animationProgress) ?? this.animationProgress;

    if (this.animation.width != null) {
      const { from, to } = this.animation.width;

      this.element.style.width = `${from + (to - from) * easingProgress}px`;
    }

    if (this.animation.height != null) {
      const { from, to } = this.animation.height;

      this.element.style.height = `${from + (to - from) * easingProgress}px`;
    }

    if (this.animation.translateX != null || this.animation.translateY != null || this.animation.scale != null) {
      const translateX = (() => {
        if (this.animation.translateX == null) {
          return 0;
        }

        const { from, to } = this.animation.translateX;

        return from + (to - from) * easingProgress;
      })();

      const translateY = (() => {
        if (this.animation.translateY == null) {
          return 0;
        }

        const { from, to } = this.animation.translateY;

        return from + (to - from) * easingProgress;
      })();

      const scale = (() => {
        if (this.animation.scale == null) {
          return 1;
        }

        const { from, to } = this.animation.scale;

        return from + (to - from) * easingProgress;
      })();

      this.element.style.transform = `translate3d(${translateX}px, ${translateY}px, 0px) scale(${scale})`;
    }

    if (this.animation.opacity != null) {
      const { from, to } = this.animation.opacity;

      this.element.style.opacity = `${from + (to - from) * easingProgress}`;
    }

    if (this.animationProgress >= 1) {
      this.prevFrameTimestamp = null;
      this.frameId = null;
      return;
    }

    this.prevFrameTimestamp = timestamp;
    this.requestFrame();
  }

  private requestFrame() {
    this.frameId = requestAnimationFrame((timestamp) => this.animate(timestamp));
  }

  private cancelFrame() {
    if (this.frameId != null) {
      cancelAnimationFrame(this.frameId);
    }
  }

  public play() {
    this.requestFrame();
  }

  public pause() {
    this.cancelFrame();
    this.prevFrameTimestamp = null;
  }
}
