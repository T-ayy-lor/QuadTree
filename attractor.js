class Attractor {
    

    constructor() {
        // Runs upon creation
        // Generate vector with random x and y positions (z is 0)
        this.position = p5.Vector.random2D();
        this.color = 'red'

        // Create distribution constrained to a circle via scalar multiplication
        this.position.mult(random(width / 2.1));
        
        // Add half the width/height to position at center
        this.position.x += width / 2;
        this.position.y += height / 2;
    }

    show() {
        // Runs when attractorName.show() is called
        fill(this.color);
        stroke('black');
        circle(this.position.x, this.position.y, 10);
    }
}