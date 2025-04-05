
# Desafio FPF FullStack

Desde já agradeço pela oportunidade de participar do processo de seleção, espero que gostem da minha aplicação!

## Pré-requisitos

Antes de executar a aplicação, certifique-se de ter os seguintes softwares instalados:

* [Docker](https://www.docker.com/get-started/)
* [Docker Compose](https://docs.docker.com/compose/install/)

## Configuração

1.  **Clone o repositório:**

    ```bash
    git clone git@github.com:maindan/desafio-fpf.git
    ```

2.  **Construa e execute os containers Docker:**

    Abra o terminal na pasta principal do projeto e rode o comando:
    ```bash
    docker-compose up --build
    ```
    Este comando irá construir as imagens Docker e iniciar os containers para o frontend, backend, Redis e RabbitMQ. Aguarde até que a aplicação esteja operante, leva alguns minutos até que o toda a aplicação funcione corretamente e o celery consiga se conectar ao rabbitmq, no console retornará a mensagem: 
    ```bash
    celery-1 ready
    ```

3.  **Acesse a aplicação:**

    * Frontend: Abra o navegador em `http://localhost:4200`
    * Backend: A API está disponível em `http://localhost:8000`
