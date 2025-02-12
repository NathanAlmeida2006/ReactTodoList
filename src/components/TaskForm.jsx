import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import "../App.css";

export default function TaskForm({ editTask }) {
  // Cria um estado local para armazenar o texto da tarefa
  const [text, setText] = useState("");

  // Extrai a função addTask do contexto global
  const { addTask } = useTasks();

  // Função que lida com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário
    if (!text.trim()) return; // Se o texto estiver vazio, não faz nada
    addTask({ title: text, completed: false }); // Adiciona a nova tarefa
    setText(""); // Limpa o campo de texto após adicionar a tarefa
  };

  // Retorna o JSX do formulário
  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-input"
        value={text} // Valor do input controlado pelo estado
        onChange={(e) => setText(e.target.value)} // Atualiza o estado ao digitar
        placeholder="Adicionar nova tarefa..." // Texto de placeholder
      />
      <button type="submit" className="form-button">
        {/* Renderiza o texto do botão condicionalmente */}
        {editTask ? "Salvar" : "Adicionar Tarefa"}
      </button>
    </form>
  );
}
