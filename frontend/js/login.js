const email = document.getElementById('floatingInput').value
const password = document.getElementById('floatingPassword').value
const loginButton = document.getElementById('loginButton')

loginButton.addEventListener('click', () => {
  login()
})

async function login () {
  try {
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
      alert('¡Bienvenido, ' + data.username + '!')
    //   window.location.href = '/src/HTML/principal.html'
    } else {
      alert(data.message || 'Error en el login')
    }
  } catch (error) {
    console.error('Error de conexión:', error)
    alert('Hubo un problema al intentar iniciar sesión.')
  }
}
