import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { ResumeData } from '@/lib/types';

const primaryColor = '#b58a3f';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    padding: 32,
    fontSize: 9,
    color: '#1f2937',
  },
  header: {
    textAlign: 'center',
    marginBottom: 14,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: primaryColor,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  role: {
    fontSize: 11,
    marginTop: 4,
    color: '#6b7280',
    textTransform: 'uppercase',
  },
  contactRow: {
    marginTop: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  contactItem: {
    fontSize: 8,
    color: '#6b7280',
    marginHorizontal: 6,
    marginBottom: 3,
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: primaryColor,
    textTransform: 'uppercase',
    borderBottom: `2px solid ${primaryColor}`,
    paddingBottom: 4,
    marginBottom: 6,
  },
  summary: {
    fontSize: 9,
    color: '#374151',
    lineHeight: 1.4,
  },
  expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  expCompany: {
    fontSize: 9,
    fontWeight: 'bold',
  },
  expDates: {
    fontSize: 8,
    color: '#6b7280',
  },
  expTitle: {
    fontSize: 9,
    fontStyle: 'italic',
    marginBottom: 4,
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
    alignItems: 'baseline',
    marginBottom: 6,
  },
  eduSchool: {
    fontSize: 9,
    fontWeight: 'bold',
  },
  eduDegree: {
    fontSize: 9,
  },
  skillItem: {
    fontSize: 8,
    color: '#374151',
    marginLeft: 10,
    marginBottom: 3,
  },
});

type TraditionalPDFTemplateProps = {
  data: ResumeData;
};

export const TraditionalPDFTemplate = ({ data }: TraditionalPDFTemplateProps) => {
  const { personalInfo, experience, education, skills } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo.name}</Text>
          {personalInfo.title && <Text style={styles.role}>{personalInfo.title}</Text>}
          <View style={styles.contactRow}>
            {personalInfo.address && <Text style={styles.contactItem}>{personalInfo.address}</Text>}
            {personalInfo.email && <Text style={styles.contactItem}>{personalInfo.email}</Text>}
            {personalInfo.phone && <Text style={styles.contactItem}>{personalInfo.phone}</Text>}
            {personalInfo.linkedin && <Text style={styles.contactItem}>{personalInfo.linkedin}</Text>}
          </View>
        </View>

        {personalInfo.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.summary}>{personalInfo.summary}</Text>
          </View>
        )}

        {experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Volunteer Experience</Text>
            {experience.map((exp) => (
              <View key={exp.id} style={{ marginBottom: 8 }}>
                <View style={styles.expHeader}>
                  <Text style={styles.expCompany}>{exp.company}</Text>
                  <Text style={styles.expDates}>
                    {exp.startDate} - {exp.endDate || 'Present'}
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
              <View key={edu.id} style={{ marginBottom: 6 }}>
                <View style={styles.eduRow}>
                  <Text style={styles.eduSchool}>{edu.school}</Text>
                  <Text style={styles.expDates}>{edu.graduationDate}</Text>
                </View>
                <Text style={styles.eduDegree}>{edu.degree}</Text>
              </View>
            ))}
          </View>
        )}

        {skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Additional Skills</Text>
            {skills.flatMap((category) => category.skills).map((skill) => (
              <Text key={skill.id} style={styles.skillItem}>
                - {skill.name}
              </Text>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};
