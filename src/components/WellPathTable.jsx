import React, { useState } from 'react';
import * as XLSX from 'xlsx';  // For parsing Excel files
import { useNavigate } from 'react-router-dom'; // For navigating to the new page

function WellPathTable() {
  const [rows, setRows] = useState([{ northern: '0', eastern: '0', tvd: '' }]);
  const navigate = useNavigate();  // Initialize navigation

  // Handle input changes for each row
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedRows = [...rows];
    updatedRows[index][name] = value === '' ? '0' : value;  // Default to "0" if empty
    setRows(updatedRows);
  };

  // Add a new row
  const addRow = () => {
    setRows([...rows, { northern: '0', eastern: '0', tvd: '' }]);
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

      const importedData = worksheet.map((row) => ({
        northern: row['Northern'] || '0',  // Default to "0" if missing
        eastern: row['Eastern'] || '0',  // Default to "0" if missing
        tvd: row['TVD'] || '',
      }));

      setRows(importedData);  // Populate the table with imported data
    };

    reader.readAsArrayBuffer(file);
  };

  // Handle plot button click - navigate to the plot page and pass data
  const handlePlot = () => {
    // Navigate to the plot page and pass the data
    navigate('/new-page', { state: { wellPathData: rows } });
  };

  return (
    <div>
      <h2>Well Path Data Input</h2>

      {/* Import Button for Excel file */}
      <input type="file" accept=".xlsx, .xls" onChange={handleImport} />

      {/* Scrollable Box for Well Path Data */}
      <div style={{ height: '300px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px', marginTop: '20px' }}>
        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Northern (m)</th>
              <th>Eastern (m)</th>
              <th>TVD (m)</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    name="northern"
                    value={row.northern}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="eastern"
                    value={row.eastern}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="tvd"
                    value={row.tvd}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={addRow}>Add Path</button>
      <button onClick={removeRow}>Remove Path</button>

      {/* Plot Button */}
      <button
        onClick={handlePlot}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '18px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Plot Well Path Trajectory
      </button>
    </div>
  );
}

export default WellPathTable;
