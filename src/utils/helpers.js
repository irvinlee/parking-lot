import { MAX_SLOTS } from './constants';

export function isValidSlotCount(count) {
  if (!/^[\D]+$/.test(count)) {
    return false;
  }

  const intCount = parseInt(count);
  return intCount > 0 && intCount <= MAX_SLOTS;
}
