import React, { type FC, type ReactElement, type SVGProps } from 'react'
export type SVGIcon = FC<SVGProps<SVGSVGElement>>
export interface IconProps {
	icon?: SVGIcon
}
export declare const Icon: (props: { id?: string }) => ReactElement
export declare const StyledIcon: import('styled-components/dist/types').IStyledComponentBase<
	'web',
	import('styled-components').FastOmit<
		React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLSpanElement>,
			HTMLSpanElement
		>,
		never
	>
> &
	string
