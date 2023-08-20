"use client"

import { editTodo, deleteTodo } from '@/api';
import { Task } from '@/types';
import React, { use } from 'react'
import { useState, useRef, useEffect } from 'react';

interface TodoProps {
  todo: Task;
}

const Todo = ({ todo }: TodoProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleEdit = async () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    await editTodo(todo.id, text);
    setIsEditing(false);
  }

  const handleDelete = async () => {
    await deleteTodo(todo.id);
  }

  return (
    <li className='flex justify-between p-4 bg-white border-l-4 border-blue-500 rounded shadow-md'>
      {isEditing ? (
          <input
            ref={inputRef}
            type='text' className='mr-2 py-1 rounded border-gray-400 border'
            value={text}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
            />
        ) : (
          <span>{todo.text}</span>
        )}
      <div>
        {isEditing ? (
          <button className='text-blue-500 mr-5' onClick={handleSave}>Save</button>
        ) : (
          <button className='text-green-500 mr-5' onClick={handleEdit}>Edit</button>
        )}
        <button className='text-red-500' onClick={handleDelete}>Delete</button>
      </div>
    </li>
  )
}

export default Todo
