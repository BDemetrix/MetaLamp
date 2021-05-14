class OrderSelect {
  constructor(selector){
    this.run(selector);
  }
  init(){
    this.title = this.wrap.querySelector('.order-select__title'); // order-select__value
    this.title.content = this.wrap.querySelector('.order-select__value > span');
    this.title.default = this.title.content.textContent;
    this.optionsWrap = this.wrap.querySelector('.order-select__options'); // order-select__option
    this.cleanBtn = this.wrap.querySelector('.order-select__button_clean');
    this.applyBtn = this.wrap.querySelector('.order-select__button_apply');
    
    this.options = this.wrap.querySelectorAll('.order-select__option');

    this.options.forEach(option=>{
      option.title = option.querySelector('.order-select__option-title').textContent;
      option.declensions = option.querySelector('.order-select__option-title')
                          .getAttribute('declensions')
                          .split(',')
                          .map(el => el.trim());
      option.quantity = option.querySelector('.order-select__quantity');
      option.input = option.querySelector('.quantity__input input');
      option.minus = option.querySelector('.quantity__button_minus');
      option.plus = option.querySelector('.quantity__button_plus');
      

      option.plus.addEventListener('click', () => {
        let curent = parseInt(option.input.value);
        if (curent < option.input.max) {
          option.input.value = ++curent;
          this.count();
          this.updateData();
        }
        this.initEmpty(option);
        this.initFull(option);
        this.toggleEmptyClass();
      });

      option.minus.addEventListener('click', () => {
        let curent = parseInt(option.input.value);
        if (curent > option.input.min) {
          option.input.value = --curent;
          this.count();
          this.updateData();
        }
        this.initEmpty(option);
        this.initFull(option);
        this.toggleEmptyClass();
      });
    });
    if (this.cleanBtn) {
      this.cleanBtn.addEventListener('click', ()=> {
        this.cleanValue();
      });
    }
    if (this.applyBtn) {
      this.applyBtn.addEventListener('click', ()=> {
        this.applyValue();
      });
    }
    this.count();
    this.updateData();
    this.initEmpty();
    this.initFull();
  }
  toggle(){
    this.title.addEventListener('click', ()=> {
      if (this.wrap.classList.contains('_active')) {
        this.wrap.classList.remove('_active');
        _slideUp(this.optionsWrap, 150);
      }
      else {
        this.wrap.classList.add('_active');
        _slideDown(this.optionsWrap, 150)
      }
    })
  }
  hover(){
    this.wrap.addEventListener('mouseenter', () => {
      this.wrap.classList.add('_hover');
    });
    this.wrap.addEventListener('mouseleave', () => {
      this.wrap.classList.remove('_hover');
    });
  }
  count(){
    const tyte = this.wrap.getAttribute('type').trim();
    let selectTitle = '';
    if (tyte === 'conveniences') {
      this.options.forEach(option => {
        const value = parseInt(option.input.value);
        if (value > 0) {
          selectTitle += `${value} ${this.getDeclination(option, value)}, `;
        }
      });
      if (selectTitle) {
        selectTitle = selectTitle.slice(0, selectTitle.length - 2)
      } 
      else {
        selectTitle = this.title.default;
      }
      this.title.content.textContent = selectTitle;
    } 
    else if (tyte === 'guests') {
      let value = 0;
      let length = this.options.length;
      for (let i = 0; i < length - 1; i++) {
        value += +this.options[i].input.value;
      }
      if (value > 0) {
        selectTitle += `${value} ${this.getDeclination(this.options[0], value)}, `;
      }
      let babies = +this.options[length - 1].input.value;            // Количество младенцев
      if (babies > 0 && +this.options[0].input.value > 0) {          //если есть младенцы при условии няньки
        selectTitle += `${babies} ${this.getDeclination(this.options[length - 1], babies)}, `;
        this.options[length - 1].quantity.classList.remove('_empty', '_full');
      }
      else if (babies == 0 && +this.options[0].input.value > 0) {
        this.options[length - 1].quantity.classList.remove('_full');
      }
      else { // если няньки нет, младенцев не селим
        this.options[length - 1].quantity.classList.add('_empty', '_full');
        this.options[length - 1].input.value = '0';
      }
      if (selectTitle) { // Убрать ", " в конце строки
        selectTitle = selectTitle.slice(0, selectTitle.length - 2)
      }
      else {  // Гостей нет, присвоить дефолтное значение
        selectTitle = this.title.default;
      }
      this.title.content.textContent = selectTitle;
    }
  }
  updateData(){
    let data = {};
    this.options.forEach( option => {
      data[option.dataset.name] = option.input.value;
    });
    this.data = data;
  }
  getDeclination(option, value){
    if (option.declensions.length) {
      let strValue = String(value);
      let twoDigits = parseInt(strValue.slice(-2));
      let single = parseInt(strValue.slice(-1));
      if ((single >= 5 && single <= 9) || single == 0
        || (twoDigits >= 11 && twoDigits <= 14)) return option.declensions[2];
      if (single >= 2 && single <= 4) return option.declensions[1];
      if (single === 1) return option.declensions[0];
    }
    else return option.title;
  }
  close() {
    document.body.addEventListener('click', (e)=>{
      if (!isDescendant(this.wrap, e.target)) { 
        this.wrap.classList.remove('_active');
        _slideUp(this.optionsWrap, 150);
      }
    });
  }
  isEmpty(){
    let value = 0;
    this.options.forEach(option => { value += +option.input.value});
    return !value;
  }
  initEmpty(option){
    if (option) {
      init(option);
    }
    else {
      this.options.forEach(option => {
        init(option);
      });
    }

    function init(option) {
      if (+option.input.value > +option.input.min) {
        option.quantity.classList.remove('_empty');
      }
      else {
        option.quantity.classList.add('_empty');
      }
    }
  }
  initFull(option) {
    if (option) {
      init(option);
    }
    else {
      this.options.forEach(option => {
        init(option);
      });
      if (this.wrap.getAttribute('type').trim() == 'guests') {
        if (+this.options[0].input.value == 0) {
          this.options[this.options.length - 1].quantity.classList.add('_empty', '_full');
        }
      }
    }

    function init(option) {
      if (+option.input.value < +option.input.max) {
        option.quantity.classList.remove('_full');
      }
      else {
        option.quantity.classList.add('_full');
      }
    }
  }
  toggleEmptyClass(){
    if (this.isEmpty()) {
      this.wrap.classList.add('_empty');
    }
    else{
      this.wrap.classList.remove('_empty');
    }
  }
  cleanValue(){
    this.options.forEach(option => {
      option.input.value = option.input.min;
    });
    this.initEmpty();
    this.initFull();
    this.wrap.classList.add('_empty');
    this.title.content.textContent = this.title.default;
  }
  applyValue(){
    this.cleanValue();
  }
  run(selector){
    if (typeof selector === 'string') {
      this.wrap = document.querySelector(selector);
    }
    else if (typeof selector === 'object') {
      this.wrap = selector;
    }
    if (!this.wrap) {
      return;
    }

    this.init();
    this.toggle();
    this.hover();
    this.close();

    this.toggleEmptyClass();
  }

}
