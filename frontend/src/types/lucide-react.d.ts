import { ComponentType, SVGProps } from 'react';

export interface LucideProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
  strokeWidth?: number | string;
}

export type LucideIcon = ComponentType<LucideProps>;

export const Plus: LucideIcon;
export const LineChart: LucideIcon;
export const User: LucideIcon;
export const Settings: LucideIcon;
export const Bell: LucideIcon;
export const Shield: LucideIcon;
export const Dumbbell: LucideIcon;
export const Apple: LucideIcon;
export const Trophy: LucideIcon;
export const ArrowRight: LucideIcon; 