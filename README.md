# Blogic CRM – React aplikace pro správu smluv

Tato aplikace slouží pro správu smluv, klientů a poradců v rámci jednoduchého CRM systému. Umožňuje evidenci základních údajů, přehledné zobrazení a správu jednotlivých entit, včetně propojování mezi smlouvami, klienty a poradci. Aplikace byla vytvořena jako ukázkový projekt v rámci zadání pro IT stáž.

## Hlavní funkce

- Zobrazení seznamu smluv, klientů a poradců
- Proklik na detail propojených entit (např. klient ve smlouvě)
- Možnost vytvářet, upravovat a mazat záznamy (CRUD operace)
- Vyhledávání podle jména, příjmení, evidence apod.
- Validace vstupních údajů a vstupních typů
- Responzivní design (mobil/tablet/desktop)
- Zabezpečené mazání smluv (ověření správce)

## Použité technologie

- React + TypeScript
- React Router DOM
- Tailwind CSS (včetně vlastní barevné palety)
- Context API pro správu stavu (klienti, poradci, smlouvy)
- Vite jako dev/bundler

## Spuštění projektu

1. Naklonujte repozitář:
git clone https://github.com/uzivatel/blogic-crm.git
cd blogic-crm

2. Instalace závislostí:
npm install

3. Spuštění vývojového serveru:
npm run dev

Aplikace bude dostupná na adrese "http://localhost:xxxx". (např. http://localhost:5173)

## Struktura projektu
src/
├── components/ // Layout komponenty (např. Sidebar)
├── pages/
│ ├── Contracts/ // Smlouvy – list, detail, formulář
│ ├── Clients/ // Klienti – list, detail, formulář
│ └── Advisors/ // Poradci – list, detail, formulář
├── models/ // Typové definice (TS)
├── App.tsx // Hlavní routovací logika
├── main.tsx // Bootstrap aplikace
└── index.css // Tailwind CSS

## Zabezpečené mazání smluv

Smazání smlouvy je chráněno proti náhodnému nebo neoprávněnému zásahu. Uživatel musí zadat:

- **Rodné číslo správce smlouvy**, který je přidělen ve smlouvě
- **Heslo:** `heslo123`

Pouze pokud obě hodnoty souhlasí, je smazání smlouvy umožněno. V opačném případě je akce zablokována s upozorněním.

## Licence

Projekt je určen výhradně pro demonstrační účely. Zdrojový kód může být volně použit nebo upraven pro nekomerční potřeby.