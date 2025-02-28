// import React from "react";
// import Register from "./components/Register";
// import Login from "./components/Login";
// import "@reactbits/liquid-chrome/dist/index.css";

// function App() {
//   return (
//     <div className="liquid-chrome-background">
//       <h1>QR Attendance System</h1>
//       <Register />
//       <Login />
//     </div>
//   );
// }

// export default App;
import React from "react";
import QRScanner from "./components/QRScanner";

function App() {
  return (
    <div className="App">
      <h1>QR Code Attendance System</h1>
      <QRScanner />
    </div>
  );
}

export default App;
