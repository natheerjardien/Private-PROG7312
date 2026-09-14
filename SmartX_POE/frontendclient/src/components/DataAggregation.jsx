import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Used to visualize the seeded data and test operator overloading (React, 2026)
const DataAggregation = () => {
    const [telemetryData, setTelemetryData] = useState([]);
    const [aggregationResult, setAggregationResult] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    // Fetches the seeded jagged array data when the component loads
    useEffect(() => {
        const fetchSeededData = async () => {
            try
            {
                const response = await fetch('http://localhost:8080/api/telemetry/seed');
                if (response.ok)
                {
                    const data = await response.json();
                    setTelemetryData(data);
                }
            }
            catch (error)
            {
                console.error("Failed to fetch seeded data:", error);
            }
        };
        fetchSeededData();
    }, []);

    // Sends two packets to the backend to test the overloaded '+' operator
    const handleAggregate = async () => {
        setErrorMessage('');
        setAggregationResult(null);

        // Grab the first two readings from SN-001 to ensure DeviceIds match (per your backend logic)
        const sn001Readings = telemetryData.filter(packet => packet.deviceId === 'SN-001');

        if (sn001Readings.length < 2)
        {
            setErrorMessage("Not enough data to aggregate. Please ensure the API is seeding properly.");
            return;
        }

        const payload = {
            meter1: sn001Readings[0],
            meter2: sn001Readings[1]
        };

        try
        {
            const response = await fetch('http://localhost:8080/api/telemetry/aggregate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok)
            {
                const errText = await response.text();
                throw new Error(errText);
            }

            const result = await response.json();
            setAggregationResult(result);
        }
        catch (error)
        {
            setErrorMessage(`Aggregation Failed: ${error.message}`);
        }
    };

    return (
        <div style={styles.container}>
            <Link to="/" style={styles.button}>← Back to Dashboard</Link>
            <hr></hr>
            <h2> Data Aggregation Engine</h2>
            <p>Testing C# Operator Overloading via API</p>

            <div style={styles.dataBox}>
                <h3>Seeded Telemetry (Jagged Array Source)</h3>
                <div style={{ maxHeight: '200px', overflowY: 'auto', backgroundColor: '#f8f9fa', padding: '10px' }}>
                    {telemetryData.length === 0 ? <p>Loading data...</p> :
                        telemetryData.map((packet, index) => (
                            <div key={index} style={{ borderBottom: '1px solid #ddd', padding: '5px 0' }}>
                                <strong>{packet.deviceId}</strong> | Value: {packet.sensorValue} | Time: {new Date(packet.timestamp).toLocaleTimeString()}
                            </div>
                        ))
                    }
                </div>
            </div>

            <button onClick={handleAggregate} style={styles.button}>
                Aggregate First Two SN-001 Readings (+)
            </button>

            {aggregationResult && (
                <div style={styles.successMessage}>
                    <h3> Aggregation Success</h3>
                    <p><strong>Device:</strong> {aggregationResult.deviceId}</p>
                    <p><strong>Combined Value:</strong> {aggregationResult.sensorValue.toFixed(2)}</p>
                    <p><strong>New Timestamp:</strong> {new Date(aggregationResult.timestamp).toLocaleString()}</p>
                </div>
            )}

            {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}
        </div>
    );
};

const styles = {
    container: { padding: '2rem', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' },
    dataBox: { border: '1px solid #ccc', borderRadius: '4px', marginBottom: '20px', padding: '10px' },
    button: { padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', textDecoration: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
    successMessage: { marginTop: '20px', padding: '15px', backgroundColor: '#d4edda', color: '#155724', borderRadius: '4px', border: '1px solid #c3e6cb' },
    errorMessage: { marginTop: '20px', padding: '15px', backgroundColor: '#f8d7da', color: '#721c24', borderRadius: '4px', border: '1px solid #f5c6cb' }
};

export default DataAggregation;

/* Reference list:

   React, 2026. Synchronizing with Effects. [online] Available at: <https://react.dev/learn/synchronizing-with-effects> [Accessed 10 September 2026].

*/