# 🚀 Guia para rodar o projeto com Docker

## ✅ 1. Ajustar as senhas (IMPORTANTE)

Você precisa garantir que a senha do banco está **igual em todos os lugares**.



```properties
No `application.properties`
spring.datasource.username=root
spring.datasource.password=SUA_SENHA_AQUI

No docker-compose.yml (serviço db)
environment:
  MYSQL_ROOT_PASSWORD: SUA_SENHA_AQUI
  MYSQL_DATABASE: passgeneration
No docker-compose.yml (serviço backend)
environment:
  - SPRING_DATASOURCE_USERNAME=root
  - SPRING_DATASOURCE_PASSWORD=SUA_SENHA_AQUI
2. Subir os containers

Abra o terminal na raiz do projeto (onde está o docker-compose.yml).

🔨 Buildar as imagens:
docker compose build

Subir os containers:
docker compose up -d

3. Testar acesso
Backend:
http://localhost:8080
Frontend:
http://localhost:8081
