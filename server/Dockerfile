FROM gradle:8.6.0-jdk17 AS build
# Set the working directory to '/app'
WORKDIR /app

# Copy the gradlew and gradle folder to the docker image
COPY server/gradlew* .
COPY server/gradle ./gradle
# Grant execute permission for 'gradlew'
RUN chmod +x ./gradlew

# Copy build file and source code
COPY server/build.gradle .
COPY server/src ./src

# Build the application
RUN gradle build

# Use adoptopenjdk for base image
FROM openjdk:17-jdk-slim
ARG VERTEX_AI_SERVICE_KEY_FILENAME
EXPOSE 9090

# Copy build application to 'app' folder in image
COPY --from=build /app/build/libs/*.jar /app/app.jar
COPY .env .

# Check if the service key file exists and copy it if it does
RUN if [ -n "$VERTEX_AI_SERVICE_KEY_FILENAME" ] && [ -f "$VERTEX_AI_SERVICE_KEY_FILENAME" ]; then \
    cp $VERTEX_AI_SERVICE_KEY_FILENAME .; \
    fi

# Run the application
CMD ["java", "-jar", "/app/app.jar"]

