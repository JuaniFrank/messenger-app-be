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

  update(id: number, updateHabitDto: UpdateHabitDto) {
    return `This action updates a #${id} habit`;
  }

  remove(id: number) {
    return `This action removes a #${id} habit`;
  }
}
