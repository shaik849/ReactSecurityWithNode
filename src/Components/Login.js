import React, { useRef, useState } from 'react';

const Login = ({ onLogin }) => {
    const [data, setData] = useState(null); // Store login response data
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [formError, setFormError] = useState('');
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const fetchData = async () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        try {
            const response = await fetch(process.env.REACT_APP_API_URL + 'login', {
                method: 'POST', // Use POST to send data
                headers: {
                    'Content-Type': 'application/json', // Specify JSON format
                },
                body: JSON.stringify({
                    email, // Send email
                    password, // Send password
                }),
            });

            const jsonData = await response.json();
            setData(jsonData); // Store response data in state

            if (jsonData.token) {
                // Store the token in localStorage
                localStorage.setItem('token', jsonData.token);
                // Clear form errors and set success message
                setEmailError('');
                setPasswordError('');
                setFormError('');
                onLogin(); // Navigate to the home page
            } else {
                setFormError(jsonData.message || 'Incorrect credentials. Please check your email and password.');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setFormError('An error occurred. Please try again.');
        }
    };

    const submitButton = (e) => {
        e.preventDefault(); // Prevent the form from submitting
        setData(null); // Clear previous data on new submit
        let isValid = true;
        setEmailError('');
        setPasswordError('');
        setFormError('');

        // Retrieve values from the input fields
        const email = emailRef.current.value.trim();
        const password = passwordRef.current.value.trim();

        // Perform validation
        if (email === '') {
            setEmailError('Email is required');
            isValid = false;
        }

        if (password === '') {
            setPasswordError('Password is required');
            isValid = false;
        }

        if (isValid) {
            fetchData(); // Call fetchData when validation passes
        }
    };

    return (
        <div>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Login to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={submitButton}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    ref={emailRef}
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${emailError ? 'ring-red-500' : 'ring-gray-300'} placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                                />
                                {emailError && (
                                    <p className="text-red-500 text-xs mt-2">{emailError}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    ref={passwordRef}
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${passwordError ? 'ring-red-500' : 'ring-gray-300'} placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                                />
                                {passwordError && (
                                    <p className="text-red-500 text-xs mt-2">{passwordError}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Log in
                            </button>
                        </div>
                    </form>

                    {/* Display error if login fails */}
                    {formError && (
                        <div className="mt-4 bg-red-100 text-red-600 text-center py-2 rounded">
                            {formError}
                        </div>
                    )}

                    {/* Display success message if login succeeds */}
                    {data && data.token && (
                        <div className="mt-4 bg-green-100 text-green-600 text-center py-2 rounded">
                            Welcome, {emailRef.current.value}!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
