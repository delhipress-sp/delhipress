const SUPABASE_URL = 'https://urrzmdriydbofeoitvipj.supabase.co';
const SUPABASE_KEY = 'sb_publishable_m95f5yk_QdBsUhpQxYXhPg_7lAVDhft';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Mobile Responsive Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Contact Form Submit Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you! Your message has been sent successfully. We will get back to you soon.');
    contactForm.reset();
  });
}

// Login Submit Handler
async function handleLoginSubmit(event) {
  event.preventDefault();
  const mobile = event.target.loginMobile.value;
  const password = event.target.loginPass.value;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      phone: mobile,
      password: password,
    });

    if (error) {
      alert("लॉगिन एरर! " + error.message);
    } else {
      alert("लॉगिन सफल!");
    }
  } catch (err) {
    alert("लॉगिन एरर! कृपया इंटरनेट जांचें।");
  }
}

// Register Submit Handler
async function handleRegisterSubmit(event) {
  event.preventDefault();
  const name = event.target.regName.value;
  const mobile = event.target.regMobile.value;
  const village = event.target.regVillage.value;
  const address = event.target.regAddress.value;
  const password = event.target.regPass.value;

  try {
    const { data, error } = await supabase.auth.signUp({
      phone: mobile,
      password: password,
      options: {
        data: {
          full_name: name,
          village: village,
          address: address
        }
      }
    });

    if (error) {
      alert("साइन अप एरर! " + error.message);
    } else {
      alert("साइन अप सफल! कृपया सत्यापन कोड की प्रतीक्षा करें।");
    }
  } catch (err) {
    alert("कनेक्शन एरर! कृपया दोबारा प्रयास करें।");
  }
}

// Forgot Password Submit Handler
async function handleForgotSubmit(event) {
  event.preventDefault();
  const mobile = event.target.forgotMobile.value;
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
