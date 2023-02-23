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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var ContentTree_styled_1 = require("./ContentTree.styled");
var Icons_1 = require("./Icons");
var ContentTreeNode = function (props) {
    var _a, _b;
    var _c = (0, react_1.useState)(false), loading = _c[0], setLoading = _c[1];
    var addChildren = function (node) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    return [4, props.addChildNodes(node)];
                case 1:
                    _a.sent();
                    setLoading(false);
                    return [2];
            }
        });
    }); };
    var handleEditEntry = function () {
        props.editEntry(props.node.id).catch(function (err) {
            throw new Error('handleEditEntry', err);
        });
    };
    var handleAddChildren = function (node) {
        addChildren(node).catch(function (err) {
            throw new Error('handleAddChildren', err);
        });
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("tr", null,
            react_1.default.createElement(ContentTree_styled_1.StyledContentTreeTableNodeCell, { depth: props.depth },
                react_1.default.createElement(ContentTree_styled_1.StyledContentTreeNodeWedge, null, loading ? (react_1.default.createElement(ContentTree_styled_1.StyledSpinner, null, "-")) : props.node.hasChildNodes ? (props.node.expand ? (react_1.default.createElement("a", { onClick: function () { return handleAddChildren(props.node); } }, "+")) : (react_1.default.createElement("a", { onClick: function () { return props.removeChildNodes(props.node); } }, "-"))) : null),
                react_1.default.createElement(Icons_1.Icon, { id: props.node.icon }),
                react_1.default.createElement(ContentTree_styled_1.StyledContentTreeNodeName, null,
                    react_1.default.createElement("a", { onClick: function () { return handleEditEntry(); }, title: props.node.id }, props.node.name))),
            react_1.default.createElement("td", null, props.node.contentType),
            react_1.default.createElement("td", null,
                react_1.default.createElement(ContentTree_styled_1.StyledContentTreeNodePublishingStatus, { status: (_a = props.node.publishingStatus) !== null && _a !== void 0 ? _a : '' }, props.node.publishingStatus)),
            react_1.default.createElement("td", null, props.node.updatedAt),
            react_1.default.createElement("td", null, props.node.publishedAt)), (_b = props.node.childNodes) === null || _b === void 0 ? void 0 :
        _b.map(function (node, i) {
            return (react_1.default.createElement(ContentTreeNode, { key: i.toString(), node: node, depth: props.depth && props.depth + 1, addChildNodes: props.addChildNodes, removeChildNodes: props.removeChildNodes, editEntry: props.editEntry }));
        })));
};
exports.default = ContentTreeNode;
