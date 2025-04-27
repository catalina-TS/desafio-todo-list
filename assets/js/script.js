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
  { id: 3, descripcion: 'Configurar proyecto Todo List',   completado: false }
];

// 3) Función que dibuja la lista y actualiza contadores
function renderizarTareas() {
    // 1) Cabecera como primer <li>
    listaTareas.innerHTML = `
      <li class="header-lista">
        <span class="tarea-id">ID</span>
        <span class="tarea-desc">Tarea</span>
      </li>
    `;
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
  <button class="btn-eliminar" data-id="${tarea.id}">Eliminar</button>
`;

    listaTareas.appendChild(li);
  }

  // total = length del arreglo :contentReference[oaicite:0]{index=0}&#8203;:contentReference[oaicite:1]{index=1}
  totalSpan.textContent = tareas.length;

  // completadas = filter + length :contentReference[oaicite:2]{index=2}&#8203;:contentReference[oaicite:3]{index=3}
  const hechas = tareas.filter(t => t.completado).length;
  completadasSpan.textContent = hechas;
}

// 4) Mostrar tareas iniciales
renderizarTareas();

// 5) Agregar nueva tarea usando map + Math.max para ID
btnAgregar.addEventListener('click', () => {
    const descripcion = inputTarea.value.trim();
    if (!descripcion) return;
  
    // calcular nuevo ID: map IDs y Math.max :contentReference[oaicite:4]{index=4}&#8203;:contentReference[oaicite:5]{index=5}
    const todosLosIds = tareas.map(t => t.id);
    const maxId = todosLosIds.length > 0 ? Math.max(...todosLosIds) : 0;
    const nuevoId = maxId + 1;
  
    tareas.push({
      id: nuevoId,
      descripcion,
      completado: false
    });
  
    inputTarea.value = '';
    renderizarTareas();
  });
  
  // 6a) Eliminar tarea: findIndex + splice :contentReference[oaicite:6]{index=6}&#8203;:contentReference[oaicite:7]{index=7}
  listaTareas.addEventListener('click', e => {
    if (e.target.classList.contains('btn-eliminar')) {
      const id = Number(e.target.dataset.id);
      const idx = tareas.findIndex(t => t.id === id);
      if (idx !== -1) tareas.splice(idx, 1);
      renderizarTareas();
    }
  });
  
  // 6b) Marcar tarea: find + asignar completado :contentReference[oaicite:8]{index=8}&#8203;:contentReference[oaicite:9]{index=9}
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