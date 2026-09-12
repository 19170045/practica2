const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear el cuerpo de las peticiones en formato JSON
app.use(express.json());

// Datos de ejemplo en memoria
let usuarios = [
  { id: 1, nombre: 'Ana García', email: 'ana@example.com' },
  { id: 2, nombre: 'Carlos López', email: 'carlos@example.com' },
  { id: 3, nombre: 'María Rodríguez', email: 'maria@example.com' }
];

// Ruta inicial
app.get('/', (req, res) => {
  res.json({
    mensaje: '¡Bienvenido a la API con Express!',
    endpoints: {
      listarUsuarios: 'GET /api/usuarios',
      obtenerUsuario: 'GET /api/usuarios/:id',
      crearUsuario: 'POST /api/usuarios',
      actualizarUsuario: 'PUT /api/usuarios/:id',
      eliminarUsuario: 'DELETE /api/usuarios/:id'
    }
  });
});

// 1. Obtener todos los usuarios (GET)
app.get('/api/usuarios', (req, res) => {
  res.json(usuarios);
});

// 2. Obtener un usuario por ID (GET)
app.get('/api/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const usuario = usuarios.find(u => u.id === id);

  if (!usuario) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  res.json(usuario);
});

// 3. Crear un nuevo usuario (POST)
app.post('/api/usuarios', (req, res) => {
  const { nombre, email } = req.body;

  if (!nombre || !email) {
    return res.status(400).json({ error: 'El nombre y el email son obligatorios' });
  }

  const nuevoUsuario = {
    id: usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1,
    nombre,
    email
  };

  usuarios.push(nuevoUsuario);
  res.status(201).json(nuevoUsuario);
});

// 4. Actualizar un usuario existente (PUT)
app.put('/api/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const usuario = usuarios.find(u => u.id === id);

  if (!usuario) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  const { nombre, email } = req.body;

  if (nombre) usuario.nombre = nombre;
  if (email) usuario.email = email;

  res.json({ mensaje: 'Usuario actualizado con éxito', usuario });
});

// 5. Eliminar un usuario (DELETE)
app.delete('/api/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = usuarios.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  const usuarioEliminado = usuarios.splice(index, 1)[0];
  res.json({ mensaje: 'Usuario eliminado con éxito', usuario: usuarioEliminado });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
