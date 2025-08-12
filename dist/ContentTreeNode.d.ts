import { type ReactElement } from 'react'
export interface ContentTreeNodeProps {
	id: string
	name: string
	contentType?: string
	icon?: string
	expand: boolean
	parentId?: string
	childNodes?: ContentTreeNodeProps[]
	hasChildNodes?: boolean
	publishingStatus?: string
	updatedAt?: string
	publishedAt?: string
}
declare const ContentTreeNode: (props: {
	node: ContentTreeNodeProps
	depth?: number
	addChildNodes: (node: ContentTreeNodeProps) => Promise<void>
	removeChildNodes: (node: ContentTreeNodeProps) => void
	editEntry: (nodeId: string) => Promise<void>
}) => ReactElement
export default ContentTreeNode
