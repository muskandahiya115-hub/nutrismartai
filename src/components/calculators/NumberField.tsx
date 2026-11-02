import type { ChangeEvent } from 'react';

interface NumberFieldProps {
  id: string;
  label: string;
  value: string;
  unit: string;
  placeholder: string;
  error?: string;
  onChange: (value: string) => void;
}

export default function NumberField({ id, label, value, unit, placeholder, error, onChange }: NumberFieldProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value);

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-stone-700">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={0}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`input-base pr-16 ${error ? '!border-red-400 focus:!ring-red-100' : ''}`}
        />
        <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm font-medium text-stone-400">
          {unit}
        </span>
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
