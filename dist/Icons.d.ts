import { FC, ReactElement, SVGProps } from 'react';
export type SVGIcon = FC<SVGProps<SVGSVGElement>>;
export interface IconProps {
    icon?: SVGIcon;
}
export declare const Icon: (props: {
    id?: string;
}) => ReactElement;
export declare const StyledIcon: import("styled-components").StyledComponent<"span", any, {}, never>;
