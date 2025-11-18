import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateHabitCheckinDto } from './dto/create-habit-checkin.dto';
import { UpdateHabitCheckinDto } from './dto/update-habit-checkin.dto';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  Timestamp,
  where,
} from 'firebase/firestore';
import { getApp } from 'firebase/app';
import { HabitCheckin } from './entities/habit-checkin.entity';
import { getDayRange, parseQueryDate } from 'src/utils/date.utils';

@Injectable()
export class HabitCheckinService {
  private db = getFirestore(getApp());
  private collectionRef = collection(this.db, 'HabitCheckins');

  async findAll() {
    const res = await getDocs(this.collectionRef);
    return res.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as HabitCheckin[];
  }

  async findOne(id: string) {
    const ref = doc(this.db, 'HabitCheckins', id);
    const res = await getDoc(ref);
    if (!res.exists()) {
      throw new NotFoundException('HabitCheckin not found');
    }

    return {
      id: res.id,
      ...res.data(),
    } as HabitCheckin;
  }

  // TODO: Implement
  // findAllByUser(userId: string) {
  //   return `This action returns all habitCheckin for user #${userId}`;
  // }

  async findAllByHabit(habitId: string) {
    const res = await getDocs(
      query(this.collectionRef, where('habitId', '==', habitId)),
    );
    return res.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as HabitCheckin[];
  }

  async getHabitCheckinsByHabitsIdsAndDate(habitsIds: string[], date: string) {
    //Query param:  date=04-11-2025
    console.log('habitsIds from getHabitCheckinsByHabitsIdsAndDate', habitsIds);
    console.log('date from getHabitCheckinsByUserIdAndDate', date);

    const { start, end } = getDayRange(date);

    console.log('start', start);
    console.log('end', end);

    const res = await getDocs(
      query(
        this.collectionRef,
        where('habitId', 'in', habitsIds),
        where('date', '>=', start),
        where('date', '<=', end),
      ),
    );
    return res.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as HabitCheckin[];
  }

  async getHabitCheckinsByHabitIdAndDate(habitId: string, date: string) {
    console.log('habitId', habitId);
    console.log('date', date);
    const res = await getDocs(
      query(
        this.collectionRef,
        where('habitId', '==', habitId),
        where('date', '==', date),
      ),
    );
    return res.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as HabitCheckin[];
  }

  async create(createHabitCheckinDto: CreateHabitCheckinDto) {
    // 🔹 Convertir ISO string a Firestore Timestamp
    const firestoreDate = Timestamp.fromDate(
      new Date(createHabitCheckinDto.date),
    );

    try {
      // 🔹 Guardar en Firestore
      const docRef = await addDoc(this.collectionRef, {
        habitId: createHabitCheckinDto.habitId,
        date: firestoreDate,
        completed: !!createHabitCheckinDto.completed,
        quantity: createHabitCheckinDto.quantity ?? 1,
        notes: createHabitCheckinDto.notes ?? '',
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });

      return {
        success: true,
        message: 'Habit checkin created successfully',
        data: {
          id: docRef.id,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error creating habit checkin',
      };
    }
  }

  update(id: number, updateHabitCheckinDto: UpdateHabitCheckinDto) {
    return `This action updates a #${id} habitCheckin`;
  }

  remove(id: number) {
    return `This action removes a #${id} habitCheckin`;
  }
}
