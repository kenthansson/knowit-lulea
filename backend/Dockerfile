# Stage 1: Build the application
FROM maven:3.8.1-jdk-11 as build

# Set the working directory
WORKDIR /app

# Copy the pom.xml and source code
COPY pom.xml .
COPY src ./src

# Build the application
RUN mvn clean install

# Stage 2: Run the application
FROM openjdk:11-jre-slim

# Set the working directory
WORKDIR /app

# Copy the JAR from the build stage
COPY --from=build /app/target/spring-boot-app-1.0.0.jar spring-boot-app.jar

# Set the command to run your Spring Boot app
CMD ["java", "-jar", "spring-boot-app.jar"]
