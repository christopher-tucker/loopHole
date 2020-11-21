package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

// SessionData - holds the parameters for all incoming requests/responses
type SessionData struct {
	sessionID string
	videoURL  string
	startTime float32
	endTime   float32
	speed     float32
}

func handleGet(res http.ResponseWriter, req *http.Request) {
	fmt.Fprintf(res, "suck this GET request \n")
}

func handlePost(res http.ResponseWriter, req *http.Request) {
	fmt.Fprintf(res, "suck this POST request \n")
	// Declare a new SessionData struct.
	var sesh SessionData

	// Try to decode the request body into the struct. If there is an error,
	// respond to the client with the error message and a 400 status code.
	err := json.NewDecoder(req.Body).Decode(&sesh)
	if err != nil {
		fmt.Printf("error attempting to parse json body: %v", err)
		http.Error(res, err.Error(), http.StatusBadRequest)
		return
	}

	fmt.Fprintf(res, "and here's the body: %v \n", req.Body)
}

func handlePut(res http.ResponseWriter, req *http.Request) {
	fmt.Fprintf(res, "suck this PUT request \n")
}

func handleDelete(res http.ResponseWriter, req *http.Request) {
	fmt.Fprintf(res, "suck this DELETE request \n")
}

func sessionsHandler(res http.ResponseWriter, req *http.Request) {
	fmt.Fprintf(res, "url path: %s \n", req.URL.Path[1:])
	method := req.Method
	switch method {
	case "GET":
		handleGet(res, req)
	case "POST":
		handlePost(res, req)
	case "PUT":
		handlePut(res, req)
	case "DELETE":
		handleDelete(res, req)
	}
}

func main() {
	http.HandleFunc("/sessions", sessionsHandler)
	log.Fatal(http.ListenAndServe(":3333", nil))
}
