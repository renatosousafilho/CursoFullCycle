package main

import (
	"fmt"
	"io/ioutil"
	"os"
	"net/http"
	"log"
	"time"
)

var startedAt = time.Now()

func main() {
	http.HandleFunc("/", Hello)
	http.HandleFunc("/configmap", ConfigMap)
	http.HandleFunc("/secret", Secret)
	http.HandleFunc("/healthz", Healthz)
	http.ListenAndServe(":8000", nil)
}

func Hello(w http.ResponseWriter, r *http.Request) {
	name := os.Getenv("NAME")
	age := os.Getenv("AGE")
	fmt.Fprintf(w, "Hello %s, you are %s years old!", name, age)
}

func ConfigMap(w http.ResponseWriter, r *http.Request) {
	data, err := ioutil.ReadFile("/go/myfamily/myfamily.txt")
	if err != nil {
		log.Fatalf("failed to read file: %s", err)
	}
	fmt.Fprintf(w, "My family is %s", string(data))
}

func Secret(w http.ResponseWriter, r *http.Request) {
	user := os.Getenv("USER")
	password := os.Getenv("PASSWORD")
	fmt.Fprintf(w, "User: %s. Password: %s", user, password)
}

func Healthz(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(200)
	w.Write([]byte("OK"))
	
	// duration := time.Since(startedAt)

	// if duration.Seconds() < 10 {
	// 	w.WriteHeader(500)
	// 	w.Write([]byte(fmt.Sprintf("Application are starting: %v", duration.Seconds())))
	// } 

	// if duration.Seconds() > 25 {
	// 	w.WriteHeader(500)
	// 	w.Write([]byte(fmt.Sprintf("Duation: %v", duration.Seconds())))
	// } else {
	// 	w.WriteHeader(200)
	// 	w.Write([]byte("OK"))
	// }
}
