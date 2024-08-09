## 1. Visão Geral

Este projeto é uma aplicação web que utiliza Next.js como frontend e Spring como backend para o programa Hanami.

## 2. Arquitetura do Projeto

A arquitetura do projeto é dividida em duas partes principais:

**Frontend**: Construído com Next.js, uma estrutura React para a criação de interfaces de usuário. Next.js permite renderização no lado do servidor (SSR) e geração de sites estáticos, além de facilitar o desenvolvimento de rotas dinâmicas e integrações API.

**Backend**: Desenvolvido com Spring Boot, uma plataforma poderosa para criar aplicações robustas em Java. O backend expõe uma API RESTful que o frontend consome para operações CRUD, autenticação, e outras funcionalidades.

## 3. Configuração do Ambiente

**Requisitos**:

- Node.js versão 14 ou superior.
- Java versão 11 ou superior.
- Maven para gerenciar dependências do Spring.
- Git para controle de versão.

### Configuração do Backend (Spring)

### 1. Clonar o repositório: 


[https://github.com/Hanami-Staff/SQUAD-14.git](https://github.com/Hanami-Staff/SQUAD-14.git)

```
  cd SQUAD-14
```

### 2. Instalar as dependências:

```
  mvn install
```

### 3. Configurar o banco de dados:

Defina as configurações do banco de dados em src/main/resources/application.properties.

```
    spring.datasource.url=jdbc:mysql://localhost:3306/seu_banco_de_dados
    spring.datasource.username=seu_usuario
    spring.datasource.password=sua_senha
```

### 4. Configurar JWT (se aplicável):

Adicione as configurações necessárias para JWT em application.properties.

### Configuração do Frontend (Next.js)

### 1. Clonar o repositório: 

[https://github.com/Hanami-Staff/Squad14-FrontEnd.git](https://github.com/Hanami-Staff/Squad14-FrontEnd.git)

```
  cd Squad14-FrontEnd
```

### 2. Instalar as dependências:

```
  npm install
```

### 3. Configurar JWT (se aplicável):

Adicione as configurações necessárias para JWT em application.properties.

## 4. Execução do Projeto

### Iniciando o Backend

###  1.  Navegue até o diretório do backend:

```
  cd SQUAD-14
```

###  2.  Inicie a aplicação Spring:

```
  mvn spring-boot:run
```

###  3. A API estará disponível em http://localhost:8080.

### Iniciando o Frontend

###  1. Navegue até o diretório do frontend:

```
  cd Squad14-FrontEnd
```

###  2.  Inicie o servidor de desenvolvimento Next.js:

```
  npm run dev
```

## 5. Link

[Aplicação funcionando](https://squad14-front-end.vercel.app/)
