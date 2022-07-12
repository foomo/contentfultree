"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentTree = void 0;
var react_1 = __importStar(require("react"));
var use_immer_1 = require("use-immer");
var ContentTree_styled_1 = require("./ContentTree.styled");
var ContentTreeNode_1 = __importDefault(require("./ContentTreeNode"));
var emptyNodeProps = function () {
    return { id: '', name: '', expand: false, parentId: '' };
};
var ContentTree = function (props) {
    var _a = (0, react_1.useState)(props.locales[0]), stLocale = _a[0], setStLocale = _a[1];
    var _b = (0, use_immer_1.useImmer)(emptyNodeProps()), stRoot = _b[0], setStRoot = _b[1];
    (0, react_1.useEffect)(function () {
        if (props.sdkInstance) {
            loadRootData();
        }
    }, [props.sdkInstance]);
    var addChildNodes = function (node) { return __awaiter(void 0, void 0, void 0, function () {
        var childNodes, cfChildren;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    childNodes = [];
                    return [4, getContentfulChildEntries(node.id)];
                case 1:
                    cfChildren = _a.sent();
                    childNodes = cfEntriesToNodes(cfChildren, node.id);
                    setStRoot(function (draft) {
                        recursiveProcessNodes(node.id, function (targetNode) {
                            targetNode.childNodes = childNodes;
                            targetNode.expand = true;
                        }, draft);
                        console.log('🎈draft', draft);
                    });
                    return [2];
            }
        });
    }); };
    var recursiveProcessNodes = function (targetNodeId, processNode, node) {
        if (node.id === targetNodeId) {
            processNode(node);
        }
        if (node.childNodes) {
            for (var _i = 0, _a = node.childNodes; _i < _a.length; _i++) {
                var targetNode = _a[_i];
                recursiveProcessNodes(targetNodeId, processNode, targetNode);
            }
        }
    };
    var editEntry = function (entryId) {
        props.sdkInstance.navigator.openEntry(entryId, { slideIn: true });
    };
    var getContentfulChildEntries = function (parentId) { return __awaiter(void 0, void 0, void 0, function () {
        var parentItem, allChildIds, _i, _a, key, childNodeRefs, _b, childNodeRefs_1, childNodeRef, allItems, done, skip, col, cfChildren, idPositionMap, _c, allChildIds_1, childId;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4, props.cma.entry.get({ entryId: parentId })];
                case 1:
                    parentItem = _d.sent();
                    allChildIds = [];
                    for (_i = 0, _a = Object.keys(parentItem.fields); _i < _a.length; _i++) {
                        key = _a[_i];
                        if (props.nodeContentTypes.includes(key)) {
                            childNodeRefs = parentItem.fields[key][stLocale];
                            if (Array.isArray(childNodeRefs)) {
                                for (_b = 0, childNodeRefs_1 = childNodeRefs; _b < childNodeRefs_1.length; _b++) {
                                    childNodeRef = childNodeRefs_1[_b];
                                    allChildIds.push(childNodeRef.sys.id);
                                }
                            }
                            else {
                                allChildIds.push(childNodeRefs.sys.id);
                            }
                        }
                    }
                    allItems = [];
                    done = false;
                    skip = 0;
                    _d.label = 2;
                case 2:
                    if (!!done) return [3, 4];
                    return [4, props.cma.entry.getMany({ query: {
                                'sys.id[in]': allChildIds.join(','),
                                skip: skip
                            } })];
                case 3:
                    col = _d.sent();
                    allItems.push.apply(allItems, col.items);
                    if (allItems.length < col.total) {
                        skip += 100;
                    }
                    else {
                        done = true;
                    }
                    return [3, 2];
                case 4:
                    cfChildren = [];
                    idPositionMap = allItems.reduce(function (acc, el, i) {
                        acc[el.sys.id] = i;
                        return acc;
                    }, {});
                    for (_c = 0, allChildIds_1 = allChildIds; _c < allChildIds_1.length; _c++) {
                        childId = allChildIds_1[_c];
                        if (allItems[idPositionMap[childId]]) {
                            cfChildren.push(allItems[idPositionMap[childId]]);
                        }
                    }
                    return [2, cfChildren];
            }
        });
    }); };
    var cfEntriesToNodes = function (entries, parentId) {
        if (entries.length === 0) {
            return [];
        }
        var nodeArray = [];
        entries.forEach(function (entry) {
            if (!entry) {
                console.log('this entry is nil');
                return;
            }
            var name = '';
            for (var _i = 0, _a = props.titleFields; _i < _a.length; _i++) {
                var titleField = _a[_i];
                if (entry.fields[titleField] && entry.fields[titleField][stLocale]) {
                    name = entry.fields[titleField][stLocale];
                    break;
                }
            }
            if (name === '') {
                name = entry.sys.id;
            }
            var node = {
                id: entry.sys.id,
                name: name,
                contentType: entry.sys.contentType.sys.id,
                icon: props.iconRegistry ? props.iconRegistry[entry.sys.contentType.sys.id] : '',
                expand: !parentId,
                parentId: parentId,
                hasChildNodes: cfEntryHasChildren(entry),
                publishingStatus: cfEntryPublishingStatus(entry),
                updatedAt: entry.sys.updatedAt,
                publishedAt: entry.sys.publishedAt
            };
            nodeArray.push(node);
        });
        return nodeArray;
    };
    var cfEntryHasChildren = function (entry) {
        for (var _i = 0, _a = props.nodeContentTypes; _i < _a.length; _i++) {
            var nodeContentType = _a[_i];
            for (var _b = 0, _c = props.locales; _b < _c.length; _b++) {
                var locale = _c[_b];
                if (entry.fields[nodeContentType] && entry.fields[nodeContentType][locale]) {
                    return true;
                }
            }
        }
        return false;
    };
    var cfEntryPublishingStatus = function (entry) {
        if (!entry.sys.publishedVersion) {
            return 'draft';
        }
        if (entry.sys.version - entry.sys.publishedVersion == 1) {
            return 'published';
        }
        return 'changed';
    };
    var loadRootData = function () { return __awaiter(void 0, void 0, void 0, function () {
        var CfRootData, rootNodes, _loop_1, _i, rootNodes_1, rootNode;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, props.cma.entry.getMany({ query: { content_type: props.rootType } })];
                case 1:
                    CfRootData = _a.sent();
                    rootNodes = cfEntriesToNodes(CfRootData.items);
                    _loop_1 = function (rootNode) {
                        var childEntries, childNodes, nodes, newIdPositionMap_1, tree_1;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4, getContentfulChildEntries(rootNode.id)];
                                case 1:
                                    childEntries = _b.sent();
                                    childNodes = cfEntriesToNodes(childEntries, rootNode.id);
                                    nodes = __spreadArray([rootNode], childNodes, true);
                                    if (nodes.length > 0) {
                                        newIdPositionMap_1 = nodes.reduce(function (acc, el, i) {
                                            acc[el.id] = i;
                                            return acc;
                                        }, {});
                                        tree_1 = emptyNodeProps();
                                        nodes.forEach(function (node) {
                                            node.childNodes = [];
                                            if (!node.parentId) {
                                                tree_1 = node;
                                                return;
                                            }
                                            var parentEl = nodes[newIdPositionMap_1[node.parentId]];
                                            if (parentEl) {
                                                parentEl.childNodes = __spreadArray(__spreadArray([], (parentEl.childNodes || []), true), [node], false);
                                                parentEl.expand = true;
                                            }
                                        });
                                        console.log('🌴 tree', tree_1);
                                        setStRoot(tree_1);
                                    }
                                    return [2];
                            }
                        });
                    };
                    _i = 0, rootNodes_1 = rootNodes;
                    _a.label = 2;
                case 2:
                    if (!(_i < rootNodes_1.length)) return [3, 5];
                    rootNode = rootNodes_1[_i];
                    return [5, _loop_1(rootNode)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3, 2];
                case 5: return [2];
            }
        });
    }); };
    var removeChildNodes = function (node) {
        setStRoot(function (draft) {
            recursiveProcessNodes(node.id, function (targetNode) {
                targetNode.childNodes = [];
                targetNode.expand = false;
            }, draft);
            console.log('🎈draft', draft);
        });
    };
    console.log('=============================== RENDER ====================================', stRoot);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(ContentTree_styled_1.StyledContentTreeTable, null,
            react_1.default.createElement("tbody", null,
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", null, "Nodes"),
                    react_1.default.createElement("th", null, "Content Type"),
                    react_1.default.createElement("th", null, "Status"),
                    react_1.default.createElement("th", null, "Last Modified"),
                    react_1.default.createElement("th", null, "Last Published")),
                react_1.default.createElement(ContentTreeNode_1.default, { node: stRoot, depth: 0, addChildNodes: addChildNodes, removeChildNodes: removeChildNodes, editEntry: editEntry })))));
};
exports.ContentTree = ContentTree;
