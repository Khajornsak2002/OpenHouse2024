import React, { useState } from 'react';
import Swal from 'sweetalert2'; // Import SweetAlert2
// import './Register.css'; // Import CSS
import '../assets/register.css';

const Register = () => {
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      schoolName: '',
      timestamp: '' // เพิ่มฟิลด์ timestamp ที่นี่
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        // กำหนด timestamp เป็นวันที่และเวลาในปัจจุบัน
        const currentDateTime = new Date().toLocaleString();
        const dataToSend = {
          ...formData,
          timestamp: currentDateTime // เพิ่ม timestamp ในข้อมูลที่จะส่ง
        };

        const response = await fetch('https://script.google.com/macros/s/AKfycbxkzzC61FjVfJ0ZpodBYq7jO0FrA_wyWeyWmaKwUT6sgiJUBf6uUVvfaVrwpjdgpMke/exec', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              firstName: dataToSend.firstName,
              lastName: dataToSend.lastName,
              phone: dataToSend.phone,
              email: dataToSend.email,
              schoolName: dataToSend.schoolName,
              timestamp: dataToSend.timestamp, // เพิ่ม timestamp ที่นี่
            }),
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
        }
      };

    return (
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}> {/* เพิ่ม container ที่นี่ */}
        <h1>ลงทะเบียน</h1>
        
        {/* Ensure the path is correct */}
        <img 
          src={require('../assets/KUSRC.png')} 
          alt="KUSRC Logo" 
          style={{ width: '100px', height: 'auto' }} // Adjust the width as needed
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
          <button type="submit">ลงทะเบียน</button>
        </form>
      </div>
    );
};

export default Register;
