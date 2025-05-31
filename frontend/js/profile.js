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

// upload file
const btnUpload = document.getElementById('btn-upload')

btnUpload.addEventListener('click', async (e) => {
  const fileInput = document.getElementById('input-file')
  const formData = new FormData() // create FormData object
  formData.append('file', fileInput.files[0]) // key file

  try {
    const response = await fetch('http://localhost:3000/upload/upload', {
      method: 'POST',
      body: formData
    })

    const result = await response.json()
    console.log(result)

    if (response.ok) {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'File uploaded successfully! URL:' + result.url,
        confirmButtonText: 'OK'
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: result.error || 'There was an error uploading the file.'
      })
    }
  } catch (error) {
    console.error('Error uploading file:', error)
  }
})
