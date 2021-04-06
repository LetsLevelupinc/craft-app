import json
from sqlalchemy import func, create_engine
from flask import Flask,jsonify, request, render_template, url_for
from flask_sqlalchemy import SQLAlchemy
import os
from sqlalchemy.orm import Session
from werkzeug.utils import redirect


app = Flask(__name__)
print(app)


# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///C:\\tmp\\craft_beer.db'

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or 'postgresql://postgres:christos@localhost:5432/craft'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
engine = create_engine(app.config['SQLALCHEMY_DATABASE_URI'])
session = Session(engine)

db = SQLAlchemy(app)

# engine = create_engine(app.config['SQLALCHEMY_DATABASE_URI'])
# session = Session(engine)
print('working so far')
class Beer(db.Model):
    __tablename__ = 'beer_table'
    beer_id = db.Column(db.Integer, primary_key=True)
    beer_name = db.Column(db.String(128), nullable=False)
    brew_name = db.Column(db.String(128), nullable=False)
    beer_style = db.Column(db.String(128), nullable=False)
    abv = db.Column(db.Float(), nullable=True)
    availability = db.Column(db.String(128), nullable=True)
    brew_state = db.Column(db.String(128), nullable=True)
    brew_city = db.Column(db.String(128), nullable=True)
    lat = db.Column(db.Float(), nullable=True)
    lng = db.Column(db.Float(), nullable=True)

    def __repr__(self):
        return '<Beer %r>' % self.beer_name


class Review(db.Model):
    __tablename__ = 'reviews_table'
    review_id = db.Column(db.Integer, primary_key=True)
    state_id = db.Column(db.Integer(), nullable=False)
    state = db.Column(db.String(128), nullable=False)
    beer_id = db.Column(db.Integer, db.ForeignKey('beer_table.beer_id'), nullable=False)

    def __repr__(self):
        return '<Review %r>' % self.state

class Visitor(db.Model):
    __tablename__ = 'visitor_table'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))
    style = db.Column(db.String(64))
    lat = db.Column(db.Float)
    long = db.Column(db.Float)

    def __repr__(self):
        return '<Pet %r>' % (self.name)
def import_beers():
    with open('./data/beer.json') as f:
        data = json.load(f)
    for item in data:
        beer = Beer(beer_id=item['beer_id'],
                    beer_name=item['beer_name'],
                    brew_name=item['brewery_name'],
                    beer_style=item['style'],
                    abv=item['abv'],
                    availability=item['availability'],
                    brew_state=item['brew_state'],
                    brew_city=item['brew_city'],
                    lat=item['lat'],
                    lng=item['lng'])
        db.session.add(beer)
    db.session.commit()

def import_reviews():
    with open('./data/reviews.json') as f:
        data = json.load(f)
    for item in data:
        review = Review(review_id=item['review_id'],
                        beer_id=item['beer_id'],
                        state_id=item['state_id'],
                        state=item['state'])
        db.session.add(review)
    db.session.commit()


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/allbeers')
def allreviews():
    data = session.execute("""SELECT reviews_table.state_id, COUNT(reviews_table.state_id)
       FROM reviews_table
       JOIN beer_table ON reviews_table.beer_id = beer_table.beer_id
       GROUP BY reviews_table.state_id
       ORDER BY reviews_table.state_id
       """)
    test = {}
    for i in range(0, 51):
        test.update({i: 0})

    for i in data:
        test.update({i[0]: i[1]})

    data = list(test.values())

    with open('./data/states.json') as f:
        doc = json.load(f)

    features = doc['features']
    for i in range(len(features)):
        features[i]['properties']['count'] = data[i]
    session.close()
    return render_template("heatmap.html", data=json.dumps(doc))


@app.route('/ipa')
def get_ipa():
    data = session.execute("""SELECT reviews_table.state_id, COUNT(reviews_table.state_id)
    FROM reviews_table
    JOIN beer_table ON reviews_table.beer_id = beer_table.beer_id
    WHERE beer_table.beer_style LIKE '%IPA%'
    GROUP BY reviews_table.state_id
    ORDER BY reviews_table.state_id
    """)
    test = {}
    for i in range(0, 51):
        test.update({i: 0})

    for i in data:
        test.update({i[0]: i[1]})

    data = list(test.values())

    with open('../data/states.json') as f:
        doc = json.load(f)

    features = doc['features']
    for i in range(len(features)):
        features[i]['properties']['count'] = data[i]
    session.close()
    return render_template("heatmap.html", data=json.dumps(doc))


@app.route('/stout')
def get_stout():
    data = session.execute("""SELECT reviews_table.state_id, COUNT(reviews_table.state_id)
    FROM reviews_table
    JOIN beer_table ON reviews_table.beer_id = beer_table.beer_id
    WHERE beer_table.beer_style LIKE '%Stout%'
    GROUP BY reviews_table.state_id
    ORDER BY reviews_table.state_id
    """)
    test = {}
    for i in range(0, 51):
        test.update({i: 0})

    for i in data:
        test.update({i[0]: i[1]})

    data = list(test.values())

    with open('../data/states.json') as f:
        doc = json.load(f)

    features = doc['features']
    for i in range(len(features)):
        features[i]['properties']['count'] = data[i]
    session.close()
    return render_template('heatmap.html', data=json.dumps(doc))


@app.route('/porter')
def get_porter():
    data = session.execute("""SELECT reviews_table.state_id, COUNT(reviews_table.state_id)
    FROM reviews_table
    JOIN beer_table ON reviews_table.beer_id = beer_table.beer_id
    WHERE beer_table.beer_style LIKE '%Porter%'
    GROUP BY reviews_table.state_id
    ORDER BY reviews_table.state_id
    """)
    test = {}
    for i in range(0, 51):
        test.update({i: 0})

    for i in data:
        test.update({i[0]: i[1]})

    data = list(test.values())

    with open('../data/states.json') as f:
        doc = json.load(f)

    features = doc['features']
    for i in range(len(features)):
        features[i]['properties']['count'] = data[i]
    session.close()
    return render_template('heatmap.html', data=json.dumps(doc))

@app.route('/sour')
def get_sour():
    data = session.execute("""SELECT reviews_table.state_id, COUNT(reviews_table.state_id)
    FROM reviews_table
    JOIN beer_table ON reviews_table.beer_id = beer_table.beer_id
    WHERE beer_table.beer_style LIKE '%Lambic%'
    OR beer_table.beer_style LIKE '%Gueuze%'
    GROUP BY reviews_table.state_id
    ORDER BY reviews_table.state_id

    """)
    test = {}
    for i in range(0, 51):
        test.update({i: 0})

    for i in data:
        test.update({i[0]: i[1]})

    data = list(test.values())

    with open('../data/states.json') as f:
        doc = json.load(f)

    features = doc['features']
    for i in range(len(features)):
        features[i]['properties']['count'] = data[i]
    session.close()
    return render_template('heatmap.html', data=json.dumps(doc))

@app.route('/ale')
def get_ale():
    data = session.execute("""SELECT reviews_table.state_id, COUNT(reviews_table.state_id)
    FROM reviews_table
    JOIN beer_table ON reviews_table.beer_id = beer_table.beer_id
    WHERE beer_table.beer_style LIKE '%Ale%'
    OR beer_table.beer_style LIKE '%Barleywine%'
    OR beer_table.beer_style LIKE '%Quadrupel%'
    OR beer_table.beer_style LIKE '%Dubbel%'
    OR beer_table.beer_style LIKE '%Saison%'
    GROUP BY reviews_table.state_id
    ORDER BY reviews_table.state_id

        """)
    test = {}
    for i in range(0, 51):
        test.update({i: 0})

    for i in data:
        test.update({i[0]: i[1]})

    data = list(test.values())

    with open('../data/states.json') as f:
        doc = json.load(f)

    features = doc['features']
    for i in range(len(features)):
        features[i]['properties']['count'] = data[i]
    session.close()
    return render_template('heatmap.html', data=json.dumps(doc))

@app.route('/wheatbeer')
def get_wheat():
    data = session.execute("""SELECT reviews_table.state_id, COUNT(reviews_table.state_id)
    FROM reviews_table
    JOIN beer_table ON reviews_table.beer_id = beer_table.beer_id
    WHERE beer_table.beer_style LIKE '%Hefeweizen%'
    OR beer_table.beer_style LIKE '%Weisse%'
    OR beer_table.beer_style LIKE '%Witbier%'
    GROUP BY reviews_table.state_id
    ORDER BY reviews_table.state_id

    """)
    test = {}
    for i in range(0, 51):
        test.update({i: 0})

    for i in data:
        test.update({i[0]: i[1]})

    data = list(test.values())

    with open('../data/states.json') as f:
        doc = json.load(f)

    features = doc['features']
    for i in range(len(features)):
        features[i]['properties']['count'] = data[i]
    session.close()
    return render_template('heatmap.html', data=json.dumps(doc))


@app.route('/breweries')
def brew():
    return render_template('breweries.html')

@app.route('/analysis')
def analysis():
    return render_template('analysis.html')

@app.route("/send", methods=["GET", "POST"])
def send():
    if request.method == "POST":
        name = request.form["visitorName"]
        style = request.form["beerStyle"]
        lat = request.form["Lat"]
        lon = request.form["Lon"]

        visit = Visitor(name=name, style=style, lat=lat, long=lon)
        session.add(visit)
        session.commit()
        session.close()
        return redirect("/visitormap", code=302)

    return render_template("form.html")

@app.route("/visitormap")
def visit():

    results = session.query(Visitor.name, Visitor.style, Visitor.lat, Visitor.long).all()

    print(results)

    hover_text = [[result[0], result[1]] for result in results]
    lat = [result[2] for result in results]
    lon = [result[3] for result in results]

    visitor_data = [{
        "type": "scattergeo",
        "locationmode": "USA-states",
        "name": "Visitor Logs",
        "lat": lat,
        "lon": lon,
        "text": hover_text,
        "hoverinfo": "text",
        "marker": {
            "size": 15,
            "color": "rgb(140,45,28)",
            "opacity": 0.75,
            "symbol": "circle",
            "line": {
                "color": "rgb(214, 171, 11)",
                "width": 1
            },
        }
    }]
    session.close()
    return render_template("visitor_map.html", data = visitor_data)


if __name__ == '__main__':
    app.run()
    # db.create_all()
    # import_beers()
    # import_reviews()
