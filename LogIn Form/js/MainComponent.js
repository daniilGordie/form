class MainComponent {
  constructor (template, containerEl) {
    this.template = template
    this.containerEl = containerEl

  }

  init () {
    this.containerEl.innerHTML = this.template

    this.loadData().then(response => {
      const userEls = response.data.map(e => this.genereteUserRow(e))
      this.containerEl.querySelector('tbody').append(...userEls)
    })
  
  }

  genereteUserRow (user) {
    const userRowEl = document.createElement('tr');
    userRowEl.dataset['id'] = user.id

    const scopeEl = document.createElement('th');
    scopeEl.innerText = user.id

    const nameEl = document.createElement('td')
    nameEl.innerText = user.first_name;

    const surnameEl = document.createElement('td')
    surnameEl.innerText = user.last_name;

    const email = document.createElement('td')
    email.innerText = user.email;
    
    userRowEl.append(
      scopeEl,
      nameEl,
      surnameEl,
      email
    )

    return userRowEl

  }

  async loadData() {
    const e = await fetch('https://reqres.in/api/users')
    return await e.json()
  }

}

