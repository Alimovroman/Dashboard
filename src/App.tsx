import React from "react";
import style from "./App.module.css";
import { Dashboard } from "./features/Dashboard";

function App() {
  return (
    <div className={style.root}>
      <div>
        <div className={style.header}>Dashboard</div>
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
