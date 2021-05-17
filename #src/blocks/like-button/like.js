(function() {
  let likeBtns = document.querySelectorAll('.like');
  likeBtns.forEach(likeBtn => {
    initLike(likeBtn);
    const likeCount = likeBtn.querySelector('.like__count');
    likeBtn.addEventListener('click', () => {
      if (likeBtn.dataset.like == 'false') {
        likeCount.textContent = +likeCount.textContent + 1;
        likeBtn.dataset.like = 'true';
      }
      else {
        likeCount.textContent = +likeCount.textContent - 1;
        likeBtn.dataset.like = 'false';
      }
      likeBtn.classList.toggle('_active');
    });
  });

  function initLike(likeBtn) {
    if (likeBtn.dataset.like == 'true') likeBtn.classList.add('_active');
    else likeBtn.classList.remove('_active');
  }
})();