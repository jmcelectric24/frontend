'use client';
import { useRouter } from 'next/navigation';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface DropdownProps {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  month: string;
}

export default function LTDataDropdown({ label, options, value, month }: DropdownProps) {
  const router = useRouter();

  const handleChange = (event: SelectChangeEvent) => {
    const selectedOption = options.find((option) => option.value === event.target.value);
    if (selectedOption) {
      console.log(selectedOption);
      router.push(`../${selectedOption.value}/${month}`);
    }
  };

  return (
    <div className="flex justify-center m-4 mt-4">
      <FormControl className="w-full max-w-xs md:max-w-md lg:max-w-lg">
        <InputLabel id={`${label}-label`}>{label}</InputLabel>
        <Select
          labelId={`${label}-label`}
          id={`${label}-select`}
          value={value}
          label={label}
          onChange={handleChange}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
