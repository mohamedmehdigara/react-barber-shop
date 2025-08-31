import React from "react";

const Toast = ({ message, theme }) => (
    <div className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-50 p-4 rounded-lg shadow-xl transition-all duration-300 transform ${theme === 'dark' ? 'bg-amber-400 text-zinc-900' : 'bg-zinc-800 text-white'}`}>
      {message}
    </div>
  );

  export default Toast;