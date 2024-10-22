import React from 'react';
import Plot from 'react-plotly.js';
import { useLocation, Link } from 'react-router-dom'; // To access the data and navigate

function NewPage() {
  const location = useLocation();  // To access passed data
  const { wellPathData } = location.state || { wellPathData: [] };

  // Prepare data for Plotly
  const plotData = [
    {
      x: wellPathData.map(point => parseFloat(point.northern)),
      y: wellPathData.map(point => parseFloat(point.eastern)),
      z: wellPathData.map(point => -parseFloat(point.tvd)),  // Negative for TVD
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
            xaxis: { title: 'Northing (ft)' },
            yaxis: { title: 'Easting (ft)' },
            zaxis: { title: 'TVD (ft)' },
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
