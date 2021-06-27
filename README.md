# Saver
## Aplikacja web

Saver jest aplikacją przeznaczoną dla szerokiego grona osób chcących zapisywać, zarządzać i planować swoje wpływy i wydatki. 

## Prezentacja wideo

https://www.youtube.com/watch?v=I2PBraVfEh0

## Wymagania

### 1. Node.js

Do działania aplikacji wymagane jest środowisko Node.js.
Instalator dostępny jest na oficjalnej stronie Node.js - [nodejs.org](https://nodejs.org). 

### 2. Angular CLI

Do pracy z aplikacją i wykonywanie operacji takich jak: modyfikacja, uruchomienie w trybie developerskim, utworzenie wersji produkcyjnej - wymagane jest użycie `Angular CLI`.

Aby zainstalować `Angular CLI` globalnie, użyj menadżera paczek `npm` wpisując w terminalu następującą komendę: 

```
npm install -g @angular/cli
```

> `npm package manager` jest domyślnie instalowany wraz ze środowiskiem Node.js.

## Uruchomienie

`Angular CLI` umożlia uruchomienie aplikacji jako lokalny serwer.
Aby uruchomić aplikację przejdź do folderu głównego.
Następnie zainstaluj wymagane paczki:
```
npm install
```
Po pobraniu i zainstalowaniu wszystkich zależności możesz uruchomić lokalny serwer poleceniem:
```
ng serve --open
```

> Opcja `--open` automatycznie uruchomi przeglądarkę z domyślnym adresem.
> W przeciwnym wypadku ręcznie uruchom przeglądarkę i przejdź do adresu http://localhost:4200/.

## Konfiguracja

Do poprawnego działania aplikacji wymagane jest połączenie z serwerem API aplikacji Saver.

Domyślnym adresem serwera backend jest `http://localhost:3000`.

Aby to zmienić przejdź do folderu `src/config`, a następnie w pliku [config.ts](/src/config/config.ts) zmień wartość pola `backendUrl` na docelowy adres.
