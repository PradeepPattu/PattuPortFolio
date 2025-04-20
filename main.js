document.addEventListener('DOMContentLoaded', () => {
    // 1. Fade-in Animation for Sections
    const sections = document.querySelectorAll('.page-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');

                // Animate the section title
                const sectionTitle = entry.target.querySelector('.section-title');
                if (sectionTitle) {
                    sectionTitle.classList.add('fade-in');
                }

                // Animate project cards
                const projectCards = entry.target.querySelectorAll('.project-card');
                projectCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('fade-in');
                    }, index * 200); // Staggered animation for each card
                });
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });

    // 2. Home Page Animations
    const homeSection = document.querySelector('#home');
    if (homeSection) {
        // Profile Picture Animation
        const profilePic = document.querySelector('.profile-pic');
        if (profilePic) {
            profilePic.style.opacity = '0';
            profilePic.style.transform = 'scale(0.8)';
            setTimeout(() => {
                profilePic.style.transition = 'opacity 1s ease, transform 1s ease';
                profilePic.style.opacity = '1';
                profilePic.style.transform = 'scale(1)';
            }, 300);
        }

        // Intro Text Animation
        const introText = document.querySelector('.intro-text');
        if (introText) {
            const h1 = introText.querySelector('h1');
            const h2 = introText.querySelector('h2');
            const p = introText.querySelector('p');
            const buttons = introText.querySelectorAll('.circle-btn');

            // Initial states
            h1.style.opacity = '0';
            h1.style.transform = 'translateX(-50px)';
            h2.style.opacity = '0';
            h2.style.transform = 'translateX(-50px)';
            p.style.opacity = '0';
            p.style.transform = 'translateX(-50px)';
            buttons.forEach(btn => {
                btn.style.opacity = '0';
                btn.style.transform = 'translateY(20px)';
            });

            // Animate elements sequentially
            setTimeout(() => {
                h1.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                h1.style.opacity = '1';
                h1.style.transform = 'translateX(0)';
            }, 600);

            setTimeout(() => {
                h2.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                h2.style.opacity = '1';
                h2.style.transform = 'translateX(0)';
            }, 900);

            setTimeout(() => {
                p.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                p.style.opacity = '1';
                p.style.transform = 'translateX(0)';
            }, 1200);

            buttons.forEach((btn, index) => {
                setTimeout(() => {
                    btn.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    btn.style.opacity = '1';
                    btn.style.transform = 'translateY(0)';
                    btn.style.animation = 'bounce 0.5s ease';
                }, 1500 + index * 200);
            });

            // Role Text Cycling Animation
            const roleText = document.querySelector('#role-text');
            const roles = ['Web Developer', 'App Developer', 'Graphic Designer', 'Rider'];
            let currentRoleIndex = 0;

            const typeRole = (text, callback) => {
                let i = 0;
                roleText.textContent = '';
                const type = () => {
                    if (i < text.length) {
                        roleText.textContent += text.charAt(i);
                        i++;
                        setTimeout(type, 100);
                    } else {
                        setTimeout(callback, 1000);
                    }
                };
                type();
            };

            const deleteRole = (callback) => {
                let text = roleText.textContent;
                let i = text.length;
                const del = () => {
                    if (i >= 0) {
                        roleText.textContent = text.substring(0, i);
                        i--;
                        setTimeout(del, 50);
                    } else {
                        callback();
                    }
                };
                del();
            };

            const cycleRoles = () => {
                deleteRole(() => {
                    currentRoleIndex = (currentRoleIndex + 1) % roles.length;
                    typeRole(roles[currentRoleIndex], cycleRoles);
                });
            };

            typeRole(roles[currentRoleIndex], cycleRoles);
        }
    }
    

    // 3. Navigation Link Hover Effects
    const navLinks = document.querySelectorAll('header nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('mouseover', () => {
            link.style.transition = 'transform 0.3s ease';
            link.style.transform = 'scale(1.1)';
        });
        link.addEventListener('mouseout', () => {
            link.style.transform = 'scale(1)';
        });
    });

    // 4. Smooth Scrolling for Navigation Links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            } else {
                window.location.href = link.getAttribute('href');
            }
        });
    });

    // 5. Project Card Hover Animation (Already handled in CSS)

    // 6. Contact Form Submission with WhatsApp and Email Preparation
    const form = document.querySelector('#contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.querySelector('#name').value.trim();
            const email = document.querySelector('#email').value.trim();
            const message = document.querySelector('#message').value.trim();
            const button = form.querySelector('button');

            if (name && email && message) {
                const whatsappMessage = `*New Contact Form Submission*\n*Name:* ${name}\n*Email:* ${email}\n*Message:* ${message}`;
                const whatsappNumber = '1234567890'; // Replace with your WhatsApp number
                const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

                const emailSubject = 'New Contact Form Submission';
                const emailBody = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
                const emailUrl = `mailto:pradeepsettume26@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

                button.textContent = 'Sending...';
                button.style.backgroundColor = '#ccc';
                button.style.cursor = 'not-allowed';
                button.disabled = true;

                setTimeout(() => {
                    window.open(whatsappUrl, '_blank');
                    // window.location.href = emailUrl; // Uncomment if you want to use email

                    button.textContent = 'Message Sent!';
                    button.style.backgroundColor = '#4caf50';
                    button.style.animation = 'pulse 0.5s ease';

                    setTimeout(() => {
                        button.textContent = 'Send Message';
                        button.style.backgroundColor = '#ff6f61';
                        button.style.cursor = 'pointer';
                        button.disabled = false;
                        form.reset();
                    }, 2000);
                }, 1500);
            } else {
                button.textContent = 'Please Fill All Fields';
                button.style.backgroundColor = '#f44336';
                button.style.animation = 'shake 0.5s ease';

                setTimeout(() => {
                    button.textContent = 'Send Message';
                    button.style.backgroundColor = '#ff6f61';
                }, 2000);
            }
        });
    }

    // 7. Footer Link Hover Animation
    const footerLinks = document.querySelectorAll('.footer-social a, .social-icon');
    footerLinks.forEach(link => {
        link.addEventListener('mouseover', () => {
            link.style.transition = 'transform 0.3s ease';
            link.style.transform = 'scale(1.2)';
        });
        link.addEventListener('mouseout', () => {
            link.style.transform = 'scale(1)';
        });
    });
});

// Keyframe Animations
const styleSheet = document.createElement('style');
styleSheet.innerHTML = `
    @keyframes bounce {
        0% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0); }
    }

    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }

    @keyframes shake {
        0% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        50% { transform: translateX(5px); }
        75% { transform: translateX(-5px); }
        100% { transform: translateX(0); }
    }
`;
document.head.appendChild(styleSheet);