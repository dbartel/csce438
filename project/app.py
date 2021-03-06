from flask import Flask, render_template, session, redirect, url_for, request
from flask_oauth import OAuth
import json
import requests
import keys

app = Flask(__name__)


# Twitter Authentication
oauth = OAuth()

twitter = oauth.remote_app("twitter",
    base_url="https://api.twitter.com/1.1/",
    request_token_url='https://api.twitter.com/oauth/request_token',
    access_token_url='https://api.twitter.com/oauth/access_token',
    authorize_url='https://api.twitter.com/oauth/authenticate',
    consumer_key=keys.TWITTER_KEY,
    consumer_secret=keys.TWITTER_SECRET
)



# Enable debug mode
app.debug = True

#Session secret key
app.secret_key = keys.SESSION_SECRET

@app.route("/")
def index():
    return render_template("landingpage.html")


@app.route("/login")
def login():
    if session.has_key("twitter_token"): 
        return redirect(url_for("tweetBorrowing"))
    return twitter.authorize(callback=url_for("twitterCallback", next=request.args.get('next') or request.referrer or None))

@app.route("/logout")
def logout():
    session.pop("twitter_token", None)
    return redirect(url_for("index"))

@app.route("/twitter-login")
@twitter.authorized_handler
def twitterCallback(resp):

    next_url = request.args.get("next") or url_for("tweet")
    if session.has_key("twitter_token"): session.pop("twitter_token", None)
    session["twitter_token"] = (
        resp["oauth_token"],
        resp["oauth_token_secret"]
    )
    session["twitter_user"] = resp["screen_name"]

    return redirect(url_for("tweetBorrowing"))


@twitter.tokengetter
def get_twitter_token(token=None):
    return session.get("twitter_token")


@app.route("/tweet")
def tweetBorrowing():
	return render_template("tweetborrowing.html")


@app.route("/api/trends", methods=["GET"])
def getTrends():
    params = {
    "api_key": keys.TRENDING_KEY
    # "woeid": "23424977"
    }
    req = requests.get("http://api.whatthetrend.com/api/v2/trends.json", params=params)
    return req.text

@app.route("/api/tweets", methods=["GET", "POST"])
def twitterOps():
    if request.method == "GET":
        search_term = request.args.get("q", None)
        if search_term != None:
            params = {
                "q":search_term
            }
            resp = twitter.get("search/tweets.json", data=params)

            return json.dumps(resp.data)
        else:
            abort(400)
    else:
        tweet = request.args.get("tweet", None)
        if tweet != None:
            params = {
                "status": tweet
            }
            resp = twitter.post("statuses/update.json", data=params)

            if (resp.status == 200):
                return json.dumps(resp.data)
            else:
                return "Something went wrong"
        else:
            abort(400)

@app.route("/api/words/<word>", methods=["GET"])
def getWords(word):
    if word != None:
        endpoint = "https://wordsapiv1.p.mashape.com/words/{0}/".format(word)
        headers = {
            "X-Mashape-Key": keys.MASHAPE_KEY,
            "Accept": "application/json"
        }

        res = requests.get(endpoint, headers=headers)
        return res.text
    else: abort(400)



if __name__ == "__main__":
	app.run()
