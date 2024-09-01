import { collection, addDoc, Timestamp, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../components/firebase';

export const addTask = async (taskData) => {
  try {
    const userId = auth.currentUser.uid; // Get the current user ID
    const taskRef = await addDoc(collection(db, 'tasks', userId, 'userTasks'), {
      ...taskData,
      createdBy: userId,
      createdAt: Timestamp.fromDate(new Date())
    });
    return taskRef.id; // Return the task ID if needed
  } catch (error) {
    console.error("Error adding task: ", error);
    throw error;
  }
};

// Fetch task by ID
export const getTaskById = async (taskId) => {
  try {
    const userId = auth.currentUser.uid;
    const taskDoc = await getDoc(doc(db, 'tasks', userId, 'userTasks', taskId));
    if (taskDoc.exists()) {
      return taskDoc.data();
    } else {
      throw new Error('Task not found');
    }
  } catch (error) {
    console.error('Error getting task:', error);
    throw error;
  }
};

// Update task
export const updateTask = async (taskId, taskData) => {
  try {
    const userId = auth.currentUser.uid;
    const taskRef = doc(db, 'tasks', userId, 'userTasks', taskId);
    await updateDoc(taskRef, taskData);
  } catch (error) {
    console.error('Error updating task: ', error);
    throw error;
  }
};

// Delete task
export const deleteTask = async (taskId) => {
  try {
    const userId = auth.currentUser.uid;
    const taskRef = doc(db, 'tasks', userId, 'userTasks', taskId);

    const taskSnap = await getDoc(taskRef);

    if (!taskSnap.exists()) {
      throw new Error("Task not found.");
    }

    const taskData = taskSnap.data();

    if (taskData.createdBy !== userId) {
      throw new Error("You are not authorized to delete this task.");
    }

    await deleteDoc(taskRef);
    
    return `Task ${taskId} successfully deleted.`;

  } catch (error) {
    console.error("Error deleting task: ", error.message);
    throw error;
  }
};