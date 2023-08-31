import { css } from "@emotion/css";
import { ImgHTMLAttributes, useEffect, useState } from "react";

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
}

export function FullFadeInImage({ src, alt }: Props) {
  const [isLoaded, setIsLoaded] = useState(() => {
    const image = new Image();
    image.src = src;
    return image.complete;
  });

  useEffect(() => {
    if (isLoaded) {
      return;
    }

    const image = new Image();
    image.src = src;
    image.onload = () => setIsLoaded(true);
  }, [src, isLoaded]);

  return (
    <img
      className={css`
        width: 100%;
        height: 100%;

        opacity: ${isLoaded ? 1 : 0};

        transition: opacity 0.2s;

        overflow: hidden;
      `}
      src={src}
      alt={alt}
    />
  );
}
