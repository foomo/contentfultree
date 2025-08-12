import type { PlainClientAPI } from 'contentful-management'
import type { PageAppSDK } from 'contentful-ui-extensions-sdk'
import { type ReactElement } from 'react'
export interface ContentTreeProps {
	sdkInstance: PageAppSDK
	cma: PlainClientAPI
	rootType: string
	nodeContentTypes: string[]
	titleFields: string[]
	locales: string[]
	indentation?: number
	iconRegistry?: Record<string, string>
}
export declare const ContentTree: ({
	sdkInstance,
	cma,
	rootType,
	nodeContentTypes,
	titleFields,
	locales,
	indentation,
	iconRegistry,
}: ContentTreeProps) => ReactElement
