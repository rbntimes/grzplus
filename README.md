# grzplus

Dit is het ComBo board. Om het te laten werken kunnen jullie de volgende stappen ondernemen:

## Steps:

### Installeren
- Fork de repo
- Installeer de dependencies (yarn of npm i)
- Maak een project aan bij heroku
- Voeg een postgresql database toe aan heroku
- Je kunt daar onder settings de credentials vinden voor de database, die zijn belangrijk! (zie stap 2)

### Secrets
- Maak een .env.development aan in de hoofdfolder. Je kunt die .example hernoemen naar .env.development
- Alle gegevens van de database moeten er in. 

### Deployen
- Ik deployde steeds via [vercel](https://vercel.com), erg fijn snel en gratis
- Daar moet je wel opnieuw de secrets toevoegen
- Ik mail jullie straks een database dump. Deze kunnen jullie importeren in postgres om wat makkelijker van start te kunnen gaan.

### TODO
- Handig om naar te kijken is https://blog.heroku.com/connection-pooling. Nu kan de app nog breken als er te veel connecties tegerlijkertijd zijn. 
- Het is ook goed om te kijken of er een soort admin gemaakt kan worden. Zodat grz zelf gebruikers aan kan maken en kan beheren
