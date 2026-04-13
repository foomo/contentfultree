import type { PlainClientAPI } from 'contentful-management'
import type { PageAppSDK } from '@contentful/app-sdk'
import { type ReactElement } from 'react'
import type { IconId } from './Icons'
export interface ContentTreeProps {
	sdkInstance: PageAppSDK
	cma: PlainClientAPI
	rootType: string
	nodeContentTypes: string[]
	titleFields: string[]
	locales: string[]
	indentation?: number
	iconRegistry?: Record<string, IconId>
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
