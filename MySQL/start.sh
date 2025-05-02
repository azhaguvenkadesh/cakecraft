#!/bin/bash

# Initialize the database if it hasn't been initialized
if [ ! -d "/var/lib/mysql/mysql" ]; then
    echo "Initializing database..."
    mysqld --initialize-insecure --user=mysql
fi

# Start MySQL in the background
echo "Starting MySQL..."
mysqld &

# Wait until MySQL is ready
echo "Waiting for MySQL to be ready..."
until mysqladmin ping -h "localhost" --silent; do
    sleep 2
done

# Create user and grant privileges
echo "Creating user and granting privileges..."
mysql -uroot <<-EOSQL
    CREATE DATABASE IF NOT EXISTS ${MYSQL_DATABASE};
    CREATE USER IF NOT EXISTS '${MYSQL_USER}'@'%' IDENTIFIED BY '${MYSQL_PASSWORD}';
    GRANT ALL PRIVILEGES ON ${MYSQL_DATABASE}.* TO '${MYSQL_USER}'@'%';
    FLUSH PRIVILEGES;
EOSQL

# Keep MySQL in the foreground
wait %1
