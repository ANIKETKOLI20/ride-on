import { useState } from 'react';

const InputField = ({ label, id, name, type = 'text', onChange, value, icon, showHidePassword }) => {
	const [inputType, setInputType] = useState(type);
	const [showPassword, setShowPassword] = useState(false);

	const handleIconClick = () => {
		if (showHidePassword) {
			setShowPassword(!showPassword);
			setInputType(showPassword ? 'password' : 'text');
		}
	};

	const renderIcon = () => {
		if (showHidePassword) {
			return (
				<span
					className='absolute inset-y-0 left-0 flex items-center pl-3 cursor-pointer'
					onClick={handleIconClick}
				>
					<i className={`fas ${inputType === 'password' ? 'fa-eye' : 'fa-eye-slash'}`}></i>
				</span>
			);
		} else if (icon) {
			return (
				<span className='absolute inset-y-0 left-0 flex items-center pl-3'>
					<i className={`fas ${icon}`}></i>
				</span>
			);
		}
		return null;
	};

	return (
		<div className='relative'>
			<label htmlFor={id} className='block text-sm font-medium text-gray-700'>
				{label}
			</label>
			<div className='relative mt-1'>
				{renderIcon()}
				<input
					className={`p-2 w-full border rounded-md text-white ${
						icon || showHidePassword ? 'pl-10' : 'pl-3'
					} ${
						showHidePassword ? 'pr-10' : 'pr-3'
					} focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300`}
					id={id}
					type={inputType}
					name={name}
					value={value}
					onChange={onChange}
				/>
			</div>
		</div>
	);
};

export default InputField;
