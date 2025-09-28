// src/App.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import type { Student } from './features/students/types';
import StudentForm from './features/students/StudentForm';
import StudentList from './features/students/StudentList';
import StudentSearchSortFilter from './features/students/StudentSearchSortFilter';
import {
  getAllUser,
  addUser,
  updateUser,
  deleteUser,
} from './store/slices/studentSlice';

const App: React.FC = () => {
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState<Partial<Student> | undefined>(undefined);

  const [search, setSearch] = useState('');
  const [gradeFilter, setGradeFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'age'>('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  // lấy dữ liệu từ store
  const students: Student[] = useSelector((state: any) => state.students.students);
  const dispatch = useDispatch<any>();

  // lấy dữ liệu khi mount
  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  // mở form thêm mới
  const handleAddClick = () => {
    setEditing(undefined);
    setOpenForm(true);
  };

  // submit form thêm hoặc sửa
  const handleSubmit = (data: { id?: string; name: string; age: number; grade: string }) => {
    if (data.id) {
      // cập nhật
      dispatch(updateUser(data));
    } else {
      // thêm mới – không cần id vì json-server sẽ tự tạo
      dispatch(addUser(data));
    }
    setOpenForm(false);
  };

  // click edit
  const handleEdit = (s: Student) => {
    setEditing(s);
    setOpenForm(true);
  };

  // click delete
  const handleDelete = (id: string) => {
    if (window.confirm('Xác nhận xóa học sinh?')) {
      dispatch(deleteUser(id));
    }
  };

  // clear filter/sort
  const handleClearFilters = () => {
    setSearch('');
    setGradeFilter('all');
    setSortBy('name');
    setSortDir('asc');
  };

  // danh sách sau search/filter/sort
  const filteredSorted = useMemo(() => {
    let out = students.slice();

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      out = out.filter((s) => s.name.toLowerCase().includes(q));
    }

    if (gradeFilter !== 'all') {
      out = out.filter((s) => s.grade === gradeFilter);
    }

    out.sort((a, b) => {
      if (sortBy === 'name') {
        const r = a.name.localeCompare(b.name);
        return sortDir === 'asc' ? r : -r;
      } else {
        const r = a.age - b.age;
        return sortDir === 'asc' ? r : -r;
      }
    });

    return out;
  }, [students, search, gradeFilter, sortBy, sortDir]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">🎓 Student Manager</h1>

      {/* Nút Add */}
      <div className="flex gap-4 mb-4">
        <Button variant="contained" color="primary" onClick={handleAddClick}>
          Add Student
        </Button>
      </div>

      {/* Bộ lọc + sắp xếp */}
      <StudentSearchSortFilter
        search={search}
        gradeFilter={gradeFilter}
        sortBy={sortBy}
        sortDir={sortDir}
        onSearchChange={setSearch}
        onGradeChange={setGradeFilter}
        onSortChange={(by, dir) => {
          setSortBy(by);
          setSortDir(dir);
        }}
        onClear={handleClearFilters}
      />

      {/* Danh sách student */}
      <div className="mt-6">
        <StudentList students={filteredSorted} onEdit={handleEdit} onDelete={handleDelete} />
      </div>

      {/* Form thêm/sửa */}
      <StudentForm
        open={openForm}
        initial={editing}
        onClose={() => setOpenForm(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default App;
