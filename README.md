✅ 1. Ajustar as senhas (IMPORTANTE)

Você precisa garantir que a senha do banco está igual em todos os lugares.

📌 No application.properties

Altere se quiser mudar a senha:

spring.datasource.username=root
spring.datasource.password=SUA_SENHA_AQUI
📌 No docker-compose.yml (serviço db)
environment:
  MYSQL_ROOT_PASSWORD: SUA_SENHA_AQUI
  MYSQL_DATABASE: passgeneration
📌 No docker-compose.yml (serviço backend)
environment:
  - SPRING_DATASOURCE_USERNAME=root
  - SPRING_DATASOURCE_PASSWORD=SUA_SENHA_AQUI

👉 Regra de ouro:
A senha precisa ser exatamente a mesma nos 3 lugares:

application.properties
MYSQL_ROOT_PASSWORD
SPRING_DATASOURCE_PASSWORD
✅ 2. Subir os containers

Abra o terminal na raiz do projeto (onde está o docker-compose.yml).

🔨 Buildar as imagens:
docker compose build
🚀 Subir os containers:
docker compose up -d
✅ 3. Verificar se tudo subiu
docker ps

Você deve ver:

gerador-db
gerador-backend
gerador-frontend
✅ 4. Testar acesso
Backend:
👉 http://localhost:8080
Frontend:
👉 http://localhost:8081
⚠️ Problema comum (muito importante)

Se você já rodou antes e mudou a senha, o MySQL pode continuar com a senha antiga por causa do volume.

💥 Solução (resetar banco):
docker compose down -v

Depois subir de novo:

docker compose up -d --build
✅ Resumo rápido
Ajustar senha igual em tudo
docker compose build
docker compose up -d
(se der erro) docker compose down -v
