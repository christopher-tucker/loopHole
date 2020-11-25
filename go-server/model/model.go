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
	return
}

// InsertSession - takes a SessionData struct from the model and adds it to a sql database. Returns an error.
func (ss *SessionStore) InsertSession(sd SessionData) (err error) {
	db := ss.loopholeDB
	var stmt *sql.Stmt
	stmt, err = db.Prepare(`
		INSERT INTO sessions (sessionId, videoUrl, startTime, endTime, speed) VALUES (?, ?, ?, ?, ?);
	`)
	if err != nil {
		return
	}
	_, err = stmt.Exec(sd.SessionID, sd.VideoURL, sd.StartTime, sd.EndTime, sd.Speed)
	if err != nil {
		fmt.Printf("error attempting to add session data to db: %v\n", err)
		return
	}
	return
}

// GetSession - takes a uuid string and returns as SessionData struct or an error
func (ss *SessionStore) GetSession(id string) (sd SessionData, err error) {
	db := ss.loopholeDB
	var stmt *sql.Stmt
	stmt, err = db.Prepare(`SELECT sessionId,videoUrl,startTime,endTime,speed FROM sessions WHERE id=?`)
	if err != nil {
		fmt.Printf("error attempting to prepare query")
		return
	}

	err = stmt.QueryRow(id).Scan(&sd.SessionID, &sd.VideoURL, &sd.StartTime, &sd.EndTime, &sd.Speed)
	if err != nil {
		fmt.Printf("error querying db: %v\n", err)
		return
	}
	return
}

// DeleteSession - takes a uuid string, deletes session data associated with the id
func (ss *SessionStore) DeleteSession(id string) (err error) {
	db := ss.loopholeDB
	var stmt *sql.Stmt
	stmt, err = db.Prepare(`
		DELETE FROM sessions (sessionId, videoUrl, startTime, endTime, speed) where sessionId=?;
	`)
	if err != nil {
		fmt.Printf("error preparing sql statement: %v\n", err)
		return
	}
	_, err = stmt.Exec(id)
	if err != nil {
		fmt.Printf("error executing delete statement: %v\n", err)
		return
	}
	return
}

// EditSession - takes session data, looks up by uuid in database
func (ss *SessionStore) EditSession(sd SessionData) (err error) {
	db := ss.loopholeDB
	var stmt *sql.Stmt
	stmt, err = db.Prepare(`
		UPDATE sessions
		SET videoUrl = $2, startTime = $3, endTime = $4, speed = $5
		WHERE sessionId = $1;
	`)
	_, err = stmt.Exec(sd.SessionID, sd.VideoURL, sd.StartTime, sd.EndTime, sd.Speed)
	if err != nil {
		fmt.Printf("error attempting to update session: %v\n", err)
		return
	}
	return
}
