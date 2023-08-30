import { OverlayRoute } from "../models/overlay";
import { Scratchable } from "../overlays";

export const OVERLAY_ROUTES: OverlayRoute[] = [
  {
    thumbnail: { url: "/thumbnails/scratchable.png", ratio: { width: 1, height: 0.77 } },
    title: "Scratchable",
    pathname: "/scratchable",
    component: Scratchable,
  },
];
