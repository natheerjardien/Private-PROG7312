import { useState } from 'react';
import { Link } from 'react-router-dom';

// This component shows recursive data rendering and API validation (React, 2026)
const NetworkTopology = () => {
    const [validationResult, setValidationResult] = useState(null);

    // Hardcoded mock tree simulating a physical iot mesh deployment
    const mockTree = {
        nodeId: "HQ-01",
        name: "Main Facility Gateway",
        category: "Facility",
        isActive: true,
        subNodes: [
            {
                nodeId: "Z-01",
                name: "Production Floor",
                category: "Zone",
                isActive: true,
                subNodes: [
                    { nodeId: "M-100", name: "Assembly Line ESP32", category: "Meter", isActive: true, subNodes: [] },
                    { nodeId: "M-101", name: "Packaging ESP32", category: "Meter", isActive: true, subNodes: [] }
                ]
            },
            {
                nodeId: "Z-02",
                name: "Server Room",
                category: "Zone",
                isActive: false, // Intentionally set to false to trigger a validation warning if the backend checks this
                subNodes: [
                    { nodeId: "M-200", name: "HVAC Monitor", category: "Meter", isActive: true, subNodes: [] }
                ]
            }
        ]
    };

    // Recursive component function to render nested nodes (React, 2026)
    const renderTree = (node) => (
        <div key={node.nodeId} style={styles.nodeBox}>
            <strong>{node.nodeId}</strong> - {node.name} <em>({node.category})</em>
            <span style={{ color: node.isActive ? 'green' : 'red', marginLeft: '10px' }}>
                [{node.isActive ? 'Active' : 'Offline'}]
            </span>
            {node.subNodes && node.subNodes.length > 0 && (
                <div style={styles.subNodeContainer}>
                    {node.subNodes.map(subNode => renderTree(subNode))}
                </div>
            )}
        </div>
    );

    const validateTopology = async () => {
        try
        {
            const response = await fetch('http://localhost:8080/api/topology/validate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(mockTree)
            });

            if (!response.ok)
            {
                throw new Error("API Connection Failed");
            }

            const data = await response.json();
            setValidationResult(data);
        }
        catch (error)
        {
            console.error(error);
        }
    };

    return (
        <div style={styles.container}>
            <Link to="/" style={styles.backButton}>← Back to Dashboard</Link>
            <h2> Network Topology Mapper</h2>
            <p>Visualizing and recursively validating the IoT mesh hierarchy.</p>

            <div style={styles.treeContainer}>
                {renderTree(mockTree)}
            </div>

            <button onClick={validateTopology} style={styles.button}>Run Recursive API Validation</button>

            {validationResult && (
                <div style={validationResult.isValid ? styles.successBox : styles.errorBox}>
                    <h3>{validationResult.isValid ? " Tree is Valid" : "❌ Validation Failed"}</h3>
                    {validationResult.errors && validationResult.errors.length > 0 && (
                        <ul>
                            {validationResult.errors.map((err, idx) => <li key={idx}>{err}</li>)}
                        </ul>
                    )}
                    {validationResult.isValid && validationResult.errors.length === 0 && (
                        <p>All nodes passed structural integrity checks.</p>
                    )}
                </div>
            )}
        </div>
    );
};

const styles = {
    container: { padding: '2rem', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' },
    backButton: { textDecoration: 'none', color: '#0056b3', marginBottom: '1rem', display: 'inline-block' },
    treeContainer: { backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #ddd' },
    nodeBox: { margin: '5px 0', padding: '5px' },
    subNodeContainer: { marginLeft: '30px', borderLeft: '2px dashed #ccc', paddingLeft: '10px' },
    button: { padding: '10px 20px', backgroundColor: '#6f42c1', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
    successBox: { marginTop: '20px', padding: '15px', backgroundColor: '#d4edda', color: '#155724', borderRadius: '4px', border: '1px solid #c3e6cb' },
    errorBox: { marginTop: '20px', padding: '15px', backgroundColor: '#f8d7da', color: '#721c24', borderRadius: '4px', border: '1px solid #f5c6cb' }
};

export default NetworkTopology;

/* Reference list:

   React, 2026. Passing Data Deeply with Context (and Recursion). [online] Available at: <https://react.dev/learn/passing-data-deeply-with-context> [Accessed 10 September 2026].

*/