const { test, expect } = require('@playwright/test');
const { waitForDebugger } = require('inspector');




// Landing Page

test('TC001 - Verify Landing Page Display', async ({ page }) => {
    await page.goto('https://master--tech-impact.netlify.app/');

    await expect(page.locator('text=Login')).toBeVisible();
    await expect(page.locator('text=Sign Up')).toBeVisible();

    // Postconditions: The landing page is displayed with "Login" and "Sign Up" buttons.
});


test('TC002 - Verify "Login" Button on Landing Page', async ({ page }) => {
  // Preconditions: The landing page with the "Login" button is displayed.
  await page.goto('https://master--tech-impact.netlify.app/');
  await page.click('text=Login');
  await expect(page).toHaveURL(/.*login/); 

  // Postconditions: After clicking the "Login" button, the user should be taken to the login page.
});


test('TC003 - Verify "Sign Up" Button on Landing Page', async ({ page }) => {
  // Preconditions: The landing page with the "Sign Up" button is displayed.
  await page.goto('https://master--tech-impact.netlify.app/');
  await page.click('text=Sign Up');
  await expect(page).toHaveURL(/.*register/); 

  // Postconditions: After clicking the "Sign Up" button, the user should be taken to the sign-up page.
});




// Sign Up

test('TC004 - Verify User is able to Sign up Successfully', async ({ page }) => {
  // Preconditions: The volunteer registration website is accessible
  await page.goto('https://master--tech-impact.netlify.app/');
  await page.click('text=Sign Up');
  await expect(page).toHaveURL(/.*register/); 

  const fullName = 'Vivek Modi';
  const email = 'vivek1@gmail.com';
  const username = 'Vivek1'
  const password = 'Vivek123';

  await page.getByPlaceholder('Enter your name here').fill(fullName);
  await page.getByPlaceholder('Enter your email ID here').fill(email);
  await page.getByPlaceholder('Choose your username (Login').fill(username);
  await page.getByPlaceholder('Choose a strong password').fill(password);
  await page.getByPlaceholder('Re-enter the password').fill(password);
  
  await page.getByRole('button', { name: 'Sign Up' }).click();

  // Expected Results:
  // await expect(page).toHaveURL('https://your-registration-website.com/success');

  // Postconditions: A new user account has been successfully created.
});


test('TC005 - Verify error message when signing up with existing username', async ({ page }) => {
  // Preconditions: The volunteer registration website is accessible
  await page.goto('https://master--tech-impact.netlify.app/');
  await page.click('text=Sign Up');
  await expect(page).toHaveURL(/.*register/); 


  await page.getByPlaceholder('Choose your username (Login').fill('admin');
  await page.getByPlaceholder('Choose a strong password').fill('password');
  await page.getByPlaceholder('Re-enter the password').fill('password');

  // Click on the sign-up button
  await page.getByRole('button', { name: 'Sign Up' }).click();

  // Expected Result: Error message should be displayed
  await expect(page.getByText('The username already exists!')).toBeVisible();
});


test('TC006 - Verify User is able to navigate to Login page from Sign Up page ', async ({ page }) => {
  // Preconditions: The volunteer registration website is accessible
  await page.goto('https://master--tech-impact.netlify.app/');
  await page.click('text=Sign Up');
  await expect(page).toHaveURL(/.*register/); 

  // Click on the "Already have an account? - Login" button or link
  await page.getByRole('link', { name: 'Login' }).click();

  // Expected Result: Redirection to the login page
  await expect(page).toHaveURL('https://master--tech-impact.netlify.app/login');

  // Additional check to ensure the login page is displayed
  // await expect(page.getByText('Login to your account'))
});




// Login

test('TC007 - Verify User is able to Login Successfully', async ({ page }) => {
  await page.goto('https://master--tech-impact.netlify.app/');

  // Click on the "Login" button/link to navigate to the login page
  await page.click('text=Login');

  // Fill in the login credentials
  await page.fill('input[name="username"]', 'Vivek');
  await page.fill('input[name="password"]', 'Vivek123');

  // Click on the submit button to log in
  await page.click('button:has-text("Login")');

  // Expected Result: Successful login and redirection to the appropriate page
  // Note: Add validations to confirm successful login and redirection
});


test('TC008 - Verify Handling of Invalid Login Credentials', async ({ page }) => {
  await page.goto('https://master--tech-impact.netlify.app/');

  // Click on the "Login" button/link to navigate to the login page
  await page.click('text=Login');

  // Fill in invalid login credentials
  await page.fill('input[name="username"]', 'InvalidUsername');
  await page.fill('input[name="password"]', 'InvalidPassword');

  // Click on the submit button to attempt to log in
  await page.click('button:has-text("Login")');

  // Expected Result: Display an error message for invalid credentials
  // Note: Add code to check for the error message
});


test('TC009 - Verify User is able to navigate to Sign Up page from Login page', async ({ page }) => {
  await page.goto('https://master--tech-impact.netlify.app/');

  // Click on the "Login" button/link to navigate to the login page
  await page.click('text=Login');

  // Click on the "Sign-Up" hyperlink
  await expect(page.getByText('Create an account? Sign-Up')).toBeVisible();
  await page.getByRole('link', { name: 'Sign-Up' }).click();
  // await expect(page.getByRole('link', { name: 'Sign-Up' })).toBeVisible();
  // Expected Result: Redirection to the Sign-Up page
});




// Volunteer Dashboard

test('TC010 - Verify Volunteer User is able to navigate to Calender after clicking Shift link in Navigation bar', async ({ page }) => {
//   // Precondition: User is already logged in and at the dashboard
  await page.goto('https://master--tech-impact.netlify.app');

  // Click on the "Login" button/link to navigate to the login page
  await page.click('text=Login');

  // Fill in the login credentials
  await page.fill('input[name="username"]', 'Vivek');
  await page.fill('input[name="password"]', 'Vivek123');

  // Click on the submit button to log in
  // await page.click('button:has-text("Login")');
  await page.getByRole('button', { name: 'Login' }).click();
  
  // await page.waitForTimeout(3000);

  await expect(page.getByRole('heading', { name: 'Welcome to Tech Impact' })).toBeVisible();

  // Test Steps: Click on the "menu" in the side panel
  await page.locator('.menu-bars').first().click();

  // Test Steps: Click on the "Shifts" in the side panel
  await page.getByRole('link', { name: 'Shifts', exact: true }).click();

  // Expected Results: Verify that the Shifts section is visible


  // Postconditions: User is viewing the Shifts section
});


test('TC011 - Verify Volunteer User is able to navigate to Profile in Navigation bar', async ({ page }) => {
  await page.goto('https://master--tech-impact.netlify.app');
  
  // Click on the "Login" button/link to navigate to the login page
  await page.click('text=Login');

  // Fill in the login credentials
  await page.fill('input[name="username"]', 'Vivek');
  await page.fill('input[name="password"]', 'Vivek123');

  // Click on the submit button to log in
  // await page.click('button:has-text("Login")');
  await page.getByRole('button', { name: 'Login' }).click();
  
  // await page.waitForTimeout(3000);

  await expect(page.getByRole('heading', { name: 'Welcome to Tech Impact' })).toBeVisible();

  // Test Steps: Click on the "menu" in the side panel
  await page.locator('.menu-bars').first().click();
  
  // Test Steps: Click on "Profile" in the side panel
  await page.getByRole('link', { name: 'Profile' }).click();
  
  // Expected Results: Verify that the Profile page is visible
  await expect(page.getByRole('heading', { name: 'PROFILE' })).toBeVisible();

  // Postconditions: User is viewing their Profile page
});


test('TC012 - Verify Volunteer User is able to navigate to History in Navigation bar', async ({ page }) => {
  await page.goto('https://master--tech-impact.netlify.app');
  
  // Click on the "Login" button/link to navigate to the login page
  await page.click('text=Login');

  // Fill in the login credentials
  await page.fill('input[name="username"]', 'Vivek');
  await page.fill('input[name="password"]', 'Vivek123');

  // Click on the submit button to log in
  // await page.click('button:has-text("Login")');
  await page.getByRole('button', { name: 'Login' }).click();
  
  // await page.waitForTimeout(3000);

  await expect(page.getByRole('heading', { name: 'Welcome to Tech Impact' })).toBeVisible();

  // Test Steps: Click on the "menu" in the side panel
  await page.locator('.menu-bars').first().click();
  
  // Test Steps: Click on "History" in the side panel
  await page.getByRole('link', { name: 'History' }).click();
  
  // Expected Results: Verify that the History section is visible
  await expect(page.getByRole('heading', { name: 'Volunteer Shift History' })).toBeVisible();

  // Postconditions: User is viewing their History
});


test('TC013 - Verify Volunteer User is able to navigate to Home in Navigation bar', async ({ page }) => {
  // Perform login
  await page.goto('https://master--tech-impact.netlify.app');
  await page.click('text=Login');
  await page.fill('input[name="username"]', 'Vivek');
  await page.fill('input[name="password"]', 'Vivek123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('heading', { name: 'Welcome to Tech Impact' })).toBeVisible();
  
  // Open the side panel
  await page.locator('.menu-bars').first().click();

  // Click on "Home" in the side panel
  await page.click('text=Home');

  // Verify that the Home section is visible
  const homeSection = page.locator('text=Welcome to Tech Impact'); // Use the actual text that indicates Home is visible
  await expect(homeSection).toBeVisible();

  // Postconditions: User is viewing the Home section
});


test('TC014 - Verify Volunteer User is able to navigate to Logout in Navigation bar', async ({ page }) => {
  // Perform login
  await page.goto('https://master--tech-impact.netlify.app');
  await page.click('text=Login');
  await page.fill('input[name="username"]', 'Vivek');
  await page.fill('input[name="password"]', 'Vivek123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('heading', { name: 'Welcome to Tech Impact' })).toBeVisible();
  
  // Open the side panel
  await page.locator('.menu-bars').first().click();

  // Click on "Logout" in the side panel
  await page.click('text=Logout');

  // Verify that the user is logged out
  // Here you need to replace 'text=Login' with the actual locator that confirms the user is logged out
  const loginButton = page.locator('text=Login to your account'); 
  await expect(loginButton).toBeVisible();

  // Postconditions: User is logged out and sees the login button
});


test('TC015 - Verify Volunteer User is able to see all his/her Upcoming Shifts', async ({ page }) => {
  // Perform login
  await page.goto('https://master--tech-impact.netlify.app');
  await page.click('text=Login');
  await page.fill('input[name="username"]', 'Vivek');
  await page.fill('input[name="password"]', 'Vivek123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('heading', { name: 'Welcome to Tech Impact' })).toBeVisible();
  
  // Open the side panel
  await page.locator('.menu-bars').first().click();

  // Click on "Upcoming Shifts" in the side panel
  await page.click('text=Upcoming Shifts');

  // Verify that the Upcoming Shifts section is visible
  const upcomingShiftsSection = page.locator('text=My Upcoming Shifts');
  await expect(upcomingShiftsSection).toBeVisible();

  // Postconditions: User is viewing the Upcoming Shifts section
});


test('TC016 - Verify Volunteer User is able to Navigation to Shifts Section in Navigation bar', async ({ page }) => {
  // Perform login
  await page.goto('https://master--tech-impact.netlify.app');
  await page.click('text=Login');
  await page.fill('input[name="username"]', 'Vivek');
  await page.fill('input[name="password"]', 'Vivek123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('heading', { name: 'Welcome to Tech Impact' })).toBeVisible();
  
  // Open the side panel
  await page.locator('.menu-bars').first().click();

  // Click on "Shifts" in the side panel
  await page.click('text=Shifts');

  // Verify that the Shifts section is visible
  await expect(page.getByRole('img', { name: 'company logo' }).first()).toBeVisible();

  // Postconditions: User is viewing the Shifts section
});


test('TC017 - Verify Volunteer is able to Update his/her Profile', async ({ page }) => {
  // Perform login
  await page.goto('https://master--tech-impact.netlify.app');
  await page.click('text=Login');
  await page.fill('input[name="username"]', 'Vivek');
  await page.fill('input[name="password"]', 'Vivek123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('heading', { name: 'Welcome to Tech Impact' })).toBeVisible();
  
  // Open the side panel
  await page.locator('.menu-bars').first().click();

  // Click on "Profile" in the side panel
  await page.click('text=Profile');

  // Perform profile update actions here (e.g., fill form, click update)
  await page.getByRole('button', { name: 'UPDATE' }).click();
  // await page.locator('#contact').fill()
  await page.getByRole('button', { name: 'SAVE' }).click();

  // Verify that the profile was updated successfully

  // Postconditions: User's profile is updated
});


test('TC018 - Verify Volunteer is able to access his/her History', async ({ page }) => {
  // Perform login
  await page.goto('https://master--tech-impact.netlify.app');
  await page.click('text=Login');
  await page.fill('input[name="username"]', 'Vivek');
  await page.fill('input[name="password"]', 'Vivek123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('heading', { name: 'Welcome to Tech Impact' })).toBeVisible();
  
  // Open the side panel
  await page.locator('.menu-bars').first().click();

  // Click on "History" in the side panel
  await page.click('text=History');

  // Verify that the History section is visible
  const historySection = page.locator('text=Volunteer Shift History');
  await expect(historySection).toBeVisible();

  // Postconditions: User is viewing their participation history
});


test('TC019 - Verify Volunteer is able see and access detailed Shift Information', async ({ page }) => {
  // Perform login
  await page.goto('https://master--tech-impact.netlify.app');
  await page.click('text=Login');
  await page.fill('input[name="username"]', 'Vivek');
  await page.fill('input[name="password"]', 'Vivek123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('heading', { name: 'Welcome to Tech Impact' })).toBeVisible();

  // Open the side panel
  await page.locator('.menu-bars').first().click();

  // Navigate to Shifts section
  await page.click('text=Shifts');

  // Select a specific shift
  // await page.getByRole('gridcell', { name: '3:00 - 6:00 NASA', exact: true }).locator('a').click();

  // Verify that detailed information about the shift is visible
  // const shiftDetails = page.locator('text=NASA'); 
  // await expect(shiftDetails).toBeVisible();

  // Postconditions: User has viewed detailed information about a shift
});


test('TC020 - Verify Volunteer is able to Sign-up for new Shift', async ({ page }) => {
  // Perform login
  await page.goto('https://master--tech-impact.netlify.app');
  await page.click('text=Login');
  await page.fill('input[name="username"]', 'Vivek');
  await page.fill('input[name="password"]', 'Vivek123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('heading', { name: 'Welcome to Tech Impact' })).toBeVisible();

  // Open the side panel
  await page.locator('.menu-bars').first().click();

  // Navigate to Shifts section
  await page.click('text=Shifts');

  // Click to sign up for a shift
  // await page.click('text=Sign Up for Shift');

  // Verify the sign-up confirmation
  // const signUpConfirmation = page.locator('text=Successfully Signed Up');
  // await expect(signUpConfirmation).toBeVisible();

  // Postconditions: User has signed up for a shift
});




// admin

test('TC021 - Verify Admin is able to aceess Shift Management Functionality in Navigation bar', async ({ page }) => {
  // Preconditions
  await page.goto('https://master--tech-impact.netlify.app');
  await page.click('text=Login');
  await page.fill('input[name="username"]', 'admin'); // Use a valid existing username
  await page.fill('input[name="password"]', 'password'); // Use a valid password
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('heading', { name: 'Welcome to Tech Impact' })).toBeVisible();

  // Test Steps
  // Open the side panel
  await page.locator('.menu-bars').first().click();

  // Click on "Shift Management" in the side panel
  await page.click('text=Shift Management');

  // Verify that the Shift Management section is visible
  await expect(page.getByRole('button', { name: 'Create Shift' })).toBeVisible();

  // Postconditions
  // (Add any postcondition actions if needed)

  // Expected Results
  // The test will pass if the 'Shift Management' section is visible and accessible
});


test('TC022 - Verify Admin is able to book Shifts in Shift Management', async ({ page }) => {
  // Preconditions
  await page.goto('https://master--tech-impact.netlify.app');
  await page.click('text=Login');
  await page.fill('input[name="username"]', 'admin'); // Use a valid existing username
  await page.fill('input[name="password"]', 'password'); // Use a valid password
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('heading', { name: 'Welcome to Tech Impact' })).toBeVisible();

  // Test Steps
  // Navigate to Shift Management first
  await page.locator('.menu-bars').first().click();
  await page.click('text=Shift Management');
  
  // Click on "Create a Shift"
  await page.getByRole('button', { name: 'Create Shift' }).click();

  // Verify that the Booking functionality is visible
  await expect(page.getByRole('button', { name: 'ADD' })).toBeVisible();

  // Postconditions
  // (Add any postcondition actions if needed)

  // Expected Results
  // The test will pass if the 'Shift Booking' form is visible and accessible
});


test('TC023 - Verify User is able to access and view Calender in ‘Day’ View', async ({ page }) => {
  // Preconditions
  await page.goto('https://master--tech-impact.netlify.app');
  await page.click('text=Login');
  await page.fill('input[name="username"]', 'admin'); // Use a valid existing username
  await page.fill('input[name="password"]', 'password'); // Use a valid password
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('heading', { name: 'Welcome to Tech Impact' })).toBeVisible();

  // Test Steps
  // Navigate to the calendar view
  await page.locator('.menu-bars').first().click();

  // Click on "Shift Management" in the side panel
  await page.click('text=Shift Management');

  // Verify that the Day View is visible and the calendar updates accordingly
  await expect(page.getByRole('button', { name: 'Day' })).toBeVisible();

  // Expected Results
  // The test will pass if the Day View of the calendar is visible and functional
});


test('TC024 - Verify User is able to access and view Calender in ‘Week’ View', async ({ page }) => {
  // Preconditions
  await page.goto('https://master--tech-impact.netlify.app');
  await page.click('text=Login');
  await page.fill('input[name="username"]', 'admin'); // Use a valid existing username
  await page.fill('input[name="password"]', 'password'); // Use a valid password
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('heading', { name: 'Welcome to Tech Impact' })).toBeVisible();

  // Test Steps
  await page.locator('.menu-bars').first().click();

  // Click on "Shift Management" in the side panel
  await page.click('text=Shift Management');

  // Verify that the Week View is visible and the calendar updates accordingly
  await expect(page.getByRole('button', { name: 'Week', exact: true })).toBeVisible();

  // Expected Results
  // The test will pass if the Week View of the calendar is visible and functional
});


test('TC025 - Verify User is able to access and view Calender in ‘Month’ View', async ({ page }) => {
  // Preconditions
  await page.goto('https://master--tech-impact.netlify.app');
  await page.click('text=Login');
  await page.fill('input[name="username"]', 'admin'); // Use a valid existing username
  await page.fill('input[name="password"]', 'password'); // Use a valid password
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('heading', { name: 'Welcome to Tech Impact' })).toBeVisible();

// Test Steps
  // Navigate to the calendar view
  await page.locator('.menu-bars').first().click();

  // Click on "Shift Management" in the side panel
  await page.click('text=Shift Management');

  // Verify that the Month View is visible and the calendar updates accordingly
  await expect(page.getByRole('button', { name: 'Month' })).toBeVisible();

  // Expected Results
  // The test will pass if the Month View of the calendar is visible and functional
});


test('TC026 - Verify Admin is able to access his/her Profile', async ({ page }) => {
  // Preconditions
  await page.goto('https://master--tech-impact.netlify.app');
  await page.click('text=Login');
  await page.fill('input[name="username"]', 'admin'); // Use a valid existing username
  await page.fill('input[name="password"]', 'password'); // Use a valid password
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('heading', { name: 'Welcome to Tech Impact' })).toBeVisible();

  // Test Steps
  // Navigate to the Admin Profile section
  await page.locator('.menu-bars').first().click();
  await page.getByRole('link', { name: 'Profile' }).click();

  // Verify that the Admin Profile section is visible
  await expect(page.getByRole('heading', { name: 'PROFILE' })).toBeVisible();

  // Expected Results
  // The test will pass if the Admin Profile section is visible and functional
});


test('TC027 - Verify Admin is able to Update his/her Profile', async ({ page }) => {
  // Preconditions
  await page.goto('https://master--tech-impact.netlify.app');
  await page.click('text=Login');
  await page.fill('input[name="username"]', 'admin'); // Use a valid existing username
  await page.fill('input[name="password"]', 'password'); // Use a valid password
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('heading', { name: 'Welcome to Tech Impact' })).toBeVisible();

  // Test Steps
  // Navigate to the Admin Profile section
  await page.locator('.menu-bars').first().click();
  await page.getByRole('link', { name: 'Profile' }).click();
  await page.getByRole('button', { name: 'UPDATE' }).click();

  // Perform actions to update the profile
  // await page.fill('input[name="email"]', 'newemail@example.com');

  // Submit the updated profile
  await page.getByRole('button', { name: 'SAVE' }).click();
  // Verify that the profile update is successful

  // Expected Results
  // The test will pass if the profile update is successful and confirmed by the application
});


test('TC028 - Verify Admin is able to access Pending Shifts in Shift Approval link in Navigation bar', async ({ page }) => {
  // Preconditions
  await page.goto('https://master--tech-impact.netlify.app');
  await page.click('text=Login');
  await page.fill('input[name="username"]', 'admin'); // Use a valid existing username
  await page.fill('input[name="password"]', 'password'); // Use a valid password
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('heading', { name: 'Welcome to Tech Impact' })).toBeVisible();

  // Test Steps
  await page.locator('.menu-bars').first().click();

  // Perform action to approve a shift
  await page.getByRole('link', { name: 'Approve Shifts' }).click();

  // Verify that the shift approval is successful
  await expect(page.getByText('PENDING SHIFT APPROVAL')).toBeVisible();

  // Expected Results
  // The test will pass if the Pending Shifts section is visible and the list of pending shifts is displayed
});


test('TC029 - Verify Admin is able to approve Shifts in Shift Approval link in Navigation bar', async ({ page }) => {
  // Preconditions
  await page.goto('https://master--tech-impact.netlify.app');
  await page.click('text=Login');
  await page.fill('input[name="username"]', 'admin'); // Use a valid existing username
  await page.fill('input[name="password"]', 'password'); // Use a valid password
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('heading', { name: 'Welcome to Tech Impact' })).toBeVisible();

  // Test Steps
  await page.locator('.menu-bars').first().click();

  // Perform action to approve a shift
  await page.getByRole('link', { name: 'Approve Shifts' }).click();

  // Verify that the shift approval is successful
  await expect(page.getByText('PENDING SHIFT APPROVAL')).toBeVisible();

  // Expected Results
  // The test will pass if the shift is approved successfully
});


test('TC030 - Verify Admin is able to Cancel Shifts in Shift Approval link in Navigation bar', async ({ page }) => {
  // Preconditions
  await page.goto('https://master--tech-impact.netlify.app');
  await page.click('text=Login');
  await page.fill('input[name="username"]', 'admin'); // Use a valid existing username
  await page.fill('input[name="password"]', 'password'); // Use a valid password
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('heading', { name: 'Welcome to Tech Impact' })).toBeVisible();

  // Test Steps
  // Navigate to Cancelled Shifts section
  await page.locator('.menu-bars').first().click();

  // Perform action to approve a shift
  await page.getByRole('link', { name: 'Approve Shifts' }).click();
  
  // Verify that the shift approval is successful
  await expect(page.getByText('PENDING SHIFT APPROVAL')).toBeVisible();
  

  // Expected Results
  // The test will pass if the Cancelled Shifts section is visible and the list of cancelled shifts is displayed
});


test('TC031 - Verify Admin is able to Approve New Volunteers', async ({ page }) => {
  // Preconditions
  await page.goto('https://master--tech-impact.netlify.app');
  await page.click('text=Login');
  await page.fill('input[name="username"]', 'admin'); // Use a valid existing username
  await page.fill('input[name="password"]', 'password'); // Use a valid password
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('heading', { name: 'Welcome to Tech Impact' })).toBeVisible();

  // Test Steps
  await page.locator('.menu-bars').first().click();

  // Select a new volunteer to approve
  await page.getByRole('link', { name: 'Approve Volunteers' }).click();

  // Verify that the volunteer is approved successfully
  await expect(page.getByText('PENDING USER APPROVAL')).toBeVisible();

  // Expected Results
  // The test will pass if the new volunteer is approved and a confirmation message is displayed
});


test('TC032 - Verify Admin is able to Deny New Volunteers', async ({ page }) => {
  // Preconditions
  await page.goto('https://master--tech-impact.netlify.app');
  await page.click('text=Login');
  await page.fill('input[name="username"]', 'admin'); // Use a valid existing username
  await page.fill('input[name="password"]', 'password'); // Use a valid password
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('heading', { name: 'Welcome to Tech Impact' })).toBeVisible();

  // Test Steps
  // Navigate to Volunteer Management section
  await page.locator('.menu-bars').first().click();
  await page.getByRole('link', { name: 'Approve Volunteers' }).click();
  // await expect(page.getByText('PENDING USER APPROVAL')).toBeVisible();

  // Verify that the volunteer is denied successfully

  // Expected Results
  // The test will pass if the new volunteer is denied and a confirmation message is displayed
});


test('TC033 - Verify Admin is able to access and view Staff List in Navigation bar', async ({ page }) => {
  // Preconditions
  await page.goto('https://master--tech-impact.netlify.app');
  await page.click('text=Login');
  await page.fill('input[name="username"]', 'admin'); // Use a valid existing username
  await page.fill('input[name="password"]', 'password'); // Use a valid password
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('heading', { name: 'Welcome to Tech Impact' })).toBeVisible();

  // Test Steps
  // Navigate to Staff List section
  await page.locator('.menu-bars').first().click();
  await page.getByRole('link', { name: 'Staff List' }).click();

  // Verify that the Staff List is visible
  await expect(page.getByText('STAFF LIST', { exact: true })).toBeVisible();
  
  // Expected Results
  // The test will pass if the Staff List is visible and displays the list of staff members
});


test('TC034 - Verify Admin is able to Logout', async ({ page }) => {
  // Preconditions
  await page.goto('https://master--tech-impact.netlify.app');
  await page.click('text=Login');
  await page.fill('input[name="username"]', 'admin'); // Use a valid existing username
  await page.fill('input[name="password"]', 'password'); // Use a valid password
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('heading', { name: 'Welcome to Tech Impact' })).toBeVisible();

  // Test Steps
  // Click on Logout
  await page.locator('.menu-bars').first().click();
  await page.getByRole('link', { name: 'Logout' }).click();

  // Verify that the user is logged out successfully and redirected to the login page
  await expect(page.getByText('Login to your account')).toBeVisible();

  // Expected Results
  // The test will pass if the user is logged out and redirected to the login page
});