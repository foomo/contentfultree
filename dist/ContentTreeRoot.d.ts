import type { PlainClientAPI } from 'contentful-management'
import type { PageAppSDK } from '@contentful/app-sdk'
import { type ReactElement } from 'react'
import { type ContentTreeNodeProps } from './ContentTreeNode'
import type { IconId } from './Icons'
export interface ContentTreeRootProps {
	node: ContentTreeNodeProps
	sdkInstance: PageAppSDK
	cma: PlainClientAPI
	nodeContentTypes: string[]
	titleFields: string[]
	locales: string[]
	depth: number
	iconRegistry?: Record<string, IconId>
}
export declare const ContentTreeRoot: ({
	node,
	sdkInstance,
	cma,
	nodeContentTypes,
	titleFields,
	locales,
	depth,
	iconRegistry,
}: ContentTreeRootProps) => ReactElement
