from flask import Flask, request
import africastalking


app = Flask(__name__)

africastalking.initialize(username = "YOUR_USERNAME_GOES_HERE", api_key = "YOUR_API_KEY_GOES_HERE")
sms = africastalking.SMS

@app.route("/", methods=["GET", "POST"])
def handle_payment_notification():

    status = request.values.get("status")
    amount = request.values.get("value")
    product = request.values.get("clientAccount")
    time = request.values.get("transactionDate")
    phone_number = request.values.get("source")

    if status is "success":
        message_success = "Your payment of " + amount + "was sent to " + product + "at " + time + ". Thank you"
        try:
            sms.send(message_success, phone_number)
        except Exception as e:
            print(f"Houston we have a problem: {e}")
    else:
        message_failure = "Your payment of " + amount + "was not sent to " + product + ". Please try again"
        try:
            sms.send(message_failure, phone_number)
        except Exception as e:
            print(f"Houston we have a problem: {e}")
