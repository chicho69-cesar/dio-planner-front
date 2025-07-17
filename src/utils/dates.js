export const getPickedDate = (pickedDate) => {
  const days = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']
  const months = [
    'Ene',
    'Feb',
    'Mar',
    'Abr',
    'May',
    'Jun',
    'Jul',
    'Ago',
    'Sep',
    'Oct',
    'Nov',
    'Dic'
  ]

  let date = `${days[pickedDate.getDay()]} ${pickedDate.getDate()} de ${
    months[pickedDate.getMonth()]
  } del ${pickedDate.getFullYear()}`

  return date
}
