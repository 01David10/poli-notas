/* eslint-disable no-undef */
document.addEventListener('DOMContentLoaded', async () => {
  const profile = await getLoggedUser()

  if (profile) {
    await updateProfile(profile)
  } else {
    Swal.fire('User not found', 'Please check the user ID', 'error')
  }
})

async function updateProfile(profile) {
  const name = document.getElementById('name')
  const email = document.getElementById('email')
  try {
    name.value = profile.user.userFound.name
    email.value = profile.user.userFound.email
  } catch (error) {
    console.error('Error updating profile:', error)
  }
}

async function getLoggedUser() {
  try {
    const response = await fetch('http://localhost:3000/session/loggedUser', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching user:', error)
  }
}

const form = document.getElementById('uploadForm')

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  const fileInput = document.getElementById('fileInput')
  const formData = new FormData()
  formData.append('file', fileInput.files[0]) // clave "file"

  try {
    const response = await fetch('http://localhost:3000/api/upload', {
      method: 'POST',
      body: formData
    })

    const result = await response.json()
    console.log(result)

    if (response.ok) {
      alert('Archivo subido con éxito:\n' + result.url)
    } else {
      alert('Error al subir archivo.')
    }
  } catch (error) {
    console.error('Error:', error)
    alert('Fallo al subir el archivo.')
  }
})
