export function isValidSlotCount(count) {
  if (!/^[0-9]+$/.test(count)) {
    return false;
  }

  const intCount = parseInt(count);
  return intCount > 0 && intCount <= 1000;
}
