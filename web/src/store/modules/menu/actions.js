export function changeItem(name) {
  return {
    type: '@menu/ENTER_ITEM',
    payload: { name },
  };
}
