from flask import Flask, render_template
import requests
import keys

app = Flask(__name__)

# Enable debug mode
app.debug = True

@app.route("/")
def index():
    return render_template("landingpage.html")


@app.route("/tweet")
def tweetBorrowing():
	return render_template("tweetborrowing.html")


@app.route("/api/trends", methods=["GET"])
def getTrends():
    params = {
    "api_key": keys.TRENDING_KEY,
    "woeid": "23424977"
    }
    req = requests.get("http://api.whatthetrend.com/api/v2/trends.json", params=params)
    return req.text

@app.route("/api/tweets", methods=["GET", "POST"])
def twitterOps():
    pass

@app.route("/api/words", methods=["GET"])
def getWords():
    pass



if __name__ == "__main__":
	app.run()
