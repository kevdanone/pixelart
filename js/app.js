var app = {
    invader : document.getElementById('invader'),
    gridSize : document.createElement('input'),
    pixelSize : document.createElement('input'),
    styles: ['empty', 'plain','light', 'highlight'],
    selectedColor: 'pixel--plain',

    createForm: function(){
        var form = document.getElementById('form');

        app.gridSize.setAttribute("type","number");
        app.gridSize.setAttribute("placeholder","Taille de la grille");
        app.gridSize.setAttribute("id","grid");
        form.appendChild(app.gridSize);

        app.pixelSize.setAttribute("type","number");
        app.pixelSize.setAttribute("placeholder","Taille des pixels");
        app.pixelSize.setAttribute("id","pixels");
        form.appendChild(app.pixelSize);

        var button = document.createElement('button');
        button.setAttribute("type","submit");
        button.setAttribute("id","btn");
        button.innerText = "Valider";
        form.appendChild(button);
    },

    createGrid: function(rows, pixelSize){
        for (var i=0; i<rows; i++) {
            var gridRow = document.createElement('div');
            gridRow.classList.add('row');
            app.invader.appendChild(gridRow);
            for (var j=0; j<rows; j++) {
                 var pixelNode = document.createElement('div');
                 pixelNode.addEventListener('click', function(event) {                   
                    event.target.className = 'pixel ' + app.selectedColor;
                });
                 pixelNode.classList.add('pixel');
                 pixelNode.style.width = pixelSize+"px";
                 pixelNode.style.height = pixelSize+"px";
                 gridRow.appendChild(pixelNode);
            }
        }
    },

    createFooter: function(){
        var footer = document.getElementById('footer');
        for (var i = 0; i< app.styles.length ; i++) {
            var changeColor = document.createElement("div");
            changeColor.classList.add(`pixel--${app.styles[i]}`);
            if (changeColor.classList.contains(app.selectedColor))
                changeColor.classList.add('active');
            changeColor.addEventListener('click',function(event){
                var oldColor = document.querySelector('footer .active');
                if (oldColor) {
                    oldColor.classList.remove('active');
                }
                event.target.classList.add('active');
                app.selectedColor = event.target.className;
                console.log(event.target.className, event.target.classList);
            });
            footer.appendChild(changeColor);
        } 
    },

    resetGrid: function() {
        while (app.invader.firstChild) {
            app.invader.removeChild(app.invader.firstChild);
        }
    },

    init: function(){
        app.createForm();
        app.createGrid(8);
        app.createFooter();
        form.addEventListener('submit', function(event){
            console.log("button has been clicked");
            app.resetGrid();
            app.createGrid(app.gridSize.value, app.pixelSize.value);
            event.preventDefault();
        });
    }
};

app.init();

// PAILLETTE ATTAQUE EASTER EGG INCOMING!!!!

var pattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
var current = 0;
var keyHandler = function (event) {

	// If the key isn't in the pattern, or isn't the current key in the pattern, reset
	if (pattern.indexOf(event.key) < 0 || event.key !== pattern[current]) {
		current = 0;
		return;
	}

	// Update how much of the pattern is complete
	current++;

	// If complete, alert and reset
	if (pattern.length === current) {
		current = 0;
        document.getElementById('main').style.backgroundImage = "url('image/licorne.png')";
        app.selectedColor = 'pixel--unicorn';
        document.getElementById('h1').textContent = "welcome to the fucking amazing unicorn pixel art game bitches";
        
        // le main
        var main = document.getElementById('main');

        // une fonction qui construit une pailette à un endroit donné
        function makePaillette(x,y) {
        var paillette = document.createElement('span');
        paillette.classList.add('paillette');
        paillette.style.left = x+'px';
        paillette.style.top = y+'px';
        return paillette;
        };

        // la fonction qui sera déclenchée à chq event "mousemove"
        function handleMouseMove (event) {
        //console.log(event);
        // on construit une nouvelle paillette à l'emplacement de la souris...
        var newPaillette = makePaillette(event.clientX, event.clientY);
        //... qu'on ajoute au container
        main.appendChild(newPaillette);

        // dans 1 seconde, commence à tomber
        setTimeout( function () {
            // on change juste la position avec "top". la transition css va faire le reste !
            newPaillette.style.top = '100%';
        }, 50);
        
        // 1 seconde pour commencer à tomber + 3 secondes d'animation 
        // => dans 4 secondes, je détruit la paillette 
        setTimeout(function () {
            newPaillette.remove();
        },3000);
        };

        main.addEventListener('mousemove',handleMouseMove);
	}

};

// Listen for keydown events
document.addEventListener('keydown', keyHandler, false);








