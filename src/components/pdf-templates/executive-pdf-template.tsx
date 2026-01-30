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
  // Left Sidebar (Narrow)
  sidebar: {
    width: '30%',
    backgroundColor: '#2C3E50',
    padding: 25,
    paddingTop: 40,
  },
  sidebarSection: {
    marginBottom: 25,
  },
  sidebarTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: '#ECF0F1',
    borderBottom: '2px solid #3498DB',
    paddingBottom: 5,
  },
  sidebarText: {
    fontSize: 8,
    marginBottom: 4,
    color: '#BDC3C7',
    lineHeight: 1.3,
  },
  contactSection: {
    marginBottom: 25,
  },
  contactTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: '#ECF0F1',
  },
  contactItem: {
    fontSize: 8,
    marginBottom: 6,
    color: '#ECF0F1',
  },
  contactLabel: {
    fontSize: 7,
    color: '#95A5A6',
    marginBottom: 2,
  },
  skillItem: {
    fontSize: 8,
    marginBottom: 3,
    color: '#BDC3C7',
  },
  certItem: {
    fontSize: 8,
    marginBottom: 4,
    color: '#BDC3C7',
  },
  // Main Content
  mainContent: {
    width: '70%',
    padding: 40,
    paddingTop: 40,
  },
  header: {
    marginBottom: 30,
    borderBottom: '3px solid #3498DB',
    paddingBottom: 15,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    fontSize: 12,
    color: '#7F8C8D',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    borderBottom: '2px solid #BDC3C7',
    paddingBottom: 4,
  },
  section: {
    marginBottom: 20,
  },
  summary: {
    fontSize: 9,
    lineHeight: 1.5,
    color: '#34495E',
    marginBottom: 20,
  },
  experienceItem: {
    marginBottom: 16,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  dates: {
    fontSize: 8,
    color: '#7F8C8D',
  },
  company: {
    fontSize: 9,
    color: '#3498DB',
    marginBottom: 6,
  },
  bulletPoint: {
    fontSize: 8,
    lineHeight: 1.4,
    color: '#34495E',
    marginBottom: 3,
    paddingLeft: 10,
  },
  educationItem: {
    marginBottom: 12,
  },
  degree: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#ECF0F1',
    marginBottom: 2,
  },
  school: {
    fontSize: 8,
    color: '#BDC3C7',
    marginBottom: 2,
  },
  eduDetails: {
    fontSize: 7,
    color: '#95A5A6',
  },
});

type ExecutivePDFTemplateProps = {
  data: ResumeData;
};

export const ExecutivePDFTemplate = ({ data }: ExecutivePDFTemplateProps) => {
  const { personalInfo, experience, education, skills } = data;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const month = date.toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' });
    const year = date.toLocaleDateString('en-US', { year: 'numeric', timeZone: 'UTC' });
    return `${month} ${year}`;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          {/* Left Sidebar */}
          <View style={styles.sidebar}>
            {/* Contact */}
            <View style={styles.contactSection}>
              <Text style={styles.contactTitle}>Contact</Text>
              {personalInfo.phone && (
                <View style={{ marginBottom: 8 }}>
                  <Text style={styles.contactLabel}>Phone:</Text>
                  <Text style={styles.contactItem}>{personalInfo.phone}</Text>
                </View>
              )}
              {personalInfo.email && (
                <View style={{ marginBottom: 8 }}>
                  <Text style={styles.contactLabel}>Email:</Text>
                  <Text style={styles.contactItem}>{personalInfo.email}</Text>
                </View>
              )}
              {personalInfo.address && (
                <View style={{ marginBottom: 8 }}>
                  <Text style={styles.contactLabel}>Location:</Text>
                  <Text style={styles.contactItem}>{personalInfo.address}</Text>
                </View>
              )}
            </View>

            {/* Skills */}
            {skills.length > 0 && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarTitle}>Relevant Skills</Text>
                {skills.map((category) => (
                  <View key={category.id} style={{ marginBottom: 6 }}>
                    {category.skills.map((skill) => (
                      <Text key={skill.id} style={styles.skillItem}>
                        {skill.name}
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
                  <View key={edu.id} style={{ marginBottom: 12 }}>
                    <Text style={styles.degree}>{edu.school}</Text>
                    <Text style={styles.school}>
                      {edu.degree} in {edu.fieldOfStudy}
                    </Text>
                    {edu.graduationDate && (
                      <Text style={styles.eduDetails}>
                        {formatDate(edu.graduationDate)}
                      </Text>
                    )}
                    {edu.gpa && (
                      <Text style={styles.eduDetails}>GPA: {edu.gpa}</Text>
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
                    <View style={styles.jobHeader}>
                      <Text style={styles.jobTitle}>{exp.title}</Text>
                      <Text style={styles.dates}>
                        {formatDate(exp.startDate)} – {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                      </Text>
                    </View>
                    <Text style={styles.company}>
                      {exp.company} – {exp.location}
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