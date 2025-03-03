import React, { useRef, useState } from "react";

const App = () => {
    const [pdfPath, setPdfPath] = useState("");  // Store selected PDF path
    const billRef = useRef();

    // Handle file selection using Electron dialog
    const handleFileSelect = async () => {
        const filePath = await window.electron.selectFile();
        if (filePath) {
            console.log("🛠 Selected File Path:", filePath);  // Debugging
            setPdfPath(filePath);
        }
    };

    // Print selected PDF
    const handlePrintPDF = () => {
        if (pdfPath) {
            console.log("Printing PDF:", pdfPath);  // Debugging
            window.electron.printPDF(pdfPath);
        } else {
            alert("Please select a PDF first.");
        }
    };

    // Print the HTML bill component
    const handlePrintComponent = () => {
        const billHTML = billRef.current?.outerHTML;
        if (billHTML) {
            console.log("Printing HTML Bill:", billHTML);  // Debugging
            window.electron.printComponent(billHTML);
        } else {
            alert("Bill component is missing.");
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "20px", marginLeft: "120px" }}>
            <h1>Electron Bill Printer</h1>

            {/* PDF Selection and Printing */}
            <button onClick={handleFileSelect} style={{ margin: "10px", padding: "10px" }}>
                Select PDF
            </button>
            {pdfPath && <p>📄 Selected: {pdfPath}</p>}

            <button onClick={handlePrintPDF} style={{ margin: "10px", padding: "10px" }}>
                Print Selected PDF
            </button>

            {/* Print HTML Bill */}
            <button onClick={handlePrintComponent} style={{ margin: "10px", padding: "10px" }}>
                Print HTML Bill
            </button>

            {/* Bill Component */}
            {/* <div ref={billRef} style={{ marginTop: "20px", border: "1px solid black", padding: "10px" }}>
                <h2>Bill Summary</h2>
                <p>Customer: John Doe</p>
                <p>Amount: $100</p>
                <p>Date: 03/03/2025</p>
            </div> */}
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
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
