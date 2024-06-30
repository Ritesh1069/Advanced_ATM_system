import speech_recognition as sr
import nltk
from googletrans import Translator

import spacy

# Load the English language model in spaCy
nlp = spacy.load('en_core_web_sm')

# Download NLTK data
# nltk.download('punkt')

def determine_action(text):
    # words = nltk.word_tokenize(text.lower())
    words = text.lower()
    
    debit_keywords = ["debit", "withdraw", "withdrawal", "take out", "remove", "spend", "reduce", "pay", "charge", "deduct", "transfer out", "cash out","want to send","make a transaction to pay"]
    credit_keywords = ["credit", "deposit", "add", "increase", "top up", "fund", "receive", "put in", "load", "pay in", "transfer in","want to receive","make a transaction to receive"]
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

def main():
    recognizer = sr.Recognizer()
    microphone = sr.Microphone()

    while True:
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
            action = determine_action(translated_text)
            if action != "unknown":
                print(f"Action: {action}")

                # Ask for confirmation
                confirmation_text = get_user_input("Do you want to proceed with this action? Please say 'yes' to confirm or 'no' to cancel.")
                if confirmation_text:
                    confirmation_text_translated = translate_to_english(confirmation_text, detected_lang)
                    if 'yes' in confirmation_text_translated.lower():
                        print(f"Confirmed. Proceeding to {action}.")
                        break
                    elif 'no' in confirmation_text_translated.lower():
                        print("Action canceled. Please provide a new action.")
                    else:
                        print("Could not understand confirmation. Please try again.")
                else:
                    print("No confirmation received. Please try again.")
            else:
                print("Could not determine the action. Please try again.")

        except sr.UnknownValueError:
            print("Sorry, I could not understand the audio. Please try again.")
        except sr.RequestError as e:
            print(f"Could not request results; {e}")
        except Exception as e:
            print(f"An error occurred: {e}. Please try again.")

if __name__ == "__main__":
    main()
