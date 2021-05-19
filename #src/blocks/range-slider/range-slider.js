(function() {
  let priceSliders = document.querySelectorAll('.range-slider__slider');

  let wNumbFormat = wNumb({
    decimals: 0,
    thousand: ' ',
    suffix: '₽'
  });
  
  if (priceSliders.length) {
    priceSliders.forEach( slider => {
      noUiSlider.create(slider, {
        start: [5000, 10000],
        //margin: 60000,
        connect: true,
        format: wNumbFormat,
        tooltips: [false, false],
        range: {
          'min': [500],
          'max': [15000]
        }
      });

      let fields = [];
      fields.push(slider.parentElement.parentElement.querySelector('#range-slider_start'));
      fields.push(slider.parentElement.parentElement.querySelector('#range-slider_end'));
      
      slider.noUiSlider.on('update', function (values, handle) {
        fields[handle].textContent = values[handle];
      });
    });
  }  
})();