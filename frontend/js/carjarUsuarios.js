document.addEventListener('DOMContentLoaded', async () => {
  const tabla = document.querySelector('#userTable tbody')

  try {
    const res = await fetch('/users/getAllUsers')
    const users = await res.json()

    tabla.innerHTML = '' // Limpiar

    users.forEach(user => {
      const fila = document.createElement('tr')
      fila.innerHTML = `
        <td style="text-align: center; border: 1px solid #ccc;"><input type="radio" name="usuarioSeleccionado" value="${user.dni}" /></td>
        <td style="padding: 10px; border: 1px solid #ccc;">${user.dni}</td>
        <td style="padding: 10px; border: 1px solid #ccc;">${user.email}</td>
      `
      tabla.appendChild(fila)
    })
  } catch (error) {
    console.error('Error al cargar usuarios:', error)
  }
})
