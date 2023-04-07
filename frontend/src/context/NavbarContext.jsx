import { createContext, useContext, useState } from "react";

const NavbarContext = createContext(null);

export default function NavbarContextProvider({ children }) {
  const [isTabMenuVisible, setIsTabMenuVisible] = useState(false);
  const [isLogsVisible, setIsLogsVisible] = useState(false);
	const [theme, setTheme] = useState("dark");

  return (
    <NavbarContext.Provider
      value={{
        isTabMenuVisible,
        setIsTabMenuVisible,
        isLogsVisible,
        setIsLogsVisible,
				theme,
				setTheme
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
}

export function useNavbarContext() {
  return useContext(NavbarContext);
}
