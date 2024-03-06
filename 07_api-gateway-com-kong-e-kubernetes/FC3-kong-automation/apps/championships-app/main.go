package main

import (
	"io/ioutil"
	"os"
	"time"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"github.com/rs/zerolog"

	"net/http"
)

var log *zerolog.Logger

func init() {
	zerolog.TimeFieldFormat = zerolog.TimeFormatUnix
	output := zerolog.ConsoleWriter{Out: os.Stdout, TimeFormat: time.RFC3339}
	logger := zerolog.New(output).With().Timestamp().Caller().Logger()
	log = &logger
}

func main() {
	start := time.Now()
	e := echo.New()
	e.Logger.SetOutput(ioutil.Discard)
	// Middleware
	e.Use(func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) (err error) {
			req := c.Request()
			res := c.Response()
			start := time.Now()
			log.Debug().
				Interface("headers", req.Header).
				Msg(">>> " + req.Method + " " + req.RequestURI)
			if err = next(c); err != nil {
				c.Error(err)
			}
			log.Debug().
				Str("latency", time.Now().Sub(start).String()).
				Int("status", res.Status).
				Interface("headers", res.Header()).
				Msg("<<< " + req.Method + " " + req.RequestURI)
			return
		}
	})
	e.Use(middleware.Recover())
	//CORS
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{echo.GET, echo.HEAD, echo.PUT, echo.PATCH, echo.POST, echo.DELETE},
	}))

	e.Static("/static", "assets/api-docs")

	// Server
	e.GET("/api/championships/:id", GetChampionship)
	e.GET("/health", Health)
	elapsed := time.Now().Sub(start)
	log.Debug().Msg("Championships app initialized in " + elapsed.String())
	e.Logger.Fatal(e.Start(":9999"))

}

func Health(c echo.Context) error {
	return c.JSON(200, &HealthData{Status: "UP"})
}

type HealthData struct {
	Status string `json:"status,omitempty"`
}

func GetChampionship(c echo.Context) error {
	champ := &Championship{
		Name:    "Uefa",
		Title:   "Champions League",
		Country: "Europe",
	}
	return c.JSON(http.StatusOK, champ)
}

type Championship struct {
	Name    string `json:"name,omitempty"`
	Title   string `json:"title,omitempty"`
	Country string `json:"country,omitempty"`
}
