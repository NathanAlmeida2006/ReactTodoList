import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api";

// Cria um contexto para compartilhar dados entre componentes
const TaskContext = createContext();

export function TaskProvider({ children }) {
  // Estado para armazenar a lista de tarefas
  const [tasks, setTasks] = useState([]);

  // Estado para armazenar - all, active, completed
  const [filter, setFilter] = useState("all");

  // Efeito que carrega as tarefas ao montar o componente
  useEffect(() => {
    loadTasks();
  }, []);

  // Função para carregar as tarefas da API
  const loadTasks = async () => {
    try {
      const response = await api.get("/todos"); // Faz uma requisição GET para a API
      setTasks(response.data); // Atualiza o estado com as tarefas recebidas
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error); // Trata erros
    }
  };

  // Função para adicionar uma nova tarefa
  const addTask = async (task) => {
    try {
      const response = await api.post("/todos", task); // Faz uma requisição POST para a API
      setTasks([...tasks, response.data]); // Adiciona a nova tarefa ao estado
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error); // Trata erros
    }
  };

  // Função para editar uma tarefa existente
  const editTask = async (id, updatedTask) => {
    try {
      await api.put(`/todos/${id}`, updatedTask); // Faz uma requisição PUT para a API
      setTasks(
        tasks.map(
          (task) => (task.id === id ? { ...task, ...updatedTask } : task) // Atualiza a tarefa no estado
        )
      );
    } catch (error) {
      console.error("Erro ao editar tarefa:", error); // Trata erros
    }
  };

  // Função para excluir uma tarefa
  const deleteTask = async (id) => {
    try {
      await api.delete(`/todos/${id}`); // Faz uma requisição DELETE para a API
      setTasks(tasks.filter((task) => task.id !== id)); // Remove a tarefa do estado
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error); // Trata erros
    }
  };

  // Função para alternar o status de conclusão de uma tarefa
  const toggleComplete = async (id) => {
    try {
      const task = tasks.find((task) => task.id === id); // Encontra a tarefa pelo ID
      await api.patch(`/todos/${id}`, { completed: !task.completed }); // Faz uma requisição PATCH para a API
      setTasks(
        tasks.map(
          (task) =>
            task.id === id ? { ...task, completed: !task.completed } : task // Atualiza o status da tarefa no estado
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar status:", error); // Trata erros
    }
  };

  // Retorna o Provider do contexto com os valores compartilhados
  return (
    <TaskContext.Provider
      value={{
        tasks, // Lista de tarefas
        filter, // Filtro atual
        setFilter, // Função para alterar o filtro
        addTask, // Função para adicionar tarefa
        editTask, // Função para editar tarefa
        deleteTask, // Função para excluir tarefa
        toggleComplete, // Função para alternar status de conclusão
      }}
    >
      {children} {/* Renderiza os componentes filhos */}
    </TaskContext.Provider>
  );
}

// Hook personalizado para acessar o contexto de tarefas
export const useTasks = () => useContext(TaskContext);
