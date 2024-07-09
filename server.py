from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from backend import bank, face, voice

app = Flask(__name__)
CORS(app)

#global variables
account_no = False
account_pin = False
user_db = False
face_status = False

# def show_info():
#     return account_no, account_pin, user_db, face_status

@app.route('/account_login', methods=["GET", "POST"])
def login():
    global account_no, account_pin, user_db, face_status
    
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
        face_status = False
        bank.logout()
        return {'message': 'Login Unsuccessful'}

@app.route('/logout', methods=["GET", "POST"])
def logout():
    global account_no, account_pin, user_db, face_status
    bank.logout()
    account_no = False
    account_pin = False
    user_db = False
    face_status = False
    return {'message': 'Logged out'} 

@app.route('/get_info', methods=["GET", "POST"])
def info():
    global account_no, account_pin, user_db, face_status 
    if account_no and account_pin and user_db:
        account_no, account_pin, user_db = bank.login(int(account_no), int(account_pin))
        return {'user_db' : user_db, 'message' : "Success", 'face_status': face_status}
    else:
        return {'user_db' : None, 'message' : "Unsuccess", 'face_status': face_status}

@app.route('/face_auth', methods=["GET", "POST"])
def auth_face():
    global account_no, account_pin, user_db, face_status
    if account_no and account_pin and user_db:
        account_no, account_pin, user_db = bank.login(int(account_no), int(account_pin))
        face_status = face.check_face(user_db['face_embedding'])
        return {'message': face_status}
    else:
        return {'message': face_status}

@app.route('/bank_info', methods=["GET", "POST"]) #this function shows the current values of the variables in the bank.py module
def bank_info():
    return jsonify(bank.account_info())

@app.route('/debit_money', methods=["GET", "POST"])
def debit_money():
    global account_no, account_pin, user_db, face_status
    try:
        amount = request.form['amount']
        if account_no and account_pin and user_db and face_status: 
            temp_status = bank.debit(float(amount))
            account_no, account_pin, user_db = bank.login(int(account_no), int(account_pin))
            return {'message': temp_status}
        else:
            return {'message' : "Some Unexpected Error occurred! Please Login Again"}
    except Exception as e:
        return {'message' : "Some Unexpected Error occurred! Please Login Again"}

@app.route('/credit_money', methods=["GET", "POST"])
def credit_money():
    global account_no, account_pin, user_db, face_status
    try:
        amount = request.form['amount']
        if account_no and account_pin and user_db and face_status: 
            temp_status = bank.credit(float(amount))
            account_no, account_pin, user_db = bank.login(int(account_no), int(account_pin))
            return {'message': temp_status}
        else:
            return {'message' : "Some Unexpected Error occurred! Please Login Again."}
    except Exception as e:
        return {'message' : "Some Unexpected Error occurred! Please Login Again"}
    
@app.route('/voice', methods=["GET", "POST"])
def voice_recognition():
    global account_no, account_pin, user_db, face_status
    if account_no and account_pin and user_db and face_status:
        account_no, account_pin, user_db = bank.login(int(account_no), int(account_pin))
        temp_status,temp_action,temp_amount=voice.main()
        return {'status':temp_status ,'action': temp_action,'amount': temp_amount}
    else:
        return {'status': "Unsuccess" ,'action': "Some Unexpected Error occurred! Please Login Again",'amount': False}
    
if __name__ == '__main__':
    app.run(debug=True, port=8080)
