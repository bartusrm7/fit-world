import React, { useState, useEffect } from "react";

function LogReg() {
	const [data, setData] = useState({ login: "", password: "", email: "", isRegistering: false, isLoggedIn: false });

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
		setData({ login: "", password: "", email: "", isRegistering: false, isLoggedIn: false });
	}
	function handleRegisterIsTrue() {
		setData(prevData => ({
			...prevData,
			isRegistering: true,
		}));
	}
	function openLoginWindow() {
		const loginWindow = document.querySelector(".login-window");
		const shadowBackground = document.querySelector(".shadow-background");
		loginWindow.classList.toggle("display-block");
		shadowBackground.classList.toggle("display-none");
	}
	function switchLogReg() {
		const register = document.querySelector(".register-window");
		const login = document.querySelector(".login-window");
		register.classList.toggle("display-block");
		login.classList.toggle("display-none");
	}
	function infoAfterSuccesLogin() {
		const login = document.querySelector(".login-window");
		const hideWindowLog = document.querySelector(".hide-window-log");
		const infoLog = document.createElement("p");
		const logOutBtn = document.createElement("button");

		infoLog.style.margin = "4em 0 2em";
		logOutBtn.innerHTML = "Log out";
		logOutBtn.style.cursor = "pointer";
		hideWindowLog.classList.add("display-none");
		infoLog.innerHTML = `You logged as <span style="color:palevioletred;font-weight: bold">${data.login}</span>!`;
		login.append(infoLog, logOutBtn);

		logOutBtn.addEventListener("click", () => {
			hideWindowLog.classList.remove("display-none");
			infoLog.innerHTML = "";
			login.removeChild(logOutBtn, infoLog);
		});
	}
	function infoAfterSuccesRegistered() {
		const register = document.querySelector(".register-window");
		const hideWindowReg = document.querySelector(".hide-window-reg");
		const infoReg = document.createElement("p");

		if (!data.email.includes("@") || !data.email.includes(".")) {
			console.error("Invalid email address! Please enter a valid email address!");
			return;
		}

		infoReg.style.margin = "4em 0";
		hideWindowReg.classList.add("display-none");
		infoReg.innerHTML = `The user <span style="color:palevioletred;font-weight: bold">${data.login}</span> has been created!`;
		register.appendChild(infoReg);
	}
	function userLogin() {
		if (data.login === "" || data.password === "") {
			console.error("Some input is empty! Complete the data!");
			return;
		}
		fetch("http://localhost:7777/login", {
			method: "POST",
			headers: {
				"Content-type": "Application/JSON",
			},
			body: JSON.stringify({ userName: data.login, password: data.password }),
		})
			.then(response => {
				if (response.ok) {
					infoAfterSuccesLogin();
					return response.json();
				} else if (response.status === 401) {
					return response.json().then(data => {
						throw new Error(data.message);
					});
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
		if (data.login === "" || data.password === "" || data.email === "") {
			console.error("Some input is empty! Complete the data!");
			return;
		}
		fetch("http://localhost:7777/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ userName: data.login, password: data.password, email: data.email }),
		})
			.then(response => {
				if (response.ok) {
					infoAfterSuccesRegistered();
					return response.json();
				} else if (response.status === 400) {
					return response.json().then(data => {
						throw new Error(data.message);
					});
				} else {
					console.error("Failed to register:", response.statusText);
				}
			})
			.then(responseData => {
				console.log(responseData);
				setData({ login: "", password: "", email: "", isRegistering: false, isLoggedIn: false });
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
					<div className='hide-window-log'>
						<form onSubmit={handleSubmit}>
							<div className='input-container'>
								<input type='text' placeholder='Login' value={data.login} onChange={handleLoginChange} />
								<input type='password' placeholder='Password' value={data.password} onChange={handlePasswordChange} />
								<button className='login-btn' type='submit' onClick={userLogin}>
									Login
								</button>
							</div>
						</form>
					</div>

					<button className='switch-reg' onClick={switchLogReg}>
						Create Account
					</button>
				</div>
			</div>

			<div className='register-window log-reg-window'>
				<p className='register-label'>Register</p>
				<div className='hide-window-reg'>
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
				</div>

				<button className='switch-log' onClick={switchLogReg}>
					Login
				</button>
			</div>
			<div className='shadow-background display-none'></div>
		</div>
	);
}

export default LogReg;
