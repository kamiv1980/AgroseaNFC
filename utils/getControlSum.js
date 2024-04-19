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

// uint8_t CRC8(uint8_t *pcBlock, uint16_t len){
//   uint8_t crc = 0xFF;
//   uint16_t i;
//   while (len--){
//     crc ^= *pcBlock++;
//     for (i = 0; i < 8; i++) crc = crc & 0x80 ? (crc << 1) ^ 0x31 : crc << 1;
//   }
//   return crc;
// }
