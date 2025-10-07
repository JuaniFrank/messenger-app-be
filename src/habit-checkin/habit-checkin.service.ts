import { Injectable, NotFoundException } from '@nestjs/common';
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
  where,
} from 'firebase/firestore';
import { getApp } from 'firebase/app';
import { HabitCheckin } from './entities/habit-checkin.entity';

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

  create(createHabitCheckinDto: CreateHabitCheckinDto) {
    return addDoc(this.collectionRef, createHabitCheckinDto);
  }

  update(id: number, updateHabitCheckinDto: UpdateHabitCheckinDto) {
    return `This action updates a #${id} habitCheckin`;
  }

  remove(id: number) {
    return `This action removes a #${id} habitCheckin`;
  }
}
