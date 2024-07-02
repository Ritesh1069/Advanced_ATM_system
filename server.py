from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from backend import bank

app = Flask(__name__)
CORS(app)

#global variables
account_no = False
account_pin = False
user_db = False

@app.route('/account_login', methods=["GET", "POST"])
def login():
    global account_no, account_pin, user_db
    
    try:
        temp_account__no = request.form['account__no']
        temp_account_pin = request.form['account_pin']
        account_no, account_pin, user_db = bank.login(int(temp_account__no), int(temp_account_pin))
        return {'message': 'Login Successful'}
    
    except Exception as e:
        account_no = False
        account_pin = False
        user_db = False
        return {'message': 'Login Unsuccessful'}
    
def show_info():
    return account_no, account_pin, user_db

if __name__ == '__main__':
    app.run(debug=True, port=8080)
    
    