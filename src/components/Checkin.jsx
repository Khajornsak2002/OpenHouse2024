import React, { useState } from 'react';

function Checkin() {
    const locations = ['Location 1', 'Location 2', 'Location 3', 'Location 4', 'Location 5'];
    const [checkedInLocations, setCheckedInLocations] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [statusChecked, setStatusChecked] = useState(false);

    const handleCheckin = async (location) => {
        if (statusChecked && !checkedInLocations.includes(location)) {
            try {
                // Update check-in status using the doPost function
                const response = await fetch(`https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({
                        phone: phoneNumber,
                        checkinStatus: 'Checked In',
                    }),
                });

                if (response.ok) {
                    setCheckedInLocations([...checkedInLocations, location]);
                    alert('Check-in status updated successfully.');
                } else {
                    alert('Failed to update check-in status.');
                }
            } catch (error) {
                console.error('Error updating check-in status:', error);
                alert('An error occurred while updating the check-in status.');
            }
        } else if (!statusChecked) {
            alert('Please check your status by entering your phone number first.');
        }
    };

    const handleQRCodeScan = (scannedLocation) => {
        const nextLocation = locations[checkedInLocations.length];
        if (statusChecked && scannedLocation === nextLocation) {
            handleCheckin(scannedLocation);
        } else if (!statusChecked) {
            alert('Please check your status by entering your phone number first.');
        } else {
            alert('Please scan the correct location in sequence.');
        }
    };

    const isCertificateEarned = checkedInLocations.length === locations.length;

    const checkStatus = async () => {
        if (phoneNumber) {
            try {
                const response = await fetch(`https://script.google.com/macros/s/AKfycbxkzzC61FjVfJ0ZpodBYq7jO0FrA_wyWeyWmaKwUT6sgiJUBf6uUVvfaVrwpjdgpMke/exec`);
                if (response.ok) {
                    const data = await response.json();
                    const user = data.users.find(user => user.phone === phoneNumber);

                    if (user) {
                        setCheckedInLocations(user.checkinStatus === 'Checked In' ? locations : []);
                        setStatusChecked(true);
                        alert(`Current check-in status: ${user.checkinStatus}`);
                    } else {
                        alert('Phone number not found.');
                    }
                } else {
                    console.error('Failed to fetch user data:', response.status, response.statusText);
                    alert('Failed to fetch user data.');
                }
            } catch (error) {
                console.error('Error fetching check-in status:', error);
                alert('An error occurred while checking the status.');
            }
        } else {
            alert('Please enter a valid phone number.');
        }
    };

    return (
        <div>
            <h1>Check-in Locations</h1>
            {statusChecked && (
                <ul>
                    {locations.map((location, index) => (
                        <li key={index}>
                            <button 
                                onClick={() => handleCheckin(location)} 
                                disabled={checkedInLocations.length !== index}
                            >
                                {checkedInLocations.includes(location) ? 'Checked In' : `Check In to ${location}`}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            {/* Placeholder for QR code scanner */}
            {statusChecked && (
                <div>
                    <h2>Scan QR Code to Check In</h2>
                    {/* Implement QR code scanner here and call handleQRCodeScan with the scanned location */}
                </div>
            )}
            {isCertificateEarned && <p>Congratulations! You have earned a certificate.</p>}
            {/* New section for phone number input and status check */}
            <div>
                <h2>Check Status by Phone Number</h2>
                <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter phone number"
                />
                <button onClick={checkStatus}>Check Status</button>
            </div>
        </div>
    );
}

export default Checkin;
