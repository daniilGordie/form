class LoginComponent {
  _formEl = null
  _loginInputEl = null
  _passwordInputEl = null
  _errorMessageEl = null
  _messageEl = null

  _loginServise = null

  constructor (template, containerEl, onLoginCb) {
    this.template = template
    this.containerEl = containerEl
    this.onLogin = onLoginCb

    //this._loginServise = new LoginServise
  }

  init() {
    this.containerEl.innerHTML = this.template

    this._formEl = document.querySelector('#login-form')
    this._loginInputEl = document.querySelector('#form-input')
    this._passwordInputEl = document.querySelector('#form-password')
    this._errorMessageEl = document.querySelector('#alert-message')
    this._messageEl = document.querySelector('#succes-message')

    this._formEl.addEventListener('submit', this.resetDefault)
    this._formEl.addEventListener('submit', this.onLoginSubmit)
  }

  dispose () {
    this._formEl.removeEventListener('submit', this.resetDefault)
    this._formEl.removeEventListener('submit', this.onLoginSubmit)
  }

  resetDefault(evt) {
    evt.preventDefault()
  }

  // Callback Way
  checkUserCredentials (login, password, callback) {
    const xhr = new XMLHttpRequest();

    xhr.open('POST', 'https://reqres.in/api/login');
    xhr.setRequestHeader('content-type', 'application/json');

    xhr.send(JSON.stringify({
      "email": login,
      "password": password 
    }));

    xhr.onload = e => {
      const result = {
        status: xhr.status,
        succes: false
      };
  
      if (result.status >= 200 && result.status < 300) {
        result['response'] = JSON.parse(xhr.responseText)
        result.succes = true
      }
  
      callback(result);
    }

    
  }

  checkUserCredentialsP (login, password) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

    xhr.open('POST', 'https://reqres.in/api/login');
    xhr.setRequestHeader('content-type', 'application/json');

    xhr.send(JSON.stringify({
      "email": login,
      "password": password 
    }));

    xhr.onload = e => {
      const result = {
        status: xhr.status,
        succes: false
      };
  
      if (result.status >= 200 && result.status < 300) {
        result['response'] = JSON.parse(xhr.responseText)
        result.succes = true
        resolve(result)
      } else {
        reject(result)
        }
      }
    })
  }

  onLoginSubmit = () => {
    this._errorMessageEl.classList.add('d-none')

    const result = this.checkUserCredentialsP(this._loginInputEl.value, this._passwordInputEl.value)

    result.then(e => {
          if (this.onLogin) {
            this.onLogin()
        } 
    })
  
    result.cath(e => {
      this._errorMessageEl.classList.remove('d-none')
    })

      {
      // this.checkUserCredentials(
      //   this._loginInputEl.value, 
      //   this._passwordInputEl.value,
      //   authResult => {
      //     if (authResult.succes) {
      //       if (this.onLogin) {
      //         this.onLogin()
      //       }

      //       // this._messageEl.classList.remove('d-none')
      //       // this._formEl.classList.add('d-none')
      //     } else {
      //       this._errorMessageEl.classList.remove('d-none')
      //     }
      //   }
      // )
    }
  }
}