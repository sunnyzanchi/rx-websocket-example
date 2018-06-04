export const a = document.querySelector('#a');
export const b = document.querySelector('#b');

export const update = (el, val) => {
  el.value = val + '\n' + el.value;
};
