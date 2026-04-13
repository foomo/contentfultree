import type { PageAppSDK } from '@contentful/app-sdk'
import type { PlainClientAPI } from 'contentful-management'
import { type ReactElement, useEffect, useState } from 'react'
import { ContentTreeRoot } from './ContentTreeRoot'
import { cfEntriesToNodes, emptyNodeProps } from './ContentTreeUtils'
import type { IconId } from './Icons'

export interface ContentTreeProps {
	sdkInstance: PageAppSDK
	cma: PlainClientAPI
	rootType: string
	nodeContentTypes: string[]
	titleFields: string[]
	locales: string[] // the first is the default locale
	indentation?: number
	iconRegistry?: Record<string, IconId>
}

export const ContentTree = ({
	sdkInstance,
	cma,
	rootType,
	nodeContentTypes,
	titleFields,
	locales,
	indentation = 1,
	iconRegistry,
}: ContentTreeProps): ReactElement => {
	const [stLocale] = useState(locales[0])
	const [rootNodes, setRootNodes] = useState([emptyNodeProps()])

	useEffect(() => {
		if (!sdkInstance) {
			return
		}

		const loadData = async (): Promise<void> => {
			const CfRootData = await cma.entry.getMany({
				query: { content_type: rootType },
			})
			const nodes = cfEntriesToNodes(
				CfRootData.items,
				titleFields,
				stLocale,
				locales,
				nodeContentTypes,
				iconRegistry,
			)
			setRootNodes(nodes)
		}

		loadData().catch((err: unknown) => {
			console.error('loadRootData', err)
		})
	}, [
		sdkInstance,
		cma,
		rootType,
		titleFields,
		stLocale,
		locales,
		nodeContentTypes,
		iconRegistry,
	])

	return (
		<>
			{rootNodes.map((node, i) => (
				<ContentTreeRoot
					key={i.toString()}
					node={node}
					locales={locales}
					nodeContentTypes={nodeContentTypes}
					iconRegistry={iconRegistry}
					cma={cma}
					titleFields={titleFields}
					sdkInstance={sdkInstance}
					depth={indentation}
				/>
			))}
		</>
	)
}
