import { useCallback, useRef, useEffect } from "react";

import { useEditorStateDispatch } from "../../context/EditorContext";
import useDebounceCallback from "../../hooks/useDebounceCallback";

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { dracula } from "@uiw/codemirror-theme-dracula";

import { undo, redo } from "@codemirror/commands";

const extensions = [javascript()];

const template = `await page.goto("https://deta.space")

const title = await page.title()

return title`;

function Editor({ setEditorUndo, setEditorRedo }) {
	const dispatch = useEditorStateDispatch();
	const [debounceCallback] = useDebounceCallback(autoSave, 500);
	const editorRef = useRef(null);
	const storedValue = localStorage.getItem('value');
	const editorValue = useRef(storedValue ?? template);

	useEffect(() => {
		if(editorRef.current !== null) {
			setEditorUndo(() => undo.bind(null, editorRef.current.view));
			setEditorRedo(() => redo.bind(null, editorRef.current.view));
			if (!storedValue) {
				localStorage.setItem('value', template);
			  }
		}
	}, [editorRef.current]);

	function autoSave(value, canUndo, canRedo) {
		localStorage.setItem("value", value);

		dispatch({ type: "canSave", value: true });
		dispatch({ type: "canUndo", value: canUndo });
		dispatch({ type: "canRedo", value: canRedo });
	}

	const onChange = useCallback((value, viewUpdate) => {
		const historyState = viewUpdate.state.values[0];
		const canUndo = historyState.done.length > 1;
		const canRedo = historyState.undone.length > 0;

		debounceCallback(value, canUndo, canRedo);
	});

	return (
		<CodeMirror
			ref={editorRef}
			value={editorValue.current}
			height="100%"
			theme={dracula}
			extensions={extensions}
			onChange={onChange}
		/>
	);
}

export default Editor;
