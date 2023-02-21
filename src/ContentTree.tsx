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
	indentation?: number;
	iconRegistry?: { [index: string]: string };
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
	const [stLocale] = useState(locales[0]);
	const [rootNodes, setRootNodes] = useImmer([emptyNodeProps()]);

	useEffect(() => {
		if (sdkInstance) {
			loadData().catch((err) => {
				throw new Error('loadRootData', err);
			});
		}
	}, [sdkInstance]);

	const loadData = async (): Promise<void> => {
		const CfRootData = await cma.entry.getMany({
			query: { content_type: rootType },
		});
		const nodes = cfEntriesToNodes(
			CfRootData.items,
			titleFields,
			stLocale,
			locales,
			nodeContentTypes,
			iconRegistry
		);
		setRootNodes(nodes);
	};

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
	);
};
