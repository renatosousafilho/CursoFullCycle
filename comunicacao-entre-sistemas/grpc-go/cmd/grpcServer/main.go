package main

import (
	"database/sql"
	"net"
	"renatosousafilho/grpc-go/internal/database"
	"renatosousafilho/grpc-go/internal/pb"
	"renatosousafilho/grpc-go/internal/service"

	_ "github.com/mattn/go-sqlite3"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

func main() {
	db, err := sql.Open("sqlite3", "./db.sqlite")
	if err != nil {
		panic(err)
	}
	defer db.Close()

	categoryDB := database.NewCategory(db)
	categoryService := service.NewCategoryService(*categoryDB)

	grpcServer := grpc.NewServer()
	pb.RegisterCategoryServiceServer(grpcServer, categoryService)
	reflection.Register(grpcServer)

	lis, err := net.Listen("tcp", ":50051")
	if err != nil {
		panic(err)
	}

	// Serve gRPC Server and if any error occurs, panic
	if err := grpcServer.Serve(lis); err != nil {
		panic(err)
	}
}
