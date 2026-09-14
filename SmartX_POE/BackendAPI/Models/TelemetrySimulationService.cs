using System;
using System.Collections.Generic;

namespace BackendAPI.Models
{
    // This service is designed to generate simulated telemetry data using jagged arrays (Microsoft, 2026c)
    public static class TelemetrySimulationService
    {
        private static readonly Random _rand = new Random();

        // Generates a jagged array representing batches of sensor readings
        public static float[][] GenerateJaggedTelemetryBatch(int sensorCount, int readingsPerSensor)
        {
            // Initializes the main array holding the sub arrays
            float[][] batch = new float[sensorCount][];

            for (int i = 0; i < sensorCount; i++)
            {
                // Initializes each sub array
                batch[i] = new float[readingsPerSensor];

                for (int j = 0; j < readingsPerSensor; j++)
                {
                    // Simulates a sensor reading
                    batch[i][j] = (float)Math.Round((_rand.NextDouble() * 60) + 20, 2);
                }
            }

            return batch;
        }

        // Converts the jagged array data into generic Object-Oriented packets
        public static TelemetryCollection<TelemetryPacket<float>> GetSeededPackets()
        {
            var packets = new TelemetryCollection<TelemetryPacket<float>>();

            // Generates a jagged array for 2 sensors, each with 5 readings
            float[][] rawData = GenerateJaggedTelemetryBatch(2, 5);

            // Loops through the jagged array to convert it into a List of packets
            for (int i = 0; i < rawData.Length; i++)
            {
                string deviceId = $"SN-00{i + 1}";

                for (int j = 0; j < rawData[i].Length; j++)
                {
                    // Maps to the DeviceId and SensorValue properties
                    packets.Add(new TelemetryPacket<float>
                    {
                        DeviceId = deviceId,
                        SensorValue = rawData[i][j]
                    });
                }
            }

            return packets;
        }
    }
}

/* Reference list:

   Microsoft, 2026c. Jagged Arrays - C# Programming Guide. [online] Available at: <https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/arrays/jagged-arrays> [Accessed 10 September 2026].

 */