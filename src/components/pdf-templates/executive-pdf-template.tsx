import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { ResumeData } from '@/lib/types';

const primaryColor = '#d8609c';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    fontSize: 9,
    color: '#1f2937',
  },
  header: {
    backgroundColor: primaryColor,
    color: '#FFFFFF',
    textAlign: 'center',
    paddingVertical: 22,
    paddingHorizontal: 30,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  role: {
    marginTop: 6,
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  body: {
    flexDirection: 'row',
  },
  left: {
    width: '38%',
    padding: 24,
    borderRight: '2px solid #1f2937',
  },
  right: {
    width: '62%',
    padding: 24,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: primaryColor,
    marginBottom: 8,
  },
  leftSection: {
    marginBottom: 18,
  },
  contactItem: {
    fontSize: 8,
    color: '#374151',
    marginBottom: 6,
  },
  educationItem: {
    marginBottom: 10,
  },
  eduSchool: {
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  eduDegree: {
    fontSize: 8,
    color: '#4b5563',
    marginTop: 2,
  },
  eduDates: {
    fontSize: 8,
    color: '#6b7280',
    marginTop: 2,
  },
  listItem: {
    fontSize: 8,
    color: '#374151',
    marginBottom: 4,
    marginLeft: 10,
    lineHeight: 1.4,
  },
  summary: {
    fontSize: 8,
    color: '#374151',
    lineHeight: 1.5,
  },
  experienceItem: {
    marginBottom: 12,
  },
  expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  expCompany: {
    fontSize: 9,
    fontWeight: 'bold',
  },
  expDates: {
    fontSize: 7,
    color: '#6b7280',
  },
  expTitle: {
    fontSize: 8,
    fontStyle: 'italic',
    marginBottom: 4,
  },
  referencesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  referenceItem: {
    width: '48%',
  },
  referenceName: {
    fontSize: 8,
    fontWeight: 'bold',
  },
  referenceLine: {
    fontSize: 8,
    color: '#374151',
  },
});

type ExecutivePDFTemplateProps = {
  data: ResumeData;
};

export const ExecutivePDFTemplate = ({ data }: ExecutivePDFTemplateProps) => {
  const { personalInfo, experience, education, skills, certifications, references } = data;

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const month = date.toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' });
    const year = date.toLocaleDateString('en-US', { year: 'numeric', timeZone: 'UTC' });
    return `${month} ${year}`;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo.name}</Text>
          {personalInfo.title && <Text style={styles.role}>{personalInfo.title}</Text>}
        </View>

        <View style={styles.body}>
          <View style={styles.left}>
            <View style={styles.leftSection}>
              <Text style={styles.sectionTitle}>Contact</Text>
              {personalInfo.phone && <Text style={styles.contactItem}>{personalInfo.phone}</Text>}
              {personalInfo.email && <Text style={styles.contactItem}>{personalInfo.email}</Text>}
              {personalInfo.address && <Text style={styles.contactItem}>{personalInfo.address}</Text>}
              {personalInfo.linkedin && <Text style={styles.contactItem}>{personalInfo.linkedin}</Text>}
              {personalInfo.website && <Text style={styles.contactItem}>{personalInfo.website}</Text>}
            </View>

            {education.length > 0 && (
              <View style={styles.leftSection}>
                <Text style={styles.sectionTitle}>Education</Text>
                {education.map((edu) => (
                  <View key={edu.id} style={styles.educationItem}>
                    <Text style={styles.eduSchool}>{edu.school}</Text>
                    <Text style={styles.eduDegree}>{edu.degree}</Text>
                    {edu.fieldOfStudy && <Text style={styles.eduDegree}>{edu.fieldOfStudy}</Text>}
                    <Text style={styles.eduDates}>
                      {edu.startDate && edu.graduationDate
                        ? `${edu.startDate} - ${edu.graduationDate}`
                        : edu.graduationDate || edu.startDate || ''}
                    </Text>
                    {edu.gpa && <Text style={styles.eduDates}>GPA: {edu.gpa}</Text>}
                  </View>
                ))}
              </View>
            )}

            {skills.length > 0 && (
              <View style={styles.leftSection}>
                <Text style={styles.sectionTitle}>Relevant Skills</Text>
                {skills.flatMap((category) => category.skills).map((skill) => (
                  <Text key={skill.id} style={styles.listItem}>
                    - {skill.name}
                  </Text>
                ))}
              </View>
            )}

            {certifications && certifications.length > 0 && (
              <View style={styles.leftSection}>
                <Text style={styles.sectionTitle}>Certifications</Text>
                {certifications.map((cert) => (
                  <Text key={cert.id} style={styles.listItem}>
                    - {cert.name}
                  </Text>
                ))}
              </View>
            )}
          </View>

          <View style={styles.right}>
            {personalInfo.summary && (
              <View style={{ marginBottom: 16 }}>
                <Text style={styles.sectionTitle}>Professional Summary</Text>
                <Text style={styles.summary}>{personalInfo.summary}</Text>
              </View>
            )}

            {experience.length > 0 && (
              <View style={{ marginBottom: 16 }}>
                <Text style={styles.sectionTitle}>Professional Experience</Text>
                {experience.map((exp) => (
                  <View key={exp.id} style={styles.experienceItem}>
                    <View style={styles.expHeader}>
                      <Text style={styles.expCompany}>
                        {exp.company}{exp.location ? ` - ${exp.location}` : ''}
                      </Text>
                      <Text style={styles.expDates}>
                        {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'PRESENT'}
                      </Text>
                    </View>
                    <Text style={styles.expTitle}>{exp.title}</Text>
                    {exp.bullets.map((bullet) => (
                    <Text key={bullet.id} style={styles.listItem}>
                      - {bullet.text}
                    </Text>
                  ))}
                  </View>
                ))}
              </View>
            )}

            {references && references.length > 0 && (
              <View>
                <Text style={styles.sectionTitle}>Reference</Text>
                <View style={styles.referencesGrid}>
                  {references.map((ref) => (
                    <View key={ref.id} style={styles.referenceItem}>
                      <Text style={styles.referenceName}>{ref.name}</Text>
                      <Text style={styles.referenceLine}>{ref.title}</Text>
                      <Text style={styles.referenceLine}>Phone: {ref.phone}</Text>
                      <Text style={styles.referenceLine}>Email: {ref.email}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};
