import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
load_dotenv()

from coords import get_coords
from routing import route_between

app = Flask(__name__)
CORS(app)

@app.route('/maps/place', methods=['POST'])
def get_coordinates():
    data = request.get_json()
    address = data.get("address")
    return get_coords(address)

@app.route('/maps/route/bidirectional', methods=['POST'])
def find_route():
    data = request.get_json()
    place1 = data.get("place1")
    place2 = data.get("place2")
    bi = data.get("bidirectional")
    coords1 = get_coords(place1)
    coords2 = get_coords(place2)
    print(f"Coordinates for place 1: {coords1}")
    print(f"Coordinates for place 2: {coords2}")
    route = route_between(
        src_lat=coords1[0],
        src_lon=coords1[1],
        tgt_lat=coords2[0],
        tgt_lon=coords2[1],
        bidirectional = bi
    )
    return jsonify(route), 200

if __name__ == "__main__":
    app.run(debug=True)