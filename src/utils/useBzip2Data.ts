import {useState, useEffect} from 'react';
import {decompressSync} from 'fflate';
import {TextDecoder} from 'text-encoding';

const useBzip2Data = data => {
  const [decompressedData, setDecompressedData] = useState(null);

  useEffect(() => {
    const decompressData = () => {
      if (data) {
        try {
          // Ensure data is an ArrayBuffer or Uint8Array
          const uint8Array = new Uint8Array(data);

          // Decompress data
          const decompressed = decompressSync(uint8Array);

          // Convert decompressed data to a string
          // TextDecoder may not be available in all environments
          const decompressedString = new TextDecoder('utf-8').decode(
            decompressed,
          );
          setDecompressedData(JSON.parse(decompressedString));
        } catch (error) {
          console.error('Error decompressing data:', error);
        }
      } else {
        setDecompressedData(null);
      }
    };

    decompressData();
  }, [data]);

  return decompressedData;
};

export default useBzip2Data;
