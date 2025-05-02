# Use the official MySQL image as a base
FROM mysql:latest

# Set working directory
WORKDIR /app

# Copy the startup script into the container
COPY start.sh /app/start.sh

# Make the script executable
RUN chmod +x /app/start.sh

# Set environment variables
ENV MYSQL_ROOT_PASSWORD=RootPass123
ENV MYSQL_USER=myadmin
ENV MYSQL_PASSWORD=AdminPass123
ENV MYSQL_DATABASE=appdb

# Expose MySQL port
EXPOSE 3306

# Use the single script to run MySQL and do init
CMD ["/app/start.sh"]
