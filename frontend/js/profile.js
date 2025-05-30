/* eslint-disable no-undef */
document.addEventListener('DOMContentLoaded', async () => {
  const profile = await getLoggedUser()

  if (profile) {
    await updateProfile(profile)
  } else {
    Swal.fire('User not found', 'Please check the user ID', 'error')
  }
})

async function updateProfile (profile) {
  const name = document.getElementById('name')
  const email = document.getElementById('email')
  try {
    name.value = profile.user.userFound.name
    email.value = profile.user.userFound.email
  } catch (error) {
    console.error('Error updating profile:', error)
  }
}

async function getLoggedUser () {
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
