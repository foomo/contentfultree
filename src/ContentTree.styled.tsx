import styled from 'styled-components';

export interface UiPalette {
	publishingStatusBg?: string;
	publishingStatusFg?: string;
}

export const StyledContentTreeTable = styled.table`
	color: black;
	border: 0;
	margin: 0 auto;
	td {
		padding: 0.2em 1em 0.2em 0.2em;
		color: #999999;
		border-bottom: 1px solid #efefef;
	}
	th {
		text-align: left;
		font-weight: normal;
		font-size: 85%;
		color: #666666;
		background: #efefef;
		padding: 0.2em;
	}
	th.first {
		font-weight: bold !important;
		color: black !important;
	}
`;

export const StyledContentTreeTableNodeCell = styled.td<{ depth?: number }>`
	padding-left: ${(props) => props.depth}em !important;
	padding-right: 2em !important;
	color: black !important;
	min-width: 450px !important;
`;

export const StyledContentTreeNodeWedge = styled.div`
	display: inline-block;
	width: 1em;
	text-align: left;
	a {
		cursor: pointer;
		font-size: 130%;
		line-height: 100%;
	}
`;

export const StyledContentTreeNodeName = styled.div`
	display: inline-block;
	a {
		cursor: pointer;
	}
	a:hover {
		text-decoration: underline;
	}
`;

const getPublishingStatusColors = (status: string): UiPalette | undefined => {
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

export const StyledContentTreeNodePublishingStatus = styled.div<{
	status: string;
}>`
  display: inline-block;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
  font-weight: 600;
  font-size: 80%;
  text-transform: uppercase;
  letter-spacing: 0.06rem;
  border-radius: 4px;
  padding: 0 0.2rem;
  color: ${(props) =>
		getPublishingStatusColors(props.status)?.publishingStatusFg} !important;
  background-color: ${(props) =>
		getPublishingStatusColors(props.status)?.publishingStatusBg} !important;
}
`;

export const StyledSpinner = styled.div`
	display: inline-block;
	width: 1em;
	animation: rotate 1s infinite;
	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
`;
