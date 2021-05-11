(function () {
  
  // Input
  let inputs = document.querySelectorAll('.input');
  inputs.forEach( input => {
    const parent = input.parentElement;
    input.addEventListener('focus', ()=>{
      //input.classList.add('_focus');
      parent.classList.add('_focus');
    });
    input.addEventListener('blur', () => {
      //input.classList.remove('_focus');
      parent.classList.remove('_focus');
    });
    parent.addEventListener('mouseenter', () => {
      parent.classList.add('_hover');
    });
    parent.addEventListener('mouseleave', () => {
      parent.classList.remove('_hover');
    });

    if (input.classList.contains('_date')) {
      input.classList.add('_mask');
      Inputmask("99.99.9999", {
        clearIncomplete: true,
        clearMaskOnLostFocus: true,
      }).mask(input);
    }
    if (input.classList.contains('_phone')) {
      //'+7(999) 999 9999'
      //'+38(999) 999 9999'
      //'+375(99)999-99-99'
      input.classList.add('_mask');
      Inputmask("+7(999) 999 9999", {
        clearIncomplete: true,
        clearMaskOnLostFocus: true,
      }).mask(input);
    }
    if (input.classList.contains('_digital')) {
      input.classList.add('_mask');
      Inputmask("9{1,}", {
        clearIncomplete: true,
        clearMaskOnLostFocus: true,
      }).mask(input);
    } 
  });

  

}());