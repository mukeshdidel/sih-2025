
const Input = ({label, type, placeholder, value, onChange}: {label: string, type: string, placeholder: string, value: string | number, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void}) => {
  return (
        <div>
            <label className="block text-gray-300 mb-2" htmlFor={label}>
                {label}
            </label>
            <input
                id={label}
                type={type}
                value={value}
                onChange={onChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:border-green-400 focus:outline-none"
                placeholder={placeholder}
                autoComplete={`${ type === 'email' ? 'email' : type === 'password' ? 'new-password' : '' }`}
            />
        </div>
  )
}

export default Input
