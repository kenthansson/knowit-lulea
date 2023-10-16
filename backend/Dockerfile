# Use the official OpenJDK base image
FROM openjdk:11-jre-slim

# Set the working directory in the docker container
WORKDIR /app

# Copy the JAR file (after you've built your project) into the image
COPY target/spring-boot-app-1.0.0.jar spring-boot-app.jar

# Set the command to run your Spring Boot app
CMD ["java", "-jar", "spring-boot-app.jar"]
