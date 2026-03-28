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