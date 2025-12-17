# game_logic.py
import random
import tkinter
from config import COLOURS, INITIAL_TIME

# global state
score = 0
timeleft = INITIAL_TIME

def startGame(event, countdown, nextColour):
    global timeleft
    if timeleft == INITIAL_TIME:
        countdown()
    nextColour()

def nextColour(e, label, scoreLabel):
    global score, timeleft

    if timeleft > 0:
        e.focus_set()

        # check if typed text matches the colour of the word
        if e.get().lower() == label.cget("fg").lower():
            score += 1

        e.delete(0, tkinter.END)

        random.shuffle(COLOURS)
        word, color = COLOURS[0], COLOURS[1]

        label.config(fg=color, text=word)
        scoreLabel.config(text="Score: " + str(score))

def countdown(timeLabel, root):
    global timeleft

    if timeleft > 0:
        timeleft -= 1
        timeLabel.config(text="Time left: " + str(timeleft))
        timeLabel.after(1000, lambda: countdown(timeLabel, root))
    else:
        # Game Over message
        timeLabel.config(text="Game Over!")
