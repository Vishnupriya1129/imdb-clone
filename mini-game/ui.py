# ui.py
import tkinter
from config import INITIAL_TIME

def setup_ui(root, startGame, nextColour, countdown):
    root.title("COLORGAME")
    root.geometry("375x200")

    instructions = tkinter.Label(
        root,
        text="Type in the colour of the words, and not the word text!",
        font=('Helvetica', 12)
    )
    instructions.pack()

    scoreLabel = tkinter.Label(root, text="Press enter to start", font=('Helvetica', 12))
    scoreLabel.pack()

    timeLabel = tkinter.Label(root, text="Time left: " + str(INITIAL_TIME), font=('Helvetica', 12))
    timeLabel.pack()

    label = tkinter.Label(root, font=('Helvetica', 60))
    label.pack()

    e = tkinter.Entry(root)
    e.pack()
    e.focus_set()

    # bind Enter key
    root.bind('<Return>', lambda event: startGame(event, lambda: countdown(timeLabel, root),
                                                  lambda: nextColour(e, label, scoreLabel)))

    return e, label, scoreLabel, timeLabel
