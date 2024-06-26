import pandas as pd
import pymongo 
import datetime 
client = pymongo.MongoClient("mongodb+srv://riteshmmaurya2004:12345@bank.aonwqsd.mongodb.net/?retryWrites=true&w=majority&appName=Bank")
database = client["Bank"]
db = database['user_info'] 
history = []
df = pd.read_csv("user.csv")
for item in range(0,10):
#     # db.insert_one({"_id": int(df["user_id"][item]), "password": int(df["user_id"][item]), "name": df["name"][item], "balance": float(df["balance"][item])})
    for i in range(0,5):
        dt = datetime.datetime.now().strftime("%d/%m/%Y  %H:%M:%S")
        history += [f"{dt} credited {i}000"]
    print(history)
    db.update_one({"_id": int(df["user_id"][item]), "password": int(df["user_id"][item]), "name": df["name"][item], "balance": float(df["balance"][item])}, {"$set": {"history": history}})
    history = []
    
# user = db.find_one({"_id": 1})
# temp = user["history"]
# for i in range(0,4):
#     temp[i] =  user["history"][i+1]
# print(temp)
# print(user["history"][0])