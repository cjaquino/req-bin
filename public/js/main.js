const genHash = (bins) => {
  const CHARS = 'abcdef0123456789'
  const charsCount = CHARS.length
  let hash
  do {
    hash = ""
    for (let count = 0; count < 6; count += 1) {
      let randNum = Math.random()
      let idx = Math.floor(1000 * randNum) % charsCount
      hash += CHARS[idx]
    }
  } while (bins.includes(hash))

  return hash
}

document.addEventListener("DOMContentLoaded", () => {
  const btnURLGen = document.getElementById("btnURLGen")
  const url = document.getElementById("url")

  btnURLGen.addEventListener("click", ()=> {
    fetch('/bins')
      .then(response => {
        return response.json()
      })
      .then(bins => {
        let newHash = genHash(bins);
        fetch('/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({hash:newHash})
        })
          .then((response) => {
            console.log('In then of POST')
            console.log(response)
          })
          .catch((err)=> {
            console.log(err)
          })
      })
    
  })
})