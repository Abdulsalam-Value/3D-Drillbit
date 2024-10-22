import React, { useState } from 'react';
import * as XLSX from 'xlsx';  // For parsing Excel files
import { useNavigate } from 'react-router-dom'; // For navigating to the new page

function WellPathTable() {
  const [rows, setRows] = useState([{ northing: '', easting: '', tvd: '' }]);
  const navigate = useNavigate();  // Initialize navigation

  // Handle input changes for each row
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedRows = [...rows];
    updatedRows[index][name] = value;  // Update the corresponding row's field
    setRows(updatedRows);
  };

  // Add a new row with empty values by default
  const addRow = () => {
    setRows([...rows, { northing: '', easting: '', tvd: '' }]);
  };

  // Remove the last row
  const removeRow = () => {
    if (rows.length > 1) {
      setRows(rows.slice(0, -1));
    }
  };

  // Handle file import and populate the Well Path fields
  const handleImport = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName]);

      // Populate the rows based on the Excel file
      const importedData = worksheet.map((row) => ({
        northing: row['Northing'] !== undefined ? String(row['Northing']) : '0',  // If undefined, set to '0'
        easting: row['Easting'] !== undefined ? String(row['Easting']) : '0',    // If undefined, set to '0'
        tvd: row['TVD'] !== undefined ? String(row['TVD']) : '',  // TVD can be blank or defaulted
      }));

      // Set the rows with imported data
      setRows(importedData);
    };

    reader.readAsArrayBuffer(file);
  };

  // Handle plot button click - navigate to the plot page and pass data
  const handlePlot = () => {
    // Validate data before plotting: Ensure no empty fields
    const validData = rows.filter(row => row.northing && row.easting && row.tvd);
    if (validData.length > 0) {
      navigate('/new-page', { state: { wellPathData: validData } });
    } else {
      alert("Please ensure all fields are filled or imported before plotting.");
    }
  };

  return (
    <div className="flex flex-col items-center p-8">
    <h2 className="text-3xl font-bold mb-6 text-gray-800">Well Path Data Input</h2>
  
    {/* Import Button for Excel file */}
    <input
      type="file"
      accept=".xlsx, .xls"
      onChange={handleImport}
      className="mb-4 text-sm text-gray-600 bg-white border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
    />
  
    {/* Scrollable Box for Well Path Data */}
    <div className="w-full max-w-4xl max-h-[300px] overflow-y-auto shadow-lg border border-gray-300 rounded-lg mt-6">
      <table className="min-w-full table-auto bg-white">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="px-4 py-2">Northing (m)</th>
            <th className="px-4 py-2">Easting (m)</th>
            <th className="px-4 py-2">TVD (m)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="text-center border-t">
              <td className="border px-4 py-2">
                <input
                  type="text"
                  name="northing"
                  value={row.northing}
                  onChange={(e) => handleInputChange(index, e)}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  name="easting"
                  value={row.easting}
                  onChange={(e) => handleInputChange(index, e)}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  name="tvd"
                  value={row.tvd}
                  onChange={(e) => handleInputChange(index, e)}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  
    <div className="flex space-x-4 mt-6">
      <button
        onClick={addRow}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
      >
        Add Path
      </button>
      <button
        onClick={removeRow}
        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
      >
        Remove Path
      </button>
      <button
        onClick={handlePlot}
        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
      >
        Plot Well Path Trajectory
      </button>
    </div>
  </div>
  
  );
}

export default WellPathTable;
