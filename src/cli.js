const { exibirAjuda } = require('./ajuda');

const FLAGS_DE_AJUDA = ['ajuda', '--help', '-h'];

function executar(argumentos) {
  const [comando] = argumentos;

  if (comando === undefined || FLAGS_DE_AJUDA.includes(comando)) {
    exibirAjuda();
    return;
  }

  console.error(`Erro: comando "${comando}" não reconhecido.`);
  console.error('Use "tarefas ajuda" para ver os comandos disponíveis.');
  process.exitCode = 1;
}

module.exports = { executar };