/* eslint-disable no-undef */
const btnRegister = document.getElementById('register-button')

btnRegister.addEventListener('click', async (e) => {
  const isValidate = await validateForm()

  if (isValidate) {
    register()
  }
})

async function validateForm () {
  const form = document.getElementById('register-form')

  if (form.checkValidity()) {
    return true
  } else {
    form.classList.add('was-validated')
    return false
  }
}

async function register () {
  try {
    const name = document.getElementById('floating-name')
    const email = document.getElementById('floating-email')
    const password = document.getElementById('floating-password')
    const role = document.getElementById('floating-role')
    const dni = document.getElementById('floating-document')

    const response = await fetch('/session/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value,
        role: role.value,
        dni: dni.value
      })
    })

    if (response.ok) {
      const data = await response.json()
      Swal.fire('Registration successful', `Welcome ${data.name}`, 'success').then(() => {
        window.location.href = '/login'
      })
    } else {
      Swal.fire(
        'Registration failed',
        'Please check your input and try again.',
        'error'
      )
    }
  } catch (error) {
    console.error('Error during registration:', error)
    Swal.fire('Connection failed', error.message, 'error')
  }
}
