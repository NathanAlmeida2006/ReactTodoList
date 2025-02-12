import { useTasks } from "../context/TaskContext";
import TaskItem from "./TaskItem";
import "../App.css";

export default function TaskList() {
  // Extrai tasks, filter  e setFilter do contexto
  const { tasks, filter, setFilter } = useTasks();

  // Filtra as tarefas com base no filtro selecionado
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed; // Mostra apenas tarefas concluídas
    if (filter === "active") return !task.completed; // Mostra apenas tarefas pendentes
    return true; // Mostra todas as tarefas
  });

  // Retorna o JSX da lista de tarefas
  return (
    <div className="container">
      {/* Container para os botões de filtro */}
      <div className="filters">
        {/* Botão para mostrar todas as tarefas */}
        <button
          className={`filter-button ${filter === "all" ? "active" : ""}`} // Adiciona classe 'active' se o filtro for 'all'
          onClick={() => setFilter("all")} // Define o filtro como 'all' ao clicar
        >
          Todas
        </button>

        {/* Botão para mostrar apenas tarefas pendentes */}
        <button
          className={`filter-button ${filter === "active" ? "active" : ""}`} // Adiciona classe 'active' se o filtro for 'active'
          onClick={() => setFilter("active")} // Define o filtro como 'active' ao clicar
        >
          Pendentes
        </button>

        {/* Botão para mostrar apenas tarefas concluídas */}
        <button
          className={`filter-button ${filter === "completed" ? "active" : ""}`} // Adiciona classe 'active' se o filtro for 'completed'
          onClick={() => setFilter("completed")} // Define o filtro como 'completed' ao clicar
        >
          Concluídas
        </button>
      </div>

      {/* Container para a lista de tarefas filtradas */}
      <div className="task-list">
        {/* Mapeia as tarefas filtradas e renderiza cada uma usando o componente TaskItem */}
        {filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} /> // Passa a tarefa como prop para TaskItem
        ))}
      </div>
    </div>
  );
}
