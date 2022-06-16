import { createConnections } from 'typeorm';

createConnections().then(() => {
  console.log("Database connected successfully...");
}).catch(error => console.log(error));
