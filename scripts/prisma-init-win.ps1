Start-Process "npx" -ArgumentList "prisma migrate dev" -NoNewWindow -Wait
Start-Sleep -Seconds 2 # Wait for the process to start

# Simulate typing "yes" and pressing Enter
Add-Type -AssemblyName System.Windows.Forms
[System.Windows.Forms.SendKeys]::SendWait("yes{ENTER}")

Start-Sleep -Seconds 2 # Wait for the first interaction to complete

# Simulate typing "init" and pressing Enter
[System.Windows.Forms.SendKeys]::SendWait("init{ENTER}")
