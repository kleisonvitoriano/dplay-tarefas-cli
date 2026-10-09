const fs = require('fs/promises');
const path = require('path');

const ARQUIVO_PADRAO = path.join(__dirname, '..', 'tarefas.json');

async function lerTarefas(caminho = ARQUIVO_PADRAO) {
  try {
    const conteudo = await fs.readFile(caminho, 'utf8');

    if (conteudo.trim() === '') {
      return [];
    }

    const dados = JSON.parse(conteudo);

    if (!Array.isArray(dados)) {
      throw new Error(`O arquivo ${caminho} não contém uma lista de tarefas.`);
    }

    return dados;
  } catch (erro) {
    if (erro.code === 'ENOENT') {
      return [];
    }
    if (erro instanceof SyntaxError) {
      throw new Error(`O arquivo ${caminho} está corrompido (JSON inválido).`);
    }
    throw erro;
  }
}

async function salvarTarefas(tarefas, caminho = ARQUIVO_PADRAO) {
  const conteudo = JSON.stringify(tarefas, null, 2);
  await fs.writeFile(caminho, conteudo + '\n', 'utf8');
}

module.exports = { lerTarefas, salvarTarefas };