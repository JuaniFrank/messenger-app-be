import 'webpack/hot/poll?100';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

declare const module: any;

async function bootstrap() {
  const firebaseConfig = {
    apiKey: 'AIzaSyCoTiAPLwqJq8L4s0-fA-ToVt6OP09LHJs',
    authDomain: 'kairos-be-project.firebaseapp.com',
    projectId: 'kairos-be-project',
    storageBucket: 'kairos-be-project.firebasestorage.app',
    messagingSenderId: '839433508143',
    appId: '1:839433508143:web:e3871a1c33826e46457dda',
    measurementId: 'G-LGNZJ2N7D2',
  };

  initializeApp(firebaseConfig);

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const PORT = 3000;
  await app.listen(PORT, '0.0.0.0');

  console.log(
    `🚀 Application is running on: http://${getLocalIPAddress()}:${PORT}`,
  );

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  process.stdout.write('NestJS logs enabled\n');
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
