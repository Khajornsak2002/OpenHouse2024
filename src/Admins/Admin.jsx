import React, { useState, useEffect } from 'react';
import '../../src/assets/Admin/Admin.css';

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        // ตรวจสอบสถานะการล็อกอินจาก localStorage
        return localStorage.getItem('isLoggedIn') === 'true';
    });
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === 'Admin' && password === 'Admin') {
            setIsLoggedIn(true);
            localStorage.setItem('isLoggedIn', 'true'); // บันทึกสถานะการล็อกอิน
        } else {
            alert('Invalid credentials');
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn'); // ลบสถานะการล็อกอิน
    };

    useEffect(() => {
        if (isLoggedIn) {
            const fetchUsers = async () => {
                try {
                    const response = await fetch('https://script.google.com/macros/s/AKfycbxkzzC61FjVfJ0ZpodBYq7jO0FrA_wyWeyWmaKwUT6sgiJUBf6uUVvfaVrwpjdgpMke/exec', {
                        method: 'GET',
                    });

                    if (response.ok) {
                        const data = await response.json(); // รับข้อมูลเป็น JSON
                        console.log('Fetched data:', data); // Log fetched data
                        setUsers(data.users); // อัปเดต state ด้วยผู้ใช้ที่ดึงมา
                    } else {
                        console.error('Failed to fetch users');
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchUsers();
        }
    }, [isLoggedIn]);

    const submitFormData = async (formData) => {
        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycbxkzzC61FjVfJ0ZpodBYq7jO0FrA_wyWeyWmaKwUT6sgiJUBf6uUVvfaVrwpjdgpMke/exec', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Response:', data);
            } else {
                console.error('Error submitting data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            {!isLoggedIn ? (
                <form onSubmit={handleLogin}>
                    <div>
                        <label>Username:</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit">Login</button>
                </form>
            ) : (
                <div>
                    <div className="logout-button-container">
                        <button onClick={handleLogout}>Logout</button> {/* ปุ่ม Logout */}
                    </div>
                    <h1>Registered Users</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>School Name</th>
                                <th>Timestamp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.email}</td>
                                    <td>{user.schoolName}</td>
                                    <td>{user.timestamp}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Admin;
