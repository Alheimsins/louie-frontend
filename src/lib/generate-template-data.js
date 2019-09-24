const templateData = require('./data/template-data.json')
const templateDataPreview = require('./data/template-data-preview.json')

const getTerm = term => term === '3'
  ? 'Standpunktkarakter'
  : `Halvårsvurdering ${term}. termin`

module.exports = ({ student, form, preview = true }) => {
  const template = preview ? templateDataPreview : templateData
  return {
    ...template,
    data: {
      studentName: student.name,
      schoolName: student.school,
      warningType: form.warningType,
      term: getTerm(form.term),
      subjects: form.warningType === 'fag' && form.subjects.length > 0 ? form.subjects.join(', ') : '',
      date: new Date().toISOString().substring(0, 10)
    }
  }
}
