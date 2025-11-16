import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import CreateProfile from "./pages/CreateProfile";
import Swipe from "./pages/Swipe";
import Matches from "./pages/Matches";
import "./App.css"

const App: React.FC = () => {
  return (
    <div style={{ padding: "2rem", backgroundColor: "#ffb38a" }}>
      <nav style={{ marginBottom: "1rem" }}>
        <Link to="/" style={{ marginRight: "1rem" }}>Create Profile</Link>
        <Link to="/swipe" style={{ marginRight: "1rem" }}>Swipe</Link>
        <Link to="/matches">Matches</Link>
      </nav>

      <Routes>
        <Route path="/" element={<CreateProfile />} />
        <Route path="/swipe" element={<Swipe />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </div>
  );
};

export default App;


// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
