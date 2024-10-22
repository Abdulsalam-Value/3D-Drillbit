import React, { useState } from 'react';
import * as XLSX from 'xlsx';  // Import XLSX for Excel parsing

function DrillStringTable() {
  const [rows, setRows] = useState([{ component: '', od: '', id: '', length: '', cumLength: '' }]);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedRows = [...rows];
    updatedRows[index][name] = value;
    setRows(updatedRows);
  };

  const addRow = () => {
    setRows([...rows, { component: '', od: '', id: '', length: '', cumLength: '' }]);
  };

  const removeRow = () => {
    if (rows.length > 1) {
      setRows(rows.slice(0, -1));
    }
  };

  // Handle file import for DrillStringTable (OD, ID, Length, Cumulative Length)
  const handleImport = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName]);

      const importedData = worksheet.map((row) => ({
        component: '',  // We don't import the component
        od: row['OD (inches)'] || '',  // Ensure the file columns match
        id: row['ID (inches)'] || '',
        length: row['Length (feet)'] || '',
        cumLength: row['Cumulative Length (feet)'] || '',
      }));

      setRows(importedData);  // Populate the table with imported data
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <h3>Drill String Component Input</h3>

      {/* Import Button for Excel file */}
      <input type="file" accept=".xlsx, .xls, .csv" onChange={handleImport} />

      {/* Scrollable box styling */}
      <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px', marginTop: '10px' }}>
        <table>
          <thead>
            <tr>
              <th>Component</th>
              <th>OD (Inch)</th>
              <th>ID (Inch)</th>
              <th>Length (Feet)</th>
              <th>Cumulative Length (Feet)</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td>
                  <select
                    name="component"
                    value={row.component}
                    onChange={(e) => handleInputChange(index, e)}
                  >
                    <option value="">Select Component</option>
                    <option value="Drill Bit (PDC)">Drill Bit (PDC)</option>
                    <option value="Stabilizer (Blade)">Stabilizer (Blade)</option>
                    <option value="Drill Collar (Standard)">Drill Collar (Standard)</option>
                    <option value="Heavyweight Drill Pipe (HWDP)">Heavyweight Drill Pipe (HWDP)</option>
                    <option value="Non-Mag Drill Collar">Non-Mag Drill Collar</option>
                    <option value="Shock Sub">Shock Sub</option>
                    <option value="MWD Tool">MWD Tool</option>
                    <option value="Reamer (Roller)">Reamer (Roller)</option>
                    <option value="Hydraulic Jar">Hydraulic Jar</option>
                    <option value="Under-Reamer (Optional)">Under-Reamer (Optional)</option>
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    name="od"
                    value={row.od}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="id"
                    value={row.id}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="length"
                    value={row.length}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="cumLength"
                    value={row.cumLength}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={addRow}>Add Component</button>
      <button onClick={removeRow}>Remove Component</button>
    </div>
  );
}

export default DrillStringTable;
