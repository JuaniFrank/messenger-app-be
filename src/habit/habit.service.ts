import { Injectable } from '@nestjs/common';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import {
  collection,
  getDocs,
  getFirestore,
  where,
  query,
} from 'firebase/firestore';
import { getApp } from 'firebase/app';
import { Habit } from './entities/habit.entity';

@Injectable()
export class HabitService {
  private db = getFirestore(getApp());
  private collectionRef = collection(this.db, 'Habits');

  create(createHabitDto: CreateHabitDto) {
    return 'This action adds a new habit';
  }

  async findAll() {
    const res = await getDocs(this.collectionRef);

    return res.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Habit[];
  }

  async getHabitsByUser(userId: string) {
    const res = await getDocs(
      query(this.collectionRef, where('userId', '==', userId)),
    );
    return res.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Habit[];
  }

  findOne(id: number) {
    return `This action returns a #${id} habit`;
  }

  async getHabitByUserIdAndDate(userId: string, date: string) {
    // 🔹 1. Traer los hábitos del usuario
    const snapshot = await getDocs(
      query(this.collectionRef, where('userId', '==', userId)),
    );

    const allHabits = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // 🔹 2. Parsear la fecha (viene como 7-10-2025)
    const [day, month, year] = date.split('-').map(Number);
    const today = new Date(year, month - 1, day);
    console.log(today);
    const todayDay = today.getDay(); // 0 = domingo
    const todayDate = today.getDate();
    console.log(todayDate);
    console.log(todayDay);

    // 🔹 3. Filtrar según la frecuencia
    const habitsForToday = allHabits.filter((habit: any) => {
      // Soportar tanto "frequency" como "Frecuency"
      const frequency = habit.frequency || habit.Frecuency;
      if (!habit.isActive || !frequency) return false;

      // convertir timestamp Firestore → Date
      let createdAtDate: Date;
      if (habit.createdAt?.seconds) {
        createdAtDate = new Date(habit.createdAt.seconds * 1000);
      } else {
        createdAtDate = new Date(habit.createdAt);
      }

      switch (frequency) {
        case 'daily':
          return true;

        case 'weekly':
          if (Array.isArray(habit.customDays) && habit.customDays.length > 0) {
            return habit.customDays.includes(todayDay);
          }
          return createdAtDate.getDay() === todayDay;

        case 'monthly':
          return createdAtDate.getDate() === todayDate;

        case 'custom':
          return (
            Array.isArray(habit.customDays) &&
            habit.customDays.includes(todayDay)
          );

        default:
          return false;
      }
    });

    return habitsForToday;
  }

  update(id: number, updateHabitDto: UpdateHabitDto) {
    return `This action updates a #${id} habit`;
  }

  remove(id: number) {
    return `This action removes a #${id} habit`;
  }
}
