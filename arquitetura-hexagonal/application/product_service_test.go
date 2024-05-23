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

	service := application.ProductService{
		Persistence: persistence,
	}

	result, err := service.Get("abc")
	require.Nil(t, err)
	require.Equal(t, product, result)

	persistence.EXPECT().Get(gomock.Any()).Return(nil, errors.New("error"))
	result, err = service.Get("abc")
	require.Equal(t, errors.New("error"), err)
	require.Nil(t, result)
}
