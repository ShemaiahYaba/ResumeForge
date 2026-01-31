import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { ResumeData } from '@/lib/types';

const primaryColor = '#b59458';
const secondaryColor = '#434E60';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    padding: 40,
    fontSize: 9,
    color: '#2b2b2b',
  },
  header: {
    textAlign: 'center',
    marginBottom: 18,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: primaryColor,
  },
  title: {
    marginTop: 6,
    fontSize: 12,
    letterSpacing: 1,
    color: '#666666',
  },
  contactRow: {
    marginTop: 12,
    paddingTop: 8,
    borderTop: '1px solid #d6d6d6',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  contactItem: {
    fontSize: 8,
    color: '#666666',
    marginHorizontal: 8,
    marginBottom: 3,
  },
  section: {
    marginTop: 14,
  },
  sectionTitle: {
    fontSize: 9,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: primaryColor,
    borderBottom: `1px solid ${primaryColor}`,
    paddingBottom: 4,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  summary: {
    fontSize: 9,
    lineHeight: 1.4,
    color: '#555555',
    textAlign: 'center',
  },
  experienceItem: {
    marginBottom: 10,
  },
  expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  expCompany: {
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: secondaryColor,
  },
  expTitle: {
    fontSize: 9,
    fontStyle: 'italic',
    color: '#6b7280',
    marginTop: 2,
  },
  expDates: {
    fontSize: 8,
    color: '#6b7280',
  },
  bullet: {
    fontSize: 8,
    color: '#555555',
    marginTop: 4,
    marginLeft: 10,
    lineHeight: 1.4,
  },
  educationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  eduLeft: {
    maxWidth: '70%',
  },
  eduDegree: {
    fontSize: 9,
    fontWeight: 'bold',
    color: secondaryColor,
  },
  eduSchool: {
    fontSize: 8,
    fontStyle: 'italic',
    color: '#6b7280',
  },
  eduRight: {
    fontSize: 8,
    color: '#6b7280',
    textAlign: 'right',
  },
  skillsList: {
    marginTop: 6,
  },
  skillItem: {
    fontSize: 8,
    color: '#555555',
    marginBottom: 3,
    marginLeft: 10,
  },
});

type ProfessionalPDFTemplateProps = {
  data: ResumeData;
};

export const ProfessionalPDFTemplate = ({ data }: ProfessionalPDFTemplateProps) => {
  const { personalInfo, experience, education, skills } = data;

  const formatMonthYear = (dateString: string | null | undefined) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const month = date.toLocaleDateString('en-US', { month: 'long', timeZone: 'UTC' });
    const year = date.toLocaleDateString('en-US', { year: 'numeric', timeZone: 'UTC' });
    return `${month} ${year}`;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo.name}</Text>
          {personalInfo.title && <Text style={styles.title}>{personalInfo.title}</Text>}
          <View style={styles.contactRow}>
            {personalInfo.phone && <Text style={styles.contactItem}>{personalInfo.phone}</Text>}
            {personalInfo.email && <Text style={styles.contactItem}>{personalInfo.email}</Text>}
            {personalInfo.website && <Text style={styles.contactItem}>{personalInfo.website}</Text>}
            {personalInfo.address && <Text style={styles.contactItem}>{personalInfo.address}</Text>}
            {personalInfo.linkedin && <Text style={styles.contactItem}>{personalInfo.linkedin}</Text>}
          </View>
        </View>

        {personalInfo.summary && (
          <View style={styles.section}>
            <Text style={styles.summary}>{personalInfo.summary}</Text>
          </View>
        )}

        {experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {experience.map((exp) => (
              <View key={exp.id} style={styles.experienceItem}>
                <View style={styles.expHeader}>
                  <Text style={styles.expCompany}>{exp.company}</Text>
                  <Text style={styles.expDates}>
                    {formatMonthYear(exp.startDate)} - {exp.endDate ? formatMonthYear(exp.endDate) : 'Present'}
                  </Text>
                </View>
                <Text style={styles.expTitle}>{exp.title}</Text>
                {exp.bullets.map((bullet) => (
                  <Text key={bullet.id} style={styles.bullet}>
                    - {bullet.text}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        )}

        {education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu) => (
              <View key={edu.id} style={styles.educationItem}>
                <View style={styles.eduLeft}>
                  <Text style={styles.eduDegree}>{edu.degree}</Text>
                  <Text style={styles.eduSchool}>
                    {edu.school}{edu.location ? `, ${edu.location}` : ''}
                  </Text>
                </View>
                <View style={styles.eduRight}>
                  {edu.gpa && <Text>{edu.gpa} GPA</Text>}
                  {edu.graduationDate && <Text>{formatMonthYear(edu.graduationDate)}</Text>}
                </View>
              </View>
            ))}
          </View>
        )}

        {skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsList}>
              {skills.flatMap((category) => category.skills).map((skill) => (
                <Text key={skill.id} style={styles.skillItem}>
                  - {skill.name}
                </Text>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};
