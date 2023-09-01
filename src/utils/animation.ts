import { clamp } from "./clamp";

export interface Animation {
  opacity?: AnimationProperty;
  translateX?: TranslateProperty;
  translateY?: TranslateProperty;
  scale?: AnimationProperty;
  rotateX?: AnimationProperty;
  rotateY?: AnimationProperty;
  width?: AnimationProperty;
  height?: AnimationProperty;
  duration: number;
  delay?: number;
  easing?: (progress: number) => number;
}

interface AnimationProperty {
  from: number;
  to: number;
  easing?: (progress: number) => number;
}

interface TranslateProperty extends AnimationProperty {
  unit?: "px" | "%";
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

    this.applyStyles();

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

  private applyStyles() {
    if (this.animation.width != null) {
      const { from, to, easing } = this.animation.width;

      const easingProgress =
        easing?.(this.animationProgress) ?? this.animation.easing?.(this.animationProgress) ?? this.animationProgress;

      this.element.style.width = `${from + (to - from) * easingProgress}px`;
    }

    if (this.animation.height != null) {
      const { from, to, easing } = this.animation.height;

      const easingProgress =
        easing?.(this.animationProgress) ?? this.animation.easing?.(this.animationProgress) ?? this.animationProgress;

      this.element.style.height = `${from + (to - from) * easingProgress}px`;
    }

    const translate3d = (() => {
      const values = [this.animation.translateX, this.animation.translateY].map((property) => {
        if (property == null) {
          return null;
        }

        const { from, to, easing, unit = "px" } = property;

        const easingProgress =
          easing?.(this.animationProgress) ?? this.animation.easing?.(this.animationProgress) ?? this.animationProgress;

        const value = from + (to - from) * easingProgress;

        return `${value}${unit}`;
      });

      if (values.every((value) => value == null)) {
        return null;
      }

      const [x, y] = values;

      return `translate3d(${x ?? 0}, ${y ?? 0}, 0)`;
    })();

    const scale = (() => {
      if (this.animation.scale == null) {
        return null;
      }

      const { from, to, easing } = this.animation.scale;

      const easingProgress =
        easing?.(this.animationProgress) ?? this.animation.easing?.(this.animationProgress) ?? this.animationProgress;

      return `scale(${from + (to - from) * easingProgress})`;
    })();

    const rotateX = (() => {
      if (this.animation.rotateX == null) {
        return null;
      }

      const { from, to, easing } = this.animation.rotateX;

      const easingProgress =
        easing?.(this.animationProgress) ?? this.animation.easing?.(this.animationProgress) ?? this.animationProgress;

      return `rotateX(${from + (to - from) * easingProgress}deg)`;
    })();

    const rotateY = (() => {
      if (this.animation.rotateY == null) {
        return null;
      }

      const { from, to, easing } = this.animation.rotateY;

      const easingProgress =
        easing?.(this.animationProgress) ?? this.animation.easing?.(this.animationProgress) ?? this.animationProgress;

      return `rotateY(${from + (to - from) * easingProgress}deg)`;
    })();

    const transform = [translate3d, scale, rotateX, rotateY].filter((func) => func != null).join(", ");
    if (transform.length > 0) {
      this.element.style.transform = transform;
    }

    if (this.animation.opacity != null) {
      const { from, to, easing } = this.animation.opacity;

      const easingProgress =
        easing?.(this.animationProgress) ?? this.animation.easing?.(this.animationProgress) ?? this.animationProgress;

      this.element.style.opacity = `${from + (to - from) * easingProgress}`;
    }
  }

  public play() {
    this.requestFrame();
  }

  public seek(progress: number) {
    this.animationProgress = progress;
    this.applyStyles();
  }

  public pause() {
    this.cancelFrame();
    this.prevFrameTimestamp = null;
  }
}
