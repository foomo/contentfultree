'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.cfEntriesToNodes = exports.emptyNodeProps = void 0
var emptyNodeProps = function () {
	return { id: '', name: '', expand: false, parentId: '' }
}
exports.emptyNodeProps = emptyNodeProps
var cfEntryHasChildren = function (entry, nodeContentTypes, locales) {
	var _a
	for (
		var _i = 0, nodeContentTypes_1 = nodeContentTypes;
		_i < nodeContentTypes_1.length;
		_i++
	) {
		var nodeContentType = nodeContentTypes_1[_i]
		for (var _b = 0, locales_1 = locales; _b < locales_1.length; _b++) {
			var locale = locales_1[_b]
			if (
				(_a = entry.fields[nodeContentType]) === null || _a === void 0
					? void 0
					: _a[locale]
			) {
				return true
			}
		}
	}
	return false
}
var cfEntryPublishingStatus = function (entry) {
	if (!entry.sys.publishedVersion) {
		return 'draft'
	}
	if (entry.sys.version - entry.sys.publishedVersion === 1) {
		return 'published'
	}
	return 'changed'
}
var cfEntriesToNodes = function (
	entries,
	titleFields,
	stLocale,
	locales,
	nodeContentTypes,
	iconRegistry,
	parentId,
) {
	if (entries.length === 0) {
		return []
	}
	var nodeArray = []
	entries.forEach(function (entry) {
		var _a
		if (!entry) {
			return
		}
		var name = ''
		for (
			var _i = 0, titleFields_1 = titleFields;
			_i < titleFields_1.length;
			_i++
		) {
			var titleField = titleFields_1[_i]
			if (
				(_a = entry.fields[titleField]) === null || _a === void 0
					? void 0
					: _a[stLocale]
			) {
				name = entry.fields[titleField][stLocale]
				break
			}
		}
		if (name === '') {
			name = entry.sys.id
		}
		var node = {
			id: entry.sys.id,
			name: name,
			contentType: entry.sys.contentType.sys.id,
			icon:
				iconRegistry != null ? iconRegistry[entry.sys.contentType.sys.id] : '',
			expand: !!parentId,
			parentId: parentId,
			hasChildNodes: cfEntryHasChildren(entry, nodeContentTypes, locales),
			publishingStatus: cfEntryPublishingStatus(entry),
			updatedAt: entry.sys.updatedAt,
			publishedAt: entry.sys.publishedAt,
		}
		nodeArray.push(node)
	})
	return nodeArray
}
exports.cfEntriesToNodes = cfEntriesToNodes
