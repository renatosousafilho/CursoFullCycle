package db_test

import (
	"database/sql"
	"log"
	"testing"

	"github.com/renatosousafilho/go-hexagonal/adapters/db"
	"github.com/renatosousafilho/go-hexagonal/application"
	"github.com/stretchr/testify/require"
)

var Db *sql.DB

func setup() {
	Db, _ = sql.Open("sqlite3", ":memory:")
	createTable(Db)
	createProduct(Db)
}

func createTable(*sql.DB) {
	createTable := `
	CREATE TABLE products (
		ID     string PRIMARY KEY,
		Name   string,
		Price  float,
		Status string
	);
	`
	stmt, err := Db.Prepare(createTable)
	if err != nil {
		log.Fatal(err.Error())
	}
	stmt.Exec()
}

func createProduct(Db *sql.DB) {
	insertProduct := `
	INSERT INTO products (ID, Name, Price, Status) VALUES (?, ?, ?, ?)
	`
	stmt, err := Db.Prepare(insertProduct)
	if err != nil {
		log.Fatal(err.Error())
	}
	stmt.Exec("abc", "Product Test", 10.0, "enabled")
}

func TestProductDb_Get(t *testing.T) {
	setup()
	defer Db.Close()
	productDb := db.NewProductDb(Db)
	product, err := productDb.Get("abc")
	require.Nil(t, err)
	require.Equal(t, "abc", product.GetID())
	require.Equal(t, "Product Test", product.GetName())
	require.Equal(t, 10.0, product.GetPrice())
	require.Equal(t, "enabled", product.GetStatus())
}

func TestProductDb_Save(t *testing.T) {
	setup()
	defer Db.Close()
	productDb := db.NewProductDb(Db)

	product := application.NewProduct()
	product.Name = "Product Test"
	product.Price = 25

	productResult, err := productDb.Save(product)
	require.Nil(t, err)
	require.Equal(t, product.Name, productResult.GetName())
	require.Equal(t, product.Price, productResult.GetPrice())
	require.Equal(t, product.Status, productResult.GetStatus())

	product.Status = "enabled"

	productResult, err = productDb.Save(product)
	require.Nil(t, err)
	require.Equal(t, product.Name, productResult.GetName())
	require.Equal(t, product.Price, productResult.GetPrice())
	require.Equal(t, product.Status, productResult.GetStatus())
}
