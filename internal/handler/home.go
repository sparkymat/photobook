package handler

import (
	"log"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/sparkymat/photobook/internal"
	"github.com/sparkymat/photobook/internal/view"
)

func Home(_ internal.ConfigService, _ internal.UserService) echo.HandlerFunc {
	return func(c echo.Context) error {
		csrfToken := getCSRFToken(c)
		if csrfToken == "" {
			log.Print("error: csrf token not found")

			return c.String(http.StatusInternalServerError, "server error")
		}

		pageHTML := view.Home()
		document := view.BasicLayout("photobook", csrfToken, pageHTML)

		return Render(c, http.StatusOK, document)
	}
}
