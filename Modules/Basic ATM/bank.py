import pandas as pd
import pymongo 
from datetime import datetime
client = pymongo.MongoClient("mongodb+srv://riteshmmaurya2004:12345@bank.aonwqsd.mongodb.net/?retryWrites=true&w=majority&appName=Bank")
database = client["Bank"]
db = database['user_info']

#global variables
uid = False
pin = False
user_db = False

def login(user_id, user_pin):
    global uid, pin, user_db
    
    user_db = db.find_one({"_id": user_id, "password": user_pin})
    if user_db:
        uid = user_id
        pin = user_pin
        print("Succesfully Logged In")
        return user_id, user_pin, user_db
    else:
        uid = False
        pin = False
        user_db = False
        print("Invalid Account Number or PIN")
        
def credit(amount):
    new_balance = user_db["balance"]+amount
    db.update_one(user_db, {"$set": {"balance": new_balance}})
    print(f"Successfully Credited {amount} into your account")
    add_to_hist(f"credited {amount}")
    
def debit(amount): 
    if user_db["balance"] < amount:
        print("Insufficient Balance")
    else:
        new_balance = user_db["balance"] - amount
        db.update_one(user_db, {"$set": {"balance": new_balance}})
        print(f"Successfully Debited {amount} from your account")
        add_to_hist(f"debited {amount}")
        
def check_bal():
    print(f"current balance is {user_db['balance']} ")

def check_hist():
    print("History: ")
    for i in user_db["history"]:
        print(i)
    
def add_to_hist(info):
    temp = user_db["history"]
    for i in range(0,4):
        temp[i] = user_db["history"][i+1]
    dt = datetime.now().strftime("%d/%m/%Y  %H:%M:%S")
    temp[4] = dt + " "+info
    # db.update_one(user_db, {"$set": {"history": temp}}) # not working dk why
    filter = {"_id": user_db["_id"]}
    update = {"$set": {"history": temp}}
    db.update_one(filter, update)
    print("History Updated")
    
def account_info():
    return uid, pin, user_db


if __name__ == "__main__":
    
    uid = int(input("Enter Account Number: "))
    pin =  int(input("Enter PIN: "))
    user_db = login(uid, pin)
    # print(user_db["_id"])
    # amount = float(input("amount: "))
    # credit(amount)
    # debit(amount)
    # check_bal()
    # add_to_hist("credited 7000")
    check_hist()


