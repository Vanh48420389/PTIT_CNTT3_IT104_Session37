import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import type { Student } from './types';

interface Props {
  open: boolean;
  initial?: Partial<Student>;
  onClose: () => void;
  onSubmit: (data: { id?: string; name: string; age: number; grade: string }) => void;
}

const StudentForm: React.FC<Props> = ({
  open,
  initial = {},
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState<number>(16);
  const [grade, setGrade] = useState('');

  // reset form mỗi khi mở hoặc đổi initial
  useEffect(() => {
    setName(initial.name ?? '');
    setAge(initial.age ?? 16);
    setGrade(initial.grade ?? '');
  }, [initial, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return; // validate đơn giản

    // Nếu đang sửa => có id
    const payload =
      initial.id !== undefined
        ? {
            id: initial.id,
            name: name.trim(),
            age: Number(age),
            grade: grade.trim(),
          }
        : {
            name: name.trim(),
            age: Number(age),
            grade: grade.trim(),
          };

    onSubmit(payload);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <DialogTitle>{initial.id ? 'Edit Student' : 'Add Student'}</DialogTitle>
        <DialogContent className="flex flex-col gap-[15px] space-y-4 !pt-2">
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
            autoFocus
          />
          <TextField
            label="Age"
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            fullWidth
            inputProps={{ min: 1 }}
            required
          />
          <TextField
            label="Grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            fullWidth
            placeholder="e.g. 10A1"
            required
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {initial.id ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default StudentForm;
