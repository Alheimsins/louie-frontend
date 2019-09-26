const getTerm = term => term === '3'
  ? 'Standpunktkarakter'
  : `Halvårsvurdering ${term}. termin`

const getTemplate = template => {
  if (template === 'warning') return require('./data/warning-template.json')
  if (template === 'interview') return require('./data/interview-template.json')
  if (template === 'note') return require('./data/note-template.json')
}

const generateTemplate = ({ student, teacher, form, preview = true }) => {
  const templateData = getTemplate(form.template)
  if (!preview) delete templateData.template.watermark
  return {
    ...templateData,
    data: {
      studentName: student.name,
      schoolName: student.school,
      warningType: form.warningType,
      teacherName: teacher.name,
      term: getTerm(form.term),
      subjects: form.warningType === 'fag' && form.subjects.length > 0 ? form.subjects.join(', ') : '',
      date: (new Date()).toLocaleDateString('nb-NO'),
      note: form.note
    }
  }
}

export default generateTemplate
