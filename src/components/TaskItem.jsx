import { useState } from "react"; // Hook para gerenciar estado local
import { useTasks } from "../context/TaskContext"; // Hook personalizado para acessar o contexto de tarefas
import { Link } from "react-router-dom"; // Componente para navegação entre rotas
import { Save, Edit2, Trash2 } from "lucide-react"; // Ícones do pacote Lucide React
import "../App.css"; // Importa os estilos globais

/**
 * Componente `TaskItem` que representa um item individual na lista de tarefas.
 * Este componente permite visualizar, editar e excluir uma tarefa específica.
 */
export default function TaskItem({ task }) {
  /**
   * Extrai as funções `toggleComplete`, `deleteTask` e `editTask` do contexto global de tarefas.
   * - `toggleComplete`: Alterna o status de conclusão da tarefa.
   * - `deleteTask`: Remove a tarefa da lista.
   * - `editTask`: Atualiza os dados da tarefa (título e observação).
   */
  const { toggleComplete, deleteTask, editTask } = useTasks();

  /**
   * Estado local para controlar se a tarefa está em modo de edição.
   * - `isEditing`: Define se o usuário está editando ou visualizando a tarefa.
   */
  const [isEditing, setIsEditing] = useState(false);

  /**
   * Estado local para armazenar o texto editado da tarefa.
   * - `editedText`: Armazena o novo título da tarefa enquanto o usuário edita.
   * - Inicializa com o valor atual do título da tarefa (`task.title`).
   */
  const [editedText, setEditedText] = useState(task.title);

  /**
   * Novo estado para armazenar a observação editada da tarefa.
   * - `editedObservation`: Armazena a nova observação da tarefa enquanto o usuário edita.
   * - Inicializa com o valor atual da observação (`task.observation`) ou uma string vazia, caso não haja observação.
   */
  const [editedObservation, setEditedObservation] = useState(
    task.observation || ""
  );

  /**
   * Função que lida com a edição da tarefa.
   * Esta função é chamada quando o botão de edição/salvar é clicado.
   */
  const handleEdit = async () => {
    if (isEditing) {
      /**
       * Se estiver em modo de edição, salva as alterações na API.
       * A função `editTask` é chamada com o ID da tarefa e os novos dados (título e observação).
       */
      await editTask(task.id, {
        title: editedText,
        observation: editedObservation,
      });
    }

    /**
     * Alterna entre os modos de edição e visualização.
     * - Se `isEditing` for `true`, muda para `false` (visualização).
     * - Se `isEditing` for `false`, muda para `true` (edição).
     */
    setIsEditing(!isEditing);
  };

  /**
   * Retorna o JSX do item da tarefa.
   * O componente inclui um checkbox, campos de edição (ou título), e botões de ação.
   */
  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      {/* Checkbox para marcar a tarefa como concluída ou pendente */}
      <input
        type="checkbox"
        className="task-checkbox" // Classe CSS para estilização
        checked={task.completed} // Controla o estado do checkbox com base no campo `completed`
        onChange={() => toggleComplete(task.id)} // Alterna o status da tarefa ao clicar no checkbox
      />

      {/* Renderização condicional: modo de edição ou visualização */}
      {isEditing ? (
        <>
          {/* Campo de texto para editar o título da tarefa */}
          <input
            type="text"
            className="form-input" // Classe CSS para estilização
            value={editedText} // Valor do input vinculado ao estado `editedText`
            onChange={(e) => setEditedText(e.target.value)} // Atualiza o estado `editedText` ao digitar
          />

          {/* Campo extra para a observação */}
          <div>
            <label htmlFor={`observation-${task.id}`}>
              <input
                type="text"
                id={`observation-${task.id}`} // ID único para acessibilidade
                className="form-input" // Classe CSS para estilização
                value={editedObservation} // Valor do input vinculado ao estado `editedObservation`
                onChange={(e) => setEditedObservation(e.target.value)} // Atualiza o estado `editedObservation` ao digitar
                placeholder="Descrição" // Placeholder para orientação visual
              />
            </label>
          </div>
        </>
      ) : (
        // Link para a página de detalhes da tarefa
        <Link to={`/task/${task.id}`} className="task-title">
          {task.title}
        </Link>
      )}

      {/* Container para os botões de ação */}
      <div className="task-actions">
        {/* Botão para editar/salvar a tarefa */}
        <button className="icon-button" onClick={handleEdit}>
          {isEditing ? (
            <Save size={18} strokeWidth={2} /> // Ícone de salvar no modo de edição
          ) : (
            <Edit2 size={18} strokeWidth={2} /> // Ícone de edição no modo de visualização
          )}
        </button>

        {/* Botão para excluir a tarefa */}
        <button className="icon-button" onClick={() => deleteTask(task.id)}>
          <Trash2 size={18} strokeWidth={2} /> {/* Ícone de lixeira */}
        </button>
      </div>
    </div>
  );
}