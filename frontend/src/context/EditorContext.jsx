import { createContext, useContext, useReducer } from "react";

const EditorContext = createContext(null);
const EditorDispatchContext = createContext(null);

export default function EditorProvider({ children }) {
	const [states, dispatch] = useReducer(editorReducer, initialStates);

	return (
		<EditorContext.Provider value={states}>
			<EditorDispatchContext.Provider value={dispatch}>
				{children}
			</EditorDispatchContext.Provider>
		</EditorContext.Provider>
	);
}

function editorReducer(states, { type, value }) {
	switch (type) {
		case "canSave": {
			if(states.canSave === value) return states;

			return { ...states, canSave: value };
		}
		case "canRedo": {
			if(states.canRedo === value) return states;

			return { ...states, canRedo: value };
		}
		case "canUndo": {
			if(states.canUndo === value) return states;

			return { ...states, canUndo: value };
		}

		default: throw Error(`Action undefined: ${type}`);
	}
}

const initialStates = {
	canRedo: false,
	canUndo: false,
	canSave: false
};

export function useEditorStates() {
	return useContext(EditorContext);
}

export function useEditorStateDispatch() {
	return useContext(EditorDispatchContext);
}
