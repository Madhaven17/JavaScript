const text = 'Iam the  Auto Written Program , now iam start to show the words contains in the program ';

let index = 0;

function writeText(){
    document.body.innerText = text.slice(0,index);
    index++;

    if(index > text.length -1){
        index=0;
    }
}
setInterval(writeText,100);