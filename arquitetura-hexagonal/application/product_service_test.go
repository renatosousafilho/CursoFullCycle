package application_test

import (
	"errors"
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/renatosousafilho/go-hexagonal/application"
	mock_application "github.com/renatosousafilho/go-hexagonal/application/mocks"
	"github.com/stretchr/testify/require"
)

func TestProductService_Get(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()
	product := mock_application.NewMockProductInterface(ctrl)
	persistence := mock_application.NewMockProductPersistence(ctrl)
	persistence.EXPECT().Get(gomock.Any()).Return(product, nil)
	service := application.ProductService{Persistence: persistence}

	result, err := service.Get("abc")
	require.Nil(t, err)
	require.Equal(t, product, result)

	persistence.EXPECT().Get(gomock.Any()).Return(nil, errors.New("error"))
	result, err = service.Get("abc")
	require.Equal(t, errors.New("error"), err)
	require.Nil(t, result)
}

func TestProductService_Create(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()
	product := mock_application.NewMockProductInterface(ctrl)
	persistence := mock_application.NewMockProductPersistence(ctrl)
	persistence.EXPECT().Save(gomock.Any()).Return(product, nil)
	service := application.ProductService{Persistence: persistence}

	// Act
	result, err := service.Create("Product 1", 10)

	// Assert
	require.Nil(t, err)
	require.Equal(t, product, result)

	// Arrange
	persistence.EXPECT().Save(gomock.Any()).Return(nil, errors.New("error"))
	service = application.ProductService{Persistence: persistence}

	// Act
	result, err = service.Create("Product 1", 10)

	// Assert
	require.Equal(t, &application.Product{}, result)
	require.Equal(t, errors.New("error"), err)
}

func TestProductService_Enable(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()
	product := mock_application.NewMockProductInterface(ctrl)
	product.EXPECT().Enable().Return(nil)
	persistence := mock_application.NewMockProductPersistence(ctrl)
	persistence.EXPECT().Save(gomock.Any()).Return(product, nil)
	service := application.ProductService{Persistence: persistence}

	// Act
	result, err := service.Enable(product)

	// Assert
	require.Nil(t, err)
	require.Equal(t, product, result)

	// Arrange
	product = mock_application.NewMockProductInterface(ctrl)
	product.EXPECT().Enable().Return(errors.New("error"))

	// Act
	result, err = service.Enable(product)

	// Assert
	require.Equal(t, &application.Product{}, result)
	require.Equal(t, errors.New("error"), err)

	// Arrange
	product = mock_application.NewMockProductInterface(ctrl)
	product.EXPECT().Enable().Return(nil)
	persistence.EXPECT().Save(gomock.Any()).Return(nil, errors.New("error"))
	service = application.ProductService{Persistence: persistence}

	// Act
	result, err = service.Enable(product)

	// Assert
	require.Equal(t, &application.Product{}, result)
	require.Equal(t, errors.New("error"), err)
}

func TestProductService_Disable(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()
	product := mock_application.NewMockProductInterface(ctrl)
	product.EXPECT().Disable().Return(nil)
	persistence := mock_application.NewMockProductPersistence(ctrl)
	persistence.EXPECT().Save(gomock.Any()).Return(product, nil)
	service := application.ProductService{Persistence: persistence}

	// Act
	result, err := service.Disable(product)

	// Assert
	require.Nil(t, err)
	require.Equal(t, product, result)

	// Arrange
	product = mock_application.NewMockProductInterface(ctrl)
	product.EXPECT().Disable().Return(errors.New("error"))

	// Act
	result, err = service.Disable(product)

	// Assert
	require.Equal(t, &application.Product{}, result)
	require.Equal(t, errors.New("error"), err)

	// Arrange
	product = mock_application.NewMockProductInterface(ctrl)
	product.EXPECT().Disable().Return(nil)
	persistence.EXPECT().Save(gomock.Any()).Return(nil, errors.New("error"))
	service = application.ProductService{Persistence: persistence}

	// Act
	result, err = service.Disable(product)

	// Assert
	require.Equal(t, &application.Product{}, result)
	require.Equal(t, errors.New("error"), err)
}
