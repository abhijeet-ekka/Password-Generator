
        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowercase = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

        function updateLength() {
            document.getElementById('lengthValue').textContent = document.getElementById('length').value;
        }

        function generatePassword() {
            const length = parseInt(document.getElementById('length').value);
            const useUppercase = document.getElementById('uppercase').checked;
            const useLowercase = document.getElementById('lowercase').checked;
            const useNumbers = document.getElementById('numbers').checked;
            const useSymbols = document.getElementById('symbols').checked;

            let chars = '';
            if (useUppercase) chars += uppercase;
            if (useLowercase) chars += lowercase;
            if (useNumbers) chars += numbers;
            if (useSymbols) chars += symbols;

            if (chars === '') {
                alert('Please select at least one character type!');
                return;
            }

            let password = '';
            for (let i = 0; i < length; i++) {
                password += chars.charAt(Math.floor(Math.random() * chars.length));
            }

            document.getElementById('password').textContent = password;
            updateStrength(password, useUppercase, useLowercase, useNumbers, useSymbols);
        }

        function updateStrength(password, hasUpper, hasLower, hasNum, hasSymbol) {
            const strengthBar = document.getElementById('strengthBar');
            const strengthText = document.getElementById('strengthText');
            
            let strength = 0;
            const length = password.length;
            
            if (length >= 12) strength++;
            if (length >= 16) strength++;
            
            let typeCount = 0;
            if (hasUpper) typeCount++;
            if (hasLower) typeCount++;
            if (hasNum) typeCount++;
            if (hasSymbol) typeCount++;
            
            strength += typeCount;

            strengthBar.className = 'strength-fill';
            
            if (strength <= 3) {
                strengthBar.classList.add('strength-weak');
                strengthText.textContent = 'Weak';
            } else if (strength <= 5) {
                strengthBar.classList.add('strength-medium');
                strengthText.textContent = 'Medium';
            } else {
                strengthBar.classList.add('strength-strong');
                strengthText.textContent = 'Strong';
            }
        }

        function copyPassword() {
            const password = document.getElementById('password').textContent;
            
            if (password === 'Click Generate') {
                return;
            }

            navigator.clipboard.writeText(password).then(() => {
                showNotification();
            });
        }

        function showNotification() {
            const notification = document.getElementById('notification');
            notification.classList.add('show');
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 2000);
        }

        // Generate password on page load
        window.onload = generatePassword;