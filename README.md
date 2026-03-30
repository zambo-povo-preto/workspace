# 🛠️ Configuração do Ambiente de Desenvolvimento

Ambiente de desenvolvimento local. Inclui docker-compose e scripts de setup para facilitar o onboarding e padronizar o setup dos devs.

## 📌 Requisitos

Antes de iniciar o desenvolvimento, certifique-se de ter as seguintes ferramentas instaladas:

- **Node.js** (versão 18.x ou superior) - [[Instalação](https://nodejs.org/)]
- **npm** (gerenciador de pacotes do Node.js) - Instalado junto com o Node.js
- **Git** - [[Instalação](https://git-scm.com/downloads)]
- **Docker Desktop** - [[Instalação](https://www.docker.com/get-started)]

## 🚀 Configuração do VsCode

Instale a fonte Fira Code para uma melhor experiência de desenvolvimento. [[Instalação](https://github.com/tonsky/FiraCode/wiki/Installing)]

Instale as seguintes extensões no VsCode para melhorar a produtividade:

- **Biome** - Extensão para formatação de código e linting. [[Instalação](https://marketplace.visualstudio.com/items?itemName=biomejs.biome)]
- **Material Icon Theme** - Extensão para ícones de arquivos. [[Instalação](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)]
- **Omni Theme** - Extensão para temas de interface. [[Instalação](https://marketplace.visualstudio.com/items?itemName=rocketseat.theme-omni)]

## 🧑‍💻 Configuração do Git

Configure seu nome de usuário e email para o Git:

```shell
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
```

## 📂 Clonagem dos Repositórios

Escolha um diretório na sua máquina para clonar os repositórios. Execute os seguintes comandos:

```shell
git clone https://github.com/zambo-povo-preto/workspace.git zambo
cd zambo
git clone --branch dev https://github.com/zambo-povo-preto/api.git
git clone --branch dev https://github.com/zambo-povo-preto/site.git
git clone --branch dev https://github.com/zambo-povo-preto/panel.git
git clone --branch dev https://github.com/zambo-povo-preto/blog.git
```

## 🔑 Variáveis de Ambiente

Na raiz da pasta `zambo`, copie o arquivo `.env.example` para `.env`:

```shell
cp .env.example .env
```

Obtenha o token do Infisical com um Owner e adicione-o no arquivo `.env`:

```env
INFISICAL_TOKEN="seu-token-aqui"
```

Depois, baixe as variáveis de ambiente do Infisical:

```shell
npm run sync:env
```

> **Observação:** O script `sync:env` carrega o token do arquivo `.env` e sincroniza as variáveis do Infisical para o `.dev.vars` na pasta `📁api`


## 🔒 Configurando Certificados SSL

O projeto usa certificados SSL auto-assinados para desenvolvimento local. Siga os passos abaixo:

### Instalando mkcert no Mac OS ou Linux

```shell
brew install mkcert
mkcert -install
```

### Instalando mkcert no Windows

```shell
choco install mkcert
mkcert -install
```

### Gerando Certificados Locais

Na raiz do projeto, crie a pasta cert e gere os certificados para localhost e todos os hosts dos workers:

```shell
mkdir -p cert
cd cert
mkcert localhost 127.0.0.1 ::1 worker-api
mv localhost+3.pem cert.pem
mv localhost+3-key.pem key.pem
cd ..
```

### Copiando o Certificado CA Raiz

O Docker precisa do arquivo rootCA.pem para validar os certificados dentro dos containers. Siga os passos abaixo:

```shell
cp "$(mkcert -CAROOT)/rootCA.pem" ./cert/
```

> Importante: Os certificados gerados serão:
> Instalados no seu sistema (reconhecidos pelo browser)
> Compartilhados com os containers Docker via volumes (para os workers funcionarem)

### Como funciona o fluxo de certificados

```plain
┌─────────────────────────────────────────┐
│  Máquina Local (macOS/Windows/Linux)    │
│                                         │
│  1. mkcert gera certificados            │
│  2. mkcert -install → Keychain          │
│  3. Browser reconhece                   │
│                                         │
│  /zambo/cert/                           │
│    ├── cert.pem                         │
│    └── key.pem                          │
│         │                               │
│         │ Volume compartilhado          │
│         ↓                               │
│  ┌──────────────────────────────┐       │
│  │  Docker Container (worker)   │       │
│  │                              │       │
│  │  /app/cert/                  │       │
│  │    ├── cert.pem              │       │
│  │    └── key.pem               │       │
│  │                              │       │
│  │  Wrangler usa:               │       │
│  │  --https-cert-path=./cert/cert.pem   │
│  │  --https-key-path=./cert/key.pem     │
│  └──────────────────────────────┘       │
└─────────────────────────────────────────┘
```

## 🐳 Configuração do Docker

Construa as imagens base necessárias para os workers e páginas:

**Subir image base para workers api**

```shell
docker build -f Dockerfile.worker-image -t worker-image .
```

**Subir image base para páginas**

```shell
docker build -f Dockerfile.page-image -t page-image .
```

## 🚀 Iniciando o Ambiente de Desenvolviment

Garante que o Docker Desktop esteja rodando e execute o comando abaixo para iniciar os containers:

```shell
npm start
```

## 🧑‍💻 Acessando os Workers

- API: [https://localhost:3333](https://localhost:3333)
- Site: [https://localhost:3000](https://localhost:3000)
- Panel: [https://localhost:3001](https://localhost:3001)
- Blog: [https://localhost:3002](https://localhost:3002)