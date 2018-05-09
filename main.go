package main

import (
	"log"
	"net/http"
	"os"
	"os/signal"

	"github.com/gin-gonic/gin"
)

func httpServer(server *http.Server) {
	if err := server.ListenAndServe(); err != nil {
		if err == http.ErrServerClosed {
			log.Println("Server closed under request")
		} else {
			log.Fatal("Server closed unexpect")
		}
	}
}
func httpsServer(server *http.Server) {
	if err := server.ListenAndServeTLS("server.crt", "server.key"); err != nil {
		if err == http.ErrServerClosed {
			log.Println("Server closed under request")
		} else {
			log.Fatal("Server closed unexpect")
		}
	}
}
func main() {
	router := gin.Default()

	server := &http.Server{
		Addr:    ":8080",
		Handler: router,
	}
	quit := make(chan os.Signal)
	signal.Notify(quit, os.Interrupt)

	go func() {
		<-quit
		log.Println("receive interrupt signal")
		if err := server.Close(); err != nil {
			log.Fatal("Server close:", err)
		}
	}()

	router.Static("/", "./public")
	router.MaxMultipartMemory = 8 << 40
	router.POST("/api/upload", func(c *gin.Context) {
		file, err := c.FormFile("file")
		if err != nil {
			c.String(http.StatusBadRequest, err.Error())
			return
		}

		if err := c.SaveUploadedFile(file, "./upload/"+file.Filename); err != nil {
			c.String(http.StatusBadRequest, err.Error())
			return
		}
		c.String(http.StatusOK, "success")
	})

	httpServer(server)
}
