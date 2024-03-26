import React, { useState, useEffect } from "react";

function LogReg() {
	const [data, setData] = useState({ login: "", password: "", email: "", isRegistering: false });

	useEffect(() => {
		if (data.isRegistering) {
			registerUser();
		}
	}, [data.isRegistering]);

	function handleLoginChange(e) {
		setData(prevData => ({
			...prevData,
			login: e.target.value,
		}));
	}
	function handlePasswordChange(e) {
		setData(prevData => ({
			...prevData,
			password: e.target.value,
		}));
	}
	function handleEmailChange(e) {
		setData(prevData => ({
			...prevData,
			email: e.target.value,
		}));
	}
	function handleSubmit(e) {
		e.preventDefault();
		if (data.isRegistering) {
			console.log("Registering data:", data);
		} else {
			console.log("Login data:", data);
		}
		setData({ login: "", password: "", email: "", isRegistering: false });
	}
	function handleRegisterIsTrue() {
		setData(prevData => ({
			...prevData,
			isRegistering: true,
		}));
	}
	function openLoginWindow() {
		const loginWindow = document.querySelector(".login-window");
		loginWindow.classList.toggle("display-block");
	}
	function switchLogReg() {
		const register = document.querySelector(".register-window");
		const login = document.querySelector(".login-window");
		register.classList.toggle("display-block");
		login.classList.toggle("display-none");
	}
	function userData() {
		fetch("http://localhost:7777/login", {
			method: "POST",
			headers: {
				"Content-type": "Application/JSON",
			},
			body: JSON.stringify({ userName: data.login, password: data.password }),
		})
			.then(response => {
				if (response.ok) {
					return response.json();
				} else {
					console.error("Failed to fetch:", response.statusText);
				}
			})
			.then(responseData => {
				console.log(responseData);
			})
			.catch(error => {
				console.error("error", error);
			});
	}
	function registerUser() {
		fetch("http://localhost:7777/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ userName: data.login, password: data.password, email: data.email }),
		})
			.then(response => {
				if (response.ok) {
					return response.json();
				} else {
					console.error("Failed to register:", response.statusText);
				}
			})
			.then(responseData => {
				console.log(responseData);
			})
			.catch(error => {
				console.error("error", error);
			});
	}
	return (
		<div>
			<div className='log-reg'>
				<div className='login-icon' onClick={openLoginWindow}>
					<span className='material-symbols-outlined'>person</span>
					<p>Sign In</p>
				</div>

				<div className='login-window log-reg-window'>
					<p className='login-label'>Login</p>
					<form onSubmit={handleSubmit}>
						<div className='input-container'>
							<input type='text' placeholder='Login' value={data.login} onChange={handleLoginChange} />
							<input type='password' placeholder='Password' value={data.password} onChange={handlePasswordChange} />
							<button className='login-btn' type='submit' onClick={userData}>
								Login
							</button>
						</div>
					</form>

					<button className='switch-reg' onClick={switchLogReg}>
						Create Account
					</button>
				</div>
			</div>

			<div className='register-window log-reg-window'>
				<div className='register-window'>
					<p className='register-label'>Register</p>
					<form onSubmit={handleSubmit}>
						<div className='input-container'>
							<input type='text' placeholder='Login' value={data.login} onChange={handleLoginChange} />
							<input type='password' placeholder='Password' value={data.password} onChange={handlePasswordChange} />
							<input type='email' placeholder='Email' value={data.email} onChange={handleEmailChange} />

							<button className='register-btn' type='submit' onClick={handleRegisterIsTrue}>
								Register
							</button>
						</div>
					</form>

					<button className='switch-log' onClick={switchLogReg}>
						Login
					</button>
				</div>
			</div>
		</div>
	);
}

export default LogReg;
