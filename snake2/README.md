
# Snake2

Snake2 puts a unique spin on the classic Snake game by pitting two players against each other in a fast-paced, competitive duel. Each player controls their own snake, racing to collect food while trying to outmaneuver their opponent.


## Features

- Exciting fast-paced gameplay 🎮
- Customizable settings ⚙️
- Fun new gamemode where the snakes have guns 🔫
- Two players - 2x the fun! 2️⃣ 
- Challenging computer-controlled opponent 🤖


## Controls

**Player 1 Movement:** WASD  
**Player 2 Movement:** Arrow Keys  

**Player 1 Shoot:** C  
**Player 2 Shoot:** Comma (,)


## Demo

https://der1py.github.io/snake2/


## Lessons Learned

👾 **Object-Oriented Programming:**  
I created classes for key game entities like the snake and bullets. This helped organize the code and made it easier to manage interactions between objects.

🧬 **Opportunities for Inheritance:**  
Next time, I can create a base `Entity` class and have other classes like `Snake` and `Bullet` inherit from it, since many functions and properties were repeated across objects.

🖼️ **First Time Using HTML Canvas:**  
I learned how to create a game using the HTML5 `<canvas>` element. This was my first experience with canvas, and I practiced drawing, animating, and updating game objects.

🔁 **Code Reusability:**  
I often found myself rewriting similar code blocks. In future projects, I’ll use more functions and methods to handle repeated logic and improve maintainability.

🧠 **Heuristic AI vs. DFS:**  
I learned that a heuristic scoring approach works better than depth-first search (DFS) in a game like this. DFS became too complex when evaluating threats like bullets and enemy direction, while simple scoring remained efficient and reliable.


## Credits

*zeth creations - M9 Beretta sound effects* (https://www.youtube.com/watch?v=jAwkr6y1Pjk)  
Sound for gunshot

*chess.com - capture piece SFX* (https://chess.com)  
Sound for eating apple

*Gaming Sound FX - Bonk - Sound Effect (HD)* (https://www.youtube.com/watch?v=ZXK427oXjn8)  
Sound for snake head collisions

*W3Schools Game Tutorial - Game Sound* (https://www.w3schools.com/graphics/game_sound.asp)  
Provided base code for playing sounds in game

AI (Claude and ChatGPT) was used for the majority of the CSS, as well as some ideating, debugging, and parts of the README.
