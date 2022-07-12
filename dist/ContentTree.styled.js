"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledSpinner = exports.StyledContentTreeNodePublishingStatus = exports.StyledContentTreeNodeName = exports.StyledContentTreeNodeWedge = exports.StyledContentTreeTableNodeCell = exports.StyledContentTreeTable = void 0;
var styled_components_1 = __importDefault(require("styled-components"));
exports.StyledContentTreeTable = styled_components_1.default.table(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  color: black;\n  border: 0;\n  margin: 0 auto;\n  td {\n    padding: 0.2em 1em 0.2em 0.2em;\n    color: #999999; \n    border-bottom: 1px solid #efefef;\n  }\n  th {\n    text-align: left;\n    font-weight: normal;\n    font-size: 85%;\n    color: #666666;\n    background: #efefef;\n    padding: 0.2em;\n  }\n  th.first {\n      font-weight: bold !important;\n      color:black !important;\n    }\n"], ["\n  color: black;\n  border: 0;\n  margin: 0 auto;\n  td {\n    padding: 0.2em 1em 0.2em 0.2em;\n    color: #999999; \n    border-bottom: 1px solid #efefef;\n  }\n  th {\n    text-align: left;\n    font-weight: normal;\n    font-size: 85%;\n    color: #666666;\n    background: #efefef;\n    padding: 0.2em;\n  }\n  th.first {\n      font-weight: bold !important;\n      color:black !important;\n    }\n"])));
exports.StyledContentTreeTableNodeCell = styled_components_1.default.td(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  padding-left: ", "em !important;\n  padding-right: 2em !important;\n  color: black !important;\n  min-width: 450px !important;\n"], ["\n  padding-left: ", "em !important;\n  padding-right: 2em !important;\n  color: black !important;\n  min-width: 450px !important;\n"])), function (props) { return 0.2 + props.depth; });
exports.StyledContentTreeNodeWedge = styled_components_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: inline-block;\n  width: 1em;\n  text-align: left;\n  a {\n    cursor:pointer;\n  }\n"], ["\n  display: inline-block;\n  width: 1em;\n  text-align: left;\n  a {\n    cursor:pointer;\n  }\n"])));
exports.StyledContentTreeNodeName = styled_components_1.default.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  display: inline-block;\n  a {\n    cursor: pointer;    \n  }\n  a:hover {\n    text-decoration:underline;\n  }\n"], ["\n  display: inline-block;\n  a {\n    cursor: pointer;    \n  }\n  a:hover {\n    text-decoration:underline;\n  }\n"])));
var getPublishingStatusColors = function (status) {
    switch (status) {
        case 'draft':
            return {
                publishingStatusBg: 'rgb(253, 229, 192)',
                publishingStatusFg: 'rgb(177, 45, 0)'
            };
        case 'changed':
            return {
                publishingStatusBg: 'rgb(206, 236, 255)',
                publishingStatusFg: 'rgb(0, 89, 200)'
            };
        case 'published':
            return {
                publishingStatusBg: 'rgb(205, 243, 198)',
                publishingStatusFg: 'rgb(0, 109, 35)'
            };
    }
};
exports.StyledContentTreeNodePublishingStatus = styled_components_1.default.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  display: inline-block;\n  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;\n  font-weight: 600;\n  font-size: 80%;\n  text-transform: uppercase;\n  letter-spacing: 0.06rem;\n  border-radius: 4px;\n  padding: 0 0.2rem;\n  color: ", " !important;\n  background-color: ", " !important;\n}\n"], ["\n  display: inline-block;\n  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;\n  font-weight: 600;\n  font-size: 80%;\n  text-transform: uppercase;\n  letter-spacing: 0.06rem;\n  border-radius: 4px;\n  padding: 0 0.2rem;\n  color: ", " !important;\n  background-color: ", " !important;\n}\n"])), function (props) { var _a; return (_a = getPublishingStatusColors(props.status)) === null || _a === void 0 ? void 0 : _a.publishingStatusFg; }, function (props) { var _a; return (_a = getPublishingStatusColors(props.status)) === null || _a === void 0 ? void 0 : _a.publishingStatusBg; });
exports.StyledSpinner = styled_components_1.default.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  display:inline-block;\n  width: 1em;\n  animation: rotate 1s infinite;\n  @keyframes rotate {\n   from { transform: rotate(0deg); }\n   to { transform: rotate(360deg); }\n}\n"], ["\n  display:inline-block;\n  width: 1em;\n  animation: rotate 1s infinite;\n  @keyframes rotate {\n   from { transform: rotate(0deg); }\n   to { transform: rotate(360deg); }\n}\n"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
