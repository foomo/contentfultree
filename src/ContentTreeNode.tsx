import { type ReactElement, useState } from 'react'

import { Icon, type IconId } from './Icons.js'

export interface ContentTreeNodeProps {
	id: string
	name: string
	contentType?: string
	icon?: IconId
	expand: boolean
	parentId?: string
	childNodes?: ContentTreeNodeProps[]
	hasChildNodes?: boolean
	publishingStatus?: string
	updatedAt?: string
	publishedAt?: string
}

const publishingStatusStyles: Record<string, string> = {
	draft: 'text-[rgb(177,45,0)] bg-[rgb(253,229,192)]',
	changed: 'text-[rgb(0,89,200)] bg-[rgb(206,236,255)]',
	published: 'text-[rgb(0,109,35)] bg-[rgb(205,243,198)]',
}

const ContentTreeNode = (props: {
	node: ContentTreeNodeProps
	depth?: number
	addChildNodes: (node: ContentTreeNodeProps) => Promise<void>
	removeChildNodes: (node: ContentTreeNodeProps) => void
	editEntry: (nodeId: string) => Promise<void>
}): ReactElement => {
	const [loading, setLoading] = useState(false)

	const addChildren = async (node: ContentTreeNodeProps): Promise<void> => {
		setLoading(true)
		await props.addChildNodes(node)
		setLoading(false)
	}

	const handleEditEntry = (): void => {
		props.editEntry(props.node.id).catch((err: unknown) => {
			console.error('handleEditEntry', err)
		})
	}

	const handleAddChildren = (node: ContentTreeNodeProps): void => {
		addChildren(node).catch((err: unknown) => {
			console.error('handleAddChildren', err)
		})
	}

	return (
		<>
			<tr>
				<td
					className="pr-8 text-black min-w-[450px]"
					style={{ paddingLeft: `${props.depth}em` }}
				>
					<div className="inline-block w-4 text-left">
						{loading ? (
							<div className="inline-block w-4 animate-spin">-</div>
						) : props.node.hasChildNodes ? (
							props.node.expand ? (
								<a
									className="cursor-pointer text-[130%] leading-none"
									onClick={() => {
										handleAddChildren(props.node)
									}}
								>
									+
								</a>
							) : (
								<a
									className="cursor-pointer text-[130%] leading-none"
									onClick={() => {
										props.removeChildNodes(props.node)
									}}
								>
									-
								</a>
							)
						) : null}
					</div>
					<Icon id={props.node.icon} />
					<div className="inline-block">
						<a
							className="cursor-pointer hover:underline"
							onClick={() => {
								handleEditEntry()
							}}
							title={props.node.id}
						>
							{props.node.name}
						</a>
					</div>
				</td>
				<td className="py-[0.2em] pr-4 pl-[0.2em] text-gray-400 border-b border-[#efefef]">
					{props.node.contentType}
				</td>
				<td className="py-[0.2em] pr-4 pl-[0.2em] text-gray-400 border-b border-[#efefef]">
					<div
						className={`inline-block font-sans font-semibold text-[80%] uppercase tracking-[0.06rem] rounded px-[0.2rem] ${publishingStatusStyles[props.node.publishingStatus ?? ''] ?? ''}`}
					>
						{props.node.publishingStatus}
					</div>
				</td>
				<td className="py-[0.2em] pr-4 pl-[0.2em] text-gray-400 border-b border-[#efefef]">
					{props.node.updatedAt}
				</td>
				<td className="py-[0.2em] pr-4 pl-[0.2em] text-gray-400 border-b border-[#efefef]">
					{props.node.publishedAt}
				</td>
			</tr>
			{props.node.childNodes?.map((node, i) => {
				return (
					<ContentTreeNode
						key={i.toString()}
						node={node}
						depth={props.depth && props.depth + 1}
						addChildNodes={props.addChildNodes}
						removeChildNodes={props.removeChildNodes}
						editEntry={props.editEntry}
					/>
				)
			})}
		</>
	)
}

export { ContentTreeNode }
