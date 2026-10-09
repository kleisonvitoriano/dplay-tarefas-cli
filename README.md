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

## Como foi o desenvolvimento

### Organização do código

Separei o projeto em camadas, cada uma com uma responsabilidade:

| Arquivo | Responsabilidade |
|---|---|
| `bin/tarefas.js` | Ponto de entrada: pega os argumentos do terminal e chama a aplicação |
| `src/cli.js` | Interpreta o comando digitado e chama a função correta |
| `src/validacao.js` | Valida e converte o id recebido pela linha de comando |
| `src/tarefas.js` | Regras de negócio: criar, concluir e remover tarefas |
| `src/armazenamento.js` | Leitura e gravação do arquivo `tarefas.json` |
| `src/apresentacao.js` | Formatação da listagem (marcador, colunas e data) |
| `src/ajuda.js` | Texto do comando de ajuda |

As regras de negócio não sabem onde os dados ficam salvos nem como são exibidos. Assim, trocar o JSON por outro formato mexeria só em `armazenamento.js`.

### Decisões tomadas

- **`fs/promises` com `async/await`:** as operações de disco no Node são assíncronas, e essa forma deixa o código linear e fácil de ler.
- **Primeira execução sem arquivo:** se o `tarefas.json` não existe, o erro `ENOENT` é tratado e a lista começa vazia. O arquivo é criado ao salvar.
- **Id calculado como maior id + 1:** usar a quantidade de tarefas geraria ids repetidos depois de remover uma tarefa do meio da lista.
- **Data em formato ISO no arquivo:** é padronizada e sem ambiguidade. A conversão para `dd/mm/aaaa` acontece só na exibição.
- **Funções que não alteram os dados recebidos:** usei `map`, `filter` e spread para devolver listas novas, o que deixa o comportamento previsível.
- **Um único ponto de tratamento de erros:** as camadas internas lançam erros com mensagens claras, e o `cli.js` os exibe e define o código de saída 1.
- **Sem bibliotecas externas:** o desafio pedia Node puro, e isso elimina falhas de instalação.

### Dificuldades e como resolvi

- **Tudo que vem do terminal é texto:** o id `1` digitado chega como a string `"1"`, e `"1" === 1` é falso em JavaScript, então a tarefa nunca seria encontrada. Resolvi validando e convertendo o id para número assim que ele entra, em `validacao.js`.
- **Ids repetidos depois de remover:** percebi que `quantidade + 1` colidiria com um id existente e passei a usar o maior id mais 1.
- **Meses começando em zero:** o `Date` do JavaScript conta janeiro como 0, então somei 1 ao formatar a data.
- **Declaração duplicada ao integrar os comandos:** ao atualizar o `cli.js`, deixei dois `require` do mesmo módulo e o Node acusou `Identifier 'criarTarefa' has already been declared`. Li a linha apontada no erro, encontrei a repetição e removi.

## Próximos passos

Com mais tempo, eu melhoraria:

- Escrever testes automatizados com o executor de testes nativo do Node (`node --test`)
- Filtrar a listagem por status (pendentes ou concluídas)
- Criar um comando para editar a descrição de uma tarefa
- Guardar um contador de ids no arquivo, para que um id removido nunca seja reaproveitado
- Gravar o arquivo de forma atômica (arquivo temporário e `rename`) para evitar corrupção se o programa for interrompido
- Salvar o `tarefas.json` na pasta do usuário, em vez da pasta do projeto
- Pedir confirmação antes de remover uma tarefa
- Gerar um executável que rode sem precisar instalar o Node