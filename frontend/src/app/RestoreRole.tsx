'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setRole } from '@/redux/roleSlice';

export default function RestoreRole() {
  const dispatch = useDispatch();

  useEffect(() => {
    const stored = localStorage.getItem('role');
    if (stored) {
      dispatch(setRole(stored));
    }
  }, [dispatch]);

  return null;
}