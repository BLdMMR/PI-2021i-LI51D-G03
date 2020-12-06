# COVIDA API docs

## Get Most Popular Games
```http
GET /popular/
``` 
- Request:
    - Body: None
- Response:
    - Success:
         - Body example:  
      ```json
            [
                  {
                        "id": 1020,
                        "follows": 1699,
                        "name": "Grand Theft Auto V",
                        "total_rating": 93.4360887472586,
                  },
                  {
                        "id": 1942,
                        "follows": 1469,
                        "name": "The Witcher 3: Wild Hunt",
                        "total_rating": 93.6699433421581
                  }
            ]
      ```
---

## Get Game By Name
```http
GET /search/{id}
``` 
- Request:
    - Body: None
- Response:
   - Success:
      - Body example:  
      ```json
            {
                  "id": 1020,
                  "follows": 1699,
                  "name": "Grand Theft Auto V",
                  "Rating": 93.4360887472586,
                  
            }
      ```
---

## Get All Groups
```http
GET /api/groups
``` 
- Request:
    - Body: None
- Response:
   - Success:
      - Body example:  
      ```json
            [
                  {
                        "name": "Best Strategy Games",
                        "description": "strategy",
                        "number_of_games": 10
                  },
                  {
                        "name": "Best Shooters",
                        "description": "FPS",
                        "number_of_games": 4
                  }
            ]
      ```
---

## Get Group Information
```http
GET /api/groups/{group_id}
``` 
- Request:
    - Body: None
- Response:
   - Success:
      - Body example:  
      ```json
            {
                  "id": 1,
                  "name": "Best GTA",
                  "description": "A group of GTA Games",
                  "games": [
                        {
                              "id": 1020,
                              "name": "Grand Theft Auto V",
                              "follows": 1699,
                              "total_rating": 93.436101
                        },
                        {
                              "id": 732,
                              "name": "Grand Theft Auto: San Andreas",
                              "follows": 955,
                              "total_rating": 91.757998
                        }
                  ]
}
            }
      ```
---

## Get Games From Group Based On Rating
```http
GET /api/groups/{group_id}/games?min={min}&max={max}
``` 
- Request:
    - Body: None
- Response:
   - Success:
      - Body example:  
      ```json
            [
                  {
                        "id": 1020,
                        "name": "Grand Theft Auto V",
                        "follows": 1699,
                        "total_rating": 93.436101
                  },
                  {
                        "id": 732,
                        "name": "Grand Theft Auto: San Andreas",
                        "follows": 955,
                        "total_rating": 91.757998
                  }
            ]
      ```
---
## Create Group
```http
POST /api/groups/
``` 
- Request:
    - Body: 
    ```json
            {
                  "name": "Best Strategy Games",
                  "description": "strategy"    
            }
    ```
- Response:
   - Success:
      - Body example:  
      ```json
            [
                  {
                       "id": 2,
                       "name": "Best Strategy Games",
                       "description": "strategy",
                       "games": []
                  }
            ]
      ```
---
## Update Group
```http
PUT /api/groups/{group_id}
``` 
- Request:
    - Body: 
    ```json
            {
                  "name": "Best RPG Games",
                  "description": "RPG"    
            }
    ```
- Response:
   - Success:
      - Body example:  
      ```json
            [
                  {
                       "id": 2,
                       "name": "Best RPG Games",
                       "description": "RPG",
                       "games": []
                  }
            ]
      ```
---
## Add Game To Group
```http
PUT /api/groups/{group_id}/games
``` 
- Request:
    - Body: 
    ```json
            {
                  
                  "id": 120,
                  "name": "Diablo III",
                  "follows": 234,
                  "total_rating": 80.83178846321935
                  
            }
    ```
- Response:
   - Success:
      - Body example:  
      ```json
             {
                  "id": 2,
                  "name": "Best RPG Games",
                  "description": "RPG",
                  "games": [
                        {
                              "id": 120,
                              "name": "Diablo III",
                              "follows": 234,
                              "total_rating": 80.3178846321935             
                        },
                        {
                              "id": 114,
                              "follows": 71,
                              "name": "Star Wars: The Old Republic",
                              "total_rating": 79.8344332334963
                        }    
                  ]
             }
      ```
---
## Remove Game From Group
```http
DELETE /api/groups/{group_id}/games/{game_id}
``` 
- Request:
    - Body: none
- Response:
   - Success:
      - Body example:  
      ```json
            [
                  {
                        "id": 114,
                        "follows": 71,
                        "name": "Star Wars: The Old Republic",
                        "total_rating": 79.8344332334963
                  }                      
            ]
      ```
---