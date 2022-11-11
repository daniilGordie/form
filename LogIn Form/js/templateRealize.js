class MainComponent {
  _user = []

  constructor (listTemplate, itemTemplate, containerEl) {
    this.listTemplate = listTemplate
    this.itemTemplate = itemTemplate
    this.containerEl = containerEl

  }

  init () {
    this.containerEl.innerHTML = this.listTemplate

    this.loadData().then(response => {
      this._user = [ ...this._user, ...response.data]
      const userEls = this._user.map(e => this.genereteUserRow(e))
      this.containerEl.querySelector('tbody').append(...userEls)
    })
  
  }

  genereteUserRow (user) {
    const userRowEl = document.createElement('tr');
    userRowEl.innerHTML = this.itemTemplate
    .replaceAll('{{id}}', user.id)
    .replaceAll('{{name}}', user.first_name)
    .replaceAll('{{surname}}', user.last_name)
    .replaceAll('{{email}}', user.email)
    userRowEl.dataset['id'] = user.id

    return userRowEl

  }

  async loadData() {
    const e = await fetch('https://reqres.in/api/users')
    return await e.json()
  }

}

