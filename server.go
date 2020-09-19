package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/EliasPlesiotis/spaceadvent/game/handlers"

	"github.com/gorilla/mux"
)

var (
)


func main() {
	r := mux.NewRouter()

	r.PathPrefix("/static/").Handler(http.StripPrefix("/static/", http.FileServer(http.Dir("go/src/github.com/EliasPlesiotis/spaceadvent/game/static"))))

	r.HandleFunc("/", handlers.Index)
  r.HandleFunc("/single", handlers.Single)
	r.HandleFunc("/lose", handlers.Lose)
  r.HandleFunc("/ads.txt", func(w http.ResponseWriter, r *http.Request) { 
    if r.Method == "GET" {
      fmt.Fprint(w, "google.com, pub-6958776144091247, DIRECT, f08c47fec0942fa0")
    }
  })
  

	http.Handle("/", r)

	log.Println("Serving on localhost:" + os.Getenv("PORT"))  

  log.Fatal(http.ListenAndServe(":"+os.Getenv("PORT"), nil))

}
