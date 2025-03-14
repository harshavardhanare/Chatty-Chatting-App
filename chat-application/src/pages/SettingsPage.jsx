import React from "react";
import { useThemeStore } from "../store/useThemeStore";

const Settings = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div data-theme={theme} className="h-screen flex flex-col items-center justify-center bg-base-200">
      <div className="max-w-md w-full bg-base-100 p-6 rounded-xl shadow-lg">
        {/* Theme Selector */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Theme Preview</h2>
          <select
            className="select select-bordered select-sm"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="coffee">Coffee</option>
            <option value="retro">Retro</option>
            <option value="synthwave">Synthwave</option>
            <option value="cyberpunk">Cyberpunk</option>
          </select>
        </div>

        {/* Chat Preview */}
        <div className="h-48 overflow-y-auto space-y-2 p-3 bg-base-300 rounded-lg">
          <div className="p-2 bg-gray-600 text-white rounded-lg self-start">Hello! How's your day?</div>
          <div className="p-2 bg-blue-500 text-white rounded-lg self-end text-right">Pretty good! You?</div>
          <div className="p-2 bg-gray-600 text-white rounded-lg self-start">Just testing some themes 😃</div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
