from boggle import Boggle
from flask import Flask, session, render_template, request
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config['SECRET_KEY'] = 'GOOD_PASSWORD'
debug = DebugToolbarExtension(app)

boggle_game = Boggle()

@app.route('/')
def show_board():
    game = boggle_game.make_board()
    session['board'] = game
    return render_template('board.html', game = game)

@app.route('/guess')
def try_guess():
    guess = request.args['guess']
    print(request.args)
    return render_template('board.html', game = session['board'])