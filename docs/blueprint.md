# **App Name**: ResumeForge

## Core Features:

- Real-time Resume Preview: Displays a live preview of the resume that updates as the user edits the form fields.
- Template Selection: Allows users to choose between multiple resume templates, with visual preview thumbnails of each template.  A default of 'template1' is used if not specified.
- Personal Information Form: Captures personal details such as name, contact information, and a professional summary.
- Experience Input: Enables users to add, remove, and reorder their work experience entries, including add/remove buttons for individual bullet points for each role, and drag-and-drop functionality to reorder entries.
- Education Input: Allows users to input, manage, and reorder their educational history, including degree, field of study, and GPA, and drag-and-drop functionality to reorder entries.
- Categorized Skills Input: Provides a structured way for users to list their skills, organized by category.
- Firestore Integration with Auto-Save: Persists resume data to Firestore with debounced auto-saving and manual save functionality.
- Data Restoration: Allows user to restore resume data using Local Storage when Firebase is not accessible.
- PDF Export & Print: Includes a "Download as PDF" button that converts the resume preview to a downloadable PDF file, and print-friendly CSS styles for clean browser printing without form elements visible.

## Style Guidelines:

- Primary color: Deep blue (#3F51B5) to convey professionalism and trust.
- Background color: Light gray (#F5F5F5), providing a clean and neutral backdrop.
- Accent color: Teal (#009688) to highlight key actions and elements.
- Body and headline font: 'Inter', a sans-serif font, providing a modern and neutral look. 'Inter' will be used for both headlines and body text.
- Use simple, professional icons from a library like FontAwesome to represent different sections and actions.
- Split-screen layout with the form on the left and the live preview on the right. Use collapsible sections for forms in accordion style to improve readability.
- Use subtle fade-in animations for section transitions and loading states.