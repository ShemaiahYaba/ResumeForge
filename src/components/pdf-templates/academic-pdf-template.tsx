import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { ResumeData, Publication, ResearchExperience, ProfessionalMembership } from '@/lib/types';

const primaryColor = '#2d5a9d';

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
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: primaryColor,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    fontSize: 11,
    color: '#6b7280',
    marginTop: 4,
    textTransform: 'uppercase',
  },
  contact: {
    fontSize: 8,
    color: '#4b5563',
    textAlign: 'right',
    lineHeight: 1.4,
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: primaryColor,
    borderBottom: `2px solid ${primaryColor}`,
    paddingBottom: 4,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  eduItem: {
    marginBottom: 8,
  },
  eduDegree: {
    fontSize: 9,
    fontWeight: 'bold',
  },
  eduField: {
    fontSize: 8,
    fontStyle: 'italic',
  },
  eduSchool: {
    fontSize: 8,
  },
  eduDates: {
    fontSize: 8,
    color: '#6b7280',
  },
  listItem: {
    fontSize: 8,
    color: '#374151',
    marginBottom: 4,
    lineHeight: 1.4,
  },
  bullet: {
    fontSize: 8,
    color: '#374151',
    marginLeft: 10,
    marginBottom: 3,
  },
});

type AcademicPDFTemplateProps = {
  data: ResumeData;
};

export const AcademicPDFTemplate = ({ data }: AcademicPDFTemplateProps) => {
  const { personalInfo, education, publications, researchExperience, professionalMemberships } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.name}>{personalInfo.name}</Text>
            {personalInfo.title && <Text style={styles.title}>{personalInfo.title}</Text>}
          </View>
          <View style={styles.contact}>
            {personalInfo.phone && <Text>Phone: {personalInfo.phone}</Text>}
            {personalInfo.email && <Text>Email: {personalInfo.email}</Text>}
            {personalInfo.address && <Text>Address: {personalInfo.address}</Text>}
            {personalInfo.linkedin && <Text>LinkedIn: {personalInfo.linkedin}</Text>}
          </View>
        </View>

        {education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu) => (
              <View key={edu.id} style={styles.eduItem}>
                <Text style={styles.eduDegree}>{edu.degree}</Text>
                {edu.fieldOfStudy && <Text style={styles.eduField}>{edu.fieldOfStudy}</Text>}
                <Text style={styles.eduSchool}>{edu.school}</Text>
                <Text style={styles.eduDates}>
                  {edu.startDate} - {edu.graduationDate}
                </Text>
              </View>
            ))}
          </View>
        )}

        {publications && publications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Publications</Text>
            {publications.map((pub: Publication) => (
              <View key={pub.id} style={{ marginBottom: 6 }}>
                <Text style={styles.listItem}>"{pub.title.toUpperCase()}"</Text>
                <Text style={styles.listItem}>{pub.authors}</Text>
                <Text style={styles.listItem}>{pub.journal}</Text>
              </View>
            ))}
          </View>
        )}

        {researchExperience && researchExperience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Research Experience</Text>
            {researchExperience.map((exp: ResearchExperience) => (
              <Text key={exp.id} style={styles.bullet}>
                - {exp.activity}
              </Text>
            ))}
          </View>
        )}

        {professionalMemberships && professionalMemberships.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Memberships</Text>
            {professionalMemberships.map((mem: ProfessionalMembership) => (
              <Text key={mem.id} style={styles.bullet}>
                - {mem.organization}
              </Text>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};
