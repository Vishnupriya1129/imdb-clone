# main.py
import tkinter
from ui import setup_ui
from game_logic import startGame, nextColour, countdown

def main():
    root = tkinter.Tk()
    e, label, scoreLabel, timeLabel = setup_ui(root, startGame, nextColour, countdown)
    root.mainloop()

if __name__ == "__main__":
    main()
