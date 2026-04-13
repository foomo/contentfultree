import type { EntryProps, KeyValueMap } from 'contentful-management';
import type { ContentTreeNodeProps } from './ContentTreeNode.js';
import type { IconId } from './Icons.js';
export declare const emptyNodeProps: () => ContentTreeNodeProps;
export declare const cfEntriesToNodes: (entries: EntryProps<KeyValueMap>[], titleFields: string[], stLocale: string, locales: string[], nodeContentTypes: string[], iconRegistry?: Record<string, IconId>, parentId?: string) => ContentTreeNodeProps[];
