using System;
using System.Collections.Generic;

namespace BackendAPI.Models
{
    // Manages all the raw telemetry batching using advanced arrays and collections (Microsoft, 2026a)
    public class TelemetryBatchManager
    {
        // Processes a jagged array of raw sensor readings and transfers them into a List<T> (Microsoft, 2026b)
        public static List<TelemetryPacket<float>> ProcessRawBatchToCollection(float[][] rawBatchData, string deviceId)
        {
            var optimizedList = new List<TelemetryPacket<float>>();

            // Iterates through the jagged array structure
            for (int i = 0; i < rawBatchData.Length; i++)
            {
                for (int j = 0; j < rawBatchData[i].Length; j++)
                {
                    // Wraps each raw data point into the generic structure
                    var packet = new TelemetryPacket<float>(deviceId, rawBatchData[i][j]);
                    optimizedList.Add(packet);
                }
            }

            return optimizedList;
        }
    }
}

/* Reference list:

   Microsoft, 2026a. Arrays (C# Programming Guide). [online] Available at: <https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/arrays/> [Accessed 9 September 2026].
   
   Microsoft, 2026b. Collections (C#). [online] Available at: <https://learn.microsoft.com/en-us/dotnet/csharp/collections> [Accessed 9 September 2026].
*/