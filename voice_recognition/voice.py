import speech_recognition as sr
import nltk
from googletrans import Translator
import re

# Download NLTK data
# nltk.download('punkt')

def determine_action(text):
    # words = nltk.word_tokenize(text.lower())
    words = text.lower()
    
    debit_keywords = ["debit", "withdraw", "withdrawal", "take out", "remove", "spend", "reduce", "pay", "charge", "deduct", "transfer out", "cash out","want to send","make a transaction to pay"]
    credit_keywords = ["credit", "deposit", "add", "increase", "top up", "fund", "receive", "put in", "load", "pay in", "transfer in","want to receive","make a transaction to receive","submit"]
    balance_keywords = ["balance", "current balance", "check balance", "account balance", "how much do I have", "remaining balance", "available balance", "amount left", "what's in my account", "funds available", "money left","check my balance","balance inquiry","account status"]
    history_keywords = ["transaction", "transactions", "transaction history", "history", "past transactions", "account activity", "recent activity", "statement", "account statement", "recent transactions", "account history", "activity log","view transactions",
    "transaction details"]

    if any(word in words for word in credit_keywords):
        return "credit"
    elif any(word in words for word in debit_keywords):
        return "debit"
    elif any(word in words for word in balance_keywords):
        return "check balance"
    elif any(word in words for word in history_keywords):
        return "transaction history"
    else:
        return "unknow action"
    

def translate_to_english(text, src_lang):
    translator = Translator()
    translation = translator.translate(text, src=src_lang, dest='en')
    return translation.text

def get_user_input(prompt):
    recognizer = sr.Recognizer()
    microphone = sr.Microphone()
    
    print(prompt)
    
    with microphone as source:
        recognizer.adjust_for_ambient_noise(source)
        audio = recognizer.listen(source)

    try:
        text = recognizer.recognize_google(audio)
        print(f"You said: {text}")
        return text
    except sr.UnknownValueError:
        print("Sorry, I could not understand the audio.")
        return None
    except sr.RequestError as e:
        print(f"Could not request results; {e}")
        return None

def extract_amount(text):
    # Regular expression pattern to find amounts in the text
    amount_pattern = r'\b(?:[\d,]+(?:\.\d+)?)\b'  # Matches numbers with optional decimal and commas
    amount_pattern_is_pound = r'\b([\d,]+(?:\.\d+)?)\s*(?:pounds?)\b' #r'\b([\d,]+(?:\.\d+)?)\s*pound?\b' 
    amount_pattern_is_pound_symbol = r'\£([\d,]+(?:\.\d+)?)\b'
    
    # Find all amounts in the text
    amounts_found = re.findall(amount_pattern_is_pound_symbol, text)
    
    if amounts_found:
        # Convert any found amounts from strings to float numbers
        amount = [float(amount.replace(',', '')) for amount in amounts_found]
        
        # Return the list of amounts found
        return max(amount)
    else:
        amounts_found = re.findall(amount_pattern_is_pound, text)
        if amounts_found:
            amount = [float(amount.replace(',', '')) for amount in amounts_found]
            return max(amount)
        else:
            amounts_found = re.findall(amount_pattern, text)
            if amounts_found:
                amount = [float(amount.replace(',', '')) for amount in amounts_found]
                return max(amount)
            else:
                return 0

def main():
    recognizer = sr.Recognizer()
    microphone = sr.Microphone()
    print("Please speak into the microphone...")
    with microphone as source:
        recognizer.adjust_for_ambient_noise(source)
        audio = recognizer.listen(source)
    try:
        # Recognize speech using Google
        text = recognizer.recognize_google(audio)
        print(f"You said: {text}")
        
        # Detect language and translate to English
        translator = Translator()
        detected_lang = translator.detect(text).lang
        translated_text = translate_to_english(text, detected_lang)
        print(f"Translated to English: {translated_text}")
        # Determine the action
        amount = extract_amount(translated_text)
        action = determine_action(translated_text)
        # print(f"Action: {action} Money: £{amount}")
        
        if action == "debit":
            if amount !=0:
                print(f"Debit £{amount}?")
        elif action == "credit":
            if amount !=0:
                print(f"Credit £{amount}?")
        elif action == "check balance":
            print("Check Balance?")
        elif action == "transaction history":
            print("Transaction History?")
        elif action == "unknow action":
            print("unknow action, Pls try again") 
        
    except sr.UnknownValueError:
        print("Sorry, I could not understand. Please try again.")
    except sr.RequestError as e:
        print(f"Could not request results; {e}")
    except Exception as e:
        print(f"An error occurred: {e}. Please try again.")

if __name__ == "__main__":
    main()
    # while True:
    #     txt = input("enter text: ")
    #     print(f'amount is : {extract_amount(txt)}')