import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api";

// Cria um contexto para compartilhar dados relacionados às tarefas entre componentes
const TaskContext = createContext();

/**
 * Componente `TaskProvider` que fornece o estado e as funções de gerenciamento de tarefas
 * para todos os componentes filhos encapsulados por ele.
 */
export function TaskProvider({ children }) {
  // Estado para armazenar a lista de tarefas (inicialmente vazio)
  const [tasks, setTasks] = useState([]);

  // Estado para armazenar o filtro atual: 'all' (todas), 'active' (ativas) ou 'completed' (concluídas)
  const [filter, setFilter] = useState("all");

  /**
   * Efeito colateral que carrega as tarefas da API ao montar o componente.
   * Este efeito é executado apenas uma vez, quando o componente é montado.
   */
  useEffect(() => {
    loadTasks();
  }, []);

  /**
   * Função para carregar as tarefas da API e atualizar o estado.
   * Faz uma requisição GET para o endpoint `/todos` da API.
   */
  const loadTasks = async () => {
    try {
      const response = await api.get("/todos"); // Requisição GET para buscar todas as tarefas
      setTasks(response.data); // Atualiza o estado com as tarefas recebidas da API
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error); // Trata possíveis erros durante a requisição
    }
  };

  /**
   * Função para adicionar uma nova tarefa.
   * Recebe um objeto `task` contendo os dados da nova tarefa.
   * Faz uma requisição POST para o endpoint `/todos` da API.
   */
  const addTask = async (task) => {
    try {
      // Validação do título antes de enviar para a API
      if (!task.title?.trim()) {
        throw new Error("O título da tarefa não pode estar vazio");
      }

      const response = await api.post("/todos", task); // Requisição POST para criar uma nova tarefa
      setTasks([...tasks, response.data]); // Adiciona a nova tarefa ao estado local
      return { success: true }; // Retorna sucesso como feedback
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error); // Trata possíveis erros durante a requisição
      return {
        success: false,
        message: error.response?.data?.message || error.message, // Retorna mensagem de erro para feedback
      };
    }
  };

  /**
   * Função para editar uma tarefa existente.
   * Recebe o `id` da tarefa e um objeto `updatedTask` contendo os dados atualizados.
   * Faz uma requisição PUT para o endpoint `/todos/:id` da API.
   */
  const editTask = async (id, updatedTask) => {
    try {
      // Validação também na edição
      if (!updatedTask.title?.trim()) {
        throw new Error("O título da tarefa não pode estar vazio");
      }

      await api.put(`/todos/${id}`, updatedTask); // Requisição PUT para atualizar a tarefa
      setTasks(
        tasks.map(
          (task) => (task.id === id ? { ...task, ...updatedTask } : task) // Atualiza a tarefa no estado local
        )
      );
      return { success: true }; // Retorna sucesso como feedback
    } catch (error) {
      console.error("Erro ao editar tarefa:", error); // Trata possíveis erros durante a requisição
      return {
        success: false,
        message: error.response?.data?.message || error.message, // Retorna mensagem de erro para feedback
      };
    }
  };

  /**
   * Função para excluir uma tarefa.
   * Recebe o `id` da tarefa a ser excluída.
   * Faz uma requisição DELETE para o endpoint `/todos/:id` da API.
   */
  const deleteTask = async (id) => {
    try {
      await api.delete(`/todos/${id}`); // Requisição DELETE para remover a tarefa
      setTasks(tasks.filter((task) => task.id !== id)); // Remove a tarefa do estado local
      return { success: true }; // Retorna sucesso como feedback
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error); // Trata possíveis erros durante a requisição
      return {
        success: false,
        message: error.response?.data?.message || error.message, // Retorna mensagem de erro para feedback
      };
    }
  };

  /**
   * Função para alternar o status de conclusão de uma tarefa.
   * Recebe o `id` da tarefa e alterna seu campo `completed` entre `true` e `false`.
   * Faz uma requisição PATCH para o endpoint `/todos/:id` da API.
   */
  const toggleComplete = async (id) => {
    try {
      const task = tasks.find((task) => task.id === id); // Encontra a tarefa pelo ID
      await api.patch(`/todos/${id}`, { completed: !task.completed }); // Requisição PATCH para atualizar o status
      setTasks(
        tasks.map(
          (task) =>
            task.id === id ? { ...task, completed: !task.completed } : task // Atualiza o status no estado local
        )
      );
      return { success: true }; // Retorna sucesso como feedback
    } catch (error) {
      console.error("Erro ao atualizar status:", error); // Trata possíveis erros durante a requisição
      return {
        success: false,
        message: error.response?.data?.message || error.message, // Retorna mensagem de erro para feedback
      };
    }
  };

  /**
   * Retorna o Provider do contexto, fornecendo os valores compartilhados para os componentes filhos.
   * Os valores incluem:
   * - `tasks`: Lista de tarefas
   * - `filter`: Filtro atual ('all', 'active', 'completed')
   * - `setFilter`: Função para alterar o filtro
   * - `addTask`: Função para adicionar uma nova tarefa
   * - `editTask`: Função para editar uma tarefa existente
   * - `deleteTask`: Função para excluir uma tarefa
   * - `toggleComplete`: Função para alternar o status de conclusão de uma tarefa
   */
  return (
    <TaskContext.Provider
      value={{
        tasks,
        filter,
        setFilter,
        addTask,
        editTask,
        deleteTask,
        toggleComplete,
      }}
    >
      {children} {/* Renderiza os componentes filhos dentro do contexto */}
    </TaskContext.Provider>
  );
}

/**
 * Hook personalizado `useTasks` para acessar o contexto de tarefas.
 * Simplifica o uso do contexto em outros componentes.
 */
export const useTasks = () => useContext(TaskContext);
