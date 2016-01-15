/*
Drag&Drop plugin
Galy4a, 2016

An example of a function call:
    DragAndDrop({
        className: 'block', //class of Drag&Drop elements
        zIndex: 1000    //minimal Z-index of Drag&Drop elements(default value: 1000)
    });
*/

function DragAndDrop(opt){

    if(opt.className == undefined){
        console.log('Class for Dran&Drop elements is not defined!\nSet the class in the function call.');
        return false;
    }    	
	
    if(opt.zIndex == undefined)
        opt.zIndex = 1000;
        
    var block = document.getElementsByClassName(opt.className);    

    for(var i = 0; i < block.length; i++){
        block[i].addEventListener('mousedown', drag);
        block[i].addEventListener('mouseup', drop);
        block[i].style.zIndex = opt.zIndex;
        opt.zIndex++;
    }

    function drag(event){
        this.coord = {X: event.clientX - this.getBoundingClientRect().left,
                      Y: event.clientY - this.getBoundingClientRect().top};    
        for(var i = 0; i < block.length; i++)
            if(block[i] != this && block[i].style.zIndex > this.style.zIndex)
                block[i].style.zIndex = block[i].style.zIndex - 1;
        this.style.zIndex = opt.zIndex;
        this.addEventListener('mousemove', move);
    };

    function drop(){		
        this.removeEventListener('mousemove', move);
    };

    function move(event){
        event.target.style.top = event.clientY - event.target.coord['Y'] +'px';
        event.target.style.left = event.clientX - event.target.coord['X'] +'px';
    };

};