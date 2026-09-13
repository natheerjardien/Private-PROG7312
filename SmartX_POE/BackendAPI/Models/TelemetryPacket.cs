using System;

namespace BackendAPI.Models
{
    // A generic class to handle teh different telemetry data types (Microsoft, 2026a)
    public class TelemetryPacket<T> where T : struct
    {
        public string DeviceId { get; set; } = string.Empty;
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        public T SensorValue { get; set; }

        // Parameterless constructor for deserialization
        public TelemetryPacket() { }

        public TelemetryPacket(string deviceId, T value)
        {
            DeviceId = deviceId;
            SensorValue = value;
        }

        // Overloading the '+' operator to allow direct aggregation of sensor values (Microsoft, 2026b)
        public static TelemetryPacket<T> operator +(TelemetryPacket<T> a, TelemetryPacket<T> b)
        {
            if (a.DeviceId != b.DeviceId)
            {
                throw new InvalidOperationException("Cannot aggregate telemetry from different devices.");
            }

            // Using dynamic to handle the addition of generic types at runtime 
            dynamic valA = a.SensorValue;
            dynamic valB = b.SensorValue;
            T aggregatedValue = (T)(valA + valB);

            return new TelemetryPacket<T>
            {
                DeviceId = a.DeviceId,
                Timestamp = DateTime.UtcNow, // New timestamp for the aggregated packet
                SensorValue = aggregatedValue
            };
        }

        // Overloading the '-' operator for delta comparisons (Microsoft, 2026b)
        public static TelemetryPacket<T> operator -(TelemetryPacket<T> a, TelemetryPacket<T> b)
        {
            if (a.DeviceId != b.DeviceId)
            {
                throw new InvalidOperationException("Cannot calculate delta for different devices.");
            }

            dynamic valA = a.SensorValue;
            dynamic valB = b.SensorValue;
            T deltaValue = (T)(valA - valB);

            return new TelemetryPacket<T>
            {
                DeviceId = a.DeviceId,
                Timestamp = DateTime.UtcNow,
                SensorValue = deltaValue
            };
        }
    }

    // DTO to safely receive multiple telemetry packets for aggregation (Microsoft, 2026a)
    public class AggregateRequestDto<T> where T : struct
    {
        public TelemetryPacket<T> Meter1 { get; set; } = new();
        public TelemetryPacket<T> Meter2 { get; set; } = new();
    }
}

/* Reference list:

   Microsoft, 2026a. Generic classes and methods. [online] Available at: <https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/generics> [Accessed 9 September 2026].
   
   Microsoft, 2026b. Operator overloading. [online] Available at: <https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/operator-overloading> [Accessed 9 September 2026].
*/