import { OverlayRoute } from "../models/overlay";
import { Scratchable } from "../overlays";

export const OVERLAY_ROUTES: OverlayRoute[] = [
  {
    thumbnail: { url: "", ratio: { width: 1, height: 0.8 } },
    pathname: "/scratchable",
    component: Scratchable,
  },
];
