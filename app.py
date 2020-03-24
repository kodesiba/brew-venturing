# import dependencies
from flask import Flask, jsonify, render_template
from flask_cors import CORS

# create Flask app
app = Flask(__name__)
CORS(app)


# create front-end endpoints
@app.route("/")
def main():
    return '/brewwerymap'

@app.route("/brewwerymap")
def brewmap():
    return render_template("brewerymap.html")

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=4000)