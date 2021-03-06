import { FC, SVGProps } from 'react';
export declare type SVGIcon = FC<SVGProps<SVGSVGElement>>;
export interface IconProps {
    icon?: SVGIcon;
}
export declare const Icon: (props: {
    id?: string;
}) => JSX.Element;
export declare const StyledIcon: import("styled-components").StyledComponent<"span", any, {}, never>;
