(function() {
  const checkboxes = document.querySelectorAll('.checkboxes_dropdown');
  checkboxes.forEach(checkbox => {
    const checkboxList = checkbox.querySelector('.checkboxes__list');
    const checkboxTitle = checkbox.querySelector('.checkboxes__title');
    checkboxTitle.addEventListener('click', ()=>{
      _slideToggle(checkboxList, 200);
      checkbox.classList.toggle('_active');
    })
  });
})();