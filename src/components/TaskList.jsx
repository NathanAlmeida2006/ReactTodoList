import { useTasks } from "../context/TaskContext"; // Hook personalizado para acessar o contexto de tarefas
import TaskItem from "./TaskItem"; // Componente que representa um item individual na lista de tarefas
import "../App.css"; // Importa os estilos globais

/**
 * Componente `TaskList` que exibe uma lista de tarefas filtradas.
 * Este componente permite visualizar, filtrar e interagir com as tarefas.
 */
export default function TaskList() {
  /**
   * Extrai os valores `tasks`, `filter` e `setFilter` do contexto global de tarefas.
   * - `tasks`: Lista de todas as tarefas.
   * - `filter`: Filtro atual ('all', 'active', 'completed').
   * - `setFilter`: Função para alterar o filtro.
   */
  const { tasks, filter, setFilter } = useTasks();

  /**
   * Filtra as tarefas com base no filtro selecionado.
   * - Se o filtro for 'completed', retorna apenas as tarefas concluídas.
   * - Se o filtro for 'active', retorna apenas as tarefas pendentes.
   * - Se o filtro for 'all', retorna todas as tarefas.
   */
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed; // Mostra apenas tarefas concluídas
    if (filter === "active") return !task.completed; // Mostra apenas tarefas pendentes
    return true; // Mostra todas as tarefas
  });

  /**
   * Retorna o JSX da lista de tarefas.
   * O componente inclui botões de filtro e uma lista de tarefas filtradas.
   */
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
