expect -c 'spawn npx prisma migrate dev; 
expect "Do you want to continue? All data will be lost." { send "yes\r"; exp_continue } 
expect "Enter a name for the new migration:" { send "init\r"; interact }'
