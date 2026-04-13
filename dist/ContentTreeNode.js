import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Icon } from './Icons.js';
const publishingStatusStyles = {
    draft: 'text-[rgb(177,45,0)] bg-[rgb(253,229,192)]',
    changed: 'text-[rgb(0,89,200)] bg-[rgb(206,236,255)]',
    published: 'text-[rgb(0,109,35)] bg-[rgb(205,243,198)]',
};
const ContentTreeNode = (props) => {
    const [loading, setLoading] = useState(false);
    const addChildren = async (node) => {
        setLoading(true);
        await props.addChildNodes(node);
        setLoading(false);
    };
    const handleEditEntry = () => {
        props.editEntry(props.node.id).catch((err) => {
            console.error('handleEditEntry', err);
        });
    };
    const handleAddChildren = (node) => {
        addChildren(node).catch((err) => {
            console.error('handleAddChildren', err);
        });
    };
    return (_jsxs(_Fragment, { children: [_jsxs("tr", { children: [_jsxs("td", { className: "pr-8 text-black min-w-[450px]", style: { paddingLeft: `${props.depth}em` }, children: [_jsx("div", { className: "inline-block w-4 text-left", children: loading ? (_jsx("div", { className: "inline-block w-4 animate-spin", children: "-" })) : props.node.hasChildNodes ? (props.node.expand ? (_jsx("a", { className: "cursor-pointer text-[130%] leading-none", onClick: () => {
                                        handleAddChildren(props.node);
                                    }, children: "+" })) : (_jsx("a", { className: "cursor-pointer text-[130%] leading-none", onClick: () => {
                                        props.removeChildNodes(props.node);
                                    }, children: "-" }))) : null }), _jsx(Icon, { id: props.node.icon }), _jsx("div", { className: "inline-block", children: _jsx("a", { className: "cursor-pointer hover:underline", onClick: () => {
                                        handleEditEntry();
                                    }, title: props.node.id, children: props.node.name }) })] }), _jsx("td", { className: "py-[0.2em] pr-4 pl-[0.2em] text-gray-400 border-b border-[#efefef]", children: props.node.contentType }), _jsx("td", { className: "py-[0.2em] pr-4 pl-[0.2em] text-gray-400 border-b border-[#efefef]", children: _jsx("div", { className: `inline-block font-sans font-semibold text-[80%] uppercase tracking-[0.06rem] rounded px-[0.2rem] ${publishingStatusStyles[props.node.publishingStatus ?? ''] ?? ''}`, children: props.node.publishingStatus }) }), _jsx("td", { className: "py-[0.2em] pr-4 pl-[0.2em] text-gray-400 border-b border-[#efefef]", children: props.node.updatedAt }), _jsx("td", { className: "py-[0.2em] pr-4 pl-[0.2em] text-gray-400 border-b border-[#efefef]", children: props.node.publishedAt })] }), props.node.childNodes?.map((node, i) => {
                return (_jsx(ContentTreeNode, { node: node, depth: props.depth && props.depth + 1, addChildNodes: props.addChildNodes, removeChildNodes: props.removeChildNodes, editEntry: props.editEntry }, i.toString()));
            })] }));
};
export { ContentTreeNode };
