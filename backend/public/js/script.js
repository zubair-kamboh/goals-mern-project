function onSubmit() {
  console.log('hello')
}
function onEditBtnClc(id) {
  console.log('on edit btn click', id)
}

function onEditSubmit(id) {
  //   e.preventDefault()
  console.log(id)
  alert(id)
}

const onFocus = (e) => {
  console.log(e)
  const val = e.target.value
  e.target.value = ''
  e.target.value = val
}
