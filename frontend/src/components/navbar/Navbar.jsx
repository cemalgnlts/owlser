import { useCallback, memo } from "react";

import {
  SunIcon,
  MoonIcon,
  Bars3BottomLeftIcon,
  Bars3BottomRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

import { useNavbarContext } from "../../context/NavbarContext";

function Navbar() {
  const {
		isTabMenuVisible,
    setIsTabMenuVisible,
		isLogsVisible,
    setIsLogsVisible,
		setTheme
  } = useNavbarContext();

	console.log("rendered");

  const toggleTabMenu = ev => {
		const checked = ev.target.checked;

		setIsTabMenuVisible(checked);
		if(checked === true) setIsLogsVisible(false);
  };
	
  const toggleLogs = ev => {
		const checked = ev.target.checked;

		setIsLogsVisible(checked);
		if(checked === true) setIsTabMenuVisible(false);
  };

	const toggleTheme = ev => {
		const checked = ev.target.checked;

		setTheme(checked ? "light" : "dark");
	};

  return (
    <div className="navbar bg-neutral text-neutral-content">
      <div className="flex-1">
        <label className="btn btn-circle btn-ghost swap swap-rotate lg:hidden">
          <input type="checkbox" checked={isTabMenuVisible} onChange={toggleTabMenu} />
          <Bars3BottomLeftIcon className="swap-off w-6 h-6" />
          <XMarkIcon className="swap-on w-6 h-6" />
        </label>
        <a href="/" className="btn btn-ghost normal-case text-xl">
          Owlser
        </a>
      </div>
      <div className="flex-none">
        <label className="btn btn-circle btn-ghost swap swap-rotate">
          <input type="checkbox" onChange={toggleTheme} />
          <SunIcon className="swap-off w-6 h-6" />
          <MoonIcon className="swap-on w-5 h-5" />
        </label>
        <label className="btn btn-circle btn-ghost swap swap-rotate md:hidden">
          <input type="checkbox" checked={isLogsVisible} onChange={toggleLogs} />
          <Bars3BottomRightIcon className="swap-off w-6 h-6" />
          <XMarkIcon className="swap-on w-6 h-6" />
        </label>
      </div>
    </div>
  );
}

export default memo(Navbar);
