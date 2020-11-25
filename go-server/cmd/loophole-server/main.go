package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"os"

	"bitbucket.org/christopher-tucker/loophole-go-server/database"
	"bitbucket.org/christopher-tucker/loophole-go-server/model"
	"bitbucket.org/christopher-tucker/loophole-go-server/server"
)

// Config - defines configuration for instance of a loophole app
type Config struct {
	DbPath string
	Port   int
}

// FileExists - takes a filepath (string) and returns true if path is a file and also not a directory
func fileExists(filepath string) bool {
	info, err := os.Stat(filepath)
	if os.IsNotExist(err) {
		return false
	}
	return !info.IsDir()
}

func parseConfig(path string) (conf Config, err error) {
	fmt.Printf("path: %v\n", path)
	f, err := os.Open(path)
	if err != nil {
		return
	}
	defer f.Close()
	dec := json.NewDecoder(f)
	dec.DisallowUnknownFields()
	err = dec.Decode(&conf)
	if err != nil {
		fmt.Printf("error attempting to parse json body: %v", err)
		return
	}
	return
}

// open db with path by calling db module
// make new session store with db pointer
func main() {
	configPathPointer := flag.String("config", "", "path to config file")
	flag.Parse()
	if *configPathPointer == "" {
		fmt.Fprintf(os.Stderr, "you have to specify a -config option \n")
		os.Exit(1)
	}
	conf, err := parseConfig(*configPathPointer)
	fmt.Printf("conf.dbPath: %v\n", conf.DbPath)
	if err != nil {
		fmt.Fprintf(os.Stderr, "failed to open config.. err: %v\n", err)
		os.Exit(1)
	}
	newDb := !fileExists(conf.DbPath)
	fmt.Printf("newDb: %v\n", newDb)
	db, err := database.OpenDatabase(conf.DbPath)
	if err != nil {
		fmt.Fprintf(os.Stderr, "failed to open db.. err: %v\n", err)
		os.Exit(1)
	}
	sStore, err := model.NewSessionStore(db)
	if err != nil {
		fmt.Fprintf(os.Stderr, "failed to create new SessionStore.. err: %v\n", err)
		os.Exit(1)
	}
	if newDb {
		schemaError := sStore.InitSchema()
		if schemaError != nil {
			fmt.Fprintf(os.Stderr, "failed to initialize schema.. err: %v\n", schemaError)
			os.Exit(1)
		}
	}
	server.Serve(conf.Port, sStore)
}
