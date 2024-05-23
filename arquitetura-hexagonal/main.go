package main

import (
	"database/sql"
	"fmt"

	_ "github.com/mattn/go-sqlite3"
	db2 "github.com/renatosousafilho/go-hexagonal/adapters/db"
	"github.com/renatosousafilho/go-hexagonal/application"
)

func main() {
	db, _ := sql.Open("sqlite3", "sqlite.db")
	productDbAdapter := db2.NewProductDb(db)
	productService := application.NewProductService(productDbAdapter)
	product, _ := productService.Create("Product Test", 10.0)
	fmt.Println(product)
	productService.Enable(product)
}
