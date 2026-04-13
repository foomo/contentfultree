import type { EntryProps, KeyValueMap } from 'contentful-management'
import type { ContentTreeNodeProps } from './ContentTreeNode'
import type { IconId } from './Icons'

export const emptyNodeProps = (): ContentTreeNodeProps => {
	return { id: '', name: '', expand: false, parentId: '' }
}

const cfEntryHasChildren = (
	entry: EntryProps<KeyValueMap>,
	nodeContentTypes: string[],
	locales: string[],
): boolean => {
	for (const nodeContentType of nodeContentTypes) {
		for (const locale of locales) {
			if (entry.fields[nodeContentType]?.[locale]) {
				return true
			}
		}
	}
	return false
}

const cfEntryPublishingStatus = (entry: EntryProps<KeyValueMap>): string => {
	if (!entry.sys.publishedVersion) {
		return 'draft'
	}
	if (entry.sys.version - entry.sys.publishedVersion === 1) {
		return 'published'
	}
	return 'changed'
}

export const cfEntriesToNodes = (
	entries: EntryProps<KeyValueMap>[],
	titleFields: string[],
	stLocale: string,
	locales: string[],
	nodeContentTypes: string[],
	iconRegistry?: Record<string, IconId>,
	parentId?: string,
): ContentTreeNodeProps[] => {
	return entries.flatMap((entry) => {
		if (!entry) {
			return []
		}
		let name = ''
		for (const titleField of titleFields) {
			if (entry.fields[titleField]?.[stLocale]) {
				name = entry.fields[titleField][stLocale]
				break
			}
		}
		if (name === '') {
			name = entry.sys.id
		}
		return [
			{
				id: entry.sys.id,
				name,
				contentType: entry.sys.contentType.sys.id,
				icon: iconRegistry?.[entry.sys.contentType.sys.id],
				expand: !!parentId,
				parentId,
				hasChildNodes: cfEntryHasChildren(entry, nodeContentTypes, locales),
				publishingStatus: cfEntryPublishingStatus(entry),
				updatedAt: entry.sys.updatedAt,
				publishedAt: entry.sys.publishedAt,
			},
		]
	})
}
