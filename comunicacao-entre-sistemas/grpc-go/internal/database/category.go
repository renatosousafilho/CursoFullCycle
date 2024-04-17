package database

import (
	"database/sql"

	"github.com/google/uuid"
)

type Category struct {
	db          *sql.DB
	ID          string
	Name        string
	Description string
}

func NewCategory(db *sql.DB) *Category {
	return &Category{db: db}
}

func (c *Category) Create(name string, description string) (Category, error) {
	id := uuid.New().String()
	query := `INSERT INTO categories (id, name, description) VALUES ($1, $2, $3)`
	_, err := c.db.Exec(query, id, name, description)
	if err != nil {
		return Category{}, err
	}
	return Category{ID: id, Name: name, Description: description}, nil
}

func (c *Category) FindAll() ([]Category, error) {
	query := "SELECT id, name, description FROM categories"
	rows, err := c.db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	categories := []Category{}
	for rows.Next() {
		var id, name, description string
		if err := rows.Scan(&id, &name, &description); err != nil {
			return nil, err
		}
		categories = append(categories, Category{ID: id, Name: name, Description: description})
	}
	return categories, nil
}

func (c *Category) FindByCourseId(courseId string) (Category, error) {
	query := "SELECT c.id, c.name, c.description FROM categories c INNER JOIN courses ON c.id = courses.category_id WHERE courses.id = $1"
	var id, name, description string
	err := c.db.QueryRow(query, courseId).Scan(&id, &name, &description)
	if err != nil {
		return Category{}, err
	}
	return Category{ID: id, Name: name, Description: description}, nil
}

func (c *Category) FindByID(id string) (Category, error) {
	query := "SELECT name, description FROM categories WHERE id = $1"
	var name, description string
	err := c.db.QueryRow(query, id).Scan(&name, &description)
	if err != nil {
		return Category{}, err
	}
	return Category{ID: id, Name: name, Description: description}, nil
}
