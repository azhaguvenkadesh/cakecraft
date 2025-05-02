# Use a base image with Java already installed
FROM openjdk:latest

# Set the working directory inside the container
WORKDIR /app
 
# Set environment variables
ENV DB_URL=jdbc:mysql://crossover.proxy.rlwy.net:12392/railway?createDatabaseIfNotExist=true
ENV DB_USERNAME=root
ENV DB_PASSWORD=oNdXqpatVqAhnMrHmzMIvEKMrmtdPXuI

# Copy the Spring Boot JAR file into the container
COPY target/springapp-0.0.1-SNAPSHOT.jar /app/app.jar

# Create a startup script
COPY start.sh /app/start.sh

# Make the script executable
RUN chmod +x /app/start.sh

# Expose the port your Spring Boot application is running on
EXPOSE 8080

# Define the command to run when the container starts
CMD ["/app/start.sh"]
