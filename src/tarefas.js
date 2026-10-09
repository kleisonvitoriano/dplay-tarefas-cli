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

function buscarTarefa(tarefas, id) {
  const tarefa = tarefas.find((item) => item.id === id);

  if (tarefa === undefined) {
    throw new Error(`Tarefa #${id} não encontrada.`);
  }

  return tarefa;
}

function concluirTarefa(tarefas, id) {
  const tarefa = buscarTarefa(tarefas, id);

  if (tarefa.status === STATUS.CONCLUIDA) {
    throw new Error(`Tarefa #${id} já está concluída.`);
  }

  return tarefas.map((item) =>
    item.id === id ? { ...item, status: STATUS.CONCLUIDA } : item
  );
}

function removerTarefa(tarefas, id) {
  buscarTarefa(tarefas, id);

  return tarefas.filter((item) => item.id !== id);
}

module.exports = { STATUS, criarTarefa, concluirTarefa, removerTarefa };