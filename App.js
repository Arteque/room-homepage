
        //Navigation // Mobile Behavior
        const burgerContainer = document.querySelector(".burger-container"),
            nav = document.querySelector("nav")

            burgerContainer.addEventListener("click", (e) => {
                e.preventDefault()

                nav.classList.toggle("open")
            })

        //Slider
        const sliderContainer = document.querySelector(".sliders-container")
        const sliderImgs = [...sliderContainer.querySelectorAll(".media-container picture")]
        const sliderCtrs = [...sliderContainer.querySelectorAll(".controlls-container li")]  
        const sliderTexts = [...sliderContainer.querySelectorAll(".text-container")]
        const timerContainer = sliderContainer.querySelector(".timer-container")
        let clicked = false,
            timer = 10000, 
            counter = 0
              function getCurrent(){
                const currentItem = sliderContainer.querySelector(".media-container picture.current")
                const index = sliderImgs.indexOf(currentItem)
                return index
              }
            
              function changeSlider(item){
                // reset the counter for the timer bar
                counter = 0
                // get the current item
                let currentImg = sliderImgs[getCurrent()]
                let currentText = sliderTexts[getCurrent()]
                let nextItem, prevItem
                
                // If the prev btn is clicked triger the prevItem
                if(clicked){
                    if(!currentImg.previousElementSibling){
                        prevItem = sliderImgs.length - 1
                    }else{
                        prevItem = sliderImgs.indexOf(currentImg.previousElementSibling)
                    }
                    currentImg.classList.remove("current")
                    currentText.classList.remove("current")
                    sliderImgs[prevItem].classList.add("current")
                    sliderTexts[prevItem].classList.add("current")

                }else{
                    // if not get the next item

                    if(!currentImg.nextElementSibling){
                        nextItem = 0
                    }else{
                        nextItem = sliderImgs.indexOf(currentImg.nextElementSibling)
                    }
                    currentImg.classList.remove("current")
                    currentText.classList.remove("current")
                    sliderImgs[nextItem].classList.add("current")
                    sliderTexts[nextItem].classList.add("current")
                } 
               }

              let swapSliderInterval = setInterval(changeSlider, timer)

               function timerLine(){

                timerContainer.style.cssText = `width: ${(counter/timer)*1000}%`
                counter++
               
               }
               let timerLineInterval = setInterval(timerLine, 10)

            //   add the click event

           sliderCtrs.forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.preventDefault()
                console.log(e.target.classList.value)
                if(e.target.classList.value == "left"){
                    clicked = true
                }
                clearInterval(swapSliderInterval)
                changeSlider()
                swapSliderInterval = setInterval(changeSlider, timer)
                clicked = false
            } )
           })

