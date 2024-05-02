# Moment 4 - Autentisering och säkerhet
I denna uppgift skapas det funktioner för att autentisera konton på en hemsida, det autentiseras 

## Installation
Uppgiften använder sig av MongoDB som databas, den är uppladdad via Render. Då det används Render både för funktioner vid inlogg och hämta innehåll till den (hemliga sidan) så kan det ta en stund då Render går ner i viloläge då den ej används. 

I databasen finns det en collection som ser ut enligt nedan.
 
### Users

| id   | username    | password   | email    | account_created   | __v  | 
| ---- | -------------- | ---------- | ---------- | ----------- | -------- |
| 1  | användarnamn  | Lösenord  | epost@epost.se  | 2024-02-01 T 15:05:40     | 0 |



## Användning
 Hur man användet det:

| Metod   | Url ändelse    | Beskrivning   | 
| ---- | -------------- | ---------- | 
| GET   | /api/secret    | Hämtar datan efter man blivit inloggad, funkar endast då man är inloggad   | 
| POST   | /api/register    | Registrerar en ny användare   | 
| Post   | /api/login    | Loggar in med en befintlig användare | 



En användare(User) har strukturen enligt nedan med JSON format. 

```json
{
  "id": "1"
   "username": "användarnamn",
   "password": "Lösenord",
   "email": "epost@epost.se",
   "account_created": "2024-02-01 T 15:05:40",
    "__v": "0"
}
```




