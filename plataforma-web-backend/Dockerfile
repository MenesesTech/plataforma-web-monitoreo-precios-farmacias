# Etapa 1: Compilacion
FROM eclipse-temurin:21-jdk-alpine AS builder

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración primero (para optimizar cache)
COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn

# Descargar dependencias
RUN ./mvnw dependency:go-offline -B

# Copiar código fuente
COPY src ./src

# Creamos un paquete con Maven despues de compilar
RUN ./mvnw clean package -DskipTests -B

# Etapa 2: Imagen final mas liviana
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Copiar JAR desde la etapa builder
COPY --from=builder /app/target/*.jar app.jar

# Exponer el puerto
EXPOSE 8080

# Variables de entorno para optimizar JVM en contenedores
ENV JAVA_OPTS="-XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0"

# Ejecutar aplicacion
ENTRYPOINT ["java", "-jar", "app.jar"]