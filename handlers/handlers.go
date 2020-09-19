package handlers

import (
	"html/template"
	"net/http"
)

func Index(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		t := template.Must(template.ParseFiles("go/src/github.com/EliasPlesiotis/spaceadvent/game/static/index.html"))
		t.Execute(w, nil)
	} else if r.Method == "POST" {
		http.Redirect(w, r, "/game", http.StatusSeeOther)
	}
}

func Game(w http.ResponseWriter, r *http.Request) {
	t := template.Must(template.ParseFiles("go/src/github.com/EliasPlesiotis/spaceadvent/game/static/game.html"))
	t.Execute(w, nil)
}

func Single(w http.ResponseWriter, r *http.Request) {
	t := template.Must(template.ParseFiles("go/src/github.com/EliasPlesiotis/spaceadvent/game/static/single.html"))
	t.Execute(w, nil)
}

func Lose(w http.ResponseWriter, r *http.Request) {
	t := template.Must(template.ParseFiles("go/src/github.com/EliasPlesiotis/spaceadvent/game/static/lose.html"))
	t.Execute(w, nil)
}
