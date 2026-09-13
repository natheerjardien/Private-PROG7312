using System;
using System.Collections.Generic;

namespace BackendAPI.Models
{
    // This is a physical deployment location using the Composite Pattern (Microsoft, 2026a)
    public class DeploymentNode
    {
        public string NodeId { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty; // (facility/zone/subzone)
        public bool IsActive { get; set; } = true;

        // Self referencing list for nested deployment hierarchies (Microsoft, 2026a)
        public List<DeploymentNode> SubNodes { get; set; } = new List<DeploymentNode>();

        // Recursive validation method to verify node hierarchies and operational status (Microsoft, 2026b)
        public static bool ValidateNodeTree(DeploymentNode node, ref List<string> errorLog)
        {
            if (node == null)
            {
                return false;
            }

            // Checks if current node is inactive then logs an error
            if (!node.IsActive)
            {
                errorLog.Add($"Node {node.NodeId} ({node.Name}) is offline or misconfigured.");
            }

            // (recursive step) goes down into all the subnodes in the deployment tree (Microsoft, 2026b)
            if (node.SubNodes != null)
            {
                foreach (var subNode in node.SubNodes)
                {
                    ValidateNodeTree(subNode, ref errorLog);
                }
            }

            // Returns true only if no structural errors were added
            return errorLog.Count == 0;
        }
    }
}

/* Reference list:

   Microsoft, 2026a. Classes and structs. [online] Available at: <https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/classes> [Accessed 9 September 2026].
   
   Microsoft, 2026b. Recursion in C#. [online] Available at: <https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/> [Accessed 9 September 2026].
*/