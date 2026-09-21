declare module "@/components/GooeyNav.jsx" {
  type GooeyNavItem = { label: string; href: string };
  type GooeyNavProps = {
    items: GooeyNavItem[];
    animationTime?: number;
    particleCount?: number;
    particleDistances?: [number, number];
    particleR?: number;
    timeVariance?: number;
    colors?: number[];
    initialActiveIndex?: number;
    activeIndex?: number;
    onActiveChange?: (index: number) => void;
  };
  const GooeyNav: (props: GooeyNavProps) => import("react").JSX.Element;
  export default GooeyNav;
}
