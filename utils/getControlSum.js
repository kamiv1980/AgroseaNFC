export function getControlSum(pcBlock, len) {
  let crc = 255; // 0xFF в десятичній системі

  for (let i = 0; i < len; i++) {
    crc ^= pcBlock[i];

    for (let j = 0; j < 8; j++) {
      if (crc & 128) {
        // 0x80 в десятичній системі
        crc = (crc << 1) ^ 49; // 0x31 в десятичній системі
      } else {
        crc = crc << 1;
      }
    }
  }

  return crc;
}
