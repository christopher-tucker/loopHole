package database

import (
	"database/sql"

	// need this
	_ "github.com/mattn/go-sqlite3"
)

// OpenDatabase - takes a path to a sqlite db, opens db, returns pointer to db
func OpenDatabase(path string) (db *sql.DB, err error) {
	return sql.Open("sqlite3", path)
}
