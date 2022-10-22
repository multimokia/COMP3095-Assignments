#!/bin/bash

function runFE() {
    cd ./src/main/ui
    npm install
    npm run dev
}

./mvnw spring-boot:run & runFE
