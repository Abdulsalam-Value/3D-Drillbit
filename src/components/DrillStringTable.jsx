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
<div className="flex flex-col items-center p-8">
  <h3 className="text-2xl font-semibold mb-6 text-gray-800">Drill String Component Input</h3>

  {/* Import Button for Excel file */}
  <input
    type="file"
    accept=".xlsx, .xls, .csv"
    onChange={handleImport}
    className="mb-4 text-sm text-gray-600 bg-white border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
  />

  {/* Scrollable box styling */}
  <div className="w-full max-w-4xl max-h-[300px] overflow-y-auto shadow-lg border border-gray-300 rounded-lg mt-6">
    <table className="min-w-full table-auto bg-white">
      <thead>
        <tr className="bg-blue-600 text-white">
          <th className="px-4 py-2">Component</th>
          <th className="px-4 py-2">OD (Inch)</th>
          <th className="px-4 py-2">ID (Inch)</th>
          <th className="px-4 py-2">Length (Feet)</th>
          <th className="px-4 py-2">Cumulative Length (Feet)</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index} className="text-center border-t">
            <td className="border px-4 py-2">
              <select
                name="component"
                value={row.component}
                onChange={(e) => handleInputChange(index, e)}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
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
            <td className="border px-4 py-2">
              <input
                type="text"
                name="od"
                value={row.od}
                onChange={(e) => handleInputChange(index, e)}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
              />
            </td>
            <td className="border px-4 py-2">
              <input
                type="text"
                name="id"
                value={row.id}
                onChange={(e) => handleInputChange(index, e)}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
              />
            </td>
            <td className="border px-4 py-2">
              <input
                type="text"
                name="length"
                value={row.length}
                onChange={(e) => handleInputChange(index, e)}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring focus:ring-blue-200 focus:outline-none"
              />
            </td>
            <td className="border px-4 py-2">
              <input
                type="text"
                name="cumLength"
                value={row.cumLength}
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
      Add Component
    </button>
    <button
      onClick={removeRow}
      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
    >
      Remove Component
    </button>
  </div>
</div>

  );
}

export default DrillStringTable;
