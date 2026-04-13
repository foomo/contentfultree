import { useState } from 'react'
import {
	Fragment as _Fragment,
	jsx as _jsx,
	jsxs as _jsxs,
} from 'react/jsx-runtime'
import {
	StyledContentTreeNodeName,
	StyledContentTreeNodePublishingStatus,
	StyledContentTreeNodeWedge,
	StyledContentTreeTableNodeCell,
	StyledSpinner,
} from './ContentTree.styled'
import { Icon } from './Icons'

const ContentTreeNode = (props) => {
	const [loading, setLoading] = useState(false)
	const addChildren = async (node) => {
		setLoading(true)
		await props.addChildNodes(node)
		setLoading(false)
	}
	const handleEditEntry = () => {
		props.editEntry(props.node.id).catch((err) => {
			console.error('handleEditEntry', err)
		})
	}
	const handleAddChildren = (node) => {
		addChildren(node).catch((err) => {
			console.error('handleAddChildren', err)
		})
	}
	return _jsxs(_Fragment, {
		children: [
			_jsxs('tr', {
				children: [
					_jsxs(StyledContentTreeTableNodeCell, {
						$depth: props.depth,
						children: [
							_jsx(StyledContentTreeNodeWedge, {
								children: loading
									? _jsx(StyledSpinner, { children: '-' })
									: props.node.hasChildNodes
										? props.node.expand
											? _jsx('a', {
													onClick: () => {
														handleAddChildren(props.node)
													},
													children: '+',
												})
											: _jsx('a', {
													onClick: () => {
														props.removeChildNodes(props.node)
													},
													children: '-',
												})
										: null,
							}),
							_jsx(Icon, { id: props.node.icon }),
							_jsx(StyledContentTreeNodeName, {
								children: _jsx('a', {
									onClick: () => {
										handleEditEntry()
									},
									title: props.node.id,
									children: props.node.name,
								}),
							}),
						],
					}),
					_jsx('td', { children: props.node.contentType }),
					_jsx('td', {
						children: _jsx(StyledContentTreeNodePublishingStatus, {
							$status: props.node.publishingStatus ?? '',
							children: props.node.publishingStatus,
						}),
					}),
					_jsx('td', { children: props.node.updatedAt }),
					_jsx('td', { children: props.node.publishedAt }),
				],
			}),
			props.node.childNodes?.map((node, i) => {
				return _jsx(
					ContentTreeNode,
					{
						node: node,
						depth: props.depth && props.depth + 1,
						addChildNodes: props.addChildNodes,
						removeChildNodes: props.removeChildNodes,
						editEntry: props.editEntry,
					},
					i.toString(),
				)
			}),
		],
	})
}

export { ContentTreeNode }
