package model

import (
	"fmt"

	"github.com/google/uuid"
)

// SessionData - holds the parameters for all incoming requests/responses
type SessionData struct {
	SessionID string  `json:"sessionId"`
	VideoURL  string  `json:"videoUrl"`
	StartTime float32 `json:"startTime"`
	EndTime   float32 `json:"endTime"`
	Speed     float32 `json:"speed"`
}

// CreateSession - takes in sessionData, generates UUID and attaches it to data.SessionID, adds to database, and returns
func CreateSession(data SessionData) (newSession SessionData, err error) {
	newID := uuid.New()
	strID := newID.String()
	newSession = data
	newSession.SessionID = strID
	fmt.Printf("newSession %+v\n", newSession)
	// add newSession to database
	err = AddSession(newSession)
	return
}

// AddSession - takes a SessionData struct from the model and adds it to a sql database. Returns an error.
func AddSession(sessionData SessionData) (err error) {
	return
}
