import { ComponentType } from "react";

export interface OverlayProps {
  isOpen: boolean;
}

export type OverlayComponent = ComponentType<OverlayProps>;

export interface OverlayRoute {
  thumbnail: {
    url: string;
    ratio: {
      width: number;
      height: number;
    };
  };
  pathname: string;
  component: OverlayComponent;
}
