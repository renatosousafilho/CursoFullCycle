package handler

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func TestHandler_jsonError(t *testing.T) {
	msg := "Hello JSON"
	result := jsonError(msg)
	require.Equal(t, string([]byte(`{"message":"Hello JSON"}`)), string(result))
}
