// Punch the Monkey Tracker - Interactive Script

document.addEventListener('DOMContentLoaded', function() {
    // Update time display
    function updateTime() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short'
        };
        const timeString = now.toLocaleDateString('en-US', options);
        document.getElementById('update-time').textContent = timeString;
    }
    
    // Initial update
    updateTime();
    
    // Update time every minute
    setInterval(updateTime, 60000);
    
    // Subscribe button functionality
    const subscribeBtn = document.getElementById('subscribe-btn');
    const emailInput = document.getElementById('email-input');
    
    subscribeBtn.addEventListener('click', function() {
        const email = emailInput.value.trim();
        
        if (!email) {
            showNotification('Please enter your email address', 'warning');
            emailInput.focus();
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'warning');
            emailInput.focus();
            return;
        }
        
        // Simulate subscription process
        subscribeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
        subscribeBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Successfully subscribed to Punch updates!', 'success');
            emailInput.value = '';
            subscribeBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Subscribe';
            subscribeBtn.disabled = false;
            
            // Log subscription (in a real app, this would go to a server)
            console.log(`New subscription: ${email}`);
        }, 1500);
    });
    
    // Enter key support for email input
    emailInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            subscribeBtn.click();
        }
    });
    
    // News link click handlers
    document.querySelectorAll('.news-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const linkText = this.textContent.trim();
            showNotification(`Opening ${linkText}...`, 'info');
            
            // In a real app, this would navigate to the actual article
            // For now, just show a notification
            setTimeout(() => {
                showNotification('Article opened in new tab', 'info');
            }, 500);
        });
    });
    
    // Social link click handlers
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.classList.contains('twitter') ? 'Twitter' :
                           this.classList.contains('instagram') ? 'Instagram' : 'Reddit';
            showNotification(`Opening ${platform}...`, 'info');
        });
    });
    
    // Footer link click handlers
    document.querySelectorAll('.footer-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.textContent.trim();
            showNotification(`Navigating to ${page}...`, 'info');
        });
    });
    
    // Card hover animations
    const cards = document.querySelectorAll('.status-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Status indicator pulse animation
    const statusIndicator = document.querySelector('.indicator-circle.good');
    if (statusIndicator) {
        setInterval(() => {
            statusIndicator.style.transform = 'scale(1.2)';
            setTimeout(() => {
                statusIndicator.style.transform = 'scale(1)';
            }, 300);
        }, 3000);
    }
    
    // Helper functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showNotification(message, type = 'info') {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${getIconForType(type)}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${getColorForType(type)};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 15px;
            z-index: 1000;
            animation: slideIn 0.3s ease;
            max-width: 400px;
        `;
        
        // Add keyframes for animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        // Add close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', function() {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 5000);
        
        document.body.appendChild(notification);
        
        // Add notification content styles
        const notificationContent = notification.querySelector('.notification-content');
        notificationContent.style.cssText = `
            display: flex;
            align-items: center;
            gap: 10px;
            flex: 1;
        `;
        
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            font-size: 1rem;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
    }
    
    function getIconForType(type) {
        switch(type) {
            case 'success': return 'check-circle';
            case 'warning': return 'exclamation-triangle';
            case 'danger': return 'times-circle';
            default: return 'info-circle';
        }
    }
    
    function getColorForType(type) {
        switch(type) {
            case 'success': return '#00b894';
            case 'warning': return '#fdcb6e';
            case 'danger': return '#e17055';
            default: return '#0984e3';
        }
    }
    
    // Simulate data updates
    function simulateDataUpdates() {
        // Randomly update social metrics every 30 seconds
        setInterval(() => {
            const metrics = document.querySelectorAll('.metric-value');
            metrics.forEach(metric => {
                const currentValue = parseInt(metric.textContent.replace(/[^0-9]/g, ''));
                const change = Math.floor(Math.random() * 1000);
                const newValue = currentValue + change;
                metric.textContent = newValue.toLocaleString() + '+';
                
                // Add animation
                metric.style.transform = 'scale(1.1)';
                metric.style.color = '#ff6b6b';
                setTimeout(() => {
                    metric.style.transform = 'scale(1)';
                    metric.style.color = '';
                }, 300);
            });
        }, 30000);
        
        // Update last updated time more frequently
        setInterval(() => {
            const now = new Date();
            const minutesAgo = Math.floor(Math.random() * 5) + 1;
            now.setMinutes(now.getMinutes() - minutesAgo);
            
            const options = { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true 
            };
            const timeString = now.toLocaleTimeString('en-US', options);
            
            const updateElement = document.getElementById('update-time');
            const originalText = updateElement.textContent;
            const newText = originalText.replace(/\d{1,2}:\d{2} [AP]M/, timeString);
            updateElement.textContent = newText;
            
            // Add update indicator
            const lastUpdated = document.querySelector('.last-updated');
            lastUpdated.style.backgroundColor = '#d4edda';
            lastUpdated.style.color = '#155724';
            
            setTimeout(() => {
                lastUpdated.style.backgroundColor = '';
                lastUpdated.style.color = '';
            }, 1000);
        }, 60000);
    }
    
    // Start simulated updates
    simulateDataUpdates();
    
    // Add some initial notifications
    setTimeout(() => {
        showNotification('Welcome to Punch the Monkey Tracker!', 'info');
    }, 1000);
    
    setTimeout(() => {
        showNotification('New photos of Punch available!', 'success');
    }, 4000);
    
    // Gallery Lightbox Functionality
    function initGallery() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach(item => {
            item.style.cursor = 'pointer';
            item.addEventListener('click', function() {
                const img = this.querySelector('img');
                const caption = this.querySelector('h3').textContent;
                const description = this.querySelector('p').textContent;
                const date = this.querySelector('.gallery-date').textContent;
                
                showLightbox(img.src, caption, description, date);
            });
        });
        
        // Add lightbox styles
        const lightboxStyles = `
            .lightbox {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2000;
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.3s ease, visibility 0.3s ease;
            }
            
            .lightbox.active {
                opacity: 1;
                visibility: visible;
            }
            
            .lightbox-content {
                max-width: 90%;
                max-height: 90%;
                position: relative;
                background: white;
                border-radius: 16px;
                overflow: hidden;
                transform: scale(0.9);
                transition: transform 0.3s ease;
            }
            
            .lightbox.active .lightbox-content {
                transform: scale(1);
            }
            
            .lightbox-img {
                max-width: 100%;
                max-height: 70vh;
                display: block;
                margin: 0 auto;
            }
            
            .lightbox-info {
                padding: 2rem;
                background: white;
                max-width: 800px;
            }
            
            .lightbox-info h3 {
                font-size: 1.8rem;
                margin-bottom: 0.5rem;
                color: #2d3436;
            }
            
            .lightbox-info p {
                color: #636e72;
                margin-bottom: 1rem;
                line-height: 1.6;
            }
            
            .lightbox-date {
                display: inline-block;
                background: #dfe6e9;
                color: #2d3436;
                padding: 6px 15px;
                border-radius: 20px;
                font-size: 0.9rem;
                font-weight: 500;
            }
            
            .lightbox-close {
                position: absolute;
                top: 15px;
                right: 15px;
                background: rgba(0, 0, 0, 0.7);
                color: white;
                border: none;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                font-size: 1.2rem;
                z-index: 10;
                transition: background 0.2s ease;
            }
            
            .lightbox-close:hover {
                background: rgba(0, 0, 0, 0.9);
            }
            
            .lightbox-nav {
                position: absolute;
                top: 50%;
                width: 100%;
                display: flex;
                justify-content: space-between;
                padding: 0 20px;
                transform: translateY(-50%);
                z-index: 5;
            }
            
            .lightbox-prev,
            .lightbox-next {
                background: rgba(0, 0, 0, 0.7);
                color: white;
                border: none;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                font-size: 1.5rem;
                transition: background 0.2s ease;
            }
            
            .lightbox-prev:hover,
            .lightbox-next:hover {
                background: rgba(0, 0, 0, 0.9);
            }
        `;
        
        // Inject lightbox styles
        const lightboxStyleSheet = document.createElement('style');
        lightboxStyleSheet.textContent = lightboxStyles;
        document.head.appendChild(lightboxStyleSheet);
    }
    
    // Show lightbox with image
    function showLightbox(imgSrc, caption, description, date) {
        // Create lightbox element
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-close"><i class="fas fa-times"></i></button>
                <div class="lightbox-nav">
                    <button class="lightbox-prev"><i class="fas fa-chevron-left"></i></button>
                    <button class="lightbox-next"><i class="fas fa-chevron-right"></i></button>
                </div>
                <img src="${imgSrc}" alt="${caption}" class="lightbox-img">
                <div class="lightbox-info">
                    <h3>${caption}</h3>
                    <p>${description}</p>
                    <span class="lightbox-date">${date}</span>
                </div>
            </div>
        `;
        
        document.body.appendChild(lightbox);
        
        // Show lightbox
        setTimeout(() => {
            lightbox.classList.add('active');
        }, 10);
        
        // Close lightbox
        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.addEventListener('click', () => {
            lightbox.classList.remove('active');
            setTimeout(() => {
                lightbox.remove();
            }, 300);
        });
        
        // Close on background click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
                setTimeout(() => {
                    lightbox.remove();
                }, 300);
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', function closeOnEscape(e) {
            if (e.key === 'Escape') {
                lightbox.classList.remove('active');
                setTimeout(() => {
                    lightbox.remove();
                }, 300);
                document.removeEventListener('keydown', closeOnEscape);
            }
        });
        
        // Navigation functionality
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');
        
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showNotification('Previous image feature would show here', 'info');
        });
        
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showNotification('Next image feature would show here', 'info');
        });
    }
    
    // Initialize gallery
    setTimeout(() => {
        if (document.querySelector('.gallery-item')) {
            initGallery();
            showNotification('Gallery loaded! Click any image to view larger.', 'success');
        }
    }, 1000);
});