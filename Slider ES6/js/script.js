const conrainerEl = document.getElementById('slider')

const slides = ['https://picsum.photos/600',
                'https://picsum.photos/600',   
                'https://picsum.photos/600', 
                'https://picsum.photos/600', 
                'https://picsum.photos/600']

const sliderConfig = {
  autoplay: true,
  interval: 2000
}

const slider = new Slider (conrainerEl, slides, sliderConfig) 
                                       