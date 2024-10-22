import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import WellPathTable from './components/WellPathTable';  // Well Path Table Component
import DrillStringTable from './components/DrillStringTable';  // Drill String Table Component
import NewPage from './components/NewPage';  // New page component with graph
import Test3D from './components/Test3D'; // Component that will load the BHA model and cube test

function App() {
  return (
    <Router>
      <div>
        <h1>Drilling Application</h1>

        {/* Navigation Links */}
        <nav>
          <Link to="/">Home (Input Data)</Link> | 
          <Link to="/new-page">Graph Page</Link> | 
          <Link to="/cube-test">BHA 3D Model</Link> {/* Updated link to navigate to the BHA 3D model page */}
        </nav>

        <Routes>
          {/* Home Route - Displays WellPathTable and DrillStringTable */}
          <Route
            path="/"
            element={
              <div>
                <section>
                  <h2>Well Path Data Input</h2>
                  <WellPathTable />
                </section>

                <section>
                  <h2>Drill String Component Input</h2>
                  <DrillStringTable />
                </section>
              </div>
            }
          />

          {/* New Page Route - Displays the graph */}
          <Route path="/new-page" element={<NewPage />} />

          {/* BHA 3D Model Route - Loads the BHA model and cube test */}
          <Route path="/cube-test" element={<Test3D />} /> {/* Route for testing the 3D cube */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
