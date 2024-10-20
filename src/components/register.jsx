import React, { useState } from 'react';
import Swal from 'sweetalert2'; // Import SweetAlert2
import '../assets/register.css'; // Import CSS

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        schoolName: '',
        timestamp: '' // เพิ่มฟิลด์ timestamp ที่นี่
    });
    const [isSubmitted, setIsSubmitted] = useState(false); // Add state to track submission

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Disable the submit button after submission
        setIsSubmitted(true);

        // กำหนด timestamp เป็นวันที่และเวลาในปัจจุบัน
        const currentDateTime = new Date().toISOString(); // ใช้ toISOString เพื่อให้มีรูปแบบที่เหมาะสม
        const dataToSend = {
            ...formData,
            timestamp: currentDateTime // เพิ่ม timestamp ในข้อมูลที่จะส่ง
        };

        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycbxkzzC61FjVfJ0ZpodBYq7jO0FrA_wyWeyWmaKwUT6sgiJUBf6uUVvfaVrwpjdgpMke/exec', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(dataToSend), // ใช้ URLSearchParams เพื่อส่งข้อมูล
            });

            if (response.ok) {
                console.log('ส่งข้อมูลสำเร็จ');
                Swal.fire({
                    title: 'ส่งข้อมูลสำเร็จ',
                    icon: 'success',
                    timer: 3000, // 3 seconds
                    showConfirmButton: false
                });
                setFormData({
                    firstName: '',
                    lastName: '',
                    phone: '',
                    email: '',
                    schoolName: '',
                    timestamp: '' // รีเซ็ต timestamp ด้วย
                });
            } else {
                console.error('เกิดข้อผิดพลาดในการส่งข้อมูล');
                Swal.fire({
                    title: 'เกิดข้อผิดพลาด',
                    text: 'ไม่สามารถส่งข้อมูลได้ กรุณาลองอีกครั้ง',
                    icon: 'error'
                });
            }
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการส่งข้อมูล:', error);
            Swal.fire({
                title: 'เกิดข้อผิดพลาด',
                text: 'ไม่สามารถเชื่อมต่อได้ กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต',
                icon: 'error'
            });
        }
    };

    return (
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>ลงทะเบียน</h1>
            <img 
                src={require('../assets/KUSRC.png')} 
                alt="KUSRC Logo" 
                style={{ width: '100px', height: 'auto' }} 
            />
            <form onSubmit={handleSubmit}>
                <div>
                    <label>ชื่อ</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>นามสกุล</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>เบอร์โทร</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>อีเมล</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>ชื่อโรงเรียน</label>
                    <input
                        type="text"
                        name="schoolName"
                        value={formData.schoolName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" disabled={isSubmitted}>ลงทะเบียน</button>
            </form>
        </div>
    );
};

export default Register;
