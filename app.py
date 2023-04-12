from boggle import Boggle
from flask import Flask, session, render_template, request, flash, jsonify
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config['SECRET_KEY'] = 'GOOD_PASSWORD'
debug = DebugToolbarExtension(app)

boggle_game = Boggle()

@app.route('/')
def show_board():
    """generates a new game board, displays current hi-score"""
    game = boggle_game.make_board()
    session['board'] = game
    return render_template('board.html', game = session['board'], high_score = session['high_score'])

@app.route('/guess')
def try_guess():
    """returns a valid or invalid response based on input, increments score if valid"""
    guess = request.args['guess']
    response = boggle_game.check_valid_word(session['board'], guess)
    return jsonify({'result': response})

@app.route('/score', methods=['POST'])
def save_score():
    """at game end, if score is highest, saves hi-score"""
    score_data = request.get_json()
    score = score_data['totalScore']
    if score > session['high_score']:
        session['high_score'] = score
    return str(session['high_score'])
    
@app.route('/reset', methods=['POST'])
def reset_score():
    """resets the hi-score"""
    score_data = request.get_json()
    score = score_data['totalScore']
    session['high_score'] = score
    return str(session['high_score'])