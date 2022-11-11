const contentEl = document.getElementById('content')

const loginComponent = new LoginComponent(
  document.getElementById('login-template').innerText, 
  contentEl,
  onSuccesLogin);

const mainComponent = new MainComponent (
  document.getElementById('main-template').innerText, 
  contentEl);

loginComponent.init()

function onSuccesLogin() {
  loginComponent.dispose()

  mainComponent.init()
}