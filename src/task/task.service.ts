import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  Timestamp,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { getApp } from 'firebase/app';

@Injectable()
export class TaskService {
  private db = getFirestore(getApp());

  private collectionRef = collection(this.db, 'Tasks');

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const nowIso = new Date().toISOString();
    const data = {
      ...createTaskDto,
      createdAt: nowIso,
      updatedAt: nowIso,
      completedAt: createTaskDto.completed ? nowIso : null,
    } as Omit<Task, 'id' | 'subtasks'>;

    const docRef = await addDoc(this.collectionRef, data as any);
    return { id: docRef.id, ...(data as any) } as Task;
  }

  async findAll(): Promise<Task[]> {
    const snapshot = await getDocs(this.collectionRef);
    return snapshot.docs.map(
      (d) => ({ id: d.id, ...(d.data() as any) }) as Task,
    );
  }

  async findOne(id: string): Promise<Task> {
    const ref = doc(this.db, 'Tasks', id);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      throw new NotFoundException('Task not found');
    }
    return { id: snap.id, ...(snap.data() as any) } as Task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const ref = doc(this.db, 'Tasks', id);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      throw new NotFoundException('Task not found');
    }
    const prev = snap.data() as any;
    const nowIso = new Date().toISOString();
    const merged = {
      ...prev,
      ...updateTaskDto,
      updatedAt: nowIso,
      completedAt: updateTaskDto.completed ? nowIso : prev.completedAt,
    };
    await setDoc(ref, merged, { merge: true });
    return { id, ...(merged as any) } as Task;
  }

  async remove(id: string): Promise<{ id: string; deleted: boolean }> {
    const ref = doc(this.db, 'Tasks', id);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      throw new NotFoundException('Task not found');
    }
    await deleteDoc(ref);
    return { id, deleted: true };
  }
}
