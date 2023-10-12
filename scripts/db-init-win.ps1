# Check if the Docker daemon is running.
if (Get-Service "Docker" -Status -ErrorAction SilentlyContinue) {
  # The Docker daemon is running.
  npm run start-db
} else {
  # The Docker daemon is not running.
  Start-Service "Docker" -Wait

  # Wait for the Docker daemon to start.
  while (!(Get-Service "Docker" -Status -ErrorAction SilentlyContinue)) {
    Start-Sleep -Seconds 1
  }

  # The Docker daemon has started successfully.
  Write-Host "Docker daemon started successfully!"

  # Start the database.
  npm run start-db
}
