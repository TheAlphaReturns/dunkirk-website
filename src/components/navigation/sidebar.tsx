import * as nextUI from '@nextui-org/react';
import config from '@config';
import { useRouter } from 'next/router';
import { pagesFS } from '../../utils/pagesFS';
import { BsChevronDoubleLeft } from 'react-icons/bs';

export function Sidebar() {
	const currentPage: string = useRouter().pathname;

	function BackButton() {
		return (
			<nextUI.Col>
				<nextUI.Text css={{ color: '#7a7b7c', marginLeft: '1.5em', userSelect: 'none' }} size={'1.5em'}>
					<nextUI.Link css={{ color: '#7a7b7c' }} href={`${config.prefix}/`} underline><BsChevronDoubleLeft /></nextUI.Link>
				</nextUI.Text>
			</nextUI.Col>
		);
	}

	function PageLink({ url, name }) {
		return (
			<nextUI.Col>
				<nextUI.Text css={{ color: '#7a7b7c', marginLeft: '1.5em', userSelect: 'none' }} size={'1.5em'}>
					• &nbsp; &nbsp; <nextUI.Link css={{ color: '#7a7b7c' }} href={`${config.prefix}${url}`} underline>{name}</nextUI.Link>
				</nextUI.Text>
			</nextUI.Col>
		);
	}

	let tree = pagesFS();

	for (let [key, _value] of Object.entries(tree)) {
		if (key != 'parent' && key != 'folderData') {
			if (tree[key].type == 'folder' && currentPage.startsWith(tree[key].url)) {
				return (
					<div style={{ width: '15em' }}>
						<BackButton />
						{tree[key].subpages.map((page, index) => {
							return (<PageLink key={index} name={page.title} url={page.url} />);
						})}
					</div>
				);
			}
		}
	}

	return (
		<div style={{ width: '18%' }}>
			{tree.map((item, index) => {
				if (item.type == 'page') {
					return (
						<PageLink key={index} name={item.title} url={item.url} />
					);
				} else {
					return (
						<PageLink key={index} name={item.title} url={item.subpages[0].url} />
					);
				}
			})}
		</div>
	);
}