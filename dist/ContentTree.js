import { useEffect, useState } from 'react'
import { Fragment as _Fragment, jsx as _jsx } from 'react/jsx-runtime'
import { ContentTreeRoot } from './ContentTreeRoot'
import { cfEntriesToNodes, emptyNodeProps } from './ContentTreeUtils'
export const ContentTree = ({
	sdkInstance,
	cma,
	rootType,
	nodeContentTypes,
	titleFields,
	locales,
	indentation = 1,
	iconRegistry,
}) => {
	const [stLocale] = useState(locales[0])
	const [rootNodes, setRootNodes] = useState([emptyNodeProps()])
	useEffect(() => {
		if (!sdkInstance) {
			return
		}
		const loadData = async () => {
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
		loadData().catch((err) => {
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
	return _jsx(_Fragment, {
		children: rootNodes.map((node, i) =>
			_jsx(
				ContentTreeRoot,
				{
					node: node,
					locales: locales,
					nodeContentTypes: nodeContentTypes,
					iconRegistry: iconRegistry,
					cma: cma,
					titleFields: titleFields,
					sdkInstance: sdkInstance,
					depth: indentation,
				},
				i.toString(),
			),
		),
	})
}
