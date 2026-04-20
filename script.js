let highestZ = 1

class Paper {

    holdingPaper = false

    mouseTouchX = 0
    mouseTouchY = 0

    prevMouseX = 0
    prevMouseY = 0

    mouseX = 0
    mouseY = 0

    velocityX = 0
    velocityY = 0

    currentPaperX = 0
    currentPaperY = 0

    rotation = Math.random() * 30 - 15
    rotating = false

    init(paper)  {

        paper.addEventListener('mousedown', (e) =>    {
            if (this.holdingPaper)  return             
            this.holdingPaper = true

            paper.style.zIndex = highestZ
            highestZ++

            if (e.button === 0) {
                this.mouseTouchX = this.mouseX
                this.mouseTouchY = this.mouseY
                this.prevMouseX = this.mouseX
                this.prevMouseY = this.mouseY
            }
            if (e.button === 2) {
                this.rotating = true
            }
        });

        document.addEventListener('mousemove', (e) =>   {
            
            if (!this.rotating) {
                this.mouseX = e.clientX;
                this.mouseY = e.clientY;            
    
                this.velocityX = this.mouseX - this.prevMouseX
                this.velocityY = this.mouseY - this.prevMouseY                
            }

            const dirX = e.clientX - this.mouseTouchX
            const dirY = e.clientY - this.mouseTouchY
            const dirLength = Math.sqrt(dirX * dirX + dirY * dirY)
            const dirNormalisedX = dirX / dirLength
            const dirNormalisedY = dirY / dirLength

            const angle = Math.atan2(dirNormalisedY, dirNormalisedX)
            let degrees = 180 * angle / Math.PI
            degrees = (360 + Math.round(degrees)) % 360
            if (this.rotating) {
                this.rotation = degrees
            }

            if (this.holdingPaper) {
                if (!this.rotating) {
                    this.currentPaperX += this.velocityX
                    this.currentPaperY += this.velocityY                    
                }
                this.prevMouseX = this.mouseX
                this.prevMouseY = this.mouseY

                paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`
            }

        });

        window.addEventListener('mouseup', () => {
            this.holdingPaper = false
            this.rotating = false
        });

    }
}

const papers = Array.from(document.querySelectorAll('.paper'))

papers.forEach(paper => {
    const p = new Paper()
    p.init(paper)
});