import type {
	EntryProps,
	KeyValueMap,
	Link,
	PlainClientAPI,
} from 'contentful-management'
import type { PageAppSDK } from 'contentful-ui-extensions-sdk'
import { type ReactElement, useEffect, useState } from 'react'

import { StyledContentTreeTable } from './ContentTree.styled'
import { ContentTreeNode, type ContentTreeNodeProps } from './ContentTreeNode'
import { cfEntriesToNodes, emptyNodeProps } from './ContentTreeUtils'
import type { IconId } from './Icons'

export interface ContentTreeRootProps {
	node: ContentTreeNodeProps
	sdkInstance: PageAppSDK
	cma: PlainClientAPI
	nodeContentTypes: string[]
	titleFields: string[]
	locales: string[] // the first is the default locale
	depth: number
	iconRegistry?: Record<string, IconId>
}

export const ContentTreeRoot = ({
	node,
	sdkInstance,
	cma,
	nodeContentTypes,
	titleFields,
	locales,
	depth,
	iconRegistry,
}: ContentTreeRootProps): ReactElement => {
	const [stLocale] = useState(locales[0])
	const [stRoot, setStRoot] = useState(emptyNodeProps())

	useEffect(() => {
		if (!node.id) {
			return
		}

		const loadRootData = async (
			rootNode: ContentTreeNodeProps,
		): Promise<void> => {
			const childEntries = await getContentfulChildEntries(rootNode.id)
			const childNodes = cfEntriesToNodes(
				childEntries,
				titleFields,
				stLocale,
				locales,
				nodeContentTypes,
				iconRegistry,
				rootNode.id,
			)
			const nodes = [rootNode, ...childNodes]
			if (nodes.length > 0) {
				const newIdPositionMap = nodes.reduce(
					(acc: Record<string, number>, el, i) => {
						acc[el.id] = i
						return acc
					},
					{},
				)
				let tree: ContentTreeNodeProps = emptyNodeProps()
				for (const node of nodes) {
					node.childNodes = []
					if (!node.parentId) {
						tree = node
						continue
					}
					const parentEl = nodes[newIdPositionMap[node.parentId]]
					if (parentEl) {
						parentEl.childNodes = [...(parentEl.childNodes ?? []), node]
						parentEl.expand = false
					}
				}
				setStRoot(tree)
			}
		}

		loadRootData(node).catch((err: unknown) => {
			console.error('loadRootData', err)
		})
	}, [
		node,
		cma,
		titleFields,
		stLocale,
		locales,
		nodeContentTypes,
		iconRegistry,
	])

	const addChildNodes = async (node: ContentTreeNodeProps): Promise<void> => {
		const cfChildren = await getContentfulChildEntries(node.id)
		const childNodes = cfEntriesToNodes(
			cfChildren,
			titleFields,
			stLocale,
			locales,
			nodeContentTypes,
			iconRegistry,
			node.id,
		)

		setStRoot((prevState) => {
			const newState = structuredClone(prevState)
			recursiveProcessNodes(
				node.id,
				(targetNode) => {
					targetNode.childNodes = childNodes
					targetNode.expand = false
				},
				newState,
			)
			return newState
		})
	}

	const recursiveProcessNodes = (
		targetNodeId: string,
		processNode: (node: ContentTreeNodeProps) => void,
		node: ContentTreeNodeProps,
	): void => {
		if (node.id === targetNodeId) {
			processNode(node)
		}
		if (node.childNodes != null) {
			for (const targetNode of node.childNodes) {
				recursiveProcessNodes(targetNodeId, processNode, targetNode)
			}
		}
	}

	const editEntry = async (entryId: string): Promise<void> => {
		await sdkInstance.navigator.openEntry(entryId, { slideIn: true })
	}

	const getContentfulChildEntries = async (
		parentId: string,
	): Promise<EntryProps<KeyValueMap>[]> => {
		const parentItem = await cma.entry.get({ entryId: parentId })
		const allChildIds: string[] = []
		for (const key of Object.keys(parentItem.fields)) {
			if (nodeContentTypes.includes(key)) {
				const childNodeRefs = parentItem.fields[key][stLocale] as
					| Link<string>
					| Link<string>[]
				if (Array.isArray(childNodeRefs)) {
					for (const childNodeRef of childNodeRefs) {
						allChildIds.push(childNodeRef.sys.id)
					}
				} else {
					allChildIds.push(childNodeRefs.sys.id)
				}
			}
		}
		const allItems: EntryProps<KeyValueMap>[] = []
		let done = false
		let skip = 0
		while (!done) {
			const col = await cma.entry.getMany({
				query: {
					'sys.id[in]': allChildIds.join(','),
					skip,
				},
			})
			allItems.push(...col.items)
			if (allItems.length < col.total) {
				skip += 100
			} else {
				done = true
			}
		}
		const cfChildren: EntryProps<KeyValueMap>[] = []
		const idPositionMap: Record<string, number> = allItems.reduce(
			(acc: Record<string, number>, el, i) => {
				acc[el.sys.id] = i
				return acc
			},
			{},
		)
		for (const childId of allChildIds) {
			if (allItems[idPositionMap[childId]]) {
				cfChildren.push(allItems[idPositionMap[childId]])
			}
		}
		return cfChildren
	}

	const removeChildNodes = (node: ContentTreeNodeProps): void => {
		setStRoot((prevState) => {
			const newState = structuredClone(prevState)
			recursiveProcessNodes(
				node.id,
				(targetNode) => {
					targetNode.childNodes = []
					targetNode.expand = true
				},
				newState,
			)
			return newState
		})
	}

	return (
		<>
			<StyledContentTreeTable>
				<tbody>
					<tr>
						<th>Nodes</th>
						<th>Content Type</th>
						<th>Status</th>
						<th>Last Modified</th>
						<th>Last Published</th>
					</tr>
					<ContentTreeNode
						node={stRoot}
						depth={depth}
						addChildNodes={addChildNodes}
						removeChildNodes={removeChildNodes}
						editEntry={editEntry}
					/>
				</tbody>
			</StyledContentTreeTable>
		</>
	)
}
