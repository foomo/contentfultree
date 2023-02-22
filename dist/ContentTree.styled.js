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
exports.StyledContentTreeTable = styled_components_1.default.table(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\twidth: 100%;\n\tcolor: black;\n\tborder: 0;\n\tpadding: 0 60px;\n\tmargin: 0 auto;\n\ttd {\n\t\tpadding: 0.2em 1em 0.2em 0.2em;\n\t\tcolor: #999999;\n\t\tborder-bottom: 1px solid #efefef;\n\t}\n\tth {\n\t\ttext-align: left;\n\t\tfont-weight: normal;\n\t\tfont-size: 85%;\n\t\tcolor: #666666;\n\t\tbackground: #efefef;\n\t\tpadding: 0.2em;\n\t}\n\tth.first {\n\t\tfont-weight: bold !important;\n\t\tcolor: black !important;\n\t}\n"], ["\n\twidth: 100%;\n\tcolor: black;\n\tborder: 0;\n\tpadding: 0 60px;\n\tmargin: 0 auto;\n\ttd {\n\t\tpadding: 0.2em 1em 0.2em 0.2em;\n\t\tcolor: #999999;\n\t\tborder-bottom: 1px solid #efefef;\n\t}\n\tth {\n\t\ttext-align: left;\n\t\tfont-weight: normal;\n\t\tfont-size: 85%;\n\t\tcolor: #666666;\n\t\tbackground: #efefef;\n\t\tpadding: 0.2em;\n\t}\n\tth.first {\n\t\tfont-weight: bold !important;\n\t\tcolor: black !important;\n\t}\n"])));
exports.StyledContentTreeTableNodeCell = styled_components_1.default.td(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n\tpadding-left: ", "em !important;\n\tpadding-right: 2em !important;\n\tcolor: black !important;\n\tmin-width: 450px !important;\n"], ["\n\tpadding-left: ", "em !important;\n\tpadding-right: 2em !important;\n\tcolor: black !important;\n\tmin-width: 450px !important;\n"])), function (props) { return props.depth; });
exports.StyledContentTreeNodeWedge = styled_components_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n\tdisplay: inline-block;\n\twidth: 1em;\n\ttext-align: left;\n\ta {\n\t\tcursor: pointer;\n\t\tfont-size: 130%;\n\t\tline-height: 100%;\n\t}\n"], ["\n\tdisplay: inline-block;\n\twidth: 1em;\n\ttext-align: left;\n\ta {\n\t\tcursor: pointer;\n\t\tfont-size: 130%;\n\t\tline-height: 100%;\n\t}\n"])));
exports.StyledContentTreeNodeName = styled_components_1.default.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n\tdisplay: inline-block;\n\ta {\n\t\tcursor: pointer;\n\t}\n\ta:hover {\n\t\ttext-decoration: underline;\n\t}\n"], ["\n\tdisplay: inline-block;\n\ta {\n\t\tcursor: pointer;\n\t}\n\ta:hover {\n\t\ttext-decoration: underline;\n\t}\n"])));
var getPublishingStatusColors = function (status) {
    switch (status) {
        case 'draft':
            return {
                publishingStatusBg: 'rgb(253, 229, 192)',
                publishingStatusFg: 'rgb(177, 45, 0)',
            };
        case 'changed':
            return {
                publishingStatusBg: 'rgb(206, 236, 255)',
                publishingStatusFg: 'rgb(0, 89, 200)',
            };
        case 'published':
            return {
                publishingStatusBg: 'rgb(205, 243, 198)',
                publishingStatusFg: 'rgb(0, 109, 35)',
            };
    }
};
exports.StyledContentTreeNodePublishingStatus = styled_components_1.default.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  display: inline-block;\n  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;\n  font-weight: 600;\n  font-size: 80%;\n  text-transform: uppercase;\n  letter-spacing: 0.06rem;\n  border-radius: 4px;\n  padding: 0 0.2rem;\n  color: ", " !important;\n  background-color: ", " !important;\n}\n"], ["\n  display: inline-block;\n  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;\n  font-weight: 600;\n  font-size: 80%;\n  text-transform: uppercase;\n  letter-spacing: 0.06rem;\n  border-radius: 4px;\n  padding: 0 0.2rem;\n  color: ", " !important;\n  background-color: ", " !important;\n}\n"])), function (props) { var _a; return (_a = getPublishingStatusColors(props.status)) === null || _a === void 0 ? void 0 : _a.publishingStatusFg; }, function (props) { var _a; return (_a = getPublishingStatusColors(props.status)) === null || _a === void 0 ? void 0 : _a.publishingStatusBg; });
exports.StyledSpinner = styled_components_1.default.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n\tdisplay: inline-block;\n\twidth: 1em;\n\tanimation: rotate 1s infinite;\n\t@keyframes rotate {\n\t\tfrom {\n\t\t\ttransform: rotate(0deg);\n\t\t}\n\t\tto {\n\t\t\ttransform: rotate(360deg);\n\t\t}\n\t}\n"], ["\n\tdisplay: inline-block;\n\twidth: 1em;\n\tanimation: rotate 1s infinite;\n\t@keyframes rotate {\n\t\tfrom {\n\t\t\ttransform: rotate(0deg);\n\t\t}\n\t\tto {\n\t\t\ttransform: rotate(360deg);\n\t\t}\n\t}\n"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
