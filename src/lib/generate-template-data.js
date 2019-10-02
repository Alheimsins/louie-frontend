import config from '../../config'

const getTerm = term => term === '3'
  ? 'standpunktkarakter'
  : `halvårsvurdering ${term}. termin`

const getSchoolYear = (date = new Date()) => {
  const month = date.getMonth() + 1
  let year = date.getFullYear()
  if (month > 7) year++
  return `${year - 1}/${year}`
}

const getTemplate = (template, form) => {
  if (template === 'warning' && form.warningType === 'fag') return require('./data/warning-class-template.json')
  if (template === 'warning') return require('./data/warning-template.json')
  if (template === 'interview' && form.interview === 'done') return require('./data/interview-template.json')
  if (template === 'interview') return require('./data/no-interview-template.json')
  if (template === 'note') return require('./data/note-template.json')
}

const generateTemplate = ({ student, teacher, form, preview = true }) => {
  const templateData = getTemplate(form.template, form)
  if (!preview) delete templateData.template.watermark
  return {
    ...templateData,
    data: {
      studentName: student.name,
      schoolName: student.school,
      warningType: form.warningType,
      companyName: config.company.name,
      companyLogo: config.company.logo,
      teacherName: teacher.name,
      term: getTerm(form.term),
      schoolYear: getSchoolYear(),
      subjects: form.warningType === 'fag' && form.subjects.length > 0 ? form.subjects.join(', ') : '',
      date: (new Date()).toLocaleDateString('nb-NO'),
      note: form.note
    }
  }
}

export default generateTemplate
