class Accordion {
  constructor(containerEl, config) {
    this.containerEl = containerEl
    this.config = config || {}

    this.init()
  }
  init() {
    this.containerEl.classList.add('accordion__container')

    Array.prototype.forEach.call(this.containerEl.children, e => {
      e.classList.add('accordion__item')
      e.children[0].classList.add('accordion__item--title')
      e.children[1].classList.add('accordion__item--content')
    })

    this.containerEl.addEventListener('click', this.onItemClick.bind(this))
  }
  onItemClick(e) {
    if (!e.target.classList.contains('accordion__item--title'))
      return

    if (this.config.affective) {
      Array.prototype.forEach.call(this.containerEl.children, e => {
        e.children[1].classList.remove('active')
      })
    }

    e.target.nextElementSibling.classList.toggle('active')
  }
}


