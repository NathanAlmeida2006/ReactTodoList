import { useState } from "react"; // Hook para gerenciar estado local
import { useTasks } from "../context/TaskContext"; // Hook personalizado para acessar o contexto de tarefas
import { Link } from "react-router-dom"; // Componente para navegação entre rotas
import { Save, Edit2, Trash2, CheckCircle2 } from "lucide-react"; // Ícones do pacote Lucide React
import "../App.css"; // Importa os estilos globais

/**
 * Componente `TaskItem` que representa um item individual na lista de tarefas como um cartão.
 * Este componente permite visualizar, editar e excluir uma tarefa específica.
 */
export default function TaskItem({ task }) {
  const { toggleComplete, deleteTask, editTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.title);
  const [editedObservation, setEditedObservation] = useState(
    task.observation || ""
  );

  const handleEdit = async () => {
    if (isEditing) {
      await editTask(task.id, {
        title: editedText,
        observation: editedObservation,
      });
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className={`task-card ${task.completed ? "completed" : ""}`}>
      {isEditing ? (
        <div className="task-content">
          <input
            type="text"
            className="form-input"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <input
            type="text"
            className="form-input"
            value={editedObservation}
            onChange={(e) => setEditedObservation(e.target.value)}
            placeholder="Descrição"
          />
        </div>
      ) : (
        <div className="task-content">
          <Link to={`/task/${task.id}`} className="task-title">
            {task.title}
          </Link>
          {task.observation && (
            <p className="task-observation">{task.observation}</p>
          )}
        </div>
      )}

      {/* Ações no canto direito */}
      <div className="task-actions">
        {/* Botão de conclusão com ícone */}
        <button
          className={`icon-button complete-button ${
            task.completed ? "completed" : ""
          }`}
          onClick={() => toggleComplete(task.id)}
        >
          <CheckCircle2 size={18} strokeWidth={2} />
        </button>

        {/* Botão de edição */}
        <button className="icon-button" onClick={handleEdit}>
          {isEditing ? (
            <Save size={18} strokeWidth={2} />
          ) : (
            <Edit2 size={18} strokeWidth={2} />
          )}
        </button>

        {/* Botão de exclusão */}
        <button className="icon-button" onClick={() => deleteTask(task.id)}>
          <Trash2 size={18} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
