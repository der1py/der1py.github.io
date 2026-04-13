project/
│
├── index.html
├── style.css
├── sprites/
│   ├── various game sprites
├── audio/
│   ├── various audio files
│
├── src/
│   ├── script.js
│   ├── game.js    # main game class which orchestrates updates, drawing, game state
│   ├── inputHandler.js    # handle all user input
│   ├── entity.js    # parent for all entites
│   ├── corridorEvent.js   # handles special logic for quiz
│   ├── obstacle.js    # extends entity, parent for each individual obstacle block
│   ├── obstacleManager.js    # manages spawning of obstacles
│   ├── structures.js    # stores all game structures made up of obstacles
│   ├── player.js     # extends entity, the player
│   ├── quizManager.js     # tbd 
│   └── renderer.js     # responsible for all drawing
│
└── README.md   ← (this file)