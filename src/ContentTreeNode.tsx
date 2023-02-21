import React, { ReactElement, useState } from 'react';

import {
	StyledContentTreeNodeName,
	StyledContentTreeNodePublishingStatus,
	StyledContentTreeNodeWedge,
	StyledContentTreeTableNodeCell,
	StyledSpinner,
} from './ContentTree.styled';
import { Icon } from './Icons';

export interface ContentTreeNodeProps {
	id: string;
	name: string;
	contentType?: string;
	icon?: string;
	expand: boolean;
	parentId?: string;
	childNodes?: ContentTreeNodeProps[];
	hasChildNodes?: boolean;
	publishingStatus?: string;
	updatedAt?: string;
	publishedAt?: string;
}

const ContentTreeNode = (props: {
	node: ContentTreeNodeProps;
	depth?: number;
	addChildNodes: (node: ContentTreeNodeProps) => Promise<void>;
	removeChildNodes: (node: ContentTreeNodeProps) => void;
	editEntry: (nodeId: string) => Promise<void>;
}): ReactElement => {
	const [loading, setLoading] = useState(false);
	const [node] = useState(props.node);

	// React.useEffect(()=>{setLoading(false)},[props.node.childNodes])

	const addChildren = async (): Promise<void> => {
		setLoading(true);
		await props.addChildNodes(node);
		setLoading(false);
	};

	const handleEditEntry = (): void => {
		props.editEntry(props.node.id).catch((err) => {
			throw new Error('handleEditEntry', err);
		});
	};

	const handleAddChildren = (): void => {
		addChildren().catch((err) => {
			throw new Error('handleAddChildren', err);
		});
	};

	return (
		<>
			<tr>
				<StyledContentTreeTableNodeCell depth={props.depth}>
					<StyledContentTreeNodeWedge>
						{loading ? (
							<StyledSpinner>-</StyledSpinner>
						) : props.node.hasChildNodes ? (
							props.node.expand ? (
								<a onClick={() => props.removeChildNodes(props.node)}>-</a>
							) : (
								<a onClick={() => handleAddChildren()}>+</a>
							)
						) : null}
					</StyledContentTreeNodeWedge>
					<Icon id={props.node.icon}></Icon>
					<StyledContentTreeNodeName>
						<a onClick={() => handleEditEntry()} title={props.node.id}>
							{props.node.name}
						</a>
					</StyledContentTreeNodeName>
				</StyledContentTreeTableNodeCell>
				<td>{props.node.contentType}</td>
				<td>
					<StyledContentTreeNodePublishingStatus
						status={props.node.publishingStatus ?? ''}
					>
						{props.node.publishingStatus}
					</StyledContentTreeNodePublishingStatus>
				</td>
				<td>{props.node.updatedAt}</td>
				<td>{props.node.publishedAt}</td>
			</tr>
			{props.node.childNodes?.map((node, i) => {
				return (
					<ContentTreeNode
						key={i}
						node={node}
						depth={props.depth && props.depth + 1}
						addChildNodes={props.addChildNodes}
						removeChildNodes={props.removeChildNodes}
						editEntry={props.editEntry}
					/>
				);
			})}
		</>
	);
};

export default ContentTreeNode;
