import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { ResumeData } from '@/lib/types';

const primaryColor = '#90C373';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    padding: 32,
    fontSize: 9,
    color: '#1f2937',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottom: `2px solid ${primaryColor}`,
    paddingBottom: 10,
    marginBottom: 14,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  role: {
    fontSize: 9,
    fontWeight: 'bold',
    color: primaryColor,
    letterSpacing: 1,
    marginTop: 4,
    textTransform: 'uppercase',
  },
  contact: {
    textAlign: 'right',
    fontSize: 8,
    color: '#4b5563',
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    backgroundColor: primaryColor,
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    paddingVertical: 3,
    paddingHorizontal: 6,
    marginBottom: 6,
    alignSelf: 'flex-start',
  },
  summary: {
    fontSize: 8,
    color: '#374151',
    lineHeight: 1.5,
  },
  expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  expCompany: {
    fontSize: 9,
    fontWeight: 'bold',
    color: primaryColor,
  },
  expTitle: {
    fontSize: 8,
    fontStyle: 'italic',
    marginBottom: 3,
  },
  expDates: {
    fontSize: 7,
    color: '#6b7280',
  },
  bullet: {
    fontSize: 8,
    color: '#374151',
    marginLeft: 10,
    marginBottom: 3,
    lineHeight: 1.4,
  },
  eduRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  eduDegree: {
    fontSize: 9,
    fontWeight: 'bold',
    color: primaryColor,
  },
  eduSchool: {
    fontSize: 8,
    color: '#374151',
  },
  eduDates: {
    fontSize: 7,
    color: '#6b7280',
  },
  listItem: {
    fontSize: 8,
    color: '#374151',
    marginLeft: 10,
    marginBottom: 3,
  },
});

type ChronologicalPDFTemplateProps = {
  data: ResumeData;
};

export const ChronologicalPDFTemplate = ({ data }: ChronologicalPDFTemplateProps) => {
  const { personalInfo, experience, education, skills, certifications, languages } = data;

  const formatMonthYear = (dateString: string | null | undefined) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const month = date.toLocaleDateString('en-US', { month: 'long', timeZone: 'UTC' });
    const year = date.toLocaleDateString('en-US', { year: 'numeric', timeZone: 'UTC' });
    return `${month} ${year}`;
  };

  const formatYear = (dateString: string | null | undefined) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', timeZone: 'UTC' });
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.name}>{personalInfo.name}</Text>
            <Text style={styles.role}>
              {personalInfo.title ? personalInfo.title.toUpperCase() : 'CHRONOLOGICAL RESUME'}
            </Text>
          </View>
          <View style={styles.contact}>
            {personalInfo.address && <Text>{personalInfo.address}</Text>}
            {personalInfo.phone && <Text>{personalInfo.phone}</Text>}
            {personalInfo.email && <Text>{personalInfo.email}</Text>}
            {personalInfo.linkedin && <Text>{personalInfo.linkedin}</Text>}
          </View>
        </View>

        {personalInfo.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.summary}>{personalInfo.summary}</Text>
          </View>
        )}

        {education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu) => (
              <View key={edu.id} style={styles.eduRow}>
                <View>
                  <Text style={styles.eduDegree}>{edu.degree}</Text>
                  <Text style={styles.eduSchool}>{edu.school}</Text>
                  {edu.gpa && <Text style={styles.eduSchool}>GPA: {edu.gpa}</Text>}
                </View>
                <Text style={styles.eduDates}>
                  {formatYear(edu.startDate)} - {formatYear(edu.graduationDate)}
                </Text>
              </View>
            ))}
          </View>
        )}

        {experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Relevant Experience</Text>
            {experience.map((exp) => (
              <View key={exp.id} style={{ marginBottom: 8 }}>
                <View style={styles.expHeader}>
                  <View>
                    <Text style={styles.expCompany}>{exp.company}</Text>
                    <Text style={styles.expTitle}>{exp.title}</Text>
                  </View>
                  <Text style={styles.expDates}>
                    {formatMonthYear(exp.startDate)} - {exp.endDate ? formatMonthYear(exp.endDate) : 'Present'}
                  </Text>
                </View>
                {exp.bullets.map((bullet) => (
                  <Text key={bullet.id} style={styles.bullet}>
                    - {bullet.text}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        )}

        {skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            {skills.flatMap((category) => category.skills).map((skill) => (
              <Text key={skill.id} style={styles.listItem}>
                - {skill.name}
              </Text>
            ))}
          </View>
        )}

        {certifications && certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {certifications.map((cert) => (
              <Text key={cert.id} style={styles.listItem}>
                - {cert.name}
              </Text>
            ))}
          </View>
        )}

        {languages && languages.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Languages</Text>
            {languages.map((lang) => (
              <Text key={lang.id} style={styles.listItem}>
                - {lang.name}{lang.fluency ? ` - ${lang.fluency}` : ''}
              </Text>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};
