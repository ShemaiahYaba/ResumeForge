import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import type { ResumeData } from '@/lib/types';

const accentColor = '#f5b700';
const sidebarBg = '#fff7d6';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    fontSize: 9,
    color: '#1f2937',
    flexDirection: 'row',
  },
  left: {
    width: '33%',
    backgroundColor: sidebarBg,
    padding: 24,
  },
  right: {
    width: '67%',
    padding: 24,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 16,
    alignSelf: 'center',
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: accentColor,
    marginBottom: 8,
    letterSpacing: 1,
  },
  contactItem: {
    fontSize: 8,
    color: '#374151',
    marginBottom: 4,
  },
  profileText: {
    fontSize: 8,
    color: '#374151',
    lineHeight: 1.4,
  },
  listItem: {
    fontSize: 8,
    color: '#374151',
    marginBottom: 3,
    marginLeft: 8,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: accentColor,
    textTransform: 'uppercase',
    lineHeight: 1.1,
  },
  role: {
    fontSize: 11,
    color: '#6b7280',
    marginTop: 6,
  },
  rightSectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#1f2937',
    marginBottom: 8,
  },
  expItem: {
    marginBottom: 10,
  },
  expTitle: {
    fontSize: 9,
    fontWeight: 'bold',
  },
  expDates: {
    fontSize: 8,
    color: '#6b7280',
    marginBottom: 4,
  },
  bullet: {
    fontSize: 8,
    color: '#374151',
    marginBottom: 3,
    marginLeft: 10,
  },
});

type CreativePDFTemplateProps = {
  data: ResumeData;
};

export const CreativePDFTemplate = ({ data }: CreativePDFTemplateProps) => {
  const { personalInfo, experience, education, skills, certifications } = data;
  const nameParts = personalInfo.name.split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ');

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.left}>
          {personalInfo.profileImageUrl && (
            <Image src={personalInfo.profileImageUrl} style={styles.avatar} />
          )}

          <View style={{ marginBottom: 16 }}>
            <Text style={styles.sectionTitle}>Contact</Text>
            {personalInfo.phone && <Text style={styles.contactItem}>{personalInfo.phone}</Text>}
            {personalInfo.email && <Text style={styles.contactItem}>{personalInfo.email}</Text>}
            {personalInfo.website && <Text style={styles.contactItem}>{personalInfo.website}</Text>}
            {personalInfo.address && <Text style={styles.contactItem}>{personalInfo.address}</Text>}
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text style={styles.sectionTitle}>Professional Profile</Text>
            {personalInfo.summary && <Text style={styles.profileText}>{personalInfo.summary}</Text>}
          </View>

          {skills.length > 0 && (
            <View>
              <Text style={styles.sectionTitle}>Skills</Text>
              {skills.flatMap((category) => category.skills).map((skill) => (
                <Text key={skill.id} style={styles.listItem}>
                  - {skill.name}
                </Text>
              ))}
            </View>
          )}
        </View>

        <View style={styles.right}>
          <View style={{ marginBottom: 18 }}>
            <Text style={styles.name}>{firstName}</Text>
            <Text style={styles.name}>{lastName}</Text>
            {personalInfo.title && <Text style={styles.role}>{personalInfo.title}</Text>}
          </View>

          {experience.length > 0 && (
            <View style={{ marginBottom: 14 }}>
              <Text style={styles.rightSectionTitle}>Experience</Text>
              {experience.map((exp) => (
                <View key={exp.id} style={styles.expItem}>
                  <Text style={styles.expTitle}>{exp.company} - {exp.title}</Text>
                  <Text style={styles.expDates}>
                    {exp.startDate} - {exp.endDate || 'Present'}
                  </Text>
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
            <View style={{ marginBottom: 14 }}>
              <Text style={styles.rightSectionTitle}>Education</Text>
              {education.map((edu) => (
                <View key={edu.id} style={styles.expItem}>
                  <Text style={styles.expTitle}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</Text>
                  <Text style={styles.expDates}>
                    {edu.school}{edu.location ? ` - ${edu.location}` : ''}
                  </Text>
                  <Text style={styles.expDates}>
                    {edu.startDate} - {edu.graduationDate}
                  </Text>
                  {edu.gpa && <Text style={styles.expDates}>GPA: {edu.gpa}</Text>}
                </View>
              ))}
            </View>
          )}

          {certifications && certifications.length > 0 && (
            <View>
              <Text style={styles.rightSectionTitle}>Certifications</Text>
              {certifications.map((cert) => (
                <Text key={cert.id} style={styles.listItem}>
                  - {cert.name}
                </Text>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};
