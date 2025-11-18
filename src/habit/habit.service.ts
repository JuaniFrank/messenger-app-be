import { Injectable } from '@nestjs/common';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';

import {
  collection,
  getDocs,
  getFirestore,
  where,
  query,
  addDoc,
} from 'firebase/firestore';
import { getApp } from 'firebase/app';
import { Habit } from './entities/habit.entity';
import { HabitCheckinService } from 'src/habit-checkin/habit-checkin.service';
import { parseQueryDate, toJSDate } from 'src/utils/date.utils';

@Injectable()
export class HabitService {
  private db = getFirestore(getApp());
  private collectionRef = collection(this.db, 'Habits');

  constructor(private readonly habitCheckinService: HabitCheckinService) {}

  async create(createHabitDto: CreateHabitDto) {
    //   const habitData = {
    //     userId: auth.currentUser?.uid || "",
    //     name: name.trim(),
    //     description: description.trim() || undefined,
    //     frequency,
    //     quantity: quantityNum,
    //     measure: measure.trim() || "vez",
    //     streak: 0,
    //     longestStreak: 0,
    //     isActive: true,
    //     customDays: frequency === "custom" ? customDays : undefined,
    //     createdAt: new Date().toISOString(),
    //     updatedAt: new Date().toISOString(),
    //   };

    //   const response = await createHabit(habitData);
    const docRef = await addDoc(this.collectionRef, {
      ...createHabitDto,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as any);

    return {
      success: true,
      message: 'Habit created successfully',
      data: {
        id: docRef.id,
      },
    };
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

  async getHabitsAndCheckinsByUserIdAndDate(userId: string, date: string) {
    try {
      const habits = await this.getHabitByUserIdAndDate(userId, date);

      console.log('habits', habits);

      if (habits.length > 0) {
        const checkins =
          await this.habitCheckinService.getHabitCheckinsByHabitsIdsAndDate(
            habits.map((habit) => habit.id),
            date,
          );
        return habits.map((habit) => ({
          ...habit,
          checkins: checkins.filter((checkin) => checkin.habitId === habit.id),
        }));
      } else {
        return {
          success: true,
          message: 'No habits found',
          data: [],
        };
      }
    } catch (error) {
      console.error('error', error);
      return {
        success: false,
        message: 'Error getting habits and checkins',
      };
    }
  }

  async getHabitByUserIdAndDate(userId: string, date: string) {
    // 1) obtener hábitos del usuario
    const snapshot = await getDocs(
      query(this.collectionRef, where('userId', '==', userId)),
    );

    const allHabits = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // 2) parsear fecha de query
    const today = parseQueryDate(date);
    if (!today) {
      throw new Error(
        'Formato de fecha inválido. Debe ser "D-M-YYYY" o "DD-MM-YYYY"',
      );
    }

    // Normalizaciones
    const todayDay = today.getDay(); // 0 = domingo, 1 = lunes, ...
    const todayDate = today.getDate(); // día del mes
    // const todayMonth = today.getMonth() + 1;

    // 3) filtrar por frecuencia
    const habitsForToday = allHabits.filter((habit: any) => {
      const isActive = !!habit.isActive;
      if (!isActive) return false;

      // Soportar typos en el campo
      const frequency = habit.frequency || habit.Frecuency || null;
      if (!frequency) return false;

      // convertir createdAt a Date (robusto)
      const createdAtDate = toJSDate(habit.createdAt);
      // Si no hay createdAt, asumimos que fue creado antes o lo rechazamos según tu lógica:
      if (!createdAtDate) {
        // decidir: si no tenés createdAt tal vez dejar pasar; aquí lo rechazamos.
        return false;
      }

      // Si el hábito fue creado después de la fecha consultada, no aplica
      if (createdAtDate.getTime() > today.getTime()) return false;

      // Normalizar customDays a array de 0..6 (si viene como strings o 1..7)
      let customDays: number[] = [];
      if (Array.isArray(habit.customDays)) {
        customDays = habit.customDays
          .map((v: any) => Number(v))
          .filter((n: number) => !Number.isNaN(n))
          .map((n: number) => {
            // si vienen 1..7 (Lunes=1?) no sabemos el contrato; asumimos que usuario puede enviar 0..6 o 1..7
            if (n >= 1 && n <= 7) {
              // convertir 7->0 (domingo) y 1->1 lunes etc.
              return n === 7 ? 0 : n;
            }
            return n; // si ya está en 0..6
          })
          .filter((n: number) => n >= 0 && n <= 6);
      }

      switch (frequency.toLowerCase()) {
        case 'daily':
          return true;

        case 'weekly':
          if (customDays.length > 0) {
            return customDays.includes(todayDay);
          }
          // sin customDays -> repetir el mismo día de la semana en que fue creado
          return createdAtDate.getDay() === todayDay;

        case 'monthly':
          // repetir en el mismo día del mes que createdAt
          const createdDayOfMonth = createdAtDate.getDate();
          // caso: si createdDayOfMonth > número de días del mes actual, podrías decidir
          // que no se cumpla o mapear al último día del mes; aquí hacemos la comparación directa
          return createdDayOfMonth === todayDate;

        case 'custom':
          // customDays obligatorio
          if (customDays.length === 0) return false;
          return customDays.includes(todayDay);

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
