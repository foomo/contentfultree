import { EntryProps, KeyValueMap } from 'contentful-management';
import { ContentTreeNodeProps } from './ContentTreeNode';
export declare const emptyNodeProps: () => ContentTreeNodeProps;
export declare const cfEntriesToNodes: (entries: Array<EntryProps<KeyValueMap>>, titleFields: string[], stLocale: string, locales: string[], nodeContentTypes: string[], iconRegistry?: {
    [index: string]: string;
} | undefined, parentId?: string) => ContentTreeNodeProps[];
