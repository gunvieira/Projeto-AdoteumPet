# Estágio 1: Build - Usamos uma imagem base que já tem o JDK e Maven.
# Usar uma imagem específica do JDK é uma boa prática para evitar surpresas.
FROM maven:3.8.5-openjdk-17 AS build

# Define o diretório de trabalho dentro do contêiner.
WORKDIR /app

# Copia primeiro o pom.xml para aproveitar o cache de camadas do Docker.
# Se o pom.xml não mudar, o Docker reutiliza as dependências já baixadas.
COPY pom.xml .

# Baixa todas as dependências do projeto.
RUN mvn dependency:go-offline

# Copia o restante do código fonte da aplicação.
COPY src ./src

# Executa o build para gerar o .jar.
RUN mvn package -DskipTests

# Estágio 2: Produção - Usamos uma imagem muito menor, apenas com o Java Runtime.
# Isso reduz drasticamente o tamanho da imagem final e a superfície de ataque.
FROM openjdk:17-jdk-slim

# Define um argumento para o nome do JAR, que pode ser passado durante o build.
ARG JAR_FILE=target/*.jar

# Define o diretório de trabalho.
WORKDIR /app

# Copia apenas o .jar gerado no estágio anterior para a imagem final.
COPY --from=build /app/${JAR_FILE} app.jar

# Expõe a porta que a aplicação Spring Boot usa por padrão.
EXPOSE 8080

# Comando para iniciar a aplicação quando o contêiner for executado.
ENTRYPOINT ["java", "-jar", "app.jar"]