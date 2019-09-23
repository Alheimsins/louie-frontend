const templateData = require('./data/template-data.json')

const getTerm = term => term === '3'
  ? 'Standpunktkarakter'
  : `Halvårsvurdering ${term}. termin`

module.exports = ({ student, form }) => {
  return {
    ...templateData,
    data: {
      studentName: student.name,
      schoolName: student.school,
      warningType: form.warningType,
      term: getTerm(form.term),
      subjects: form.warningType === 'fag' && form.subjects ? form.subjects.join(', ') : false,
      date: new Date().toISOString().substring(0, 10)
    }
  }
}
