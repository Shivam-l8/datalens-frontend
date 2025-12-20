# DataLens Frontend

> **Automated Insight Generation Platform** — A modern React web application that enables users to upload datasets and receive instant, comprehensive data analysis with visualizations and actionable insights.

[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.0-purple.svg)](https://vitejs.dev/)
[![Recharts](https://img.shields.io/badge/Recharts-2.12-green.svg)](https://recharts.org/)

---

## 🎯 Project Overview

**DataLens Frontend** is the user-facing interface for an automated data analysis platform. Users can:

- **Upload** CSV or Excel files (up to 10MB)
- **Receive** instant exploratory data analysis
- **View** interactive visualizations and statistical summaries
- **Read** human-readable insights and recommendations
- **Download** cleaned datasets and analysis reports

This project demonstrates **modern frontend development**, **data visualization**, and **user experience design** skills essential for data analyst and business intelligence roles.

---

## ✨ Key Features

### User Experience
- **Intuitive file upload**: Drag-and-drop or click-to-upload interface
- **Real-time validation**: Immediate feedback on file type and size
- **Loading states**: Clear progress indicators during analysis
- **Error handling**: User-friendly error messages and recovery options
- **Responsive design**: Works seamlessly on desktop and tablet devices

### Data Visualization
- **Interactive charts**: Built with Recharts for engaging data exploration
- **Multiple chart types**: Histograms, bar charts, line charts, correlation heatmaps
- **Dynamic rendering**: Charts adapt to detected data patterns
- **Export-ready**: Visualizations suitable for reports and presentations

### Analysis Display
- **Structured insights**: Organized sections for key findings and recommendations
- **Summary statistics**: Quick overview of dataset characteristics
- **Downloadable outputs**: Cleaned CSV files and text-based insight summaries
- **Professional presentation**: Clean, modern UI suitable for stakeholder reviews

---

## 🛠️ Tech Stack

| Category | Technology | Purpose |
|----------|-----------|---------|
| **Framework** | React 18.3 | Component-based UI library |
| **Build Tool** | Vite 5.0 | Fast development and optimized production builds |
| **HTTP Client** | Axios | API communication with backend |
| **Visualization** | Recharts 2.12 | React-native charting library |
| **Styling** | CSS3 | Custom, responsive design |

---

## 📋 Prerequisites

- **Node.js 18+** and **npm** (or **yarn** / **pnpm**)
- **Backend API** running (see [DataLens Backend README](../datalens-backend/README.md))

---

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd datalens-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure API Endpoint

Update the API URL in `src/App.jsx` if your backend is deployed:

```javascript
// For local development:
const API_URL = "http://localhost:8000/analyze";

// For production (update after deployment):
const API_URL = "https://your-backend-domain.com/analyze";
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at:
- **Local**: `http://localhost:5173`
- **Network**: Check terminal for network URL

### 5. Build for Production

```bash
npm run build
```

Production-ready files will be in the `dist/` directory.

### 6. Preview Production Build

```bash
npm run preview
```

---

## 📁 Project Structure

```
datalens-frontend/
├── public/                 # Static assets
├── src/
│   ├── App.jsx            # Main application component
│   ├── main.jsx           # React entry point
│   ├── ResultsView.jsx    # Results display component
│   └── styles.css         # Global styles
├── index.html             # HTML template
├── vite.config.mts        # Vite configuration
├── package.json           # Dependencies and scripts
└── README.md              # This file
```

### Component Architecture

- **`App.jsx`**: Main container handling file upload, API communication, and state management
- **`ResultsView.jsx`**: Displays analysis results, charts, insights, and download options
- **`main.jsx`**: React DOM rendering and app initialization

---

## 🎨 Features Breakdown

### File Upload Component
- Accepts CSV and Excel files (.csv, .xls, .xlsx)
- Validates file size (10MB maximum)
- Provides immediate user feedback
- Handles file selection errors gracefully

### Analysis Results Display
- **Summary Section**: Dataset dimensions and column type detection
- **Key Insights**: Data-driven findings with evidence
- **Recommendations**: Actionable business suggestions
- **Visualizations**: Interactive charts rendered from backend data
- **Downloads**: One-click access to cleaned data and reports

### Chart Rendering
- **Histograms**: Distribution analysis for numeric columns
- **Bar Charts**: Frequency analysis for categorical data
- **Line Charts**: Time series trends (when dates detected)
- **Correlation Heatmaps**: Relationship matrices for numeric features

---

## 🚀 Deployment

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**: `npm i -g vercel`
2. **Deploy**: `vercel`
3. **Configure**: Update API URL to production backend
4. **Done**: Automatic deployments on git push

### Option 2: Netlify

1. **Connect repository** to Netlify
2. **Build command**: `npm run build`
3. **Publish directory**: `dist`
4. **Environment variables**: Add `VITE_API_URL` if needed
5. **Deploy**

### Option 3: GitHub Pages

1. **Install gh-pages**: `npm install --save-dev gh-pages`
2. **Add script** to `package.json`:
   ```json
   "deploy": "npm run build && gh-pages -d dist"
   ```
3. **Deploy**: `npm run deploy`

### Option 4: AWS S3 + CloudFront

1. **Build**: `npm run build`
2. **Upload** `dist/` to S3 bucket
3. **Configure** CloudFront distribution
4. **Set** custom domain (optional)

### Environment Variables

Create a `.env` file for local development:

```env
VITE_API_URL=http://localhost:8000
```

Update `vite.config.mts` if using different variable names.

---

## 🔌 API Integration

The frontend communicates with the backend via a single endpoint:

**POST** `/analyze`
- **Request**: Multipart form data with file
- **Response**: JSON with analysis results, charts, insights, and base64-encoded cleaned CSV

Example integration in `App.jsx`:

```javascript
const formData = new FormData();
formData.append("file", file);

const response = await axios.post(API_URL, formData, {
  headers: { "Content-Type": "multipart/form-data" },
});
```

---

## 🎯 User Flow

1. **Upload**: User selects a CSV or Excel file
2. **Validation**: Frontend checks file type and size
3. **Analysis**: File sent to backend API
4. **Processing**: Loading indicator shown
5. **Results**: Analysis displayed with charts and insights
6. **Download**: User can export cleaned data and summary

---

## 📊 Skills Demonstrated

This project showcases:

- ✅ **Frontend Development**: React hooks, component composition, state management
- ✅ **API Integration**: HTTP requests, error handling, async operations
- ✅ **Data Visualization**: Chart rendering, interactive components
- ✅ **User Experience**: Loading states, error messages, responsive design
- ✅ **Modern Tooling**: Vite build system, ES modules, modern JavaScript
- ✅ **Production Readiness**: Build optimization, deployment configuration

---

## 🎨 Design Principles

- **Clarity**: Clean, uncluttered interface focused on data
- **Feedback**: Immediate validation and loading indicators
- **Accessibility**: Semantic HTML and keyboard navigation support
- **Performance**: Optimized bundle size and lazy loading where applicable
- **Responsiveness**: Mobile-friendly layouts and breakpoints

---

## 🐛 Troubleshooting

### CORS Errors
- Ensure backend CORS is configured to allow your frontend origin
- Check API URL is correct in `App.jsx`

### Build Errors
- Clear cache: `rm -rf node_modules package-lock.json && npm install`
- Check Node.js version: `node --version` (should be 18+)

### Charts Not Rendering
- Verify Recharts is installed: `npm list recharts`
- Check browser console for errors
- Ensure backend returns valid chart data structure

### API Connection Issues
- Verify backend is running: `curl http://localhost:8000/health`
- Check network tab in browser DevTools
- Verify API URL matches backend deployment

---

## 🔒 Security Considerations

- **File validation**: Client-side checks prevent invalid uploads
- **Size limits**: Prevents excessive memory usage
- **Error handling**: No sensitive data exposed in error messages
- **CORS**: Backend restricts allowed origins

---

## 📝 Future Enhancements

Potential improvements for production:

- [ ] User authentication and saved analyses
- [ ] Multiple file comparison
- [ ] Custom chart configuration
- [ ] Export to PDF functionality
- [ ] Dark mode theme
- [ ] Advanced filtering and drill-down capabilities

---

## 📄 License

This project is part of a portfolio for educational and professional purposes.

---

## 👤 Author

**Shivam**  
*Data Analyst | Business Intelligence Enthusiast*



---

## 🙏 Acknowledgments

Built with:
- [React](https://react.dev/) - UI library
- [Vite](https://vitejs.dev/) - Build tool
- [Recharts](https://recharts.org/) - Charting library
- [Axios](https://axios-http.com/) - HTTP client

---

## 🔗 Related Projects

- **[DataLens Backend](../datalens-backend/README.md)** - FastAPI service for data analysis

---

**Ready to analyze your data?** Start the dev server and upload your first dataset!

