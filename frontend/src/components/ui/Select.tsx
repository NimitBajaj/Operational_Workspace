interface Option {
  value: string;
  label: string;
}

interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Option[];
}

export default function Select({
  label,
  options,
  ...props
}: SelectProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">
        {label}
      </label>

      <select
        {...props}
        className="h-10 rounded-md border border-slate-300 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {options.map(option => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}