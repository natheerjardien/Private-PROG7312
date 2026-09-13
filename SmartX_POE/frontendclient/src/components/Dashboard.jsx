import { Link } from 'react-router-dom';

// This will be the primary navigation hub for the Smart-X IoT platform (React Router, 2026)
const Dashboard = () => {
    return (
        <div style={styles.container}>
            <h1>Smart-X Telemetry Gateway</h1>
            <p>Select a module below to manage your IoT ecosystem.</p>

            <div style={styles.grid}>
                {/* Client side routing to the sensor registration module */}
                <Link to="/register" style={styles.card}>
                    <h3> Register Sensor</h3>
                    <p>Deploy a new device to the network</p>
                </Link>

                <Link to="/aggregate" style={styles.card}>
                    <h3> Data Aggregation</h3>
                    <p>Process telemetry batches through operator overloading</p>
                </Link>

                <Link to="/topology" style={styles.card}>
                    <h3> Network Topology</h3>
                    <p>Validate recursive deployment nodes</p>
                </Link>
            </div>
        </div>
    );
};

// Basic inline styling for a clean look without needing external CSS immediately
const styles = {
    container: { padding: '2rem', fontFamily: 'Arial, sans-serif', textAlign: 'center' },
    grid: { display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '2rem', flexWrap: 'wrap' },
    card: {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '1.5rem',
        width: '250px',
        textDecoration: 'none',
        color: '#333',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }
};

export default Dashboard;

/* Reference list:

   React Router, 2026. The Link component. [online] Available at: <https://reactrouter.com/en/main/components/link> [Accessed 10 September 2026].

*/