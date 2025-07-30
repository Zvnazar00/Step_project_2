FROM node:14

WORKDIR /app

COPY app/package*.json ./

RUN npm install

COPY app .

HEALTHCHECK --interval=2s --timeout=5s --retries=3 CMD pwd || exit 1

# Expose the port the app runs on
EXPOSE 3000

ENTRYPOINT ["npm"]
# Define the command to run the app
CMD ["start"]