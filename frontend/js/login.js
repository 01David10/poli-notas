/* eslint-disable no-undef */
const loginButton = document.getElementById('login-button')

loginButton.addEventListener('click', () => {
  login()
})

async function login () {
  try {
    const email = document.getElementById('floating-email').value
    const password = document.getElementById('floating-password').value

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
      Swal.fire('Welcome', data.name, 'success').then(() => {
        window.location.href = '/index'
      })
    } else {
      Swal.fire(
        'Login failed',
        'Please verify your email and password',
        'error'
      )
    }
  } catch (error) {
    Swal.fire('Connection failed', error, 'error')
  }
}
