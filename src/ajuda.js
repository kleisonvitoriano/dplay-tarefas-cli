const TEXTO_AJUDA = `
Gerenciador de Tarefas - DPlay Solutions

Uso: tarefas <comando> [argumentos]

Comandos disponíveis:
  adicionar <"descrição">  Adiciona uma nova tarefa
  listar                   Lista todas as tarefas
  concluir <id>            Marca uma tarefa como concluída
  remover <id>             Remove uma tarefa pelo ID
  ajuda, --help            Exibe esta tela de ajuda
`;

function exibirAjuda() {
  console.log(TEXTO_AJUDA);
}

module.exports = { exibirAjuda };