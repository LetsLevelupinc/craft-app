from craft_beer.app import db, import_beers, import_reviews
import time

db.drop_all()
db.create_all()
import_beers()
import_reviews()



