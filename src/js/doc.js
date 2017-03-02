export const a = document.querySelector('#a');
export const b = document.querySelector('#b');

export const update = function update(el, val){
  return el.value = val + '\n' + el.value;
}
