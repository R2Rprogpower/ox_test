## Test OX App
start docker 

docker-compose up -d  
 
docker-compose exec app bash



migrate and seed the db

get access token
POST /
http://localhost:8080/api/tokens/create?token_name=api&email=test@example.com

Read current user Users
GET http://localhost:8080/api/user
Auth Type: Bearer token 
(it is the access token generated from the first request.)

Get All Users

GET http://localhost:8080/api/users
Auth Type: Bearer token 
(it is the access token generated from the first request.)


