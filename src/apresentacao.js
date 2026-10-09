const { STATUS } = require('./tarefas');

function formatarData(dataIso) {
  const data = new Date(dataIso);

  if (Number.isNaN(data.getTime())) {
    return '--/--/----';
  }

  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();

  return `${dia}/${mes}/${ano}`;
}

function formatarMarcador(status) {
  return status === STATUS.CONCLUIDA ? '[X]' : '[ ]';
}

function formatarLista(tarefas) {
  if (tarefas.length === 0) {
    return [];
  }

  const larguraId = Math.max(...tarefas.map((t) => `#${t.id}`.length));
  const larguraDescricao = Math.max(...tarefas.map((t) => t.descricao.length));

  return tarefas.map((tarefa) => {
    const marcador = formatarMarcador(tarefa.status);
    const id = `#${tarefa.id}`.padEnd(larguraId);
    const descricao = tarefa.descricao.padEnd(larguraDescricao);
    const data = formatarData(tarefa.criadaEm);

    return `${marcador} ${id}  ${descricao}  ${data}`;
  });
}

module.exports = { formatarData, formatarMarcador, formatarLista };