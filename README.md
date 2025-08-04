# Rubric Score Sheet Generator

A modern web application that allows educators to create custom rubrics and generate score sheets instantly. Built with React and featuring a beautiful, responsive UI.

## Features

### 🎯 Rubric Builder
- **Custom Criteria**: Add multiple evaluation criteria with custom names and descriptions
- **Performance Levels**: Define 4 performance levels (Excellent, Good, Fair, Poor) with custom point values
- **Flexible Scoring**: Set maximum points for each criterion (1-100 points)
- **Real-time Preview**: See your rubric structure as you build it

### 📊 Score Sheet Generator
- **Instant Generation**: Create score sheets immediately after building your rubric
- **Student Management**: Add and remove students dynamically
- **Live Scoring**: Enter scores for each criterion with automatic total calculation
- **Grade Calculation**: Automatic grade assignment (A, B, C, D, F) based on percentage
- **Color-coded Results**: Visual feedback with color-coded scores and grades

### 🖨️ Print & Export
- **Print-ready Layout**: Professional score sheet format optimized for printing
- **Class Statistics**: Summary statistics including average, highest, and lowest scores
- **Complete Documentation**: Includes rubric criteria and performance levels in the printout

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone or download the project files**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to use the application

## How to Use

### Step 1: Build Your Rubric
1. **Enter Rubric Details**
   - Add a title for your rubric (e.g., "Essay Writing Rubric")
   - Provide a brief description

2. **Add Evaluation Criteria**
   - Click "Add New Criterion"
   - Enter criterion name (e.g., "Content Quality", "Grammar", "Organization")
   - Set maximum points for the criterion
   - Add a description of what the criterion evaluates

3. **Define Performance Levels**
   - For each criterion, define 4 performance levels
   - Set level names (e.g., "Excellent", "Good", "Fair", "Poor")
   - Assign point values for each level
   - Add descriptions for each performance level

4. **Review and Add**
   - Review your criterion and performance levels
   - Click "Add Criterion" to save it
   - Repeat for additional criteria

### Step 2: Generate Score Sheet
1. **Generate Score Sheet**
   - Once you have at least one criterion, click "Generate Score Sheet"
   - The application will automatically switch to the score sheet view

2. **Add Students**
   - Click "Add Student" to add students to your class
   - Enter student names when prompted

3. **Enter Scores**
   - For each student, enter scores for each criterion
   - Scores are automatically validated against maximum points
   - Total scores and grades are calculated automatically

4. **Print or Save**
   - Click "Print Score Sheet" to generate a printable version
   - The printout includes the complete rubric and all student scores

## Features in Detail

### Rubric Builder
- **Dynamic Criteria Management**: Add, edit, and remove criteria as needed
- **Performance Level Customization**: Customize point values and descriptions for each level
- **Validation**: Ensures all required fields are completed before adding criteria
- **Visual Organization**: Clear layout with cards and sections for easy navigation

### Score Sheet
- **Responsive Table**: Horizontal scrolling for many criteria
- **Real-time Calculations**: Automatic total score and grade calculation
- **Input Validation**: Prevents scores exceeding maximum points
- **Student Management**: Easy addition and removal of students
- **Class Analytics**: Summary statistics for the entire class

### Print Functionality
- **Professional Layout**: Clean, organized print format
- **Complete Information**: Includes rubric criteria, performance levels, and all student data
- **Statistics Summary**: Class performance overview
- **Print Optimization**: Proper page breaks and formatting

## Technical Details

### Built With
- **React 18**: Modern React with hooks and functional components
- **CSS3**: Custom styling with modern design patterns
- **Lucide React**: Beautiful icons for enhanced UX
- **React-to-Print**: Professional print functionality

### Browser Support
- Chrome (recommended)
- Firefox
- Safari
- Edge

### Responsive Design
- Mobile-friendly interface
- Adaptive layouts for different screen sizes
- Touch-friendly controls

## Use Cases

### Education
- **Classroom Assessment**: Create rubrics for essays, projects, presentations
- **Standardized Evaluation**: Ensure consistent grading across multiple evaluators
- **Student Feedback**: Provide detailed feedback with specific criteria
- **Progress Tracking**: Monitor student performance over time

### Professional Development
- **Employee Evaluation**: Assess job performance with specific criteria
- **Project Assessment**: Evaluate project deliverables
- **Competition Judging**: Score competitions with multiple criteria
- **Peer Review**: Facilitate structured peer evaluation

## Tips for Effective Rubrics

1. **Be Specific**: Use clear, measurable criteria
2. **Balance Detail**: Provide enough detail without being overwhelming
3. **Fair Point Distribution**: Ensure point values reflect the importance of each criterion
4. **Clear Descriptions**: Write performance level descriptions that are easy to understand
5. **Test Your Rubric**: Use it with a few sample submissions to ensure it works as intended

## Support

This application is designed to be intuitive and user-friendly. If you encounter any issues:

1. Ensure all required fields are completed
2. Check that point values are within the specified ranges
3. Verify that performance level descriptions are meaningful
4. Make sure you have at least one criterion before generating a score sheet

## Future Enhancements

Potential features for future versions:
- Save and load rubrics
- Export to Excel/CSV
- Multiple rubric templates
- Collaborative scoring
- Student self-assessment
- Rubric sharing and templates

---

**Happy Grading!** 🎓 