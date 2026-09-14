import { useState, useEffect } from 'react';

// )the engagement startegy I chose) Historical Data Replay (React, 2026a)
const HistoricalDataReplay = () => {
    // Simulated time series telemetry data (exmaple readings of what you could get from esp32 running sensors)
    const mockTimeSeriesData = [
        { id: 1, time: '14:30:00', device: 'ESP32-DevKit-01', metric: 45.2, status: 'Stable' },
        { id: 2, time: '14:30:05', device: 'ESP32-DevKit-01', metric: 46.1, status: 'Stable' },
        { id: 3, time: '14:30:10', device: 'ESP32-DevKit-01', metric: 45.8, status: 'Stable' },
        { id: 4, time: '14:30:15', device: 'ESP32-DevKit-01', metric: 89.9, status: 'Spike Detected' },
        { id: 5, time: '14:30:20', device: 'ESP32-DevKit-01', metric: 91.2, status: 'Critical' },
        { id: 6, time: '14:30:25', device: 'ESP32-DevKit-01', metric: 47.0, status: 'Recovering' },
        { id: 7, time: '14:30:30', device: 'ESP32-DevKit-01', metric: 45.5, status: 'Stable' },
    ];

    const [currentIndex, setCurrentIndex] = useState(mockTimeSeriesData.length - 1);
    const [isPlaying, setIsPlaying] = useState(false);

    // Handles the automatic playback when "Play" is pressed
    useEffect(() => {
        let interval;

        if (isPlaying)
        {
            interval = setInterval(() => {
                setCurrentIndex((prevIndex) => {
                    // if it reaches the final frame it will pause automatically
                    if (prevIndex >= mockTimeSeriesData.length - 2) {
                        setIsPlaying(false);
                        return mockTimeSeriesData.length - 1;
                    }
                    return prevIndex + 1;
                });
            }, 1500); // skips forward every 1.5 seconds
        }

        return () => clearInterval(interval); // clears the interval when the playing stops
    }, [isPlaying, mockTimeSeriesData.length]);

    const currentPacket = mockTimeSeriesData[currentIndex];
    const isAnomaly = currentPacket.metric > 80;

    return (
        <div style={styles.widgetContainer}>
            <div style={styles.header}>
                <div>
                    <h3 style={styles.title}>Data Replay Timeline</h3>
                    <p style={styles.subtitle}>Target: {currentPacket.device}</p>
                </div>

                <div style={styles.statusIndicator}>
                    <span style={{ ...styles.pulse, backgroundColor: isPlaying ? 'var(--lime-moss)' : '#ccc' }}></span>
                    {isPlaying ? 'Live Feed' : 'Paused'}
                </div>
            </div>

            {/* display screen */}
            <div style={styles.dataContainer}>
                <div style={styles.dataRow}>
                    <span style={styles.label}>TIMESTAMP</span>
                    <span style={styles.value}>{currentPacket.time}</span>
                </div>

                <div style={styles.dataRow}>
                    <span style={styles.label}>METRIC VALUE</span>
                    <span style={{ ...styles.value, ...styles.highlight, color: isAnomaly ? '#d93838' : 'var(--onyx)' }}>
                        {currentPacket.metric.toFixed(1)} <span style={styles.unit}>units</span>
                    </span>
                </div>

                <div style={styles.dataRow}>
                    <span style={styles.label}>SYSTEM STATUS</span>
                    <span style={{ ...styles.value, color: isAnomaly ? '#d93838' : 'var(--green)' }}>
                        {currentPacket.status}
                    </span>
                </div>
            </div>

            {/* controls and slider */}
            <div style={styles.playbackSection}>
                <div style={styles.controls}>
                    <button style={styles.btnText} onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))} disabled={currentIndex === 0}>
                        REWIND
                    </button>

                    <button style={styles.btnPrimary} onClick={() => {
                        if (!isPlaying && currentIndex === mockTimeSeriesData.length - 1) setCurrentIndex(0);
                        setIsPlaying(!isPlaying);
                    }}>
                        {isPlaying ? 'PAUSE' : 'PLAY'}
                    </button>

                    <button style={styles.btnText} onClick={() => setCurrentIndex(prev => Math.min(mockTimeSeriesData.length - 1, prev + 1))} disabled={currentIndex === mockTimeSeriesData.length - 1}>
                        FORWARD
                    </button>
                </div>

                <div style={styles.scrubberWrapper}>
                    <input
                        type="range" min="0" max={mockTimeSeriesData.length - 1} value={currentIndex}
                        onChange={(e) => { setIsPlaying(false); setCurrentIndex(parseInt(e.target.value)); }}
                        style={styles.slider}
                    />

                    <div style={styles.timeline}>
                        <span>{mockTimeSeriesData[0].time}</span>
                        <span>{mockTimeSeriesData[mockTimeSeriesData.length - 1].time}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    widgetContainer: {
        padding: '35px',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.4)',
        marginTop: '30px',
        textAlign: 'left',
        fontFamily: 'inherit'
    },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(255, 255, 255, 0.3)', paddingBottom: '20px', marginBottom: '20px' },
    title: { margin: '0 0 5px 0', color: 'var(--onyx)', fontSize: '1.4rem', fontWeight: 'bold' },
    subtitle: { margin: 0, color: 'var(--charcoal-blue)', fontSize: '0.9rem' },
    statusIndicator: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--charcoal-blue)', textTransform: 'uppercase', letterSpacing: '1px' },
    pulse: { width: '8px', height: '8px', borderRadius: '50%' },

    dataContainer: { display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' },
    dataRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    label: { color: 'var(--charcoal-blue)', fontSize: '0.85rem', fontWeight: 'bold', letterSpacing: '1px' },
    value: { fontSize: '1.1rem', fontWeight: '600', color: 'var(--onyx)' },
    highlight: { fontSize: '2.5rem', fontWeight: 'bold', letterSpacing: '-1px' },
    unit: { fontSize: '1rem', color: 'var(--charcoal-blue)', fontWeight: 'normal' },

    playbackSection: { backgroundColor: 'transparent', padding: '20px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.3)' },
    controls: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' },
    btnText: { background: 'none', border: 'none', color: 'var(--charcoal-blue)', fontWeight: 'bold', fontSize: '0.85rem', cursor: 'pointer' },
    btnPrimary: { backgroundColor: 'rgba(255, 255, 255, 0.4)', color: 'var(--onyx)', border: '1px solid rgba(255, 255, 255, 0.6)', padding: '8px 25px', borderRadius: '4px', fontWeight: 'bold', fontSize: '0.85rem', cursor: 'pointer', transition: 'background-color 0.2s' },

    scrubberWrapper: { display: 'flex', flexDirection: 'column', gap: '8px' },
    slider: { width: '100%', cursor: 'pointer', accentColor: 'var(--lime-moss)' },
    timeline: { display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--charcoal-blue)' }
};

export default HistoricalDataReplay;

/* Reference list:

   React, 2026a. Synchronizing with Effects. [source code] Available at: <https://react.dev/learn/synchronizing-with-effects> [Accessed 13 September 2026].

*/