import { NestFactory } from '@nestjs/core'; 
import { AppModule } from './app.module';  
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const PORT = 3000; 
  await app.listen(PORT, '0.0.0.0'); 
  console.log(`Application is running on: http://${getLocalIPAddress()}:${PORT}`);
}
bootstrap();

function getLocalIPAddress() {
  const { networkInterfaces } = require('os');
  const nets = networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address; 
      }
    }
  }
  return 'localhost';
}
