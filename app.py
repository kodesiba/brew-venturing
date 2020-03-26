# import dependencies
from flask import Flask, jsonify, render_template
from flask_cors import CORS

# create Flask app
app = Flask(__name__)
CORS(app)


# create front-end endpoints
@app.route("/")
def main():
    return (
        f"Available Routes:<br/>"
        f"/brewwerymap<br>"
        f"/yearmap<br>"
        )
@app.route("/brewwerymap")
def brewmap():
    return render_template("brewerymap.html")

@app.route("/yearmap")
def yearmap():
    return render_template("yearmap.html")

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=4000)