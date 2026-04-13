import type { EntryProps, KeyValueMap } from 'contentful-management'
import type { ContentTreeNodeProps } from './ContentTreeNode'
import type { IconId } from './Icons'
export declare const emptyNodeProps: () => ContentTreeNodeProps
export declare const cfEntriesToNodes: (
	entries: EntryProps<KeyValueMap>[],
	titleFields: string[],
	stLocale: string,
	locales: string[],
	nodeContentTypes: string[],
	iconRegistry?: Record<string, IconId>,
	parentId?: string,
) => ContentTreeNodeProps[]
