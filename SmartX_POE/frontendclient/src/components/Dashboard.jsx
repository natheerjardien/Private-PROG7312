import { Link } from 'react-router-dom';
import HistoricalDataReplay from './HistoricalDataReplay';

// This will be the primary navigation hub for the Smart-X IoT platform (React Router, 2026)
const Dashboard = () => {
    return (
        <div style={styles.container}>
            <h1>Smart-X Telemetry Gateway</h1>
            <p>Select a module below to manage your IoT ecosystem.</p>

            <div style={styles.grid}>
                {/* Client side routing to the sensor registration module */}
                <Link to="/register" style={styles.card}>
                    <h3 style={styles.activeTitle }> Register Sensor</h3>
                    <p style={styles.activeDesc }>Deploy a new device to the network</p>
                </Link>

                <Link to="/aggregate" style={styles.card}>
                    <h3 style={styles.activeTitle }> Data Aggregation</h3>
                    <p style={styles.activeDesc }>Process telemetry batches through operator overloading</p>
                </Link>

                {/* disabled realtime command stream and history (part 2) */}
                <div style={styles.card}>
                    <h3 style={styles.disabledTitle}>Command Stream</h3>
                    <p style={styles.disabledDesc}>Real-time actuator control and history</p>
                </div>

                {/* dsiabled network topology (final POE) */}
                <div style={styles.card}>
                    <h3 style={styles.disabledTitle}> Network Topology</h3>
                    <p style={styles.disabledDesc}>Validate recursive deployment nodes</p>
                </div>
            </div>

            {/* the replay screen */}
            <div style={{ marginTop: '40px', maxWidth: '800px', margin: '40px auto 0' }}>
                <HistoricalDataReplay />
            </div>
        </div>
    );
};

// Basic inline styling for a clean look without needing external CSS immediately
const styles = {
    container: { padding: '2rem', fontFamily: 'Arial, sans-serif', textAlign: 'center' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '25px', marginTop: '3rem' },
    card: {
        position: 'relative',
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '1.5rem',
        width: '250px',
        textDecoration: 'none',
        color: '#333',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    },
    activeTitle: { margin: '10px 0', fontSize: '1.2rem', fontWeight: 'bold' },
    activeDesc: { margin: 0, fontSize: '0.9rem', lineHeight: '1.4' },
    disabledTitle: { color: '#B9120E', margin: '10px 0', fontSize: '1.2rem', fontWeight: 'bold' },
    disabledDesc: { color: '#333', margin: 0, fontSize: '0.9rem', lineHeight: '1.4' }
};

export default Dashboard;

/* Reference list:

   React Router, 2026. The Link component. [online] Available at: <https://reactrouter.com/en/main/components/link> [Accessed 10 September 2026].

*/