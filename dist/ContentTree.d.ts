/// <reference types="react" />
import { PlainClientAPI } from 'contentful-management';
import { PageExtensionSDK } from 'contentful-ui-extensions-sdk';
export interface ContentTreeProps {
    sdkInstance: PageExtensionSDK;
    cma: PlainClientAPI;
    rootType: string;
    nodeContentTypes: string[];
    titleFields: string[];
    locales: string[];
    iconRegistry?: {
        [index: string]: string;
    };
}
export declare const ContentTree: (props: ContentTreeProps) => JSX.Element;
