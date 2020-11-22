package model

import (
	"database/sql"
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

// SessionStore - holds a pointer to a sql.DB
type SessionStore struct {
	loopholeDB *sql.DB
}

// NewSessionStore - returns a pointer to a SessionStore
func NewSessionStore(db *sql.DB) (result *SessionStore, err error) {
	lhStore := SessionStore{
		loopholeDB: db,
	}
	result = &lhStore
	return
}

// InitSchema - initializes loophole schema with sessions table
func (ss *SessionStore) InitSchema() (err error) {
	schema := `
	CREATE TABLE sessions (
		sessionId string not null primary key,
		vidioUrl string not null,
		startTime real not null,
		endTime real not null,
		speed real not null
	);
	`
	_, err = ss.loopholeDB.Exec(schema)
	return
}

// CreateSession - takes in sessionData, generates UUID and attaches it to data.SessionID, adds to database, and returns
func (ss *SessionStore) CreateSession(data SessionData) (newSession SessionData, err error) {
	newID := uuid.New()
	strID := newID.String()
	newSession = data
	newSession.SessionID = strID
	fmt.Printf("newSession %+v\n", newSession)

	// add newSession to database
	err = ss.InsertSession(newSession)
	if err != nil {
		return
	}
	return
}

// AddSession - takes a SessionData struct from the model and adds it to a sql database. Returns an error.
func (ss *SessionStore) InsertSession(sessionData SessionData) (err error) {
	// ss.dbsomthing
	return
}
