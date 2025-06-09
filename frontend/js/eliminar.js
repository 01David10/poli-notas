/*const users = [
  { cedula: "123456789", correo: "usuario1@example.com" },
  { cedula: "987654321", correo: "usuario2@example.com" },
];
const users = [
  { cedula: '123456789', correo: 'usuario1@example.com' },
  { cedula: '987654321', correo: 'usuario2@example.com' }
]

function renderUsers () {
  const table = document.getElementById('user-table')
  table.innerHTML = ''

  users.forEach((user, index) => {
    const row = document.createElement('tr')
    row.innerHTML = `
      <td><input type="radio" name="selectedUser" value="${index}" /></td>
      <td>${user.cedula}</td>
      <td>${user.correo}</td>
    `
    table.appendChild(row)
  })
}

function deleteSelectedUser () {
  const selected = document.querySelector('input[name="selectedUser"]:checked')
  if (!selected) {
    alert('Por favor selecciona un usuario para eliminar.')
    return
  }

  const index = parseInt(selected.value)
  const confirmDelete = confirm(`¿Eliminar usuario con cédula ${users[index].cedula}?`)
  if (confirmDelete) {
    users.splice(index, 1)
    renderUsers()
  }
}

renderUsers();


document.addEventListener('DOMContentLoaded', () => {
  const userTableBody = document.querySelector('#userTable tbody')
  const borrarBtn = document.getElementById('borrarUsuarioBtn')

  // Cargar usuarios
  fetch('/api/getAllUsers')
    .then(res => res.json())
    .then(users => {
      userTableBody.innerHTML = '' // Limpiar tabla
      users.forEach(user => {
        const row = document.createElement('tr')
        row.innerHTML = `
          <td style="text-align: center; border: 1px solid #ccc;">
            <input type="radio" name="usuarioSeleccionado" value="${user.dni}" />
          </td>
          <td style="padding: 10px; border: 1px solid #ccc;">${user.dni}</td>
          <td style="padding: 10px; border: 1px solid #ccc;">${user.email}</td>
        `
        userTableBody.appendChild(row)
      })
    })
    .catch(error => {
      console.error('Error cargando usuarios:', error)
    })

  // Eliminar usuario seleccionado
  borrarBtn.addEventListener('click', () => {
    const selected = document.querySelector('input[name="usuarioSeleccionado"]:checked')
    if (!selected) {
      alert('Selecciona un usuario para eliminar')
      return
    }

    const dni = selected.value

    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      fetch(`/api/deleteUser/${dni}`, {
        method: 'DELETE'
      })
        .then(res => res.json())
        .then(data => {
          alert(data.message)
          location.reload()
        })
        .catch(error => {
          console.error('Error al eliminar usuario:', error)
          alert('Error al eliminar usuario')
        })
    }
  })
})


document.getElementById('borrarUsuarioBtn').addEventListener('click', async () => {
  const seleccionado = document.querySelector('input[name="usuarioSeleccionado"]:checked')

  if (!seleccionado) {
    alert('Por favor selecciona un usuario para eliminar')
    return
  }

  const dni = seleccionado.value

  const confirmacion = confirm(`¿Estás seguro de eliminar al usuario con cédula ${dni}?`)
  if (!confirmacion) return

  try {
    const res = await fetch(`/users/deleteUser/${dni}`, {
      method: 'DELETE'
    })

    if (res.ok) {
      alert('Usuario eliminado correctamente')
      location.reload()
    } else {
      alert('No se pudo eliminar el usuario')
    }
  } catch (error) {
    console.error('Error al eliminar usuario:', error)
    alert('Error al eliminar usuario')
  }
})

renderUsers()
*/