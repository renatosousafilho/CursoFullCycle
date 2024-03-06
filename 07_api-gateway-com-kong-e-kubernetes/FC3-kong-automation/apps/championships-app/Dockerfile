##Builder Image
FROM golang:1.13-stretch as builder
ENV GO111MODULE=on
COPY . /championships
WORKDIR /championships
RUN go mod download
RUN CGO_ENABLED=0 GOOS=linux go build -o bin/application

#s Run Image
FROM scratch
COPY --from=builder /championships/assets /assets
COPY --from=builder /championships/bin/application application
EXPOSE 9999
ENTRYPOINT ["./application"]