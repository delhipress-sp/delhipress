const SUPABASE_URL = 'https://urzmdriydbofeoitvipj.supabase.co';
const SUPABASE_KEY = 'sb_publishable_m95f5yk_QdBsUhpQxYXhPg_7iAvDhft';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
// Mobile Responsive Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Contact Form Submit Handler
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you! Your message has been sent successfully. We will get back to you soon.');
    contactForm.reset();
});
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
