(function () {
  
  let inputs = document.querySelectorAll('.input');
  inputs.forEach( input => {
    const parent = input.parentElement;
    input.addEventListener('focus', ()=>{
      input.classList.add('_focus');
      parent.classList.add('_focus');
    });
    input.addEventListener('blur', () => {
      input.classList.remove('_focus');
      parent.classList.remove('_focus');
    });
    parent.addEventListener('mouseenter', () => {
      parent.classList.add('_hover');
    });
    parent.addEventListener('mouseleave', () => {
      parent.classList.remove('_hover');
    });
  });



}());