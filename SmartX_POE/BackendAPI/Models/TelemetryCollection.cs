using System;
using System.Collections;
using System.Collections.Generic;

namespace BackendAPI.Models
{
    // Created a custom generic collection to manage telemetry data to replace the standard List<T> (Microsoft, 2026a)
    public class TelemetryCollection<T> : IEnumerable<T>
    {
        private T[] _items;
        private int _count;

        // Constructor initializes the internal array with a default capacity
        public TelemetryCollection(int capacity = 16)
        {
            _items = new T[capacity];
            _count = 0;
        }

        // My custom Add method that resizes the internal array when its full
        public void Add(T item)
        {
            if (_count == _items.Length)
            {
                Array.Resize(ref _items, _items.Length * 2);
            }

            _items[_count++] = item;
        }

        // Exposes the current number of elements
        public int Count => _count;

        // Implements IEnumerable<T> to allow foreach loops and JSON serialization (Microsoft, 2026a)
        public IEnumerator<T> GetEnumerator()
        {
            for (int i = 0; i < _count; i++)
            {
                yield return _items[i];
            }
        }

        // Implementation on interface for the non generic IEnumerable
        IEnumerator IEnumerable.GetEnumerator()
        {
            return GetEnumerator();
        }
    }
}

/* Reference list:

   Microsoft, 2026a. IEnumerable<T> Interface. [online] Available at: <https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.ienumerable-1> [Accessed 13 September 2026].

 */