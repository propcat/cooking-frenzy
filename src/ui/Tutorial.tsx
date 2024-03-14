import styled from 'styled-components'

export function Tutorial() {
  return (
    <Container>
      <h1>Stocking the kitchen</h1>
      Find your ingredients in the fridge. Press the right button near the fridge to open it.
      <Video src='videos/tutorial_1.mp4' webkit-playsinline playsInline autoPlay loop/>

      <h1>How to chop ingredients</h1>
      Place ingredients on the cutting board and hold the right button to chop them.
      <Video src='videos/tutorial_2.mp4' webkit-playsinline playsInline autoPlay loop/>

      <h1>Cooking with the stove</h1>
      Place your ingredients in a pan or pot. Then, use the right button to place the pan or pot on the stove and start cooking.
      <Video src='videos/tutorial_3.mp4' webkit-playsinline playsInline autoPlay loop/>

      <h1>Chukaman steamer</h1>
      Place ingredients into the chukaman steamer using the right button.
      <Video src='videos/tutorial_4.mp4' webkit-playsinline playsInline autoPlay loop/>

      <h1>Assembling you dish</h1>
      Combine the necessary ingredients in the same place to automatically create your dish.
      <Video src='videos/tutorial_5.mp4' webkit-playsinline playsInline autoPlay loop/>

      <h1>Delivering your dish</h1>
      Deliver your prepared dish to the Panda. Remember to take items out of pans or pots before serving.
      <Video src='videos/tutorial_6.mp4' webkit-playsinline playsInline autoPlay loop/>

      <h1>Throw food</h1>
      For some kitchen fun, hold an object (food, pot, or pan) with the right button. Adjust your aim and release to toss it around.
      <Video src='videos/tutorial_7.mp4' webkit-playsinline playsInline autoPlay loop/>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 8px 0;

  font-family: 'Rubik Variable', sans-serif;

  * {
    font-family: 'Rubik Variable', sans-serif;
  }

  h1 {
    font-size: 1.5em;
  }
`

const Video = styled.video`
  width: 100%;
  border-radius: 12px;
  margin: 16px 0;
`