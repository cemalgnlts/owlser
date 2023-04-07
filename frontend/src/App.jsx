import { useCallback, useState, useEffect } from "react";

import Navbar from "./components/navbar";
import Editor from "./components/editor";
import TabMenu from "./components/tabmenu";
import Toolbar from "./components/toolbar";
import Docs from "./components/docs";
import Info from "./components/info";

import { executeCode } from "./libs/api";

import { useNavbarContext } from "./context/NavbarContext.jsx";

function Root() {
  const [editorUndo, setEditorUndo] = useState(null);
  const [editorRedo, setEditorRedo] = useState(null);
	const {theme, isTabMenuVisible, isLogsVisible} = useNavbarContext();
	const [tabIndex, setTabIndex] = useState(0);
  const [output, setOuput] = useState([]);

  const execute = useCallback(async () => {
    const { status, output } = await executeCode();

    if (!status) {
      console.error(output);
      setOuput(["An error has occurred, check the Developer Console.", output]);
      return;
    }

    setOuput(Array.isArray(output) ? output : [output]);
  });

  return (
    <div className="h-full flex flex-col" data-theme={theme}>
      <Navbar />
      <Toolbar
        execute={execute}
        editorUndo={editorUndo}
        editorRedo={editorRedo}
      />
      <div className="grow flex content">
        <aside className="bg-base-300 hidden z-10 lg:block" style={{ display: isTabMenuVisible && "flex" }}>
          <TabMenu tabIndex={tabIndex} setTabIndex={setTabIndex} />
        </aside>
        <main className="h-full grow overflow-hidden">
					{ tabIndex === 0 && <Editor setEditorUndo={setEditorUndo} setEditorRedo={setEditorRedo} /> }
					{ tabIndex === 1 && <Docs /> }
					{ tabIndex === 2 && <Info /> }
        </main>
        <div className="bg-base-300 w-56 md:w-72 lg:w-80 xl:w-96 -mt-8 p-2 shrink-0 overflow-hidden z-10 hidden md:block" style={{ display: isLogsVisible && "flex" }}>
          <h3 className="text-md font-bold">Logs</h3>
          <ul className="py-4 overflow-auto h-full">
            {output.map((msg, index) => (
              <li className="p-2 font-mono" key={index}>
                {msg}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Root;
