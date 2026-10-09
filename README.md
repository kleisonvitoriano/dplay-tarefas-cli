# Tarefas CLI

Gerenciador de tarefas de linha de comando feito com Node.js puro, desenvolvido como desafio técnico (Fase 2) do processo seletivo para Desenvolvedor Júnior da Dplay Solutions.

## Sobre o projeto

A aplicação permite gerenciar uma lista de tarefas direto no terminal: adicionar, listar, concluir e remover. Cada tarefa tem `id`, `descrição`, `status` (pendente ou concluída) e `data de criação`. As tarefas ficam salvas no arquivo `tarefas.json`, então continuam disponíveis depois que o programa é fechado.

## Tecnologias

- **Linguagem:** JavaScript (Node.js)
- **Versão do Node:** 18 ou superior (desenvolvido e testado com a v24.19.0)
- **Bibliotecas:** nenhuma. Usa apenas módulos nativos do Node (`fs/promises` e `path`)
- **Formato de armazenamento:** JSON

## Como instalar

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior
- [Git](https://git-scm.com/)

Para conferir as versões instaladas:

```bash
node --version
git --version
```

### Passo a passo

```bash
git clone https://github.com/kleisonvitoriano/dplay-tarefas-cli
cd tarefas-cli
node bin/tarefas.js ajuda
```

Não é necessário rodar `npm install`, pois o projeto não tem dependências. Se a lista de comandos aparecer, está tudo pronto.

### Opcional: instalar o comando `tarefas`

Dentro da pasta do projeto, rode uma única vez:

```bash
npm link
```

Depois disso você pode usar `tarefas ajuda` no lugar de `node bin/tarefas.js ajuda`. Para desfazer: `npm unlink -g tarefas-cli`.

> No Windows (PowerShell), se aparecer um erro de política de execução ao usar o comando `tarefas`, use o Prompt de Comando (cmd) ou a forma `node bin/tarefas.js`, que funciona em qualquer terminal.

## Como usar

Os exemplos usam a forma `node bin/tarefas.js`. Se você instalou com `npm link`, troque por `tarefas`.

### Ajuda

Lista todos os comandos. Também funciona com `--help`, `-h` ou sem nenhum comando.

```bash
node bin/tarefas.js ajuda
```

```
Gerenciador de tarefas

Uso:
  tarefas <comando> [argumentos]

Comandos:
  adicionar "descrição"   Adiciona uma nova tarefa
  listar                  Lista todas as tarefas
  concluir <id>           Marca a tarefa como concluída
  remover <id>            Remove a tarefa
  ajuda, --help, -h       Mostra esta mensagem
```

### Adicionar uma tarefa

```bash
node bin/tarefas.js adicionar "Estudar Git"
```

```
Tarefa #1 adicionada.
```

### Listar as tarefas

`[ ]` indica tarefa pendente e `[X]` indica tarefa concluída.

```bash
node bin/tarefas.js listar
```

```
[X] #1  Estudar Git          09/10/2026
[ ] #2  Ler a documentação   09/10/2026
```

Se não houver tarefas, a mensagem é `Nenhuma tarefa cadastrada.`

### Concluir uma tarefa

```bash
node bin/tarefas.js concluir 1
```

```
Tarefa #1 concluída.
```

### Remover uma tarefa

```bash
node bin/tarefas.js remover 1
```

```
Tarefa #1 removida.
```

### Mensagens de erro

Os erros são exibidos com o prefixo `Erro:` e o programa termina com código de saída 1.

| Situação | Mensagem |
|---|---|
| Comando que não existe | `Erro: comando "banana" não reconhecido.` |
| Descrição vazia | `Erro: A descrição da tarefa não pode ser vazia.` |
| Id não informado | `Erro: Informe o id da tarefa. Exemplo: tarefas concluir 1` |
| Mais de um id | `Erro: Informe apenas um id. Exemplo: tarefas concluir 1` |
| Id inválido (`abc`, `1.5`, `-1`, `0`) | `Erro: O id deve ser um número inteiro positivo (recebido: "abc").` |
| Id que não existe | `Erro: Tarefa #99 não encontrada.` |
| Tarefa já concluída | `Erro: Tarefa #1 já está concluída.` |
| Arquivo com JSON inválido | `Erro: O arquivo ... está corrompido (JSON inválido).` |

### Onde os dados ficam salvos

No arquivo `tarefas.json`, na raiz do projeto, independentemente da pasta em que o comando for executado. Ele é criado automaticamente na primeira vez que uma tarefa é adicionada e não é versionado no Git (está no `.gitignore`).