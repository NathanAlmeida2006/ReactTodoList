import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import { Link } from "react-router-dom";
import { Save, Edit2, Trash2 } from "lucide-react";
import "../App.css";

export default function TaskItem({ task }) {
  // Extrai as funções toggleComplete, deleteTask e editTask do contexto global
  const { toggleComplete, deleteTask, editTask } = useTasks();

  // Estado local para controlar se a tarefa está em modo de edição
  const [isEditing, setIsEditing] = useState(false);

  // Estado local para armazenar o texto editado da tarefa
  const [editedText, setEditedText] = useState(task.title);

  // Novo estado para armazenar a observação editada
  const [editedObservation, setEditedObservation] = useState(
    task.observation || ""
  );

  // Função que lida com a edição da tarefa
  const handleEdit = async () => {
    if (isEditing) {
      // Se estiver em modo de edição, salva as alterações na API (incluindo observação)
      await editTask(task.id, {
        title: editedText,
        observation: editedObservation,
      });
    }
    // Alterna entre os modos de edição e visualização
    setIsEditing(!isEditing);
  };

  // Retorna o JSX do item da tarefa
  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      {/* Checkbox para marcar a tarefa como concluída ou pendente */}
      <input
        type="checkbox"
        className="task-checkbox"
        checked={task.completed}
        onChange={() => toggleComplete(task.id)} // Alterna o status da tarefa
      />

      {/* Renderização condicional: modo de edição ou visualização */}
      {isEditing ? (
        <>
          {/* Campo de texto para editar o título da tarefa */}
          <input
            type="text"
            className="form-input"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)} // Atualiza o texto editado
          />
          {/* Campo extra para a observação */}
          <div>
            <label htmlFor={`observation-${task.id}`}>
              <input
                type="text"
                id={`observation-${task.id}`}
                className="form-input"
                value={editedObservation}
                onChange={(e) => setEditedObservation(e.target.value)} // Atualiza a observação editada
                placeholder="Descrição"
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
