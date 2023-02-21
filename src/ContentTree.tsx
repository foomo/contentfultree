import {
	EntryProps,
	KeyValueMap,
	Link,
	PlainClientAPI,
} from 'contentful-management';
import { PageExtensionSDK } from 'contentful-ui-extensions-sdk';
import React, { ReactElement, useEffect, useState } from 'react';
import { useImmer } from 'use-immer';

import { StyledContentTreeTable } from './ContentTree.styled';
import ContentTreeNode, { ContentTreeNodeProps } from './ContentTreeNode';

export interface ContentTreeProps {
	sdkInstance: PageExtensionSDK;
	cma: PlainClientAPI;
	rootType: string;
	nodeContentTypes: string[];
	titleFields: string[];
	locales: string[]; // the first is the default locale
	iconRegistry?: { [index: string]: string };
}

const emptyNodeProps = (): ContentTreeNodeProps => {
	return { id: '', name: '', expand: false, parentId: '' };
};

export const ContentTree = (props: ContentTreeProps): ReactElement => {
	const [stLocale] = useState(props.locales[0]);
	const [stRoot, setStRoot] = useImmer(emptyNodeProps());

	// EFFECTS

	useEffect(() => {
		if (props.sdkInstance) {
			loadRootData().catch((err) => {
				throw new Error('loadRootData', err);
			});
		}
	}, [props.sdkInstance]);

	// FUNCTIONS

	const addChildNodes = async (node: ContentTreeNodeProps): Promise<void> => {
		let childNodes: ContentTreeNodeProps[] = [];
		const cfChildren = await getContentfulChildEntries(node.id);
		childNodes = cfEntriesToNodes(cfChildren, node.id);
		setStRoot((draft) => {
			recursiveProcessNodes(
				node.id,
				(targetNode) => {
					targetNode.childNodes = childNodes;
					targetNode.expand = true;
				},
				draft
			);
			console.log('🎈draft', draft);
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
		await props.sdkInstance.navigator.openEntry(entryId, { slideIn: true });
	};

	const getContentfulChildEntries = async (
		parentId: string
	): Promise<Array<EntryProps<KeyValueMap>>> => {
		const parentItem = await props.cma.entry.get({ entryId: parentId });
		const allChildIds: string[] = [];
		for (const key of Object.keys(parentItem.fields)) {
			if (props.nodeContentTypes.includes(key)) {
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
			const col = await props.cma.entry.getMany({
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

	const cfEntriesToNodes = (
		entries: Array<EntryProps<KeyValueMap>>,
		parentId?: string
	): ContentTreeNodeProps[] => {
		if (entries.length === 0) {
			return [];
		}
		const nodeArray: ContentTreeNodeProps[] = [];
		entries.forEach((entry) => {
			if (!entry) {
				console.log('this entry is nil');
				return;
			}
			let name = '';
			for (const titleField of props.titleFields) {
				if (entry.fields[titleField]?.[stLocale]) {
					name = entry.fields[titleField][stLocale];
					break;
				}
			}
			if (name === '') {
				name = entry.sys.id;
			}
			const node: ContentTreeNodeProps = {
				id: entry.sys.id,
				name,
				contentType: entry.sys.contentType.sys.id,
				icon:
					props.iconRegistry != null
						? props.iconRegistry[entry.sys.contentType.sys.id]
						: '',
				expand: !!parentId,
				parentId,
				hasChildNodes: cfEntryHasChildren(entry),
				publishingStatus: cfEntryPublishingStatus(entry),
				updatedAt: entry.sys.updatedAt,
				publishedAt: entry.sys.publishedAt,
			};
			nodeArray.push(node);
		});
		return nodeArray;
	};

	const cfEntryHasChildren = (entry: EntryProps<KeyValueMap>): boolean => {
		for (const nodeContentType of props.nodeContentTypes) {
			for (const locale of props.locales) {
				if (entry.fields[nodeContentType]?.[locale]) {
					return true;
				}
			}
		}
		return false;
	};

	const cfEntryPublishingStatus = (entry: EntryProps<KeyValueMap>): string => {
		if (!entry.sys.publishedVersion) {
			return 'draft';
		}
		if (entry.sys.version - entry.sys.publishedVersion === 1) {
			return 'published';
		}
		return 'changed';
	};

	const loadRootData = async (): Promise<void> => {
		const CfRootData = await props.cma.entry.getMany({
			query: { content_type: props.rootType },
		});
		const rootNodes = cfEntriesToNodes(CfRootData.items);
		for (const rootNode of rootNodes) {
			const childEntries = await getContentfulChildEntries(rootNode.id);
			const childNodes = cfEntriesToNodes(childEntries, rootNode.id);
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
						parentEl.expand = true;
					}
				});
				console.log('🌴 tree', tree);
				setStRoot(tree);
			}
		}
	};

	const removeChildNodes = (node: ContentTreeNodeProps): void => {
		setStRoot((draft) => {
			recursiveProcessNodes(
				node.id,
				(targetNode) => {
					targetNode.childNodes = [];
					targetNode.expand = false;
				},
				draft
			);
			console.log('🎈draft', draft);
		});
	};

	console.log(
		'=============================== RENDER ====================================',
		stRoot
	);
	// create ID mapping
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
						depth={0}
						addChildNodes={addChildNodes}
						removeChildNodes={removeChildNodes}
						editEntry={editEntry}
					/>
				</tbody>
			</StyledContentTreeTable>
		</>
	);
};
