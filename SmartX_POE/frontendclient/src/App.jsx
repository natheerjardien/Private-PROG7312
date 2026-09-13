import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import SensorRegistration from './components/SensorRegistration'; // imported components
import DataAggregation from './components/DataAggregation';
import NetworkTopology from './components/NetworkTopology';

// Main app component for the routing context (React Router, 2026)
const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    {/* Default route loads the dashboard menu */}
                    <Route path="/" element={<Dashboard />} />

                    {/* Live routes mapped to the actual Sensor Registration + Data Aggregation + Netwrok Topology components */}
                    <Route path="/register" element={<SensorRegistration />} />
                    <Route path="/aggregate" element={<DataAggregation />} />
                    <Route path="/topology" element={<NetworkTopology />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;

/* Reference list:

   React Router, 2026. Data routing overview. [online] Available at: <https://reactrouter.com/en/main/start/overview> [Accessed 10 September 2026].

*/