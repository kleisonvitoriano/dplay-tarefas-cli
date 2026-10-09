const STATUS = {
  PENDENTE: 'pendente',
  CONCLUIDA: 'concluida',
};

function gerarProximoId(tarefas) {
  if (tarefas.length === 0) {
    return 1;
  }
  const ids = tarefas.map((tarefa) => tarefa.id);
  return Math.max(...ids) + 1;
}

function criarTarefa(tarefas, descricao) {
  const texto = typeof descricao === 'string' ? descricao.trim() : '';

  if (texto === '') {
    throw new Error('A descrição da tarefa não pode ser vazia.');
  }

  return {
    id: gerarProximoId(tarefas),
    descricao: texto,
    status: STATUS.PENDENTE,
    criadaEm: new Date().toISOString(),
  };
}

module.exports = { STATUS, criarTarefa };