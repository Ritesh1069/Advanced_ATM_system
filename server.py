from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from backend import bank, face

app = Flask(__name__)
CORS(app)

#global variables
account_no = False
account_pin = False
user_db = False

def show_info():
    return account_no, account_pin, user_db

@app.route('/account_login', methods=["GET", "POST"])
def login():
    global account_no, account_pin, user_db
    
    try:
        temp_account_no = request.form['account_no']
        temp_account_pin = request.form['account_pin']
        account_no, account_pin, user_db = bank.login(int(temp_account_no), int(temp_account_pin))
        return {'message': 'Login Successful'}
    
    except Exception as e:
        # logout()
        account_no = False
        account_pin = False
        user_db = False
        return {'message': 'Login Unsuccessful'}

@app.route('/logout', methods=["GET", "POST"])
def logout():
    global account_no, account_pin, user_db
    account_no = False
    account_pin = False
    user_db = False
    return {'message': 'Logged out'} 

@app.route('/get_info', methods=["GET", "POST"])
def info():
    global account_no, account_pin, user_db
    if account_no and account_pin and user_db:
        return {'user_db' : user_db, 'message' : "Success"}
    else:
        return {'user_db' : None, 'message' : "Unsuccess"}

@app.route('/face_auth', methods=["GET", "POST"])
def auth_face():
    global account_no, account_pin, user_db
    status = face.check_face(user_db['face_embedding'])
    return {'message': status}

if __name__ == '__main__':
    app.run(debug=True, port=8080)
