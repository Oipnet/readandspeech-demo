import ReadAndSpeech from 'readandspeech'

const readAndSpeech = new ReadAndSpeech
const voices = [];

readAndSpeech.speakers().then(speakers => {
  const voiceSelector = document.querySelector('#voiceSelector')
  const defaultSpeaker = speakers.find((speaker) => speaker.lang == navigator.language)
  readAndSpeech.changeVoice(defaultSpeaker);

  speakers.map(speaker => {
    const option = document.createElement('option')
    option.innerHTML = `${speaker.name} - ${speaker.lang}`
    option.value = speaker.voiceURI
    if (speaker == readAndSpeech.currentVoice()) {
      option.selected = 'selected'
    }
    
    voiceSelector.appendChild(option)

    voices.push(speaker)
  })
})

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault()
  
  const formData = new FormData(e.target)
  const message = formData.get('message')
  
  readAndSpeech.speak(message)
})

document.querySelector('#voiceSelector').addEventListener('change', (e) => {
  e.preventDefault()
  
  const selectedVoice = voices.find((voice) => voice.voiceURI === e.target.value)

  readAndSpeech.changeVoice(selectedVoice)
})