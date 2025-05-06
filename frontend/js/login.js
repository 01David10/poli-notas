const loginButton = document.getElementById('loginButton')

loginButton.addEventListener('click', () => {
  login()
})

async function login () {
  try {
    const email = document.getElementById('floatingInput').value
    const password = document.getElementById('floatingPassword').value
    console.log('Email:', email)
    console.log('Password:', password)

    const response = await fetch('http://localhost:3000/session/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    })

    const data = await response.json()

    if (response.ok) {
      alert('¡Welcome, ' + data.name + '!') // cambiar por alerta de sweetalert
      //   window.location.href = '/src/HTML/principal.html'
    } else {
      alert('Unsuccessful login') // cambiar por alerta de sweetalert
    }
  } catch (error) {
    console.error('Connectio failed:', error)
    alert('Connection failed') // cambiar por alerta de sweetalert
  }
}
