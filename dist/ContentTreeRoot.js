import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { ContentTreeNode } from './ContentTreeNode.js';
import { cfEntriesToNodes, emptyNodeProps } from './ContentTreeUtils.js';
export const ContentTreeRoot = ({ node, sdkInstance, cma, nodeContentTypes, titleFields, locales, depth, iconRegistry, }) => {
    const [stLocale] = useState(locales[0]);
    const [stRoot, setStRoot] = useState(emptyNodeProps());
    useEffect(() => {
        if (!node.id) {
            return;
        }
        const loadRootData = async (rootNode) => {
            const childEntries = await getContentfulChildEntries(rootNode.id);
            const childNodes = cfEntriesToNodes(childEntries, titleFields, stLocale, locales, nodeContentTypes, iconRegistry, rootNode.id);
            const nodes = [rootNode, ...childNodes];
            if (nodes.length > 0) {
                const newIdPositionMap = nodes.reduce((acc, el, i) => {
                    acc[el.id] = i;
                    return acc;
                }, {});
                let tree = emptyNodeProps();
                for (const node of nodes) {
                    node.childNodes = [];
                    if (!node.parentId) {
                        tree = node;
                        continue;
                    }
                    const parentEl = nodes[newIdPositionMap[node.parentId]];
                    if (parentEl) {
                        parentEl.childNodes = [...(parentEl.childNodes ?? []), node];
                        parentEl.expand = false;
                    }
                }
                setStRoot(tree);
            }
        };
        loadRootData(node).catch((err) => {
            console.error('loadRootData', err);
        });
    }, [
        node,
        cma,
        titleFields,
        stLocale,
        locales,
        nodeContentTypes,
        iconRegistry,
    ]);
    const addChildNodes = async (node) => {
        const cfChildren = await getContentfulChildEntries(node.id);
        const childNodes = cfEntriesToNodes(cfChildren, titleFields, stLocale, locales, nodeContentTypes, iconRegistry, node.id);
        setStRoot((prevState) => {
            const newState = structuredClone(prevState);
            recursiveProcessNodes(node.id, (targetNode) => {
                targetNode.childNodes = childNodes;
                targetNode.expand = false;
            }, newState);
            return newState;
        });
    };
    const recursiveProcessNodes = (targetNodeId, processNode, node) => {
        if (node.id === targetNodeId) {
            processNode(node);
        }
        if (node.childNodes != null) {
            for (const targetNode of node.childNodes) {
                recursiveProcessNodes(targetNodeId, processNode, targetNode);
            }
        }
    };
    const editEntry = async (entryId) => {
        await sdkInstance.navigator.openEntry(entryId, { slideIn: true });
    };
    const getContentfulChildEntries = async (parentId) => {
        const parentItem = await cma.entry.get({ entryId: parentId });
        const allChildIds = [];
        for (const key of Object.keys(parentItem.fields)) {
            if (nodeContentTypes.includes(key)) {
                const childNodeRefs = parentItem.fields[key][stLocale];
                if (Array.isArray(childNodeRefs)) {
                    for (const childNodeRef of childNodeRefs) {
                        allChildIds.push(childNodeRef.sys.id);
                    }
                }
                else {
                    allChildIds.push(childNodeRefs.sys.id);
                }
            }
        }
        const allItems = [];
        let done = false;
        let skip = 0;
        while (!done) {
            const col = await cma.entry.getMany({
                query: {
                    'sys.id[in]': allChildIds.join(','),
                    skip,
                },
            });
            allItems.push(...col.items);
            if (allItems.length < col.total) {
                skip += 100;
            }
            else {
                done = true;
            }
        }
        const cfChildren = [];
        const idPositionMap = allItems.reduce((acc, el, i) => {
            acc[el.sys.id] = i;
            return acc;
        }, {});
        for (const childId of allChildIds) {
            if (allItems[idPositionMap[childId]]) {
                cfChildren.push(allItems[idPositionMap[childId]]);
            }
        }
        return cfChildren;
    };
    const removeChildNodes = (node) => {
        setStRoot((prevState) => {
            const newState = structuredClone(prevState);
            recursiveProcessNodes(node.id, (targetNode) => {
                targetNode.childNodes = [];
                targetNode.expand = true;
            }, newState);
            return newState;
        });
    };
    return (_jsx("table", { className: "w-full text-black border-0 px-[60px] mx-auto", children: _jsxs("tbody", { children: [_jsxs("tr", { children: [_jsx("th", { className: "text-left font-normal text-[85%] text-gray-500 bg-[#efefef] p-[0.2em]", children: "Nodes" }), _jsx("th", { className: "text-left font-normal text-[85%] text-gray-500 bg-[#efefef] p-[0.2em]", children: "Content Type" }), _jsx("th", { className: "text-left font-normal text-[85%] text-gray-500 bg-[#efefef] p-[0.2em]", children: "Status" }), _jsx("th", { className: "text-left font-normal text-[85%] text-gray-500 bg-[#efefef] p-[0.2em]", children: "Last Modified" }), _jsx("th", { className: "text-left font-normal text-[85%] text-gray-500 bg-[#efefef] p-[0.2em]", children: "Last Published" })] }), _jsx(ContentTreeNode, { node: stRoot, depth: depth, addChildNodes: addChildNodes, removeChildNodes: removeChildNodes, editEntry: editEntry })] }) }));
};
