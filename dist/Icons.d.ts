import type { ReactElement } from 'react'
export type IconId =
	| 'WORLD'
	| 'PAGE'
	| 'APP'
	| 'CART'
	| 'FOLDER'
	| 'LOVE'
	| 'SHORTCUT'
export declare const Icon: (props: { id?: IconId }) => ReactElement
export declare const StyledIcon: import('styled-components/dist/types').IStyledComponentBase<
	'web',
	import('styled-components').FastOmit<
		import('react').DetailedHTMLProps<
			import('react').HTMLAttributes<HTMLSpanElement>,
			HTMLSpanElement
		>,
		never
	>
> &
	string
