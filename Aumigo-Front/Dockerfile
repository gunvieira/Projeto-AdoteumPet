# Estágio 1: Build - Usamos uma imagem Node.js para construir o projeto React.
FROM node:18-alpine AS build

# Define o diretório de trabalho.
WORKDIR /app

# Copia o package.json e o package-lock.json para otimizar o cache de camadas.
COPY package*.json ./

# Instala todas as dependências do projeto.
RUN npm install

# Copia o restante dos arquivos do frontend.
COPY . .

# Gera os arquivos estáticos de produção (HTML, CSS, JS minificados).
RUN npm run build

# Estágio 2: Produção - Usamos uma imagem super leve do Nginx para servir os arquivos.
FROM nginx:1.23-alpine

# Remove a configuração padrão do Nginx.
RUN rm /etc/nginx/conf.d/default.conf

# Copia nossa configuração personalizada do Nginx para o local correto.
COPY nginx.conf /etc/nginx/conf.d/

# Copia os arquivos estáticos gerados no estágio de build para a pasta que o Nginx serve.
COPY --from=build /app/dist /usr/share/nginx/html

# Expõe a porta 80, que é a porta padrão do Nginx.
EXPOSE 80

# Comando para iniciar o Nginx em modo "foreground" (necessário para o Docker).
CMD ["nginx", "-g", "daemon off;"]