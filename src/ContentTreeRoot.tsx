import {
	EntryProps,
	KeyValueMap,
	Link,
	PlainClientAPI,
} from 'contentful-management';
import { PageAppSDK } from 'contentful-ui-extensions-sdk';
import React, { ReactElement, useEffect, useState } from 'react';
import { useImmer } from 'use-immer';

import { StyledContentTreeTable } from './ContentTree.styled';
import ContentTreeNode, { ContentTreeNodeProps } from './ContentTreeNode';
import { emptyNodeProps, cfEntriesToNodes } from './ContentTreeUtils';

export interface ContentTreeRootProps {
	node: ContentTreeNodeProps;
	sdkInstance: PageAppSDK;
	cma: PlainClientAPI;
	nodeContentTypes: string[];
	titleFields: string[];
	locales: string[]; // the first is the default locale
	depth: number;
	iconRegistry?: { [index: string]: string };
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
	const [stLocale] = useState(locales[0]);
	const [stRoot, setStRoot] = useImmer(emptyNodeProps());

	useEffect(() => {
		if (node.id) {
			loadRootData(node).catch((err) => {
				throw new Error('loadRootData', err);
			});
		}
	}, [node]);

	const loadRootData = async (
		rootNode: ContentTreeNodeProps
	): Promise<void> => {
		const childEntries = await getContentfulChildEntries(rootNode.id);
		const childNodes = cfEntriesToNodes(
			childEntries,
			titleFields,
			stLocale,
			locales,
			nodeContentTypes,
			iconRegistry,
			rootNode.id
		);
		const nodes = [rootNode, ...childNodes];
		if (nodes.length > 0) {
			const newIdPositionMap = nodes.reduce((acc: any, el, i) => {
				acc[el.id] = i;
				return acc;
			}, {});
			let tree: ContentTreeNodeProps = emptyNodeProps();
			nodes.forEach((node: ContentTreeNodeProps) => {
				node.childNodes = [];
				if (!node.parentId) {
					tree = node;
					return;
				}
				const parentEl = nodes[newIdPositionMap[node.parentId]];
				if (parentEl) {
					parentEl.childNodes = [...(parentEl.childNodes ?? []), node];
					parentEl.expand = false;
				}
			});
			console.log('🌴 tree', tree);
			setStRoot(tree);
		}
	};

	const addChildNodes = async (node: ContentTreeNodeProps): Promise<void> => {
		let childNodes: ContentTreeNodeProps[] = [];
		const cfChildren = await getContentfulChildEntries(node.id);
		childNodes = cfEntriesToNodes(
			cfChildren,
			titleFields,
			stLocale,
			locales,
			nodeContentTypes,
			iconRegistry,
			node.id
		);
		setStRoot((draft) => {
			recursiveProcessNodes(
				node.id,
				(targetNode) => {
					targetNode.childNodes = childNodes;
					targetNode.expand = false;
				},
				draft
			);
		});
	};

	const recursiveProcessNodes = (
		targetNodeId: string,
		processNode: (node: ContentTreeNodeProps) => void,
		node: ContentTreeNodeProps
	): void => {
		if (node.id === targetNodeId) {
			processNode(node);
		}
		if (node.childNodes != null) {
			for (const targetNode of node.childNodes) {
				recursiveProcessNodes(targetNodeId, processNode, targetNode);
			}
		}
	};

	const editEntry = async (entryId: string): Promise<void> => {
		await sdkInstance.navigator.openEntry(entryId, { slideIn: true });
	};

	const getContentfulChildEntries = async (
		parentId: string
	): Promise<Array<EntryProps<KeyValueMap>>> => {
		const parentItem = await cma.entry.get({ entryId: parentId });
		const allChildIds: string[] = [];
		for (const key of Object.keys(parentItem.fields)) {
			if (nodeContentTypes.includes(key)) {
				const childNodeRefs = parentItem.fields[key][stLocale] as
					| Link<string>
					| Array<Link<string>>;
				if (Array.isArray(childNodeRefs)) {
					for (const childNodeRef of childNodeRefs) {
						allChildIds.push(childNodeRef.sys.id);
					}
				} else {
					allChildIds.push(childNodeRefs.sys.id);
				}
			}
		}
		const allItems: Array<EntryProps<KeyValueMap>> = [];
		let done = false;
		let skip = 0;
		while (!done) {
			const col = await cma.entry.getMany({
				query: {
					'sys.id[in]': allChildIds.join(','),
					skip,
				},
			});
			allItems.push(...col.items);
			if (allItems.length < col.total) {
				skip += 100;
			} else {
				done = true;
			}
		}
		const cfChildren: Array<EntryProps<KeyValueMap>> = [];
		const idPositionMap: { [index: string]: number } = allItems.reduce(
			(acc: any, el, i) => {
				acc[el.sys.id] = i;
				return acc;
			},
			{}
		);
		for (const childId of allChildIds) {
			if (allItems[idPositionMap[childId]]) {
				cfChildren.push(allItems[idPositionMap[childId]]);
			}
		}
		return cfChildren;
	};

	const removeChildNodes = (node: ContentTreeNodeProps): void => {
		setStRoot((draft) => {
			recursiveProcessNodes(
				node.id,
				(targetNode) => {
					targetNode.childNodes = [];
					targetNode.expand = true;
				},
				draft
			);
		});
	};

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
	);
};
