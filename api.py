# import dependencies 
import numpy as np
import pandas as pd
import json
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect
from flask import Flask, jsonify
from flask_cors import CORS

# create database connection and create files to be loaded into API endpoints
Base = automap_base()
engine = create_engine('sqlite:///static/data/bredat.sqlite')
Base.prepare(engine, reflect=True)

Breweries = json.loads(pd.read_sql("SELECT * FROM breweries ORDER BY NAME",con=engine).to_json(orient='records'))

Localbusinesses = json.loads(pd.read_sql("SELECT * FROM localbusinesses ORDER BY id",con=engine).to_json(orient='records'))

History = json.loads(pd.read_sql("SELECT * FROM history",con=engine).to_json(orient='records'))

# create Flask app
app = Flask(__name__)
CORS(app)

# create api endpoints
@app.route("/")
def main():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/breweries<br/>"
        f"/api/v1.0/localbusinesses<br/>"
        f"/api/v1.0/history<br/>"
    )

@app.route("/api/v1.0/breweries")
def apibreweries():
    #create endpoint from breweries data
    return jsonify(Breweries)

@app.route("/api/v1.0/localbusinesses")
def localbusinesses():
    #create endpoint from breweries data
    return jsonify(Localbusinesses)

@app.route("/api/v1.0/history")
def history():
    #create endpoint from breweries data
    return jsonify(History)

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)