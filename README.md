# 📄 ResumeForge

> **Build professional resumes with ease** - A modern, feature-rich resume builder built with Next.js 14, React, and TypeScript.

![ResumeForge Banner](https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&h=300&fit=crop)

## ✨ Features

### 🎨 Professional Templates
- **4 Stunning Templates** - Choose from Professional, Executive, Onyx, and Sapphire designs
- **Real-time Preview** - See your changes instantly as you type
- **Template Switching** - Switch between templates without losing your data
- **Visual Template Selector** - Preview thumbnails make choosing easy

### 📝 Smart Form Builder
- **Intuitive Forms** - Clean, organized accordion-style sections
- **Dynamic Sections** - Add/remove work experience, education, and skills on the fly
- **Bullet Point Management** - Add multiple achievements for each position
- **Drag & Drop Reordering** - Organize your experience and education sections easily

### 💾 Data Management
- **Auto-Save** - Your work is saved automatically every 2 seconds
- **Local Storage** - Resume data persists across browser sessions
- **Manual Save** - Save button for instant backup
- **Data Persistence** - Never lose your progress

### 📥 Export Options
- **PDF Download** - Generate ATS-friendly PDFs with selectable text
- **Print Function** - Clean print-optimized layouts
- **Multiple Formats** - Export in the format that works for you

### 🎯 User Experience
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Split-Screen Layout** - Form on left, live preview on right
- **Loading States** - Clear feedback during saves and exports
- **Error Handling** - Graceful error messages and recovery
- **Toast Notifications** - Subtle, non-intrusive feedback

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/ShemaiahYaba/ResumeForge.git
cd ResumeForge
```

2. **Install dependencies**
```bash
npm install
```

3. **Run development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

### Core
- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[React 18](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety

### Styling
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful, accessible components

### PDF Generation
- **[@react-pdf/renderer](https://react-pdf.org/)** - PDF generation with React components

### Forms
- **[React Hook Form](https://react-hook-form.com/)** - Performant form handling

### State & Storage
- **React useState** - Local state management
- **localStorage** - Browser-based persistence

## 📁 Project Structure

```
ResumeForge/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Main application page
│   │   └── globals.css          # Global styles & print CSS
│   ├── components/
│   │   ├── resume-form/         # Form components
│   │   │   ├── personal-info-form.tsx
│   │   │   ├── experience-form.tsx
│   │   │   ├── education-form.tsx
│   │   │   ├── skills-form.tsx
│   │   │   └── template-select-form.tsx
│   │   ├── templates/           # Web preview templates
│   │   │   ├── professional-template.tsx
│   │   │   ├── executive-template.tsx
│   │   │   ├── onyx-template.tsx
│   │   │   └── sapphire-template.tsx
│   │   ├── pdf-templates/       # PDF export templates
│   │   │   ├── professional-pdf-template.tsx
│   │   │   └── executive-pdf-template.tsx
│   │   ├── ui/                  # UI components (shadcn)
│   │   ├── resume-form.tsx      # Main form orchestrator
│   │   └── resume-preview.tsx   # Preview renderer
│   ├── lib/
│   │   ├── types.ts             # TypeScript types
│   │   ├── data.ts              # Initial/sample data
│   │   ├── pdf-generator.ts     # PDF export utility
│   │   ├── placeholder-images.json
│   │   └── utils.ts             # Helper functions
│   └── hooks/
│       └── use-toast.ts         # Toast notification hook
├── public/                      # Static assets
├── package.json
├── tsconfig.json
└── README.md
```

## 🎨 Available Templates

### 1. Professional Template
![Professional Template](https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=500&fit=crop)
- Clean sidebar layout
- Blue accent colors
- Perfect for: Administrative, entry-level, general professional roles

### 2. Executive Template
![Executive Template](https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=500&fit=crop)
- Modern dark sidebar
- Professional gray/blue color scheme
- Perfect for: Management, operations, senior-level positions

### 3. Onyx Template
- Classic single-column layout
- Traditional professional style
- Perfect for: Academic, research, traditional industries

### 4. Sapphire Template
- Contemporary two-column design
- Modern and clean
- Perfect for: Tech, creative, startup roles

## 📖 Usage Guide

### 1. Fill in Your Information
- Start with the **Personal Information** section
- Add your **Work Experience** (add multiple positions with the "+" button)
- List your **Education** background
- Categorize your **Skills**

### 2. Choose Your Template
- Open the **Template** section in the form
- Click on a template to preview it
- Your data automatically flows into the new layout

### 3. Customize Each Section
- **Add Items**: Click "Add Experience/Education/Skill Category" buttons
- **Remove Items**: Use the "Remove" buttons on each card
- **Reorder**: Drag and drop items using the grip icon
- **Bullet Points**: Add/remove bullets for each work experience

### 4. Export Your Resume
- **Download PDF**: Click the "Download PDF" button for an ATS-friendly PDF
- **Print**: Use the "Print" button for browser-based printing
- **Save**: Manual save or rely on auto-save (every 2 seconds)

## 🔧 Configuration

### Customizing Templates

Templates are located in `src/components/templates/` for web preview and `src/components/pdf-templates/` for PDF export.

To customize colors, fonts, or layouts, edit the respective template files:

```tsx
// Example: Change accent color in Professional Template
// src/components/templates/professional-template.tsx

const accentColor = 'text-blue-600'; // Change to your preferred color
```

### Adding New Templates

1. Create a new template component in `src/components/templates/`
2. Create a PDF version in `src/components/pdf-templates/`
3. Add the template to `src/lib/types.ts`:
```typescript
export type Template = 'onyx' | 'sapphire' | 'professional' | 'executive' | 'yourtemplate';
```
4. Update `src/components/resume-preview.tsx` to include your template
5. Add template info to `src/components/resume-form/template-select-form.tsx`

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repo in [Vercel](https://vercel.com)
3. Deploy with one click

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ShemaiahYaba/ResumeForge)

### Deploy to Other Platforms

ResumeForge works with any platform that supports Next.js:
- **Netlify**
- **Railway**
- **AWS Amplify**
- **Google Cloud Run**

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

## 🐛 Known Issues & Roadmap

### Current Limitations
- No cloud storage (localStorage only)
- No user authentication
- Limited to 4 templates
- No custom color picker yet

### Planned Features
- [ ] User accounts and cloud storage
- [ ] More template options (10+ templates)
- [ ] Custom color and font selection
- [ ] AI-powered content suggestions
- [ ] LinkedIn import
- [ ] Cover letter builder
- [ ] Multi-page resume support
- [ ] Template marketplace

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[shadcn/ui](https://ui.shadcn.com/)** - For the beautiful component library
- **[@react-pdf/renderer](https://react-pdf.org/)** - For PDF generation capabilities
- **[Lucide Icons](https://lucide.dev/)** - For the icon set
- **[Vercel](https://vercel.com)** - For hosting and deployment

## 📧 Contact & Support

- **GitHub**: [@ShemaiahYaba](https://github.com/ShemaiahYaba)
- **Project Link**: [https://github.com/ShemaiahYaba/ResumeForge](https://github.com/ShemaiahYaba/ResumeForge)

### Found a bug?
Please open an issue on GitHub with:
- Description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)

### Have a feature request?
Open an issue with the `enhancement` label and describe your idea!

---

<div align="center">

**Built with ❤️ by [Shemaiah Yaba](https://github.com/ShemaiahYaba)**

⭐ Star this repo if you find it helpful!

</div>