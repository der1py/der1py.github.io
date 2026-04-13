import '../menus/MainMenu.js';
import '../menus/QuizMenu.js';
import '../menus/SettingsMenu.js';

import { Game } from './Game.js';

const game = new Game();

document.getElementById("playBtn").addEventListener("click", () => {
    game.setConfig('tutorial', false);
    game.reset();
});

document.getElementById("tutorialBtn").addEventListener("click", () => {
    game.setConfig('tutorial', true);
    game.reset();
});

document.getElementById("menuButton").addEventListener("click", () => {
    game.pause();
});

document.getElementById("quiz-menu-home-btn").addEventListener("click", () => {
    game.state = "MENU";
});

document.getElementById("quizMenuBtn").addEventListener("click", () => {
    game.state = "QUIZ_MENU";
});

document.getElementById("settings-menu-home-btn").addEventListener("click", () => {
    game.state = "MENU";
});

document.getElementById("settingsMenuBtn").addEventListener("click", () => {
    game.state = "SETTINGS";
});

// quiz selector shit
let selectedQuiz = null;

const buttons = document.querySelectorAll(".select-btn");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const quizId = btn.dataset.quiz;
    selectedQuiz = quizId;

    console.log("Selected quiz:", selectedQuiz);
    game.setConfig('quiz', parseInt(quizId));

    // reset all
    buttons.forEach(b => {
      b.classList.remove("disabled");
      b.disabled = false; // actually prevents clicking
    });

    // set selected one as disabled
    btn.classList.add("disabled");
    btn.disabled = true;
  });
});

// settings menu button logic
const settingButtons = document.querySelectorAll(".btn-setting");

settingButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    
    // find this button's group
    const group = btn.closest(".btn-group");
    const buttons = group.querySelectorAll(".btn-setting");

    // remove active only within this group
    buttons.forEach(b => b.classList.remove("active"));

    // set active on clicked
    btn.classList.add("active");

    // log whichever data attribute exists
    if (btn.dataset.mode) {
      console.log(btn.dataset.mode); // easy / normal / hard / focus
      if (btn.dataset.mode == "easy") {
        game.setConfig('difficulty', 0);
      } else if (btn.dataset.mode == "normal") {
        game.setConfig('difficulty', 1);
      } else if (btn.dataset.mode == "hard") {
        game.setConfig('difficulty', 2);
      } else if (btn.dataset.mode == "focus") {
        game.setConfig('difficulty', -1);
      }
    }

    if (btn.dataset.behavior) {
      console.log(btn.dataset.behavior); // respawn / restart
      if (btn.dataset.behavior == "respawn") {
        game.setConfig('respawn', true);
      } else if (btn.dataset.behavior == "restart") {
        game.setConfig('respawn', false);
      }
    }

  });
});