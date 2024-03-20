FROM golang:1.21.6 as builder
WORKDIR /app
COPY . .
RUN GCO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o server

FROM scratch
WORKDIR /app
COPY --from=builder /app/server .
ENTRYPOINT ["./server"]
