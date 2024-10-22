import React from 'react';
import Plot from 'react-plotly.js';
import { useLocation, Link } from 'react-router-dom'; // To access the data and navigate

function NewPage() {
  const location = useLocation();  // To access passed data
  const { wellPathData } = location.state || { wellPathData: [] };

  // Log the well path data to inspect it
  console.log("Well Path Data: ", wellPathData);

  // Prepare data for Plotly
  const plotData = [
    {
      x: wellPathData.map(point => parseFloat(point.easting)),   // Use "easting" for X-axis
      y: wellPathData.map(point => parseFloat(point.northing)),  // Use "northing" for Y-axis
      z: wellPathData.map(point => parseFloat(point.tvd)),       // Use "tvd" for Z-axis
      type: 'scatter3d',
      mode: 'lines',
      marker: { color: 'blue' },
    },
  ];

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>3D Well Path Trajectory</h2>

      {/* Plotly 3D Plot */}
      <Plot
        data={plotData}
        layout={{
          width: 900,  // Make the plot bigger
          height: 700, // Increase height
          title: 'Well Path Trajectory',
          scene: {
            xaxis: { title: 'Easting (ft)' },    // X-axis is Easting
            yaxis: { title: 'Northing (ft)' },   // Y-axis is Northing
            zaxis: { title: 'TVD (ft)' },        // Z-axis is TVD
            aspectratio: { x: 1, y: 1, z: 1 },   // Equal scaling for all axes
          },
        }}
        config={{
          displaylogo: false,  // Hide the Plotly logo
          scrollZoom: true,    // Enable zoom
        }}
      />

      {/* Back button to navigate back to the main page */}
      <Link to="/">
        <button
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
          Back to Main Page
        </button>
      </Link>
    </div>
  );
}

export default NewPage;
