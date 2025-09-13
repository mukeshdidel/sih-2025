
const Input = ({label, type, placeholder, value, onChange}: {label: string, type: string, placeholder: string, value: string | number, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void}) => {
  return (
        <div>
            <label className="block text-gray-800 mb-2" htmlFor={label}>
                {label}
            </label>
            <input
                id={label}
                type={type}
                value={value}
                onChange={onChange}
                className="w-full px-4 py-3 rounded-lg bg-slate-400 text-gray-800 border border-gray-700 focus:border-blue-600 focus:outline-none"
                placeholder={placeholder}
                autoComplete={`${ type === 'email' ? 'email' : type === 'password' ? 'new-password' : '' }`}
            />
        </div>
  )
}

export default Input
