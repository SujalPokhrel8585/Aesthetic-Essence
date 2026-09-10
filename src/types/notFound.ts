export type StickFigure = {
  top?: string;
  bottom?: string;
  src: string;
  baseRotate?: number; // static starting rotation, degrees
  speedX?: number; // ms to cross the screen; omit for a static figure
  speedRotation?: number; // ms per full spin
};
