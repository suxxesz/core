const getIdFromTitle : (title : string) => string = (title) => {
  return title.toLocaleLowerCase().replaceAll(' ', '-')
}

export default getIdFromTitle
