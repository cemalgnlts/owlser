import { memo } from "react";
import { PencilIcon, DocumentTextIcon, InformationCircleIcon } from "@heroicons/react/24/outline";

function TabMenu({ tabIndex, setTabIndex }) {
	const showEditor = () => setTabIndex(0);
	const showDocs = () => setTabIndex(1);

	return (
		<ul className="menu menu-compact bg-base-300 w-44 -mt-8">
			<li className={tabIndex === 0 ? "bordered" : ""} onClick={showEditor}>
				<a>
					<PencilIcon className="w-6 h-6" />
					Editor
				</a>
			</li>
			<li className={tabIndex === 1 ? "bordered" : ""} onClick={showDocs}>
				<a>
					<DocumentTextIcon className="w-6 h-6" />
					Document
				</a>
			</li>
			<li>
				<a>
					<InformationCircleIcon className="w-6 h-6" />
					Info
				</a>
			</li>
		</ul>
	);
}

export default memo(TabMenu);
