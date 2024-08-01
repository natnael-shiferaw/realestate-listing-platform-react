---

# Real Estate Listing Platform

## Overview

Welcome to the Real Estate Listing Platform! This project aims to create a user-friendly platform where buyers and sellers can connect. Users can browse listings, make inquiries, and manage their profiles, while administrators can manage listings and user inquiries.

## Features

- User Authentication (Email and Google Sign-In)
- Listing Management
- Responsive Design
- Interactive Map Integration
- Real-time Database Updates
- Property Image Slider
- Link Sharing

## Technologies Used

- **Frontend:** React, Tailwind CSS
- **Backend:** Firebase Firestore, Firebase Authentication
- **Deployment:** Vercel (or your chosen platform)

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Firebase CLI](https://firebase.google.com/docs/cli)

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/natnael-shiferaw/realestate-listing-platform-react.git
    cd realestate-listing-platform-react
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Setup Firebase:**

    - Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
    - Add a web app to the Firebase project.
    - Copy the Firebase config object and replace the values in the `.env` file.

4. **Run the application:**

    ```bash
    npm start
    ```

    The application will be running at `http://localhost:3000`.

### Firebase Configuration

Create a `.env` file in the root directory and add your Firebase configuration:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

## Project Structure

```
realestate-listing-platform-react/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── firebase.js
│   ├── App.js
│   └── index.js
├── .gitignore
├── package.json
├── README.md
└── tailwind.config.js
```

## Available Scripts

- `npm start` - Runs the app in development mode.
- `npm build` - Builds the app for production.

## Routes and Functionalities

### Home Route (`/`)

- **Description:** Displays the home page with recent listings and offers.
- **Functionalities:** 
  - Display recent offers, places for rent, and places for sale.
  - Link to detailed listing pages.
- **Screenshot:**
  ![Home Page](https://i.imgur.com/2tToxbx.png)

### Offers Route (`/offers`)

- **Description:** Displays listings with special offers.
- **Functionalities:** 
  - Showcases properties with offers.
  - Link to detailed listing pages.
- **Screenshot:**
  ![Offers Page](https://i.imgur.com/tzr3k3j.png)

### Listing Details Route (`/listing/:id`)

- **Description:** Displays detailed information about a specific listing.
- **Functionalities:** 
  - Property image slider.
  - Detailed property description.
  - Interactive map with property location.
- **Screenshot:**
  ![Listing Details Page](https://i.imgur.com/p2A4yZ3.png)

### Profile Route (`/profile`)

- **Description:** User profile management.
- **Functionalities:** 
  - Update user details.
  - View and manage user listings.
  - Sign out functionality.
- **Screenshot:**
  ![Profile Page](https://i.imgur.com/EMYT5Vu.png)

### Authentication Routes (`/sign-in`, `/sign-up`)

- **Description:** User authentication pages.
- **Functionalities:** 
  - Email and password authentication.
  - Google authentication.
- **Screenshot:**
  ![Authentication Page](https://i.imgur.com/TOsR6cF.png)

## Functionalities

### Firebase Authentication

- **Email Authentication:** Users can sign up and log in using their email and password.
- **Google Authentication:** Users can sign in using their Google account.

### Property Image Slider

- **Description:** A responsive image slider for property images using Swiper.js.
- **Usage:** Used in the listing details page to display property images.

### Leaflet for Mapping

- **Description:** Interactive maps showing property locations.
- **Usage:** Integrated into the listing details page.

### Link Sharing

- **Description:** Users can share property links directly from the platform.
- **Usage:** Available on the listing details page.


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase](https://firebase.google.com/)

## Contact

For any questions or suggestions, please contact:

- **Natnael Shiferaw** - [GitHub Profile](https://github.com/natnael-shiferaw)

---
