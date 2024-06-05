document.getElementById('otpForm').addEventListener('submit', async(e) => {
    e.preventDefault();

    const otpCode = document.getElementById('otpCode').value;

    try {
        const response = await fetch('http://localhost:6001/api/user/verify-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ otps: otpCode })
        });
    
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to verify OTP');
        }
    
        const data = await response.json();
        console.log(data);

        Swal.fire({
            title: "registered successfully!",
            text: "User registered successfully",
            icon: "success",
            showConfirmButton: false,
            timer: 2000
          })
    
      setTimeout(() =>{
        if (data.message === 'User registered successfully') {
            window.location.href = data.redirect; // Redirect to the login page
        }
      },2200);
    } catch (err) {
        console.error('Error:', err);
        alert('Failed to verify OTP: ' + err.message);
    }
    
});

