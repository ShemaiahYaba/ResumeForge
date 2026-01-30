import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { ResumeData } from '@/lib/types';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
  },
  // Left Sidebar
  sidebar: {
    width: '35%',
    backgroundColor: '#f5f5f5',
    padding: 30,
    paddingTop: 45,
  },
  sidebarSection: {
    marginBottom: 25,
  },
  sidebarTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
    color: '#2d2d2d',
  },
  skillCategory: {
    marginBottom: 12,
  },
  skillCategoryName: {
    fontSize: 9,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#4a4a4a',
  },
  skillItem: {
    fontSize: 8,
    marginBottom: 3,
    color: '#666666',
    lineHeight: 1.4,
  },
  educationItem: {
    marginBottom: 12,
  },
  educationDegree: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#2d2d2d',
    marginBottom: 3,
  },
  educationSchool: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#4a4a4a',
    marginBottom: 2,
  },
  educationDetails: {
    fontSize: 8,
    color: '#666666',
  },
  // Main Content
  mainContent: {
    width: '65%',
    padding: 45,
    paddingTop: 60,
  },
  header: {
    marginBottom: 30,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#1a1a1a',
    marginBottom: 8,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontSize: 8,
    color: '#4a4a4a',
    marginBottom: 10,
  },
  contactItem: {
    marginRight: 15,
    marginBottom: 3,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: '#2d2d2d',
    marginBottom: 12,
    paddingBottom: 3,
    borderBottom: '1px solid #cccccc',
  },
  section: {
    marginBottom: 25,
  },
  experienceItem: {
    marginBottom: 20,
  },
  jobTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  companyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  company: {
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#4a4a4a',
  },
  dates: {
    fontSize: 8,
    color: '#666666',
  },
  location: {
    fontSize: 8,
    color: '#666666',
    marginBottom: 6,
  },
  bulletPoint: {
    fontSize: 8,
    lineHeight: 1.5,
    color: '#4a4a4a',
    marginBottom: 6,
    paddingLeft: 12,
  },
  summary: {
    fontSize: 8,
    lineHeight: 1.5,
    color: '#4a4a4a',
  },
});

type ProfessionalPDFTemplateProps = {
  data: ResumeData;
};

export const ProfessionalPDFTemplate = ({ data }: ProfessionalPDFTemplateProps) => {
  const { personalInfo, experience, education, skills } = data;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const month = date.toLocaleDateString('en-US', { month: 'long', timeZone: 'UTC' });
    const year = date.toLocaleDateString('en-US', { year: 'numeric', timeZone: 'UTC' });
    return `${month} ${year}`;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Left Sidebar */}
        <View style={styles.sidebar}>
          {/* Skills */}
          {skills.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>Skills</Text>
              {skills.map((category) => (
                <View key={category.id} style={styles.skillCategory}>
                  <Text style={styles.skillCategoryName}>{category.name}</Text>
                  {category.skills.map((skill) => (
                    <Text key={skill.id} style={styles.skillItem}>
                      {skill.name}
                    </Text>
                  ))}
                </View>
              ))}
            </View>
          )}

          {/* Education */}
          {education.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>Education</Text>
              {education.map((edu) => (
                <View key={edu.id} style={styles.educationItem}>
                  <Text style={styles.educationDegree}>{edu.degree}</Text>
                  <Text style={styles.educationSchool}>{edu.school}</Text>
                  <Text style={styles.educationDetails}>
                    {edu.graduationDate && formatDate(edu.graduationDate)}
                    {edu.gpa && ` • ${edu.gpa} GPA`}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.name}>{personalInfo.name}</Text>
            <View style={styles.contactRow}>
              {personalInfo.address && (
                <Text style={styles.contactItem}>{personalInfo.address}</Text>
              )}
              {personalInfo.phone && (
                <Text style={styles.contactItem}>{personalInfo.phone}</Text>
              )}
              {personalInfo.email && (
                <Text style={styles.contactItem}>{personalInfo.email}</Text>
              )}
            </View>
          </View>

          {/* Professional Experience */}
          {experience.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Professional Experience</Text>
              {experience.map((exp) => (
                <View key={exp.id} style={styles.experienceItem}>
                  <Text style={styles.jobTitle}>{exp.title}</Text>
                  <View style={styles.companyRow}>
                    <Text style={styles.company}>{exp.company}</Text>
                    <Text style={styles.dates}>
                      {formatDate(exp.startDate)} – {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                    </Text>
                  </View>
                  {exp.location && <Text style={styles.location}>{exp.location}</Text>}
                  {exp.bullets.map((bullet) => (
                    <Text key={bullet.id} style={styles.bulletPoint}>
                      • {bullet.text}
                    </Text>
                  ))}
                </View>
              ))}
            </View>
          )}

          {/* Professional Summary */}
          {personalInfo.summary && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Professional Summary</Text>
              <Text style={styles.summary}>{personalInfo.summary}</Text>
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};