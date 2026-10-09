const { exibirAjuda } = require("./ajuda");
const { lerTarefas, salvarTarefas } = require("./armazenamento");
const { criarTarefa } = require("./tarefas");
const { formatarLista } = require("./apresentacao");

const FLAGS_DE_AJUDA = ["ajuda", "--help", "-h"];

async function comandoAdicionar(argumentos) {
  const descricao = argumentos.join(" ");
  const tarefas = await lerTarefas();
  const novaTarefa = criarTarefa(tarefas, descricao);

  await salvarTarefas([...tarefas, novaTarefa]);
  console.log(`Tarefa #${novaTarefa.id} adicionada.`);
}

const COMANDOS = {
  adicionar: comandoAdicionar,
  listar: comandoListar,
};

async function executar(argumentos) {
  const [comando, ...restante] = argumentos;

  if (comando === undefined || FLAGS_DE_AJUDA.includes(comando)) {
    exibirAjuda();
    return;
  }

  if (!Object.hasOwn(COMANDOS, comando)) {
    console.error(`Erro: comando "${comando}" não reconhecido.`);
    console.error('Use "tarefas ajuda" para ver os comandos disponíveis.');
    process.exitCode = 1;
    return;
  }

  try {
    await COMANDOS[comando](restante);
  } catch (erro) {
    console.error(`Erro: ${erro.message}`);
    process.exitCode = 1;
  }
}

async function comandoListar() {
  const tarefas = await lerTarefas();

  if (tarefas.length === 0) {
    console.log("Nenhuma tarefa cadastrada.");
    return;
  }

  console.log(formatarLista(tarefas).join("\n"));
}

module.exports = { executar };
