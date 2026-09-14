import { useState } from 'react';
import { Link } from 'react-router-dom';

// Component to handle the registration of new deployment nodes through controlled forms (React, 2026a)
const SensorRegistration = () => {
    // State variables for form inputs aligned with the backend DeploymentNode model (React, 2026b)
    const [nodeId, setNodeId] = useState('');
    const [name, setName] = useState('');
    const [category, setCategory] = useState('Zone');
    const [isActive, setIsActive] = useState(true);

    // States for the media/log file attachment
    const [selectedFile, setSelectedFile] = useState(null);
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');

    // Handles the form submission and communicates with the backend (MDN, 2026)
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents the default browser page reload
        setMessage('');
        setIsError(false);

        try
        {
            let encryptedFileName = null;

            // Processes the file attachment if provided (MDN, 2026b)
            if (selectedFile) {
                const formData = new FormData();
                formData.append('file', selectedFile);

                const uploadResponse = await fetch('http://localhost:8080/api/telemetry/upload', {
                    method: 'POST',
                    body: formData
                });

                if (!uploadResponse.ok) throw new Error("File encryption and upload failed.");

                const uploadResult = await uploadResponse.json();
                encryptedFileName = uploadResult.encryptedFileName;
            }

            // Constructs the payload that will eventually be POSTed to the .NET API
            const payload = {
                nodeId,
                name,
                category,
                isActive,
                subNodes: [] // Initializes as an empty array for the recursive tree
            };

            // Sends the deployment node payload to the .NET API across the Docker bridge
            const response = await fetch('http://localhost:8080/api/topology/validate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok)
            {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Checks the recursive validation response from the backend
            if (data.isValid) {
                const fileMsg = encryptedFileName ? ` (Log encrypted as: ${encryptedFileName})` : '';
                setMessage(`API Success! Node [${nodeId}] - ${name} passed structural validation and is active.${fileMsg}`);

                // Clears the form only on success
                setNodeId('');
                setName('');
                setCategory('Zone');
                setIsActive(true);
                setSelectedFile(null);
                document.getElementById('fileInput').value = '';
            }
            else
            {
                setIsError(true);
                setMessage(`Validation Failed: ${data.errors.join(', ')}`);
            }

        }
        catch (error)
        {
            console.error("API Connection Error:", error);
            setIsError(true);
            setMessage("Critical Error: Unable to reach the Smart-X API Gateway.");
        }
    };

    return (
        <div style={styles.container}>
            <Link to="/" style={styles.button}>← Back to Dashboard</Link>
            <hr></hr>
            <h2> Register New Deployment Node</h2>

            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.inputGroup}>
                    <label>Node ID (e.g., SN-001):</label>
                    <input
                        type="text"
                        value={nodeId}
                        onChange={(e) => setNodeId(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label>Node Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label>Category:</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        style={styles.input} >
                        <option value="Facility">Facility</option>
                        <option value="Zone">Zone</option>
                        <option value="Sub-Zone">Sub-Zone</option>
                        <option value="Meter">Meter</option>
                    </select>
                </div>

                <div style={styles.inputGroup}>
                    <label>Attach Hardware Log (Optional):</label>
                    <input
                        id="fileInput"
                        type="file"
                        onChange={e => setSelectedFile(e.target.files[0])}
                        style={styles.fileInput}
                    />
                    <small style={{ color: 'var(--charcoal-blue)', fontSize: '0.85rem' }}>
                        Files are streamed and AES-256 encrypted on the server.
                    </small>
                </div>

                <div style={styles.inputGroup}>
                    <label>
                        <input
                            type="checkbox"
                            checked={isActive}
                            onChange={(e) => setIsActive(e.target.checked)} />
                        Set Node to Active Status
                    </label>
                </div>

                <button type="submit" style={styles.button}>Register Node</button>
            </form>

            {/* Displays the success messages (React, 2026c) */}
            {message && <div style={isError? styles.errorMessage : styles.successMessage}>{message}</div>}
        </div>
    );
};

const styles = {
    container: { padding: '2rem', fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' },
    form: { display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '1rem' },
    inputGroup: { display: 'flex', flexDirection: 'column', gap: '5px' },
    input: { padding: '8px', borderRadius: '4px', border: '1px solid #ccc' },
    fileInput: { padding: '7px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#fff', width: '100%', boxSizing: 'border-box', cursor: 'pointer' },
    button: { padding: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', textDecoration: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
    successMessage: { marginTop: '20px', padding: '15px', backgroundColor: '#d4edda', color: '#155724', borderRadius: '4px', border: '1px solid #c3e6cb' }
};

export default SensorRegistration;

/* Reference list:

   MDN Web Docs, 2026. Using the Fetch API. [online] Available at: <https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch> [Accessed 10 September 2026].

   MDN Web Docs, 2026b. Using FormData Objects. [online] Available at: <https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects> [Accessed 13 September 2026].

   React, 2026a. React forms and controlled components. [source code] Available at: <https://react.dev/reference/react-dom/components/form> [Accessed 10 September 2026].

   React, 2026b. Using the state hook. [source code] Available at: <https://react.dev/reference/react/useState> [Accessed 10 September 2026].

   React, 2026c. Conditional rendering. [source code] Available at: <https://react.dev/learn/conditional-rendering> [Accessed 10 September 2026].

*/