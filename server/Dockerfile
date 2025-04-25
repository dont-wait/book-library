FROM maven:3.9.9-eclipse-temurin-17-alpine AS BUILD
WORKDIR /app
COPY . .
RUN mvn clean package

FROM openjdk:17-jdk-alphine
