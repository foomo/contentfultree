import type { PlainClientAPI } from 'contentful-management'
import type { PageAppSDK } from 'contentful-ui-extensions-sdk'
import { type ReactElement } from 'react'
import { type ContentTreeNodeProps } from './ContentTreeNode'
export interface ContentTreeRootProps {
	node: ContentTreeNodeProps
	sdkInstance: PageAppSDK
	cma: PlainClientAPI
	nodeContentTypes: string[]
	titleFields: string[]
	locales: string[]
	depth: number
	iconRegistry?: Record<string, string>
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
