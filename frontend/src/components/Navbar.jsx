import { ShoppingCart, UserPlus, LogIn, LogOut, Lock, Sun, Moon } from "lucide-react"; // Add Sun and Moon icons
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { useState, useEffect } from "react";

const Navbar = () => {
	const { user, logout } = useUserStore();
	const isAdmin = user?.role === "admin";
	const { cart } = useCartStore();

	// Theme state
	const [isDarkMode, setIsDarkMode] = useState(() => {
		// Check local storage for the initial theme
		return localStorage.getItem("theme") === "dark";
	});

	// Toggle theme
	const toggleTheme = () => {
		setIsDarkMode((prev) => !prev);
	};

	// Apply theme class to `html`
	useEffect(() => {
		if (isDarkMode) {
			document.documentElement.classList.add("dark");
			localStorage.setItem("theme", "dark");
		} else {
			document.documentElement.classList.remove("dark");
			localStorage.setItem("theme", "light");
		}
	}, [isDarkMode]);

	return (
		<header className='fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-pink-800 dark:bg-white dark:bg-opacity-90'>
			<div className='container mx-auto px-4 py-3'>
				<div className='flex flex-wrap justify-between items-center'>
					<Link to='/' className='text-2xl font-bold text-pink-700 items-center space-x-2 flex'>
						Crafts_Planetaria
					</Link>

					<nav className='flex flex-wrap items-center gap-4'>
						<Link
							to={"/"}
							className='text-gray-300 hover:text-pink-300 dark:text-gray-800 dark:hover:text-pink-600 transition duration-300 ease-in-out'
						>
							Home
						</Link>
						{user && (
							<Link
								to={"/cart"}
								className='relative group text-gray-300 hover:text-pink-300 dark:text-gray-800 dark:hover:text-pink-600 transition duration-300 ease-in-out'
							>
								<ShoppingCart className='inline-block mr-1 group-hover:text-pink-300' size={20} />
								<span className='hidden sm:inline'>Cart</span>
								{cart.length > 0 && (
									<span
										className='absolute -top-2 -left-2 bg-pink-500 text-white rounded-full px-2 py-0.5 text-xs group-hover:bg-pink-300 transition duration-300 ease-in-out'
									>
										{cart.length}
									</span>
								)}
							</Link>
						)}
						{isAdmin && (
							<Link
								className='bg-pink-700 hover:bg-pink-400 text-white px-3 py-1 rounded-md font-medium
								 transition duration-300 ease-in-out flex items-center dark:bg-pink-500 dark:hover:bg-pink-300'
								to={"/secret-dashboard"}
							>
								<Lock className='inline-block mr-1' size={18} />
								<span className='hidden sm:inline'>Dashboard</span>
							</Link>
						)}

						{user ? (
							<button
								className='bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 
						rounded-md flex items-center transition duration-300 ease-in-out dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-300'
								onClick={logout}
							>
								<LogOut size={18} />
								<span className='hidden sm:inline ml-2'>Log Out</span>
							</button>
						) : (
							<>
								<Link
									to={"/signup"}
									className='bg-pink-600 hover:bg-pink-500 text-white py-2 px-4 
									rounded-md flex items-center transition duration-300 ease-in-out dark:bg-pink-600 dark:hover:bg-pink-600'
								>
									<UserPlus className='mr-2' size={18} />
									Sign Up
								</Link>
								<Link
									to={"/login"}
									className='bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 
									rounded-md flex items-center transition duration-300 ease-in-out dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-300'
								>
									<LogIn className='mr-2' size={18} />
									Login
								</Link>
							</>
						)}

						{/* Theme Toggle */}
						<button
							className='bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-300'
							onClick={toggleTheme}
						>
							{isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
							<span className='hidden sm:inline ml-2'>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
						</button>
					</nav>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
