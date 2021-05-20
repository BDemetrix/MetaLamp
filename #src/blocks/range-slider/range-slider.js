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

      let valueFields = [];
      valueFields.push(slider.parentElement.parentElement.querySelector('#range-slider_min'));
      valueFields.push(slider.parentElement.parentElement.querySelector('#range-slider_max'));
      let visibleFields = valueFields.map(el => el.parentElement.querySelector('.range-slider__display'));
      
      slider.noUiSlider.on('update', function (values, handle) {
        valueFields[handle].value = wNumbFormat.from(values[handle]);
        visibleFields[handle].textContent = values[handle];
      });
    });
  }  
})();