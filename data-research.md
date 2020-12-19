# Content research

## Inleiding

Tijdens deze content research ga ik op zoek naar API’s waarmee ik mijn applicatie zou kunnen bouwen. Ik zal eerst even een korte beschrijving geven van de richting die ik in wil gaan. Bij het lezen van de opdracht en het overleggen hiervan met mijn vriendin was het direct duidelijk dat ik iets wou maken over de reis die wij graag maken. Wij gaan namelijk al 4 jaar (op afgelopen zomer na), naar Berlijn. Hier zijn wij altijd op zoek naar een leuk feestje, en alles wat daarbij komt kijken.

## Beschikbare API’s

### Glatsee

Link: http://glatsee.weebly.com/dev.html

#### Overall

Overall ziet deze API er uit alsof hij niet super gevuld is, en ook niet zo goed onderhouden wordt. Ook heb ik Europa getest en die is beduidend minder gevuld dan evenementen in de U.S. Toch is het in principe precies wat ik nodig heb. Je kunt de API aanroepen met een locatie en een categorie, wat voor mij dus respectievelijk Berlijn en Muziek zou zijn. Verder kun je een datum mee geven wat ook nodig is voor mijn idee.

#### Endpoints

De endpoints van deze API zijn erg fijn voor mijn applicatie. Een query ziet er als volgt uit: `http://events-apis.herokuapp.com/city/miami/category/MUSIC/date_star/2017-05-01/date_end/2017-05-06/token_api/YOUR_TOKEN_API_GOES_HERE`

En dit returnt het volgende:

```json
[
  {
    "category": "MUSIC",
    "place": {
      "name": "STORY Miami",
      "location": {
        "zip": "33139",
        "city": "Miami Beach",
        "country": "United States",
        "latitude": 25.77052,
        "street": "136 Collins Ave",
        "state": "FL",
        "longitude": -80.1342
      },
      "id": "239073682882493"
    },
    "id": "1948720375362241",
    "start_time": "2017-05-05T22:00:00-0400"
  }
]
```

Er komt dus een `array` uit met de evenementen die aan de query voldoen, maar wat ook fijn is is dat de evenementen een `place` object bevatten met de `latitude` en `longitude`. Dit zorgt ervoor dat ik de locatie van het evenement bijvoorbeeld op een kaart kan zetten.

### Facebook

Link: https://developers.facebook.com/docs/graph-api/reference/v9.0/group/events

#### Overall

De Facebook API is natuurlijk een van de meest uitgebreide en goed geoliede API's die er is. Toch hebben zij er voor gekozen hun evenementen API niet volledig beschikbaar te stellen. Waarschijnlijk doen zij dit om te voorkomen dat mensen ze klakkeloos overnemen en hun eigen evenementen sites maken, Facebook wilt zijn gebruikers natuurlijk zelf behouden. Toch is er een mogelijkheid als mijn applicatie een marketing-partner zou zijn, en omdat de mogelijkheid er dus ergens is wil ik het wel onderzoeken. Feesten worden immers voornamelijk op Facebook gezet, omdat daar de meeste feestgangers de feesten ook zoeken.

#### Endpoints

Facebook maakt gebruik van en is tevens bedenker van `graphql`, een slimme query language die het mogelijk maakt om heel overzichtelijk precies de data te verkrijgen die je wilt. Dit zorgt ervoor dat een query er als volgt uit zou komen te zien: (Let op, dit is pseudo code en zal niet werken)

```js
{
  events(id: '2453412353452345') {
    title
    location: {
      vanueName
      latitude
      longitude
    }
    timeFrom
    timeUntil
    usersParticipating
    ticketsAvailable
    etc
    etc
  }
}
```

En dit returnt het volgende:

```json
{
  "title": "Feestje",
  "location": {
    "vanueName": "://ABOUT BLANK",
    "latitude": 35234,
    "longitude": 3141
  },
  "etc": "etc"
}
```

Zo krijg ik heel overzichtelijk precies de data waarom ik gevraagd heb, en niet allemaal randinformatie die niet nodig zijn voor mijn applicatie.

### EventBrite

Link: https://www.eventbrite.com/platform/api#/introduction/about-our-api

#### Overall

Deze heb ik er zelf bijgezocht. Ik denk dat deze qua instap voor mijn applicatie het beste is. Hij is laagdrempelig en erg goed onderhouden. Goede documentatie en een hoop gebruikers zijn mij voorgegaan (evenementen in Spotify worden door eventbride bijvoorbeeld geregeld).

#### Endpoints

EventBride heeft een uitgebreide documentatie en er is veel mogelijk. Zo kan ik daar ook heel fijn alle venues in Berlijn krijgen, en hebben zij veel evenementen. Wat bij hun endpoints vooral ook een voordeel is is dat hij ook `POST` requests accepteerd. Dat betekend dat als een evenement er niet in staat, gebruikers van mijn app deze zelf kunnen toevoegen. Fijn!

### EXPERIMENTEEL RESIDENT ADVISOR

Link: https://medium.com/@diegobarrena/creating-a-restful-api-for-techno-events-introduction-67d939c5ef6c

#### Overall

Dit is op en top experimenteel. Ik wou hem ondanks dat toch toevoegen. Resident Advisor is namelijk een go-to als het gaat om techno feesten, ook in Berlijn. Alleen beschikken zij niet over een openbare API.

#### Oplossing

In de link maakt een gebruiker slim gebruik van `python` webcrawlers. Deze kleine "spinnetjes" maken snapshots van Resident Advisor en lezen dan uit de html de evenementen. Klinkt super lastig en technisch, is het ook. Maar ik vond hem het vermelden waard.

```

```
