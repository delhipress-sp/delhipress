// Supabase Configuration
const SUPABASE_URL = 'https://urzmdriydbofeoitvipj.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyem1kcml5ZGJvZmVvaXR2aXBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgwMTgxNDgsImV4cCI6MjEwMzU5NDE0OH0.yN7h1YBvc7zva2BIAQPgQ1nA4TXRM7ZRPqJKKlmK7Ko';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Mobile Responsive Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// Contact Form Submit Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('धन्यवाद! आपका संदेश प्राप्त हो गया है।');
    contactForm.reset();
  });
}

// Login Submit Handler
async function handleLoginSubmit(event) {
  event.preventDefault();
  const mobile = event.target.loginMobile.value.trim();
  const password = event.target.loginPass.value;

  // Supabase auth email format compatibility
  const loginEmail = mobile.includes('@') ? mobile : `${mobile}@delhipress.local`;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: password,
    });

    if (error) { 
      alert("लॉगिन एरर! " + error.message);
      return;
    }

    // User details local storage me save karein taaki lock na aaye
    const userName = data.user.user_metadata?.full_name || mobile;
    localStorage.setItem('dp_current_user', JSON.stringify({
      id: data.user.id,
      name: userName,
      mobile: mobile,
      email: data.user.email
    }));

    alert("लॉगिन सफल!");
    window.location.href = 'index.html';
  } catch (err) {
    alert("लॉगिन एरर! कृपया इंटरनेट जांचें।");
  }
}

// Register Submit Handler
async function handleRegisterSubmit(event) {
  event.preventDefault();
  const name = event.target.regName.value.trim();
  const mobile = event.target.regMobile.value.trim();
  const village = event.target.regVillage.value.trim();
  const address = event.target.regAddress.value.trim();
  const password = event.target.regPass.value;

  const userEmail = `${mobile}@delhipress.local`;

  try {
    const { data, error } = await supabase.auth.signUp({
      email: userEmail,
      password: password,
      options: {
        data: {
          full_name: name,
          village: village,
          address: address,
          mobile: mobile
        }
      }
    });

    if (error) {
      alert("साइन अप एरर! " + error.message);
      return;
    }

    // Register ke baad turant session set karein
    localStorage.setItem('dp_current_user', JSON.stringify({
      id: data.user ? data.user.id : '',
      name: name,
      mobile: mobile,
      email: userEmail
    }));

    alert("साइन अप सफल!");
    window.location.href = 'index.html';
  } catch (err) {
    alert("कनेक्शन एरर! कृपया दोबारा प्रयास करें।");
  }
}

// Forgot Password Submit Handler
async function handleForgotSubmit(event) {
  event.preventDefault();
  const newPassword = event.target.forgotNewPass.value;

  try {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) {
      alert("पासवर्ड अपडेट करने में त्रुटि! " + error.message);
    } else {
      alert("पासवर्ड सफलतापूर्वक अपडेट किया गया!");
    }
  } catch (err) {
    alert("त्रुटि! कृपया पुनः प्रयास करें।");
  }
}
