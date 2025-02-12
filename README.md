
# 📋 To-Do List

## 📦 Estrutura do Projeto

```plaintext
public/
└── index.html              # Página HTML principal

src/
├── components/             # Componentes reutilizáveis
│   ├── Header.jsx          # 🎯 Cabeçalho da aplicação
│   ├── TaskForm.jsx        # 📝 Formulário para adicionar/editar tarefas
│   ├── TaskItem.jsx        # ✔️ Item individual da lista de tarefas
│   └── TaskList.jsx        # 📋 Lista de tarefas filtradas
├── context/                
│   └── TaskContext.js      # 🌐 Contexto global para gerenciamento de estado
├── pages/                  # 🖥️ Páginas da aplicação
│   ├── Home.jsx            # 🏠 Página inicial
│   └── TaskDetails.jsx     # 🔍 Página de detalhes de uma tarefa
├── services/               
│   └── api.js              # 🌍 Configuração da API (axios/fetch)
├── App.css                 # 🎨 Estilos globais
├── App.js                  # ⚛️ Componente principal
├── App.test.js             # 🧪 Testes do componente App
├── index.css               # 🖌️ Estilos adicionais
├── index.js                # 🚀 Ponto de entrada da aplicação
├── reportWebVitals.js      # 📊 Métricas de desempenho
└── setupTests.js           # ⚙️ Configuração de testes (Jest/React Testing Library)

Raiz do Projeto:
├── db.json                 # 🗃️ Banco de dados local (JSON Server)
├── package-lock.json       # 🔒 Versões exatas de dependências
├── package.json            # 📦 Metadados e dependências do projeto
└── README.md               # 📖 Documentação

```

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js
- npm instalado

### Passos para Execução

1. **Clone o Repositório**
   ```bash
   git clone https://github.com/NathanAlmeida2006/ReactTodoList.git
   ```

2. **Instale as Dependências**
   Execute o seguinte comando para instalar todas as dependências necessárias:
   ```bash
   npm install react-router-dom axios json-server lucide-react
   ```

3. **Inicie o Banco de Dados (JSON Server)**
   Para simular um backend RESTful, inicie o servidor JSON com o seguinte comando:
   ```bash
   npx json-server --watch db.json --port 3001
   ```
   - Certifique-se de que o arquivo `db.json` existe na raiz do projeto. Ele deve conter uma estrutura inicial como esta:
     ```json
     {
       "todos": []
     }
     ```

4. **Inicie o Servidor de Desenvolvimento**
   Em outro terminal, execute o seguinte comando para iniciar a aplicação React:
   ```bash
   npm start
   ```

5. **Acesse a Aplicação**
   Abra o navegador e acesse: [http://localhost:3000](http://localhost:3000)

---

## 🌟 Como Usar a Aplicação

1. **Adicionar uma Nova Tarefa**:
   - Na página inicial, insira o título da tarefa no campo de texto e clique em "Adicionar Tarefa".
   - Observações podem ser adicionadas ao editar a tarefa.

2. **Marcar como Concluída**:
   - Clique na caixa de seleção ao lado da tarefa para marcá-la como concluída.

3. **Editar uma Tarefa**:
   - Clique no ícone de edição (lápis) para alterar o título ou adicionar observações.

4. **Excluir uma Tarefa**:
   - Clique no ícone de lixeira para remover uma tarefa.

5. **Filtrar Tarefas**:
   - Use os botões "Todas", "Pendentes" ou "Concluídas" para filtrar a lista de tarefas.

6. **Visualizar Detalhes**:
   - Clique no título de uma tarefa para acessar sua página de detalhes.

---
