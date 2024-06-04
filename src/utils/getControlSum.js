export function getControlSum(pcBlock) {
  let crc = 0xFF;
  for (let i = 0; i < pcBlock.length; i++) {
    crc ^= pcBlock[i];
    for (let j = 0; j < 8; j++) {
      crc = crc & 0x80 ? (crc << 1) ^ 0x31 : crc << 1;
    }
  }
  return crc;
}

export function calculateCRC32(data) {
  const crcTable = new Uint32Array(256);
  let crc;

  // Генеруємо таблицю CRC32
  for (let i = 0; i < 256; i++) {
    crc = i;
    for (let j = 0; j < 8; j++) {
      crc = (crc & 1) ? (crc >>> 1) ^ 0xEDB88320 : crc >>> 1;
    }
    crcTable[i] = crc >>> 0;
  }

  // Обчислення CRC32 для вхідних даних
  crc = 0xFFFFFFFF;
  for (let i = 0; i < data.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ Number(data[i])) & 0xFF];
  }
  crc ^= 0xFFFFFFFF;

  // Перетворення числа crc у масив байтів
  const result = [];
  for (let i = 0; i < 4; i++) {
    result.push((crc >>> (i * 8)) & 0xFF);
  }

  return result.reverse();
}
