function lerIdDosArgumentos(argumentos, comando) {
  const exemplo = `Exemplo: tarefas ${comando} 1`;

  if (argumentos.length === 0) {
    throw new Error(`Informe o id da tarefa. ${exemplo}`);
  }

  if (argumentos.length > 1) {
    throw new Error(`Informe apenas um id. ${exemplo}`);
  }

  const [texto] = argumentos;
  const id = Number(texto);

  if (!/^\d+$/.test(texto) || !Number.isSafeInteger(id) || id < 1) {
    throw new Error(`O id deve ser um número inteiro positivo (recebido: "${texto}").`);
  }

  return id;
}

module.exports = { lerIdDosArgumentos };