package server

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"bitbucket.org/christopher-tucker/loophole-go-server/model"
)

var seshStore *model.SessionStore

func parseReqBody(req *http.Request) (result model.SessionData, err error) {
	// Declare a new SessionData struct.
	var sesh model.SessionData

	// Try to decode the request body into the struct. If there is an error,
	// respond to the client with the error message and a 400 status code.
	dec := json.NewDecoder(req.Body)
	dec.DisallowUnknownFields()
	err = dec.Decode(&sesh)
	result = sesh
	return
}

func handleGet(res http.ResponseWriter, req *http.Request) {
	fmt.Fprintf(res, "suck this GET request \n")
}

func handlePost(res http.ResponseWriter, req *http.Request) {
	fmt.Fprintf(res, "request type: POST \n")
	sesh, err := parseReqBody(req)
	if err != nil {
		fmt.Printf("error attempting to parse json body: %v", err)
		http.Error(res, err.Error(), http.StatusBadRequest)
		return
	}
	newSession, err := seshStore.CreateSession(sesh)
	if err != nil {
		fmt.Fprintf(res, "server error")
		http.Error(res, err.Error(), http.StatusInternalServerError)
		return
	}
	fmt.Printf("%+v\n", newSession)
	res.Header().Set("Content-Type", "application/json")
	json.NewEncoder(res).Encode(newSession)
	return
}

func handlePut(res http.ResponseWriter, req *http.Request) {
	fmt.Fprintf(res, "request type: PUT \n")
	sesh, err := parseReqBody(req)
	if err != nil {
		http.Error(res, err.Error(), http.StatusBadRequest)
		return
	}
	err = seshStore.EditSession(sesh)
	if err != nil {
		http.Error(res, err.Error(), http.StatusInternalServerError)
		return
	}
	return
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

// Serve - serves
func Serve(port int, ss *model.SessionStore) {
	p := fmt.Sprintf(":%d", port)
	seshStore = ss
	http.HandleFunc("/sessions", sessionsHandler)
	log.Fatal(http.ListenAndServe(p, nil))
}
