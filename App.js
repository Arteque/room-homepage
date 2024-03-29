
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
        const timerContainer = document.querySelector(".timer-container")
        let clicked = false,
            timer = 5000, 
            counter = 0

            //Get the current Item and return its Index 
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

            //   let swapSliderInterval = setInterval(changeSlider, timer)

               function timerLine(){
                let percent = (counter/timer)*1000
                if( percent >= 100){
                    changeSlider()
                    counter = 0
                }
                timerContainer.style.cssText = `width: ${percent}%`
                counter++
               
               }

               function sliderAnimate(){
                timerLine()
                requestAnimationFrame(sliderAnimate)
               }
               sliderAnimate()
            //    let timerLineInterval = setInterval(timerLine, 10)

            //   add the click event

           sliderCtrs.forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.preventDefault()
                if(e.target.classList.value == "left"){
                    clicked = true
                }
                changeSlider()
                clicked = false
            } )
           })

        //    KeyboardEvent
           document.addEventListener("keydown", (e) => {
            console.log(e)
            if(e.code == "ArrowLeft" || e.code == "ArrowRight"){
                if(e.code == "ArrowLeft"){
                    clicked = true
                }
                changeSlider()
                clicked = false
            }
            
           })

