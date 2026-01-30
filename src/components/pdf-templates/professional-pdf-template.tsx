import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { ResumeData } from '@/lib/types';

// Create styles for PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 0,
    fontFamily: 'Helvetica',
  },
  container: {
    flexDirection: 'row',
    height: '100%',
  },
  // Left Sidebar
  sidebar: {
    width: '35%',
    backgroundColor: '#F8F9FA',
    padding: 30,
  },
  sidebarSection: {
    marginBottom: 20,
  },
  sidebarTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: '#2C3E50',
  },
  contactItem: {
    fontSize: 9,
    marginBottom: 4,
    color: '#495057',
  },
  skillItem: {
    fontSize: 9,
    marginBottom: 3,
    color: '#495057',
  },
  // Main Content
  mainContent: {
    width: '65%',
    padding: 40,
    paddingTop: 30,
  },
  header: {
    marginBottom: 25,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 6,
  },
  title: {
    fontSize: 14,
    color: '#3498DB',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    borderBottom: '2px solid #3498DB',
    paddingBottom: 4,
  },
  section: {
    marginBottom: 20,
  },
  summary: {
    fontSize: 10,
    lineHeight: 1.5,
    color: '#495057',
    marginBottom: 20,
  },
  experienceItem: {
    marginBottom: 15,
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 2,
  },
  company: {
    fontSize: 10,
    color: '#3498DB',
    marginBottom: 2,
  },
  dates: {
    fontSize: 9,
    color: '#6C757D',
    marginBottom: 6,
  },
  bulletPoint: {
    fontSize: 9,
    lineHeight: 1.4,
    color: '#495057',
    marginBottom: 3,
    paddingLeft: 10,
  },
  educationItem: {
    marginBottom: 10,
  },
  degree: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 2,
  },
  school: {
    fontSize: 9,
    color: '#495057',
    marginBottom: 2,
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
        <View style={styles.container}>
          {/* Left Sidebar */}
          <View style={styles.sidebar}>
            {/* Contact Info */}
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>Contact</Text>
              {personalInfo.phone && (
                <Text style={styles.contactItem}>{personalInfo.phone}</Text>
              )}
              {personalInfo.email && (
                <Text style={styles.contactItem}>{personalInfo.email}</Text>
              )}
              {personalInfo.address && (
                <Text style={styles.contactItem}>{personalInfo.address}</Text>
              )}
            </View>

            {/* Skills */}
            {skills.length > 0 && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarTitle}>Skills</Text>
                {skills.map((category) => (
                  <View key={category.id} style={{ marginBottom: 8 }}>
                    <Text style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 3, color: '#2C3E50' }}>
                      {category.name}
                    </Text>
                    {category.skills.map((skill) => (
                      <Text key={skill.id} style={styles.skillItem}>
                        • {skill.name}
                      </Text>
                    ))}
                  </View>
                ))}
              </View>
            )}

            {/* Education in Sidebar */}
            {education.length > 0 && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarTitle}>Education</Text>
                {education.map((edu) => (
                  <View key={edu.id} style={{ marginBottom: 10 }}>
                    <Text style={{ fontSize: 9, fontWeight: 'bold', color: '#2C3E50', marginBottom: 2 }}>
                      {edu.degree}
                    </Text>
                    <Text style={{ fontSize: 8, color: '#495057', marginBottom: 1 }}>
                      {edu.school}
                    </Text>
                    {edu.graduationDate && (
                      <Text style={{ fontSize: 8, color: '#6C757D' }}>
                        {formatDate(edu.graduationDate)}
                      </Text>
                    )}
                    {edu.gpa && (
                      <Text style={{ fontSize: 8, color: '#6C757D' }}>
                        GPA: {edu.gpa}
                      </Text>
                    )}
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
              <Text style={styles.title}>
                {experience.length > 0 ? experience[0].title : 'Professional'}
              </Text>
            </View>

            {/* Professional Summary */}
            {personalInfo.summary && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Professional Summary</Text>
                <Text style={styles.summary}>{personalInfo.summary}</Text>
              </View>
            )}

            {/* Experience */}
            {experience.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Professional Experience</Text>
                {experience.map((exp) => (
                  <View key={exp.id} style={styles.experienceItem}>
                    <Text style={styles.jobTitle}>{exp.title}</Text>
                    <Text style={styles.company}>{exp.company}</Text>
                    <Text style={styles.dates}>
                      {formatDate(exp.startDate)} – {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                    </Text>
                    {exp.bullets.map((bullet) => (
                      <Text key={bullet.id} style={styles.bulletPoint}>
                        • {bullet.text}
                      </Text>
                    ))}
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};