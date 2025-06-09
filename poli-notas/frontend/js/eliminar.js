<<<<<<< HEAD
/*const users = [
  { cedula: "123456789", correo: "usuario1@example.com" },
  { cedula: "987654321", correo: "usuario2@example.com" },
];
=======
const users = [
  { cedula: '123456789', correo: 'usuario1@example.com' },
  { cedula: '987654321', correo: 'usuario2@example.com' }
]
>>>>>>> 30f58b5254b1a26ef70e8d2d625f57fc1a3e6cfd

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

<<<<<<< HEAD
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
*/

document.addEventListener('DOMContentLoaded', () => {
  const userTableBody = document.querySelector('#userTable tbody')
  const borrarBtn = document.getElementById('borrarUsuarioBtn')

  // 1. FUNCION PARA CARGAR USUARIOS DESDE LA BASE DE DATOS
  function cargarUsuarios() {
    fetch('/api/getAllUsers')
      .then(res => res.json())
      .then(users => {
        userTableBody.innerHTML = ''
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
      .catch(err => {
        console.error('Error al cargar usuarios:', err)
      })
  }

  // 2. FUNCION PARA ELIMINAR USUARIO
  borrarBtn.addEventListener('click', () => {
    const selected = document.querySelector('input[name="usuarioSeleccionado"]:checked')
    if (!selected) {
      alert('Selecciona un usuario para eliminar')
      return
    }

    const dni = selected.value
    if (confirm('¿Estás seguro de eliminar al usuario con cédula ' + dni + '?')) {
      fetch(`/api/deleteUser/${dni}`, {
        method: 'DELETE'
      })
        .then(res => res.json())
        .then(data => {
          alert(data.message)
          cargarUsuarios() // recarga la tabla sin recargar la página
        })
        .catch(err => {
          console.error('Error al eliminar usuario:', err)
        })
    }
  })

  // Cargar usuarios al cargar la página
  cargarUsuarios()
})
=======
renderUsers()
>>>>>>> 30f58b5254b1a26ef70e8d2d625f57fc1a3e6cfd
