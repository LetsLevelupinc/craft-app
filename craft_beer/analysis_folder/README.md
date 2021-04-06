# United States of Beer
## Final Project, Group 6

* We were interested in exploring craft beer in the USA, which proved to be a difficult feat! In the process of exploration we discovered expensive pay walls and restricted and shallow datasets, but we found solutions and dove into mapping and analysis despite it all.

### Github Participants:
* @jkim6367 - Jeff Kim 
* @christos-f - Christos Ferderigos
* @jjjjjeb - Jamie Bruno
* @jmanjo123 - Jordan Lucas


## Project:
Initial Questions:
* Which states have the most craft breweries?
* Can we discover state or regional beer preferences?
* Which beer styles are the most popular throughout the USA?


## Data Sources:
Process: 
* ~~NAICS Data → PAYWALL~~
* ~~Brewers Association → MEMBERSHIP ONLY PAYWALL~~
* ~~Kaggle → Craft Beers Dataset → CANS ONLY~~
* [Open Brewery DB (Rapid API)](https://rapidapi.com/brianiswu/api/open-brewery-db)
* [BeerAdvocate.com](https://www.beeradvocate.com/) → Scrapped Data, ETL
* [US Census Data](https://www.kaggle.com/muonneutrino/us-census-demographic-data#acs2017_county_data.csv) via Kaggle


![Fig](https://www.dmbotanicalgarden.com/wp-content/uploads/2018/09/botanical_brews_classs_creative-commons_photo.jpg)


## Summary: 
We scrapped information on the top 250 beers most reviewed beers on BeerAdvocate.com as our main dataset. This dataset was cleaned and normalized for input into a Postgres DB. The dataset was then plotted on a cloropleth map showing the number for beer reviews per state and beer style.  In addition to the cloropleth map we used a sample of static data parsed from an API call to plot brewery types through the United States. We then used machine learning tools to elicit findings on our beer advocate dataset.

We created a web app to display our work and findings, and lastly added interactive functionality through a visitor log and map. 

We worked in Javascript, SQL, Python, HTML, and CSS. We used Pandas, Splinter, Bootstrap, Leaflet, Plotly, d3, Flask, SQL Alchemy, MatplotLib, SciKitLearn, LabelEncoder, OneHotEncoder, KMeans, Heirarchical/Agglomerative Clustering, and many more modules to bring this project together.

Check out our app [here](#). 