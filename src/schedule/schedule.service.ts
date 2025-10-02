import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Schedule } from './entities/schedule.entity';
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  where,
  query,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';
import { getApp } from 'firebase/app';

@Injectable()
export class ScheduleService {
  private db = getFirestore(getApp());
  private collectionRef = collection(this.db, 'Schedules');

  async create(createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    const ref = await addDoc(this.collectionRef, createScheduleDto as any);
    return { id: ref.id, ...(createScheduleDto as any) } as Schedule;
  }

  async findAll(): Promise<Schedule[]> {
    const snapshot = await getDocs(this.collectionRef);
    return snapshot.docs.map(
      (d) => ({ id: d.id, ...(d.data() as any) }) as Schedule,
    );
  }

  async findOne(id: string): Promise<Schedule> {
    const ref = doc(this.db, 'Schedules', id);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      throw new NotFoundException('Schedule not found');
    }
    return { id: snap.id, ...(snap.data() as any) } as Schedule;
  }

  async getSchedulesByUser(userId: string): Promise<Schedule[]> {
    const snapshot = await getDocs(
      query(this.collectionRef, where('userId', '==', userId)),
    );

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Schedule[];
  }

  async update(
    id: string,
    updateScheduleDto: UpdateScheduleDto,
  ): Promise<Schedule> {
    const ref = doc(this.db, 'Schedules', id);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      throw new NotFoundException('Schedule not found');
    }
    const prev = snap.data() as any;
    const merged = {
      ...prev,
      ...updateScheduleDto,
    };
    await setDoc(ref, merged, { merge: true });
    return { id, ...(merged as any) } as Schedule;
  }

  async remove(id: string): Promise<{ id: string; deleted: boolean }> {
    const ref = doc(this.db, 'Schedules', id);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      throw new NotFoundException('Schedule not found');
    }
    await deleteDoc(ref);
    return { id, deleted: true };
  }
}
