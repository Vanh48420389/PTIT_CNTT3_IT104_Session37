import React from 'react';
import type { Student } from './types';
import StudentItem from './StudentItem';

interface Props {
  students: Student[];
  onEdit: (s: Student) => void;
  onDelete: (id: string) => void;
}

const StudentList: React.FC<Props> = ({ students, onEdit, onDelete }) => {
  if (!students || students.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        Không có học sinh nào
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {students.map((s) => (
        <StudentItem
          key={s.id}
          student={s}
          // chỉ truyền s vào onEdit
          onEdit={() => onEdit(s)}
          // đảm bảo truyền đúng id sang onDelete
          onDelete={() => onDelete(s.id as string)}
        />
      ))}
    </div>
  );
};

export default StudentList;
