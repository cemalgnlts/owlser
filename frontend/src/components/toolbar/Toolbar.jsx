import { useState } from "react";

import {
  useEditorStateDispatch,
  useEditorStates,
} from "../../context/EditorContext";

import {
  PlayIcon,
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  ServerIcon,
} from "@heroicons/react/24/outline";

import devices from "../../libs/devices.json";

import { saveCode } from "../../libs/api";

const emulation = localStorage.getItem("emulation") ?? "none";

function Toolbar({ execute, editorUndo, editorRedo }) {
  const { canSave, canRedo, canUndo } = useEditorStates();
  const [executeStarted, setExecuteStarted] = useState(false);
  const [saveStarted, setSaveStarted] = useState(false);
  const dispatch = useEditorStateDispatch();

  const onRedo = () => {
    editorRedo();
  };

  const onUndo = () => {
    editorUndo();
  };

  const onSave = async () => {
    setSaveStarted(true);
    const { status, output } = await saveCode();
    setSaveStarted(false);

    if (!status) alert(output);

    dispatch({ type: "canSave", value: false });
  };

  const onPlay = async () => {
    setExecuteStarted(true);
    await execute();
    setExecuteStarted(false);
  };

  const onEmulationDevice = async (ev) => {
    const device = ev.target.value;
    localStorage.setItem("emulation", device);
  };

  return (
    <div className="btn-group bg-base-300">
      <div className="w-44 hidden lg:block"></div>
      <div className="tooltip" data-tip="Redo code">
        <button
          className="btn btn-sm btn-ghost gap-2"
          onClick={onUndo}
          disabled={!canUndo}
        >
          <ArrowUturnLeftIcon className="w-5 h-5 align-bottom" />
        </button>
      </div>
      <div className="tooltip" data-tip="Undo code">
        <button
          className="btn btn-sm btn-ghost gap-2"
          onClick={onRedo}
          disabled={!canRedo}
        >
          <ArrowUturnRightIcon className="w-5 h-5 align-bottom" />
        </button>
      </div>
      <div className="divider divider-horizontal mx-0"></div>
      <div className="tooltip" data-tip="Save code">
        <button
          className={`btn btn-sm btn-ghost gap-2${
            saveStarted ? " loading" : ""
          }`}
          onClick={onSave}
          disabled={!canSave}
        >
          {!saveStarted && <ServerIcon className="w-5 h-5 align-bottom" />}
        </button>
      </div>
      <div className="divider divider-horizontal mx-0"></div>
      <button
        onClick={onPlay}
        className={`btn btn-sm btn-ghost gap-2 normal-case font-normal${
          executeStarted ? " loading" : ""
        }`}
      >
        {!executeStarted && <PlayIcon className="w-5 h-5 align-bottom" />}
        Run
      </button>
      <div className="grow"></div>
      <select
        className="select select-xs self-center bg-base-300 mr-1 w-full shrink sm:w-auto"
        onChange={onEmulationDevice}
      >
        <option value="no-emulation">
          Device Emulation
        </option>
        {devices.map((device, index) => (
          <option key={index} value={device}>
            {device}
          </option>
        ))}
      </select>
      <div className="w-56 md:w-72 lg:w-80 xl:w-96 hidden md:block"></div>
    </div>
  );
}

export default Toolbar;
