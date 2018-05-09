FROM golang:1.10.2-alpine
WORKDIR /go/src/github.com/larryyangsen/upload-throw/
COPY main.go .
COPY vendor ./vendor
RUN go build

FROM alpine:3.6
WORKDIR /upload-throw
COPY --from=0 /go/src/github.com/larryyangsen/upload-throw/upload-throw ./
COPY ./public ./public
RUN mkdir upload
EXPOSE 8080
ENTRYPOINT [ "./upload-throw" ]

