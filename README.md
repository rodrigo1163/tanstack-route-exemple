# Como Rodar o Projeto

Este é um projeto frontend que utiliza **React**, **Vite**, **TanStack Router** e **JSON Server** para simular uma API REST.

## Pré-requisitos

- **Node.js** >= 18
- **pnpm** >= 10.0.0 (gerenciador de pacotes)

## Instalação

1. Clone o repositório (se ainda não tiver feito):

```bash
git clone <url-do-repositorio>
cd tanstack-route-exemple
```

2. Instale o pnpm globalmente (se ainda não tiver):

```bash
npm install -g pnpm
```

3. Instale as dependências do projeto:

```bash
pnpm install
```

## Como Rodar o Projeto

### Opção 1: Rodar Frontend e JSON Server Simultaneamente

Para rodar o frontend e o JSON Server ao mesmo tempo, você precisará abrir dois terminais:

**Terminal 1 - JSON Server:**

```bash
pnpm json-server
```

Isso irá iniciar o JSON Server na porta `3333` usando o arquivo `db.json` como banco de dados.

**Terminal 2 - Frontend:**

```bash
pnpm dev
```

Isso irá iniciar o servidor de desenvolvimento do Vite na porta `3000`.

### Opção 2: Rodar Apenas o Frontend

Se você já tiver o JSON Server rodando em outro terminal ou processo:

```bash
pnpm dev
```

## Acessar a Aplicação

Após iniciar o projeto, acesse:

- **Frontend**: http://localhost:3000
- **JSON Server API**: http://localhost:3333

## Estrutura do Projeto

- **`src/`**: Código fonte da aplicação React
- **`db.json`**: Arquivo de dados mockados usado pelo JSON Server
- **`public/`**: Arquivos estáticos públicos

## Scripts Disponíveis

- `pnpm dev`: Inicia o servidor de desenvolvimento do Vite (porta 3000)
- `pnpm build`: Gera a build de produção
- `pnpm serve`: Visualiza a build de produção localmente
- `pnpm json-server`: Inicia o JSON Server na porta 3333
- `pnpm test`: Executa os testes
- `pnpm check-types`: Verifica os tipos TypeScript
