package cli

import (
	"fmt"

	"github.com/renatosousafilho/go-hexagonal/application"
)

func Run(service application.ProductServiceInterface, action string, productID string, productName string, productPrice float64) (string, error) {
	var result = ""

	switch action {
	case "create":
		product, err := service.Create(productName, productPrice)
		if err != nil {
			return result, err
		}
		result = fmt.Sprintf("ProductId: %s, ProductName: %s, ProductPrice: %f",
			product.GetID(), product.GetName(), product.GetPrice(),
		)
	case "enable":
		product, err := service.Get(productID)
		if err != nil {
			return result, err
		}
		res, err := service.Enable(product)
		if err != nil {
			return result, err
		}
		result = fmt.Sprintf("Product %s has been enabled", res.GetName())
	case "disable":
		product, err := service.Get(productID)
		if err != nil {
			return result, err
		}
		res, err := service.Disable(product)
		if err != nil {
			return result, err
		}
		result = fmt.Sprintf("Product %s has been disabled", res.GetName())
	case "get":
		product, err := service.Get(productID)
		if err != nil {
			return result, err
		}
		result = fmt.Sprintf(`
			Product ID: %s \n
			Product Name: %s \n
			Prouct Price: %f \n
			Product Status: %s",
		`, product.GetID(), product.GetName(), product.GetPrice(), product.GetStatus())
	default:
		result = "Invalid action"
	}

	return result, nil
}
