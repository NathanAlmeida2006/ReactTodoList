import { useState } from "react"; // Hook para gerenciar estado local
import { useTasks } from "../context/TaskContext"; // Hook personalizado para acessar o contexto de tarefas
import "../App.css"; // Importa os estilos globais

/**
 * Componente `TaskForm` que permite adicionar ou editar uma tarefa.
 * Este componente pode ser usado tanto para criar novas tarefas quanto para editar tarefas existentes.
 */
export default function TaskForm({ editTask }) {
  /**
   * Cria um estado local para armazenar o texto da tarefa.
   * O estado `text` é controlado pelo valor do campo de entrada.
   */
  const [text, setText] = useState("");

  /**
   * Extrai a função `addTask` do contexto global de tarefas.
   * A função `addTask` é usada para adicionar uma nova tarefa à lista.
   */
  const { addTask } = useTasks();

  /**
   * Função que lida com o envio do formulário.
   * Esta função é chamada quando o usuário clica no botão de envio.
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário (recarregar a página)

    // Verifica se o texto está vazio ou contém apenas espaços em branco
    if (!text.trim()) return;

    /**
     * Adiciona a nova tarefa usando a função `addTask` do contexto.
     * A nova tarefa é criada com o título fornecido e o status inicial como "não concluída".
     */
    addTask({ title: text, completed: false });

    // Limpa o campo de texto após adicionar a tarefa
    setText("");
  };

  /**
   * Retorna o JSX do formulário.
   * O formulário inclui um campo de entrada para o texto da tarefa e um botão de envio.
   */
  return (
    <form className="task-form" onSubmit={handleSubmit}>
      {/* Campo de entrada controlado */}
      <input
        type="text"
        className="form-input" // Classe CSS para estilização
        value={text} // Valor do input vinculado ao estado `text`
        onChange={(e) => setText(e.target.value)} // Atualiza o estado `text` ao digitar
        placeholder="Adicionar nova tarefa..." // Placeholder para orientação visual
      />

      {/* Botão de envio com texto condicional */}
      <button type="submit" className="form-button">
        {/* Renderiza o texto do botão com base na propriedade `editTask` */}
        {editTask ? "Salvar" : "Adicionar Tarefa"}
      </button>
    </form>
  );
}