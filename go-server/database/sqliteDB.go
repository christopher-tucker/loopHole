package database

import (
	"database/sql"
	"fmt"

	// need this
	_ "github.com/mattn/go-sqlite3"
)

// OpenDatabase - takes a path to a sqlite db, opens db, returns pointer to db
func OpenDatabase(path string) (db *sql.DB, err error) {
	fmt.Printf("path to db: %v\n", path)
	return sql.Open("sqlite3", path)
}
