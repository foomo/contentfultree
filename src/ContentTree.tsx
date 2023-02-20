import { PlainClientAPI } from 'contentful-management';
import { PageExtensionSDK } from 'contentful-ui-extensions-sdk';
import React, { ReactElement, useEffect, useState } from 'react';
import { useImmer } from 'use-immer';
import { ContentTreeRoot } from './ContentTreeRoot';
import { emptyNodeProps, cfEntriesToNodes } from './ContentTreeUtils';

export interface ContentTreeProps {
	sdkInstance: PageExtensionSDK;
	cma: PlainClientAPI;
	rootType: string;
	nodeContentTypes: string[];
	titleFields: string[];
	locales: string[]; // the first is the default locale
	iconRegistry?: { [index: string]: string };
}

export const ContentTree = (props: ContentTreeProps): ReactElement => {
	const [stLocale] = useState(props.locales[0]);
	const [rootNodes, setRootNodes] = useImmer([emptyNodeProps()]);

	useEffect(() => {
		if (props.sdkInstance) {
			loadData().catch((err) => {
				throw new Error('loadRootData', err);
			});
		}
	}, [props.sdkInstance]);

	const loadData = async (): Promise<void> => {
		const CfRootData = await props.cma.entry.getMany({
			query: { content_type: props.rootType },
		});
		const nodes = cfEntriesToNodes(
			CfRootData.items,
			props.titleFields,
			stLocale,
			props.locales,
			props.nodeContentTypes,
			props.iconRegistry
		);
		setRootNodes(nodes);
	};

	return (
		<>
			{rootNodes.map((node, i) => (
				<ContentTreeRoot
					key={i.toString()}
					node={node}
					locales={props.locales}
					nodeContentTypes={props.nodeContentTypes}
					iconRegistry={props.iconRegistry}
					cma={props.cma}
					titleFields={props.titleFields}
					sdkInstance={props.sdkInstance}
				/>
			))}
		</>
	);
};
