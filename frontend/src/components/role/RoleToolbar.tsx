// src/components/role/RoleToolbar.tsx

'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { setRole } from '@/redux/roleSlice';

const roles = ['annotator', 'reviewer', 'admin'] as const;

export default function RoleToolbar() {
  const currentRole = useSelector((state: RootState) => state.role);
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-center space-x-3 bg-white rounded-xl shadow px-4 py-2">
      <label htmlFor="role" className="font-medium text-gray-700">🧑‍💻 Current Role:</label>
      <select
        id="role"
        value={currentRole}
        onChange={(e) => dispatch(setRole(e.target.value))}
        className="border border-gray-300 rounded px-2 py-1"
      >
        {roles.map((role) => (
          <option key={role} value={role}>
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}