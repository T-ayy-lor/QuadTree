class QuadTree {
    constructor(boundary, capacity) {
        // Boundary should be an instance of AABB
        this.boundary = boundary;
        this.capacity = capacity;
        this.points = [];
        this.divided = false;
    }

    subdivide() {
        // Create four child regions: top-left, top-right, bottom-left, bottom-right
        let x = this.boundary.x;
        let y = this.boundary.y;
        let w = this.boundary.width / 2;
        let h = this.boundary. height / 2;

        // Create four new bounding boxes
        let nw = new AABB(x,     y,     w, h);
        let ne = new AABB(x + w, y,     w, h);
        let sw = new AABB(x,     y + h, w, h);
        let se = new AABB(x + w, y + h, w, h);

        // Create four QuadTrees for these subdivisions
        this.northwest = new QuadTree(nw, this.capacity);
        this.northeast = new QuadTree(ne, this.capacity);
        this.southwest = new QuadTree(sw, this.capacity);
        this.southeast = new QuadTree(se, this.capacity);

        this.divided = true;

        // Redistribute the current points into the children
        for (let p of this.points) {
            // Insert each existing point into the children
            this.northwest.insert(p) || 
            this.northeast.insert(p) || 
            this.southwest.insert(p) || 
            this.southeast.insert(p);
        }

        // Clear the parent's point array since they are now in the children
        this.points = [];
        }

        insert(point) {
            // Point should be an object or p5.Vector
            if (!this.boundary.contains(point)) {
            // If the point isn't in the current quadtree boundary, return false
            return false;
            }

            // If there's room and no subdivision yet
            if (this.points.length < this.capacity && !this.divided) {
                this.points.push(point);
                return true;
            }

            // Otherwise, subdivide if not already
            if (!this.divided) {
                this.subdivide();
            }

            // Pass the point into the correct quadrant
            if (this.northwest.insert(point)) return true;
            if (this.northeast.insert(point)) return true;
            if (this.southwest.insert(point)) return true;
            if (this.southeast.insert(point)) return true;

            // If somehow it doesn't fit for whatever reason, return false
            return false;
        }

        query(range, found) {
            // range is an AABB that defines the query region
            // found is an array to store results
            if (!found) {
                found = [];
            }

            // If range does not intersect the boundary, stop searching
            if (!this.boundary.intersects(range)) {
                return found;
            }

            // Check each point in this node
            for (let p of this.points) {
                if (range.contains(p)) {
                    found.push(p);
                }
            }

            // If subdivided, search the children
            if (this.divided) {
                this.northwest.query(range, found);
                this.northeast.query(range, found);
                this.southwest.query(range, found);
                this.southeast.query(range, found);
            }

            return found;
        }

        show() {
            // Visualize the boundary
            stroke(0);
            strokeWeight(0.1);
            noFill();
            rect(this.boundary.x, this.boundary.y, this.boundary.width, this.boundary.height);

            // Show points
            for (let p of this.points) {
                strokeWeight(2);
                point(p.x, p.y);
            }   

            // If subdivided, show children
            if (this.divided) {
                this.northwest.show();
                this.northeast.show();
                this.southwest.show();
                this.southeast.show();
            }
        }
}