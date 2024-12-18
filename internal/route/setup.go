package route

import (
	"fmt"
	"net/http"
	"slices"
	"strings"

	"github.com/gorilla/sessions"
	"github.com/jedib0t/go-pretty/table"
	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/samber/lo"
	"github.com/sparkymat/photobook/internal"
)

func Setup(e *echo.Echo, cfg internal.ConfigService, services internal.Services) {
	e.GET("/health", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
	})

	app := e.Group("")
	app.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
		Format: "[${time_rfc3339}] Got ${method} on ${uri} from ${remote_ip}. Responded with ${status} in ${latency_human}.\n",
	}))
	app.Use(middleware.Recover())

	app.Static("/js", "public/js")
	app.Static("/css", "public/css")
	app.Static("/images", "public/images")
	app.Static("/fonts", "public/fonts")

	// Start of router setup code generated by oxgen. DO NOT EDIT.
	// End of router setup code generated by oxgen. DO NOT EDIT.

	app.Use(session.Middleware(sessions.NewCookieStore([]byte(cfg.SessionSecret()))))

	registerAPIRoutes(app, cfg, services)
	registerWebRoutes(app, cfg, services)
}

func PrintRoutes(e *echo.Echo) {
	routes := e.Routes()
	slices.SortFunc(routes, func(a, b *echo.Route) int {
		return strings.Compare(a.Path, b.Path)
	})

	routeRows := lo.Map(routes, func(r *echo.Route, _ int) table.Row {
		method := r.Method
		if method == echo.RouteNotFound {
			method = "ANY"
		}

		return table.Row{
			method + " " + r.Path,
			r.Name,
		}
	})

	tw := table.NewWriter()

	tw.AppendRows(routeRows)
	tw.SetIndexColumn(1)
	tw.SetTitle("Available Routes")

	tw.Style().Options.SeparateRows = true

	fmt.Println(tw.Render())
}
