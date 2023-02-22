import { PlainClientAPI } from 'contentful-management';
import { PageExtensionSDK } from 'contentful-ui-extensions-sdk';
import { ReactElement } from 'react';
import { ContentTreeNodeProps } from './ContentTreeNode';
export interface ContentTreeRootProps {
    node: ContentTreeNodeProps;
    sdkInstance: PageExtensionSDK;
    cma: PlainClientAPI;
    nodeContentTypes: string[];
    titleFields: string[];
    locales: string[];
    depth: number;
    iconRegistry?: {
        [index: string]: string;
    };
}
export declare const ContentTreeRoot: ({ node, sdkInstance, cma, nodeContentTypes, titleFields, locales, depth, iconRegistry, }: ContentTreeRootProps) => ReactElement;
