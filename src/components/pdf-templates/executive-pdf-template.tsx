import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { ResumeData } from '@/lib/types';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
  },
  // Left Sidebar - Dark
  sidebar: {
    width: '28%',
    backgroundColor: '#2d3e50',
    padding: 30,
    paddingTop: 45,
  },
  sidebarSection: {
    marginBottom: 25,
  },
  sidebarTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 12,
    color: '#ffffff',
  },
  contactItem: {
    marginBottom: 10,
  },
  contactLabel: {
    fontSize: 7,
    color: '#a0a0a0',
    marginBottom: 2,
  },
  contactText: {
    fontSize: 8,
    color: '#ffffff',
    lineHeight: 1.3,
  },
  skillItem: {
    fontSize: 7,
    color: '#d0d0d0',
    marginBottom: 6,
    lineHeight: 1.4,
  },
  educationItem: {
    marginBottom: 12,
  },
  educationSchool: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 3,
  },
  educationDegree: {
    fontSize: 7,
    color: '#d0d0d0',
    marginBottom: 2,
  },
  educationDetails: {
    fontSize: 7,
    color: '#a0a0a0',
  },
  // Main Content
  mainContent: {
    width: '72%',
    padding: 45,
    paddingTop: 60,
  },
  header: {
    marginBottom: 30,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#1a1a1a',
    marginBottom: 3,
  },
  subtitle: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: '#666666',
    marginBottom: 10,
  },
  headerDivider: {
    borderTop: '2px solid #cccccc',
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: '#2d2d2d',
    marginBottom: 10,
  },
  section: {
    marginBottom: 25,
  },
  summary: {
    fontSize: 8,
    lineHeight: 1.5,
    color: '#4a4a4a',
  },
  experienceItem: {
    marginBottom: 20,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  jobTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  dates: {
    fontSize: 7,
    color: '#666666',
  },
  company: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#3b7ea1',
    marginBottom: 6,
  },
  bulletPoint: {
    fontSize: 8,
    lineHeight: 1.5,
    color: '#4a4a4a',
    marginBottom: 6,
    paddingLeft: 12,
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
        {/* Left Sidebar */}
        <View style={styles.sidebar}>
          {/* Contact */}
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarTitle}>Contact</Text>
            {personalInfo.phone && (
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>Phone:</Text>
                <Text style={styles.contactText}>{personalInfo.phone}</Text>
              </View>
            )}
            {personalInfo.email && (
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>Email:</Text>
                <Text style={styles.contactText}>{personalInfo.email}</Text>
              </View>
            )}
            {personalInfo.address && (
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>Location:</Text>
                <Text style={styles.contactText}>{personalInfo.address}</Text>
              </View>
            )}
          </View>

          {/* Relevant Skills */}
          {skills.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>Relevant Skills</Text>
              {skills.flatMap((category) => 
                category.skills.map((skill) => (
                  <Text key={skill.id} style={styles.skillItem}>
                    {skill.name}
                  </Text>
                ))
              )}
            </View>
          )}

          {/* Education */}
          {education.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>Education</Text>
              {education.map((edu) => (
                <View key={edu.id} style={styles.educationItem}>
                  <Text style={styles.educationSchool}>{edu.school}</Text>
                  <Text style={styles.educationDegree}>{edu.degree}</Text>
                  {edu.fieldOfStudy && (
                    <Text style={styles.educationDegree}>{edu.fieldOfStudy}</Text>
                  )}
                  {edu.graduationDate && (
                    <Text style={styles.educationDetails}>
                      {formatDate(edu.graduationDate)}
                    </Text>
                  )}
                  {edu.gpa && (
                    <Text style={styles.educationDetails}>GPA: {edu.gpa}</Text>
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
            <Text style={styles.subtitle}>
              {experience.length > 0 ? experience[0].title : 'Professional'}
            </Text>
            <View style={styles.headerDivider} />
          </View>

          {/* Professional Summary */}
          {personalInfo.summary && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Professional Summary</Text>
              <Text style={styles.summary}>{personalInfo.summary}</Text>
            </View>
          )}

          {/* Professional Experience */}
          {experience.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Professional Experience</Text>
              {experience.map((exp) => (
                <View key={exp.id} style={styles.experienceItem}>
                  <View style={styles.experienceHeader}>
                    <Text style={styles.jobTitle}>{exp.title}</Text>
                    <Text style={styles.dates}>
                      {formatDate(exp.startDate)} – {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                    </Text>
                  </View>
                  <Text style={styles.company}>
                    {exp.company}{exp.location && ` – ${exp.location}`}
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
      </Page>
    </Document>
  );
};