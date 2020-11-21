package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

// SessionData - holds the parameters for all incoming requests/responses
type SessionData struct {
	SessionID string  `json:"sessionId"`
	VideoURL  string  `json:"videoUrl"`
	StartTime float32 `json:"startTime"`
	EndTime   float32 `json:"endTime"`
	Speed     float32 `json:"speed"`
}

func handleGet(res http.ResponseWriter, req *http.Request) {
	fmt.Fprintf(res, "suck this GET request \n")
}

func handlePost(res http.ResponseWriter, req *http.Request) {
	fmt.Fprintf(res, "request type: POST \n")
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
	fmt.Printf("%+v\n", sesh)
	fmt.Fprintf(res, "and here's the body: %v \n", req.Body)
}

func handlePut(res http.ResponseWriter, req *http.Request) {
	fmt.Fprintf(res, "request type: PUT \n")
}

func handleDelete(res http.ResponseWriter, req *http.Request) {
	fmt.Fprintf(res, "request type: DELETE \n")
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
