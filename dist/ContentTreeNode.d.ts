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
declare const ContentTreeNode: (props: {
    node: ContentTreeNodeProps;
    depth?: number | undefined;
    addChildNodes: (node: ContentTreeNodeProps) => void;
    removeChildNodes: (node: ContentTreeNodeProps) => void;
    editEntry: (nodeId: string) => void;
}) => JSX.Element;
export default ContentTreeNode;
