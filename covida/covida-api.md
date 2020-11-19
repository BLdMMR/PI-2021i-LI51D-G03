# COVIDA API docs

## Get Most Popular Games
```http
GET /api/
``` 
- Request:
    - Body: None
- Response:
   - Success:
      - Body example:  
      ```json
            [
                  {
                        "name": "ABC",
                        "Rating": "8/10",
                        "category": "Puzzle"
                  },
                  {
                        "name": "DEF",
                        "Rating": "9.2/10",
                        "category": "Terror"
                  }
            ]
      ```
---

## Get Game By Name
```http
GET /api/{id}
``` 
- Request:
    - Body: None
- Response:
   - Success:
      - Body example:  
      ```json
            {
                  "name": "ABC",
                  "Rating": "8/10",
                  "category": "Puzzle"
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
                        "group_name": "Best Strategy Games",
                        "group_id": 1,
                        "group_genre": "strategy",
                        "num_of_games": 10
                  },
                  {
                        "group_name": "Best Shooters",
                        "group_id": 2,
                        "group_genre": "FPS",
                        "num_of_games": 4
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
                  "group_name": "Best Strategy Games",
                  "group_id": 1,
                  "group_genre": "strategy",
                  "num_of_games": 10,
                  "avg_rating": "7.9/10"
            }
      ```
---

