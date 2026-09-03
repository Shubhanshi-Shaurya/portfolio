

const user = "shubhanshishaurya2006";
const domain = "gmail.com";
const emailLink = document.getElementById("email-link");
if (emailLink) {
    emailLink.href = `mailto:${user}@${domain}`;
}

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.navbar a');
    const sections = document.querySelectorAll('section');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    
                    navLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');

                    const headerOffset = 70;
                    const elementPosition = targetSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

   
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// form submission
const form = document.getElementById('contact-form') || document.querySelector('.contact form');
const submitBtn = document.getElementById('contact-btn') || form?.querySelector('button[type="submit"]');
const statusMsg = document.getElementById('form-status');

if (form) {
    form.addEventListener('submit', async function (e) {
        e.preventDefault(); 

        const originalBtnText = submitBtn ? submitBtn.innerText : 'Send Message';
        if (submitBtn) {
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;
        }

        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                if (statusMsg) {
                    statusMsg.innerText = '✅ Thank you! Your message has been sent successfully.';
                    statusMsg.style.color = '#3cf';
                    statusMsg.style.display = 'block';
                }

                
                form.reset();

                
                setTimeout(() => {
                    if (statusMsg) {
                        statusMsg.style.display = 'none'; 
                    }
                    const homeSection = document.getElementById('home');
                    if (homeSection) {
                        const headerOffset = 70;
                        const elementTop = homeSection.getBoundingClientRect().top + window.pageYOffset;
                        window.scrollTo({
                            top: elementTop - headerOffset,
                            behavior: 'smooth'
                        });
                    }
                }, 3000);

            } else {
                const data = await response.json();
                const errorText = data.errors ? data.errors.map(err => err.message).join(', ') : 'Submission failed. Please try again.';
                if (statusMsg) {
                    statusMsg.innerText = `⚠️ ${errorText}`;
                    statusMsg.style.color = '#f06';
                    statusMsg.style.display = 'block';
                }
            }
        } catch (error) {
            if (statusMsg) {
                statusMsg.innerText = '⚠️ Network error. Please try again later.';
                statusMsg.style.color = '#f06';
                statusMsg.style.display = 'block';
            }
        } finally {
            if (submitBtn) {
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            }
        }
    });
}