function Slider(element, slides, options) {
  this.container = element
  this.slides = slides
  this.options = options
  this._currentIndex = -1

  this.init()
  this.show(0)
  if (options.autoplay) {
    setInterval(() => {
      this.show(this._currentIndex + 1)
    }, options.interval)
  }
}

Slider.prototype.init = function name() {
  this.container.classList.add('.slider--container') 

  const ulEl = document.createElement('ul')
  ulEl.addEventListener('click', this.onSlideClick.bind(this))

  const slideEls = this.slides.map((e, i) => {
    const liEl = document.createElement('li')
    liEl.classList.add('slide')
    liEl.innerHTML = `<img src ="${e}?${i}" />`
    return liEl
  })

  slideEls.forEach(e => {
    ulEl.append(e)
  })

  this.container.append(ulEl)
}

Slider.prototype.show = function (index) {
  if (index >= this.slides.length) {
    index = 0
  }
  this._currentIndex = index

  Array.prototype.forEach.call(this.container.firstChild.children, (e, i) =>{
    if(index !== i) {
      e.classList.remove('active')
    }
  })

  this.container.firstChild.children[index].classList.add('active')

}

Slider.prototype.onSlideClick = function () {
  this.show(this._currentIndex + 1)
}
