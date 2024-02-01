const container = document.getElementById("container");
const width = 19;
const height = 9;


function makeRows(rows, cols) {
    container.style.setProperty('--grid-rows', rows);
    container.style.setProperty('--grid-cols', cols);
    for (c = 0; c < (rows * cols); c++) {
        let cell = document.createElement("div");
        cell.gridval = 0 
        cell.onclick = fillCell
        container.appendChild(cell).className = "grid-item";
    }
}

function fillCell() {
    this.gridval = (this.gridval == 0 ? 1 : 0);
	this.style.backgroundColor = (this.style.backgroundColor == "black" ? "white": "black");
    console.log(this.gridval);
}

function getGrid(){
	let cells = document.querySelectorAll('.grid-item');
	return Array.prototype.map.call(cells, function(cell) {
    return cell.gridval;
    })
}

function readGrid(){
	let grid = getGrid();
    console.log(grid);
    
    //turn grid into binary numbers
    // do it old school
    let vals = []
    for(let i=0; i<grid.length; i+=width){
        vals.push(parseInt(grid.slice(i, i+width).join(''), 2));
    }
    //this is terrible, but it's a formatting hack
    //TODO find a better solution
    vals.splice(3,0,'\n        ')
    console.log(vals);
    return 'G[]={' + vals.join() + '}'
    }

function updateCard(config){
	let template = `
        #include &lt;stdlib.h&gt;   // card &gt; aek.ppm
        #include &lt;stdio.h&gt;
        #include &lt;math.h&gt;
        typedef int i;typedef float f;struct v{
        f x,y,z;v operator+(v r){return v(x+r.x
        ,y+r.y,z+r.z);}v operator*(f r){return
        v(x*r,y*r,z*r);}f operator%(v r){return
        x*r.x+y*r.y+z*r.z;}v(){}v operator^(v r
        ){return v(y*r.z-z*r.y,z*r.x-x*r.z,x*r.
        y-y*r.x);}v(f a,f b,f c){x=a;y=b;z=c;}v
        operator!(){return*this*(1/sqrt(*this%*
        this));}};i G[]={247570,280596,280600,
        249748,18578,18577,231184,16,16};f R(){
        return(f)rand()/RAND_MAX;}i T(v o,v d,f
        &amp;t,v&amp;n){t=1e9;i m=0;f p=-o.z/d.z;if(.01
        &lt;p)t=p,n=v(0,0,1),m=1;for(i k=19;k--;)
        for(i j=9;j--;)if(G[j]&amp;1&lt;&lt;k){v p=o+v(-k
        ,0,-j-4);f b=p%d,c=p%p-1,q=b*b-c;if(q&gt;0
        ){f s=-b-sqrt(q);if(s&lt;t&amp;&amp;s&gt;.01)t=s,n=!(
        p+d*t),m=2;}}return m;}v S(v o,v d){f t
        ;v n;i m=T(o,d,t,n);if(!m)return v(.7,
        .6,1)*pow(1-d.z,4);v h=o+d*t,l=!(v(9+R(
        ),9+R(),16)+h*-1),r=d+n*(n%d*-2);f b=l%
        n;if(b&lt;0||T(h,l,t,n))b=0;f p=pow(l%r*(b
        &gt;0),99);if(m&amp;1){h=h*.2;return((i)(ceil(
        h.x)+ceil(h.y))&amp;1?v(3,1,1):v(3,3,3))*(b
        *.2+.1);}return v(p,p,p)+S(h,r)*.5;}i
        main(){printf("P6 512 512 255 ");v g=!v
        (-6,-16,0),a=!(v(0,0,1)^g)*.002,b=!(g^a
        )*.002,c=(a+b)*-256+g;for(i y=512;y--;)
        for(i x=512;x--;){v p(13,13,13);for(i r
        =64;r--;){v t=a*(R()-.5)*99+b*(R()-.5)*
        99;p=S(v(17,16,8)+t,!(t*-1+(a*(R()+x)+b
        *(y+R())+c)*16))*3.5+p;}printf("%c%c%c"
        ,(i)p.x,(i)p.y,(i)p.z);}}`
    configPattern = /G\[]={.*\n.*}/gm
    console.log(template.search(configPattern))
        modified = template.replace(/G\[]={.*\n.*}/gm, config);
    raytracer = document.getElementById("raytracer");
    raytracer.innerHTML = modified;
    
}

function copyToClipboard(){
    var copyText = document.querySelector("#raytracer code").innerText;
    navigator.clipboard.writeText(copyText).then(function() {
        // alert('Code copied to clipboard!');
    }).catch(function(error) {
        // alert('Error copying code: ' + error);
    });
}

function clearGrid() {
    let cells = document.querySelectorAll('.grid-item');
    cells.forEach(cell => {
        cell.style.backgroundColor = "white"; // Resetting cell color
        cell.gridval = 0; // Resetting grid value
    });
}

function raytrace(){

}

function main(){
    config = readGrid();
    console.log(config);
    updateCard(config);
    raytrace();
}


makeRows(height, width);


