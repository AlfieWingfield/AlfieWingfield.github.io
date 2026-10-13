import React, { createContext, useContext, useLayoutEffect } from "react";

interface ThemeContextValue {}

const ThemeContext = createContext<ThemeContextValue>({});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useLayoutEffect(() => {
    // Always light mode — remove any previously stored dark class or preference
    document.documentElement.classList.remove("dark");
    try {
      localStorage.removeItem("theme");
    } catch {}
  }, []);

  return (
    <ThemeContext.Provider value={{}}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
