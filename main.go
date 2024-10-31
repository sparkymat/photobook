package main

import (
	"github.com/hibiken/asynq"
	"github.com/labstack/echo/v4"
	"github.com/labstack/gommon/log"
	"github.com/sparkymat/photobook/internal"
	"github.com/sparkymat/photobook/internal/config"
	"github.com/sparkymat/photobook/internal/database"
	"github.com/sparkymat/photobook/internal/dbx"
	"github.com/sparkymat/photobook/internal/route"
	"github.com/sparkymat/photobook/internal/service/user"
)

func main() {
	cfg, err := config.New()
	if err != nil {
		panic(err)
	}

	dbDriver, err := database.New(cfg.DatabaseURL())
	if err != nil {
		log.Error(err)
		panic(err)
	}

	if err = dbDriver.AutoMigrate(); err != nil {
		log.Error(err)
		panic(err)
	}

	// Initialize web server
	db := dbx.New(dbDriver.DB())

	asynqClient := asynq.NewClient(asynq.RedisClientOpt{Addr: cfg.RedisURL()})
	defer asynqClient.Close()

	userService := user.New(db)

	services := internal.Services{
		User: userService,
	}

	e := echo.New()

	route.Setup(e, cfg, services)
	route.PrintRoutes(e)

	e.Logger.Fatal(e.Start(":8080"))
}
