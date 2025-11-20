import React, { createContext, useEffect, useMemo, useState } from "react";

type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const setDocumentTheme = (t: string) => {
    document.documentElement.classList.toggle("dark", t === "dark");
  };

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    setDocumentTheme(next);
  };

  useEffect(() => {
    setDocumentTheme(theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeContext;
