const templateData = require('./data/template-data.json')

const getTerm = term => {
  return term === 1 || term === 2
    ? `Halvårsvurdering ${term}. termin`
    : 'Standpunktkarakter'
}

module.exports = ({ student, form }) => {
  return {
    ...templateData,
    data: {
      studentName: student.name,
      schoolName: student.school,
      warningType: form.warningType,
      term: getTerm(form.term),
      fag: form.fag ? form.fag.join(', ') : false,
      date: new Date().toISOString().substring(0, 10)
    }
  }
}
