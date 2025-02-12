// Importa os hooks e componentes necessários
import { useParams } from "react-router-dom"; // Hook para extrair parâmetros da URL
import { useTasks } from "../context/TaskContext"; // Hook personalizado para acessar o contexto de tarefas
import { CheckCircle, Clock, AlertCircle } from "lucide-react"; // Ícones do pacote Lucide React
import { Link } from "react-router-dom"; // Componente para navegação entre rotas
import "../App.css"; // Importa os estilos globais

/**
 * Componente `TaskDetails` que exibe os detalhes de uma tarefa específica.
 * Este componente é renderizado quando o usuário acessa uma rota dinâmica (ex.: `/task/:id`).
 */
export default function TaskDetails() {
  // Extrai o parâmetro `id` da URL usando o hook `useParams`
  const { id } = useParams();

  // Acessa o contexto de tarefas para obter a lista de tarefas
  const { tasks } = useTasks();

  /**
   * Encontra a tarefa correspondente ao ID extraído da URL.
   * O ID da URL é convertido para string para garantir consistência na comparação.
   */
  const task = tasks.find((t) => t.id.toString() === id);

  /**
   * Se a tarefa não for encontrada, exibe uma mensagem de erro com um ícone.
   * Isso pode ocorrer se o ID na URL não corresponder a nenhuma tarefa existente.
   */
  if (!task)
    return (
      <div className="container">
        {/* Ícone de erro e mensagem indicando que a tarefa não foi encontrada */}
        <AlertCircle size={24} className="icon-error" /> Tarefa não encontrada
      </div>
    );

  /**
   * Retorna o JSX com os detalhes da tarefa.
   * A estrutura inclui o título, status, observação e um botão para voltar à página inicial.
   */
  return (
    <div className="container">
      {/* Botão para voltar à página inicial */}
      <div className="return-button-container">
        <Link to="/" className="return-button">
          Voltar para Home
        </Link>
      </div>

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
            // Se a tarefa estiver concluída, exibe um ícone de sucesso e o texto "Concluída"
            <>
              <CheckCircle size={18} className="icon-completed" /> Concluída
            </>
          ) : (
            // Se a tarefa estiver pendente, exibe um ícone de relógio e o texto "Pendente"
            <>
              <Clock size={18} className="icon-pending" /> Pendente
            </>
          )}
        </p>

        {/* Exibe a observação da tarefa, ou uma mensagem padrão se não houver observação */}
        <p>
          <strong>Observação:</strong>{" "}
          {task.observation ? task.observation : "Nenhuma observação"}
        </p>
      </div>
    </div>
  );
}