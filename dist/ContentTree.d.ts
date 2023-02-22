import { PlainClientAPI } from 'contentful-management';
import { PageExtensionSDK } from 'contentful-ui-extensions-sdk';
import { ReactElement } from 'react';
export interface ContentTreeProps {
    sdkInstance: PageExtensionSDK;
    cma: PlainClientAPI;
    rootType: string;
    nodeContentTypes: string[];
    titleFields: string[];
    locales: string[];
    indentation?: number;
    iconRegistry?: {
        [index: string]: string;
    };
}
export declare const ContentTree: ({ sdkInstance, cma, rootType, nodeContentTypes, titleFields, locales, indentation, iconRegistry, }: ContentTreeProps) => ReactElement;
