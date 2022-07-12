import React, { useState } from 'react';

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
  contentType: string;
  icon: string;
  expand: boolean;
  parentId: string;
  childNodes?: ContentTreeNodeProps[];
  hasChildNodes?: boolean;
  publishingStatus: string;
  updatedAt?: string;
  publishedAt?: string;
}

const ContentTreeNode = (props: { 
    node: ContentTreeNodeProps; 
    depth?: number; 
    addChildNodes: (node: ContentTreeNodeProps) => void; 
    removeChildNodes: (node: ContentTreeNodeProps) => void;
    editEntry: (nodeId:string) => void;
  }) => {
  
  const [loading, setLoading] = useState(false);
  const [node, setNode] = useState(props.node)

  // React.useEffect(()=>{setLoading(false)},[props.node.childNodes])

  const addChildren = async () => {
    setLoading(true);
    await props.addChildNodes(node)
    setLoading(false);
  }

  return (
    <>
      <tr>
        <StyledContentTreeTableNodeCell depth={props.depth}>
          <StyledContentTreeNodeWedge>
            {loading? (<StyledSpinner>&#8635;</StyledSpinner>): props.node.hasChildNodes ? props.node.expand? (
            <a onClick={() => props.removeChildNodes(props.node)}>&#9660;</a>
            ) : (
            <a onClick={() => addChildren()}>&#11136;</a>
            ): null}
          </StyledContentTreeNodeWedge>
          <Icon id={props.node.icon}></Icon>
          <StyledContentTreeNodeName>
          <a onClick={() => props.editEntry(props.node.id)} title={props.node.id}>{props.node.name}</a>
          </StyledContentTreeNodeName>
        </StyledContentTreeTableNodeCell>
        <td>{props.node.contentType}</td>
        <td><StyledContentTreeNodePublishingStatus status={props.node.publishingStatus}>{props.node.publishingStatus}</StyledContentTreeNodePublishingStatus></td>
        <td>{props.node.updatedAt}</td>
        <td>{props.node.publishedAt}</td>
      </tr>
      {props.node.childNodes?.map((node, i) => {
        return <ContentTreeNode key={i} node={node} depth={props.depth! + 1} addChildNodes={props.addChildNodes} removeChildNodes={props.removeChildNodes} editEntry={props.editEntry}/>;
      })}
    </>
  );
};

export default ContentTreeNode;
