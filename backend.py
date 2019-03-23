from flask import Flask, request, jsonify
from flask_cors import CORS
from functools import reduce
import requests
import re
import sys

app = Flask(__name__)
CORS(app)

@app.route("/bullshit")
def analyzePage():
    address = request.args.get('address')

    if address == None: 
        return jsonify({'type': 'error', 'cause': 'No address found'})

    r = requests.get(address)

    if r.status_code == 200:
	    #print(r.text.encode(sys.stdout.encoding, errors='replace'))
       result = analyze(r.text, address, 1, [address])
       return jsonify({'type': 'success', 'score': result[0]})
    else:
        return jsonify({'type': 'error', 'cause': 'Received non-OK status code', 'status_code': r.status_code})


def analyze(html, target, ttl, visited):
    if ttl == 0:
        return (0,)

    pagesToVisit = []

    hrefs = re.findall("<a\s+(?:[^>]*?\s+)?href=\"([^\"]*)\"", html)
    # TODO: Search for keywords
    for href in hrefs:
        #newTarget = href Only navigate within the site
        if not re.match("(?:http.?:)?//", href):
            newTarget = target + href
            print("Found " + newTarget + " from " + target)
            if not newTarget in visited:
                pagesToVisit.append(newTarget)
                print("Appended it to array")

    
    if len(pagesToVisit) == 0:
        return (currentScore,)

    newVisited = visited[:].extend(pagesToVisit)
    scores = []

    for page in pagesToVisit:
        print("Now visiting " + page)
        r = requests.get(page)
        if r.status_code == 200:
            scores.append(analyze(r.text, page, ttl-1, newVisited))

    finalScore = reduce(lambda x, acc: x + acc, list(map(lambda x: x[0], scores)), 0)

    return (finalScore,)

if __name__ == "__main__":
    app.run(debug=True)