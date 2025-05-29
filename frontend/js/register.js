const btnRegister = document.getElementById('register-button')

btnRegister.addEventListener('click', async (e) => {
  Register()
})

async function Register () {
  const name = document.getElementById('floating-name')
  const email = document.getElementById('floating-email')
  const password = document.getElementById('floating-password')
  const role = document.getElementById('floating-role')
  const dni = document.getElementById('floating-document')

  const response = await fetch('/api/register', {
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
    console.log('Registration successful:', data)
    window.location.href = '/login'
  } else {
    const errorData = await response.json()
    console.error('Registration failed:', errorData)
  }
}
