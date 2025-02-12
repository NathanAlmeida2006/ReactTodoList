// Importa o hook useParams do react-router-dom para acessar parâmetros da URL
import { useParams } from "react-router-dom";

// Importa o hook useTasks do contexto para acessar a lista de tarefas
import { useTasks } from "../context/TaskContext";

// Importa ícones da biblioteca Lucide para uma interface mais visual
import { CheckCircle, Clock, AlertCircle } from "lucide-react";

// Importa o arquivo de estilos CSS
import "../App.css";

// Define o componente TaskDetails, que exibe os detalhes de uma tarefa específica
export default function TaskDetails() {
  // Extrai o parâmetro 'id' da URL usando useParams
  const { id } = useParams();

  // Extrai a lista de tarefas do contexto usando useTasks
  const { tasks } = useTasks();

  // Encontra a tarefa correspondente ao ID na URL
  const task = tasks.find((t) => t.id.toString() === id);

  // Se a tarefa não for encontrada, exibe uma mensagem de erro com um ícone
  if (!task)
    return (
      <div className="container">
        <AlertCircle size={24} className="icon-error" /> Tarefa não encontrada
      </div>
    );

  // Retorna o JSX com os detalhes da tarefa
  return (
    <div className="container">
      {/* Container para os detalhes da tarefa */}
      <div className="task-details">
        {/* Título da seção */}
        <h2>Detalhes da Tarefa</h2>

        {/* Exibe o título da tarefa */}
        <p>
          <strong>Título:</strong> {task.title}
        </p>

        {/* Exibe o status da tarefa com um ícone condicional */}
        <p>
          <strong>Status:</strong>{" "}
          {task.completed ? (
            <>
              <CheckCircle size={18} className="icon-completed" /> Concluída
            </>
          ) : (
            <>
              <Clock size={18} className="icon-pending" /> Pendente
            </>
          )}
        </p>

        {/* Exibe a observação da tarefa */}
        <p>
          <strong>Observação:</strong>{" "}
          {task.observation ? task.observation : "Nenhuma observação"}
        </p>
      </div>
    </div>
  );
}
