# **App Name**: Bus Compare Pro

## Core Features:

- Country Selection: A dropdown menu at the top-right allows users to select a country (defaulting to India).
- Bus Search: Enables users to search for buses by specifying the source, destination, and travel date.
- Bus Listing: Lists available buses based on mock data, showing departure and arrival times, duration, operator, and seat type. Includes total number of buses found.
- OTA Platform Buttons: Displays buttons for each OTA platform offering a specific bus, showing the logo/name, price, and redirection icon with dummy links labeled 'Coming Soon'.
- Loading Animations: Implements loading animations while bus search results are being fetched or displayed.
- Sort by Rating: Adds an optional “Sort by rating” dropdown (placeholder for future use when user reviews are available).
- Show Map: Includes a “Show Map” button that opens a visual map of the selected route.
- Pagination/Lazy Loading: Adds pagination or lazy loading to improve performance when many buses are listed.
- Weekday/Weekend Toggle: Adds a toggle switch to filter between weekday and weekend travel.
- Bus Comparison Checkboxes: Include a “Compare” checkbox next to each bus card, allowing the user to compare up to 3 buses side by side.
- Recent Searches: Save recent searches in browser local storage and display them below the search bar as clickable suggestions.
- Bus Company Direct Buttons: For buses that also offer bookings on their own website (e.g. FlixBus, Intercity), add a separate button next to the OTA buttons, styled in the bus company’s branding colors. Clicking this button should redirect to the official site.

## Style Guidelines:

- Primary color: A vibrant sky blue (#4682B4) evokes a sense of travel and trustworthiness.
- Background color: A very light blue-gray (#F0F8FF) provides a clean and professional backdrop.
- Accent color: A muted lavender (#9370DB) to provide contrast on key details like the selected button or the arrow icons.
- Headline font: 'Poppins', sans-serif, a geometric sans-serif font for headings to provide a modern, fashionable look.
- Body font: 'PT Sans', sans-serif, for body text and descriptions, offering a clean and readable appearance.
- Use clean, simple icons for bus features (AC, Sleeper) and the redirection arrow, consistent with a professional travel app aesthetic.
- Responsive layout resembling Skyscanner, ensuring a clean, user-friendly experience on all devices.  Use a card-based design for bus listings to improve readability.
- Subtle transition animations for search results, button hovers, and loading states.