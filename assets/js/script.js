// script.js

// 1) Referenciar elementos del DOM
const inputTarea      = document.querySelector('#nueva-tarea');
const btnAgregar      = document.querySelector('#btn-agregar');
const listaTareas     = document.querySelector('#lista-tareas');
const totalSpan       = document.querySelector('#total-tareas');
const completadasSpan = document.querySelector('#tareas-completadas');

// 2) Arreglo con 3 tareas iniciales
let tareas = [
  { id: 1, descripcion: 'Aprender métodos de arreglos', completado: false },
  { id: 2, descripcion: 'Revisar guía de apoyo',          completado: false },
  { id: 3, descripcion: 'Realizar desafío Todo List',   completado: false }
];

// 3) Función que dibuja el header, las tareas y actualiza contadores
function renderizarTareas() {
  // limpiar todo
  listaTareas.innerHTML = '';

  // --- Header como primer li ---
  const header = document.createElement('li');
  header.classList.add('header-lista');
  header.innerHTML = `
    <span class="tarea-id">ID</span>
    <span class="tarea-desc">Tareas</span>
  `;
  listaTareas.appendChild(header);

  // --- Luego cada tarea ---
  for (let tarea of tareas) {
    const li = document.createElement('li');
    if (tarea.completado) li.classList.add('completada');

    li.innerHTML = `
      <span class="tarea-id">[${tarea.id}]</span>
      <span class="tarea-desc">${tarea.descripcion}</span>
      <input
        type="checkbox"
        class="chk-completado"
        data-id="${tarea.id}"
        ${tarea.completado ? 'checked' : ''}
      >
      <button class="btn-eliminar" data-id="${tarea.id}">X</button>
    `;
    listaTareas.appendChild(li);
  }

  // actualizar contadores
  totalSpan.textContent       = tareas.length;
  completadasSpan.textContent = tareas.filter(t => t.completado).length;
}

// 4) Mostrar inicial
renderizarTareas();

// 5) Agregar nueva tarea utilizando .sort() para hallar el máximo ID
btnAgregar.addEventListener('click', () => {
    const descripcion = inputTarea.value.trim();
    if (!descripcion) return;
    const ids = tareas.map(t => t.id);
    ids.sort((a, b) => a - b);
    const maxId = ids.length ? ids[ids.length - 1] : 0;
    const nuevoId = maxId + 1;
    tareas.push({ id: nuevoId, descripcion, completado: false });
    inputTarea.value = '';
    renderizarTareas();
  });

// 6a) Eliminar
listaTareas.addEventListener('click', e => {
  if (e.target.classList.contains('btn-eliminar')) {
    const id = Number(e.target.dataset.id);
    const idx = tareas.findIndex(t => t.id === id);
    if (idx !== -1) tareas.splice(idx, 1);
    renderizarTareas();
  }
});

// 6b) Completar
listaTareas.addEventListener('change', e => {
  if (e.target.classList.contains('chk-completado')) {
    const id = Number(e.target.dataset.id);
    const tarea = tareas.find(t => t.id === id);
    if (tarea) {
      tarea.completado = e.target.checked;
      renderizarTareas();
    }
  }
});
