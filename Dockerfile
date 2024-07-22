# Dockerfile
FROM alpine:latest

# Install Zola
RUN apk add zola

# Set the working directory inside the container
WORKDIR /site

# Expose the port that Zola will serve the site on
EXPOSE 1111

# Default command to run Zola in serve mode
CMD ["zola", "serve", "--port", "1111", "--interface", "0.0.0.0"]
