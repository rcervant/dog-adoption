#!/bin/bash

# Check if the Docker daemon is running.
if docker info > /dev/null 2>&1; then
  # The Docker daemon is running.
  npm run start-db
else
  # The Docker daemon is not running.
  echo "Starting Docker daemon in the background..."
  open --background -a Docker &

  # Wait for the Docker daemon to start.
  while ! docker info > /dev/null 2>&1; do
    sleep 1
  done

  # The Docker daemon has started successfully.
  echo "Docker daemon started successfully!"

  # Start the database.
  npm run start-db
fi