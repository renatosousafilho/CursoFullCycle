package main

import (
	"fmt"
	"io/ioutil"
	"os"
	"net/http"
	"log"
)

func main() {
	http.HandleFunc("/", Hello)
	http.HandleFunc("/configmap", ConfigMap)
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
