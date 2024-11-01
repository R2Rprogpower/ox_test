## Test OX App
start docker 
run in the project's root
docker-compose up -d  
 
docker-compose exec app bash
->
php artisan migrage --seed
migrate and seed the db

go to 
http://localhost:3000/auth/register abd register
go to
http://localhost:3000/auth/login and login

Enjoy CRM functions.


 
