package main

import (
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"
)

func visit(path string, f os.FileInfo, err error) error {
	var slug string
	if strings.HasSuffix(path, ".md") {
		if strings.HasSuffix(path, "index.md") {
			slug = filepath.Base(filepath.Dir(path))
			readfile, err := ioutil.ReadFile(path)
			if err == nil {
				var outtext = string(readfile)
				var newfile = "./" + slug + ".md"
				err := ioutil.WriteFile(newfile, []byte(outtext), 0644)
				if err != nil {
					panic(err)
				}
				fmt.Printf("Updated: %s\n", path)
			}
		} else {
			slug = filepath.Base(path)[:len(filepath.Base(path))-3]
			//fmt.Printf("Non index.md Visited: %s\n", slug)
		}
	} else {
		// fmt.Printf("Non Markdown Visited: %s\n", path)
	}
	return nil
}

func main() {
	err := filepath.Walk(".", visit)
	if err != nil {
		panic(err)
	}
}
