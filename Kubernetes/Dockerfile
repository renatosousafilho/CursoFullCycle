FROM golang:1.15
WORKDIR /app
COPY src/ /app
RUN go build -o server
CMD [ "./server" ]