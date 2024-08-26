const tareas = [];

const listaDeTareas = document.querySelector("#lista-tareas");
const tareasInput = document.querySelector("#nueva-tarea");
const btnAgregarTarea = document.querySelector("#agregar-tarea");
const contadores = document.querySelector("#contadores");

contadores.innerHTML = `
    <p>Total: <span id="total-tareas">0</span></p>
    <p>Realizadas: <span id="tareas-realizadas">0</span></p>
`;

const totalTareas = document.querySelector("#total-tareas");
const totalRealizadas = document.querySelector("#tareas-realizadas");



btnAgregarTarea.addEventListener("click", () => {
  const nuevoId = tareas.length > 0 ? tareas[tareas.length - 1].id + 1 : 1;
  const nuevaTarea = {
    id: nuevoId,
    nombre: tareasInput.value,
    realizada: false,
  };
  tareas.push(nuevaTarea);
  tareasInput.value = "";
  render();
});

function render() {
  let html = "";

  for (const tarea of tareas) {
    const claseRealizada = tarea.realizada ? "class-done" : "";

    html += `
        <tr class="${claseRealizada}">
        <td>${tarea.id}</td>
        <td>${tarea.nombre}</td>
        <td><input type="checkbox" ${
          tarea.realizada ? "checked" : ""
        } onclick="tareaDone(${tarea.id})"></td>
        <td><button class="eliminar-tarea" onclick="borrar(${
          tarea.id
        })">X</button></td>
        </tr>`;
  }

  listaDeTareas.innerHTML = html;
  actualizarContadores();
}

function borrar(id) {
  const index = tareas.findIndex((e) => e.id === id);
  tareas.splice(index, 1);
  render();
}

function tareaDone(id) {
    tareas.forEach(tarea => {
      if (tarea.id === id) {
        tarea.realizada = !tarea.realizada;}
    });
    render();
}

function actualizarContadores() {
    const total = tareas.length;
    const realizadas = tareas.filter(tarea => tarea.realizada).length;
    totalTareas.textContent = total;
    totalRealizadas.textContent = realizadas;
}


