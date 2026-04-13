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
