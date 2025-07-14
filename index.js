// Create the login tracker factory function
function createLoginTracker(userInfo) {
  let attemptCount = 0;

  return (passwordAttempt) => {
    if (attemptCount >= 3) {
      return "Account locked due to too many failed login attempts";
    }

    if (passwordAttempt === userInfo.password) {
      return "Login successful";
    } else {
      attemptCount++;
      return attemptCount === 3
        ? `Attempt ${attemptCount}: Login failed`
        : attemptCount > 3
        ? "Account locked due to too many failed login attempts"
        : `Attempt ${attemptCount}: Login failed`;
    }
  };
}

// Export for testing or external usage
module.exports = {
  ...(typeof createLoginTracker !== 'undefined' && { createLoginTracker })
};

// ----------- Test Code ------------ //

const user = {
  username: "willalbeck",
  password: "securePass123"
};

const login = createLoginTracker(user);

console.log(login("wrongpass"));        // Attempt 1: Login failed
console.log(login("1234"));             // Attempt 2: Login failed
console.log(login("securePass123"));    // Login successful
console.log(login("securePass123"));    // Login successful
console.log(login("nope"));             // Attempt 3: Login failed
console.log(login("securePass123"));    // Account locked due to too many failed login attempts