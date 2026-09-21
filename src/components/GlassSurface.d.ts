declare module "@/components/GlassSurface.jsx" {
  import type { CSSProperties, ReactNode } from "react";

  type GlassSurfaceProps = {
    children?: ReactNode;
    width?: number | string;
    height?: number | string;
    borderRadius?: number;
    borderWidth?: number;
    brightness?: number;
    opacity?: number;
    blur?: number;
    displace?: number;
    backgroundOpacity?: number;
    saturation?: number;
    distortionScale?: number;
    redOffset?: number;
    greenOffset?: number;
    blueOffset?: number;
    xChannel?: string;
    yChannel?: string;
    mixBlendMode?: string;
    className?: string;
    style?: CSSProperties;
  };
  const GlassSurface: (props: GlassSurfaceProps) => import("react").JSX.Element;
  export default GlassSurface;
}
