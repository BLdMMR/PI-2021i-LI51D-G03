# Repositório Trabalho Grupo 3
### Docente:
Luís Falcão 
### Membros:
 44784 - Bernardo Rodrigues


 44832 - Hugo Martins
 
 
 24538 - Marta Fernandes

## Instruções para correr aplicação
 - Correr elasticsearch
    - Abrir directoria de instalação do _elasticsearch_
    - Abrir pasta `bin` e correr o comando `./elasticsearch.bat`/`elasticsearch` (em macOS)
 - Na directoria `./covida` correr o comando `node ./covida-server`
    - No caso de querer carregar dados de teste, deverá correr o programa com a opção `mock` (e.g. `node ./covida-server.js mock`)
       - Esta opção irá criar o perfil `admin@admin.adm` cuja _password_ é `admin`. Este perfil terá dois grupos de jogos criados.
 - Abrir o browser e aceder ao recurso `http://localhost:8080` irá redirecciona-lo para a página de _login_ onde serão postas as credênciais do perfil acima indicado. 